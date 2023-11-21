<?php

namespace App\Controller;

use App\Entity\User;
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
    public function __construct(private readonly UserPasswordHasherInterface $passwordHasher) {}

    public function __invoke(Request $request, ManagerRegistry $doctrine)
    {
        $userData = json_decode($request->getContent(), true);

        $user = new User();
        $user->setEmail($userData['email']);
        $user->setFirstName($userData['firstname']);
        $user->setLastName($userData['lastname']);

        if (isset($userData['userType']) && strtolower($userData['userType']) == 'manager') {
            $user->setRoles(['ROLE_MANAGER']);
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
}