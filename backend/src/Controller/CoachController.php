<?php

namespace App\Controller;

use App\Entity\Coach;
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
class CoachController extends AbstractController
{
    public function __construct(private readonly UserPasswordHasherInterface $passwordHasher, protected string $secret ) {}

    public function __invoke(Request $request, ManagerRegistry $doctrine, FranchiseRepository $franchiseRepository)
    {
        $userData = json_decode($request->getContent(), true);

        $currentUser = $this->getUser();
        if (!$currentUser) {
            return new Response(
                json_encode(['error' => 'Vous devez être connecté pour créer un coach.']),
                Response::HTTP_UNAUTHORIZED
            );
        }

        $manager = $currentUser->getManager();

        if (!in_array('ROLE_MANAGER', $currentUser->getRoles())) {
            return new Response(
                json_encode(['error' => 'Seuls les managers peuvent créer des coachs.']),
                Response::HTTP_FORBIDDEN
            );
        }

        if (isset($userData['franchiseId'])) {
            $franchise = $franchiseRepository->find($userData['franchiseId']);
        
            $company = $franchise->getCompany();
        
            $franchiseManager = $company->getManager();
        
            if ($franchiseManager !== $manager) {
                return new Response(
                    json_encode(['error' => 'Vous ne pouvez créer des coachs que pour votre propre franchise.']),
                    Response::HTTP_FORBIDDEN
                );
            }
        }

        $user = new User();
        $user->setEmail($userData['email']);
        $user->setFirstName($userData['firstname']);
        $user->setLastName($userData['lastname']);
        $user->setRoles(['ROLE_COACH']);

        $user->setPlainPassword($userData['plainPassword']);

        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $user->getPlainPassword()
        );

        $this->sendEmail(
            $userData['email'],
            'Bienvenue sur MyCoach',
            "Bonjour ".$userData['firstname']." ".$userData['lastname'].", Votre compte MyCoach vient d'être créé par votre entreprise. Vous pouvez vous connecter à l'application MyCoach avec l'adresse email suivante : ".$userData['email'].". Votre mot de passe provisoire est : ".$userData['plainPassword']." . Veuillez le changer lors de votre première connexion sur votre profil. A bientôt sur MyCoach ! Ce message vous a été envoyé via une adresse mail n'acceptant pas les réponses. Pour toute question veuillez contacter votre entreprise."
        );

        $user->setPassword($hashedPassword);
        $user->eraseCredentials();

        $entityManager = $doctrine->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        $coach = new Coach();
        $coach->setAuth($user);
        $coach->setFranchise($franchise);
        $entityManager->persist($coach);
        $entityManager->flush();

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

    private function sendEmail($mail, $title = '', $text = ''){
        $resend = Resend::client($this->secret);
        $resend->emails->send([
            'from' => 'mycoach@mycoach.bendc.site',
            'to' => $_ENV['APP_ENV'] == 'dev' ? $_ENV['MAIL_TO'] : $mail,
            'subject' => $title,
            'html' => $text,
        ]);
    }

}