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

        if (isset($userData['franchiseId'])) {
            $franchise = $franchiseRepository->find($userData['franchiseId']);
        }

//        $franchise = $franchiseRepository->find($userData['franchiseId']);

        $userType = $userData['userType'];

        if ($this->isManager($userType)) {
            $user->setRoles(['ROLE_MANAGER']);
        }

        if ($this->isCoach($userType)) {
            $user->setRoles(['ROLE_COACH']);
        }

        if ($this->isClient($userType)) {
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
            $this->sendEmail($userData['email'],"Inscription","Votre compte a bien ete cree");

        }

        if ($this->isCoach($userType)) {
            $coach = new Coach();
            $coach->setAuth($user);
            $coach->setFranchise($franchise);
            $entityManager->persist($coach);
            $entityManager->flush();
        }

        if ($this->isClient($userType)) {
            $client = new Client();
            $client->setAuth($user);
            $entityManager->persist($client);
            $entityManager->flush();
            $this->sendEmail($userData['email'],"Inscription","Votre compte a bien ete cree");
        }

        $userData = [
            // 'id' => $user->getId(),
            'email' => $user->getEmail(),
            'firstname' => $user->getFirstName(),
            'lastname' => $user->getLastName(),
            // 'roles' => $user->getRoles(),
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
            'to' => $mail,
            'subject' => $title,
            'html' => $text,
        ]);
    }

    private function isClient($userType)
    {
        return isset($userType) && strtolower($userType) == 'client';
    }

    private function isCoach($userType)
    {
        return isset($userType) && strtolower($userType) == 'coach';
    }

    private function isManager($userType)
    {
        return isset($userType) && strtolower($userType) == 'manager';
    }


}