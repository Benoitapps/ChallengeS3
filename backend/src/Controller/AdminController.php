<?php

namespace App\Controller;

use App\Entity\User;
use Resend;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

#[AsController]
class AdminController extends AbstractController
{
    public function __construct(private readonly UserPasswordHasherInterface $passwordHasher, protected string $secret ) {}

    public function __invoke(Request $request, ManagerRegistry $doctrine)
    {
        $userData = json_decode($request->getContent(), true);

        $user = new User();
        $user->setEmail($userData['email']);
        $user->setFirstName($userData['firstname']);
        $user->setLastName($userData['lastname']);
        $user->setRoles($userData['roles']);

        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $randomPassword = $this->getRandomStringRandomInt()
        );

        $this->sendEmail(
            $userData['email'],
            'Your profile was created',
            'Your password is: ' . $randomPassword
        );

        $user->setPassword($hashedPassword);

        // save user in database
        $entityManager = $doctrine->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        return new Response(
            json_encode($userData),
            Response::HTTP_CREATED
        );
    }

    private function sendEmail($mail, $title = '', $text = ''){
        $resend = Resend::client($this->secret);
        $resend->emails->send([
            'from' => 'mycoach@mycoach.bendc.site',
            'to' => $_ENV['APP_ENV'] == 'dev' ? $_ENV['MAIL_TO'] : $mail,
            'subject' => $title,
            'html' => $text,
        ]);
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