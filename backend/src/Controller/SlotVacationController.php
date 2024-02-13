<?php

namespace App\Controller;


use App\Entity\Slot;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

#[AsController]
class SlotVacationController extends AbstractController
{
    public function __construct(protected EntityManagerInterface $entityManager ,) {}



    public function __invoke(Request $request, ManagerRegistry $doctrine, Slot $slot )
    {
        $createSlot = new Slot();

        $createSlot->setStartDate($slot->getStartDate());
        $createSlot->setEndDate($slot->getEndDate());
        $createSlot->setCoach($slot->getCoach());
        $createSlot->setVacation(true);

        $entityManager = $doctrine->getManager();

        $entityManager->persist($createSlot);
        $entityManager->flush();

        return $slot;
    }

}