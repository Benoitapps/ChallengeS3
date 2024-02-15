<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Resend;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

#[AsController]
class ForgotPasswordController extends AbstractController
{
    public function __construct(private readonly UserPasswordHasherInterface $passwordHasher) {}

    public function __invoke(Request $request, ManagerRegistry $doctrine, EntityManagerInterface $entityManager, $url_front)
    {
        // if ?token is set, then we are in the edit password page
        if ($request->query->get('token')) {
            $token = $request->query->get('token');
            $user = $entityManager->getRepository(User::class)->findOneBy(
                ['token' => $token]
            );

            if ($user) {
                $userData = json_decode($request->getContent(), true);
                $password = $userData['password'];
                // min 4 characters and  1 number
                if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/', $password)) {
                    return new Response(
                        json_encode(['error' => 'Password must contain at least 4 characters and 1 number']),
                        Response::HTTP_BAD_REQUEST
                    );
                }
                $user->setPassword($this->passwordHasher->hashPassword($user, $password));
                $user->setToken(null);
                $entityManager->persist($user);
                $entityManager->flush();
            }

            return new Response(
                "{}",
                Response::HTTP_CREATED
            );
        } else {
            // if ?token is not set, then we are in the forgot password page
            $userData = json_decode($request->getContent(), true);
            $email = $userData['email'];
    
            $user = $entityManager->getRepository(User::class)->findOneBy(
                ['email' => $email]
            );
    
            if ($user) {
                $user->setToken($this->getRandomStringRandomInt());
                $entityManager->persist($user);
                $entityManager->flush();
    
                // envoyer le mail
                $resend = Resend::client('re_FVip7GLa_4AGNShHcF8QdPdWTHNs7b1my');
    
                try {
                    $resend->emails->send([
                        'from' => 'mycoach@mycoach.bendc.site',
                        'to' => $_ENV['APP_ENV'] == 'dev' ? $_ENV['MAIL_TO'] : $email,
                        'subject' => '[MyCoach] Modifier votre mot de passe',
                        'html' => '<p>Bonjour, vous venez de demander le changement de votre mot de passe MyCoach</p><br><a href="' . $url_front . '/forgot-password/' . $user->getToken() . '">Cliquez ici pour modifier votre mot de passe</a><br><p>A bientôt sur MyCoach !</p>',
                    ]);
                } catch (\Exception $e) {
                    return new Response(
                        json_encode(['error' => $e->getMessage()]),
                        Response::HTTP_INTERNAL_SERVER_ERROR
                    );
                }
            }
    
            return new Response(
                "{}",
                Response::HTTP_CREATED
            );
        }
    }

    private function getRandomStringRandomInt($length = 16)
    {
        $stringSpace = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ';
        $pieces = [];
        $max = mb_strlen($stringSpace, '8bit') - 1;
        for ($i = 0; $i < $length; ++ $i) {
            $pieces[] = $stringSpace[random_int(0, $max)];
        }
        return implode('', $pieces);
    }
}