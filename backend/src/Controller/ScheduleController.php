<?php

namespace App\Controller;


use App\Entity\Coach;
use App\Entity\Schedule;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

#[AsController]
class ScheduleController extends AbstractController
{
    public function __construct(protected EntityManagerInterface $entityManager ,) {}

    public function __invoke(Request $request, ManagerRegistry $doctrine)
    {
        $userData = json_decode($request->getContent(), true);

        $providedCoachId = basename($userData['coach']);
        $coach = $this->entityManager->getRepository(Coach::class)->find($providedCoachId);

        $dateStartString = $userData['dateStart'];
        $dateStart = DateTime::createFromFormat('Y-m-d', $dateStartString);

        $dateEndString = $userData['dateEnd'];
        $dateEnd = DateTime::createFromFormat('Y-m-d', $dateEndString);

        dump($dateStart);

        $dateString = $userData['dateStart'];
        $date = DateTime::createFromFormat('Y-m-d', $dateString);

        $dateTimeStart = new DateTime($userData['dateTimeStart']);
        $dateTimeEnd = new DateTime($userData['dateTimeEnd']);


        if ($dateStart == $dateEnd) {
            $schedule = new Schedule();

            dump($userData);

            $schedule->setDate($date);
            $schedule->setStartDate($dateTimeStart);
            $schedule->setEndDate($dateTimeEnd);
            $schedule->setCoach($coach);

            $entityManager = $doctrine->getManager();
            $entityManager->persist($schedule);
            $entityManager->flush();

        }elseif($dateStart < $dateEnd){

            $dateModify = $dateStart;
            $dateTimeEndModify = $dateTimeEnd;
            $dateTimeStartModify = $dateTimeStart;

            $difference = $dateStart->diff($dateEnd)->days;
            dump($difference);

            for ($i =0;$i<$difference;$i++){

                $schedule = new Schedule();

                $schedule->setDate($dateModify);
                $schedule->setStartDate($dateTimeStartModify);
                $schedule->setEndDate($dateTimeEndModify);
                $schedule->setCoach($coach);

                $entityManager = $doctrine->getManager();
                $entityManager->persist($schedule);
                $entityManager->flush();

                $dateTimeStartModify->modify('+1 day');
                $dateTimeEndModify->modify('+1 day');
                $dateModify->modify('+1 day');
            }
        }
    }
}