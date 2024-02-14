<?php

namespace App\Controller;

use App\Entity\Coach;
use App\Entity\Prestation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class LinkPrestationController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke(Request $request, Coach $coach)
    {
        $data = json_decode($request->getContent(), true);

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

        $coach->addPrestation($prestation);

        $this->entityManager->persist($coach);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Prestation linked successfully']);
    }
}