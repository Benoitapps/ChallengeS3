<?php

namespace App\Controller;

use App\Entity\Coach;
use App\Entity\Prestation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class LinkPrestationController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager, private readonly Security $security)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke(Request $request, Coach $coach)
    {
        $data = json_decode($request->getContent(), true);

        $currentUser = $this->security->getUser();
        if (!$currentUser) {
            return new Response(
                json_encode(['error' => 'Vous devez être connecté.']),
                Response::HTTP_UNAUTHORIZED
            );
        }

        $manager = $currentUser->getManager();

        if (!in_array('ROLE_MANAGER', $currentUser->getRoles())) {
            return new Response(
                json_encode(['error' => 'Seuls les managers peuvent associer une prestation à un coach.']),
                Response::HTTP_FORBIDDEN
            );
        }

        $company = $manager->getCompany();

        if (!isset($data['coachId'])) {
            return new JsonResponse(['error' => 'Missing coachId'], 400);
        }

        if (!isset($data['prestationId'])) {
            return new JsonResponse(['error' => 'Missing prestationId'], 400);
        }

        $coach = $this->entityManager->getRepository(Coach::class)->find($data['coachId']);

        $prestation = $this->entityManager->getRepository(Prestation::class)->find($data['prestationId']);

        if (!$coach) {
            return new JsonResponse(['error' => 'Coach not found'], 404);
        }

        if (!$prestation) {
            return new JsonResponse(['error' => 'Prestation not found'], 404);
        }

        $coachFranchise = $coach->getFranchise();

        $prestationFranchise = $prestation->getFranchise();

        if ($coachFranchise !== $prestationFranchise) {
            return new Response(
                json_encode(['error' => 'La prestation et le coach ne font pas partie de la même franchise']),
                Response::HTTP_FORBIDDEN
            );
        }

        $coachCompany = $coachFranchise->getCompany();
        $prestationCompany = $prestationFranchise->getCompany();

        if ($company !== $coachCompany or $company !== $prestationCompany or $coachCompany !== $prestationCompany) {
            return new Response(
                json_encode(['error' => "La prestation et le coach doivent faire partie de l'entreprise du manager"]),
                Response::HTTP_FORBIDDEN
            );
        }

        $coach->addPrestation($prestation);

        $this->entityManager->persist($coach);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Prestation linked successfully'], 201);
    }
}