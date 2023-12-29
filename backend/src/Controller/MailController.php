<?php

namespace App\Controller;

use App\Entity\Client;
use App\Entity\Coach;
use App\Entity\Manager;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

#[AsController]
class MailController extends AbstractController
{
    public function __construct(private readonly UserPasswordHasherInterface $passwordHasher) {}

    public function __invoke(Request $request, ManagerRegistry $doctrine)
    {
        $userData = json_decode($request->getContent(), true);

        // dd("test");
    }
}