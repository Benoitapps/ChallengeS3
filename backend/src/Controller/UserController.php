<?php

namespace App\Controller;

use App\Entity\Client;
use App\Entity\Coach;
use App\Entity\Manager;
use App\Entity\User;
use App\Repository\FranchiseRepository;
use Resend;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

#[AsController]
class UserController extends AbstractController
{
    public function __construct(private readonly UserPasswordHasherInterface $passwordHasher, protected string $secret ) {}

    public function __invoke(Request $request, ManagerRegistry $doctrine, FranchiseRepository $franchiseRepository)
    {
        $userData = json_decode($request->getContent(), true);

        $user = new User();
        $user->setEmail($userData['email']);
        $user->setFirstName($userData['firstname']);
        $user->setLastName($userData['lastname']);

        $userType = $userData['userType'];

        if ($this->isManager($userType)) {
            $user->setRoles(['ROLE_MANAGER']);
        } else {
            $user->setRoles(['ROLE_CLIENT']);
        }

        $user->setPlainPassword($userData['plainPassword']);
        
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $user->getPlainPassword()
        );
        
        $user->setPassword($hashedPassword);
        $user->eraseCredentials();

        // save user in database
        $entityManager = $doctrine->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        if ($this->isManager($userType)) {
            $manager = new Manager();
            $manager->setAuth($user);
            $entityManager->persist($manager);
            $entityManager->flush();
            $this->sendEmail($userData['email'],"Bienvenue chez MyCoach","Bonjour ".$userData['firstname']." ".$userData['lastname'].", Votre compte MyCoach a bien été créé. Vous pouvez vous connecter à l'application MyCoach avec l'adresse email suivante : ".$userData['email'].".A bientôt sur MyCoach ! Ce message vous a été envoyé via une adresse mail n'acceptant pas les réponses.");
        } else {
            $client = new Client();
            $client->setAuth($user);
            $entityManager->persist($client);
            $entityManager->flush();
            $this->sendEmail($userData['email'],"Bienvenue chez MyCoach","Bonjour ".$userData['firstname']." ".$userData['lastname'].", Votre compte MyCoach a bien été créé. Vous pouvez vous connecter à l'application MyCoach avec l'adresse email suivante : ".$userData['email'].".A bientôt sur MyCoach ! Ce message vous a été envoyé via une adresse mail n'acceptant pas les réponses.");
        }

        $userData = [
            'email' => $user->getEmail(),
            'firstname' => $user->getFirstName(),
            'lastname' => $user->getLastName(),
        ];

        return new Response(
            json_encode($userData),
            Response::HTTP_CREATED
        );
    }

    private function sendEmail($mail,$title,$text){

        $resend = Resend::client($this->secret);

        $resend->emails->send([
            'from' => 'mycoach@mycoach.bendc.site',
            'to' => $_ENV['APP_ENV'] == 'dev' ? $_ENV['MAIL_TO'] : $mail,
            'subject' => $title,
            'html' => $text,
        ]);
    }

    private function isClient($userType)
    {
        return isset($userType) && strtolower($userType) == 'client';
    }

    private function isManager($userType)
    {
        return isset($userType) && strtolower($userType) == 'manager';
    }


}