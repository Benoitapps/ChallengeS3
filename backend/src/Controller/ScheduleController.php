<?php

namespace App\Controller;


use App\Entity\Coach;
use App\Entity\Schedule;
use App\ValueObject\PersoSchedule;
use DateInterval;
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

    public function __invoke(Request $request, ManagerRegistry $doctrine, PersoSchedule $persoSchedule)
    {
        $coach = $persoSchedule->getCoach();
        $dateStart = $persoSchedule->getDateStart();
        $dateEnd = $persoSchedule->getDateEnd();

        $dateTimeStart = $persoSchedule->getDateTimeStart();
        $dateTimeEnd = $persoSchedule->getDateTimeEnd();

        if ($dateStart == $dateEnd) {
            $schedule = new Schedule();

            $schedule->setDate($dateStart);
            $schedule->setStartDate($dateTimeStart);
            $schedule->setEndDate($dateTimeEnd);
            $schedule->setCoach($coach);

            $entityManager = $doctrine->getManager();
            $entityManager->persist($schedule);

//            $exist = $this->entityManager
//                ->getRepository(Schedule::class)
//                ->findOneBy([
//                    'dateStart' => $dateStart,
//                    'dateEnd' => $dateEnd,
//                    'coach' => $coach->getId()
//                ]);
//            if($exist != []) {
                $entityManager->flush();
//            }

        }elseif ($dateStart < $dateEnd) {
            $dateModify = clone $dateStart;
            $dateTimeEndModify = clone $dateTimeEnd;
            $dateTimeStartModify = clone $dateTimeStart;

            dump($dateModify);dump($dateTimeStartModify);dump($dateTimeEndModify);


            $difference = $dateStart->diff($dateEnd)->days;
            dump($difference);

            for ($i = 0; $i < $difference; $i++) {
                $schedule = new Schedule();

                // Utilisez les copies mutables ici
                $schedule->setDate(clone $dateModify);
                $schedule->setStartDate(clone $dateTimeStartModify);
                $schedule->setEndDate(clone $dateTimeEndModify);
                $schedule->setCoach($coach);

                $entityManager = $doctrine->getManager();
                $entityManager->persist($schedule);

                $entityManager->flush();

                $dateTimeStartModify = $dateTimeStartModify->add(new DateInterval('P1D'));
                $dateTimeEndModify = $dateTimeEndModify->add(new DateInterval('P1D'));
                $dateModify = $dateModify->add(new DateInterval('P1D'));
            }
        }

        return $persoSchedule;
    }

}