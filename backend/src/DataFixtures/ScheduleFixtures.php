<?php

namespace App\DataFixtures;

use App\Entity\Coach;
use App\Entity\Franchise;
use App\Entity\Manager;
use App\Entity\Schedule;
use App\Entity\User;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;



class ScheduleFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $coach1 = $manager->getRepository(Coach::class)->findOneBy(['biography' => "Biography1"]);
        $coach2 = $manager->getRepository(Coach::class)->findOneBy(['biography' => "Biography2"]);




        $dateBefore = new \DateTime('-2 days');
        $dateString = $dateBefore->format('Y-m-d');
        $date = DateTime::createFromFormat('Y-m-d', $dateString);

        $this->createSchedule($manager, $coach1, $dateBefore,$date);

        $dateBefore = new \DateTime('-1 days');
        $dateString = $dateBefore->format('Y-m-d');
        $date = DateTime::createFromFormat('Y-m-d', $dateString);
        $this->createSchedule($manager, $coach1, $dateBefore,$date);

        // Aujourd'hui
        $today = new \DateTime('now');
        $dateString = $today->format('Y-m-d');
        $date = DateTime::createFromFormat('Y-m-d', $dateString);
        $this->createSchedule($manager, $coach1, $today,$date);

        $dateAfter = new \DateTime('+1 days');
        $dateString = $dateAfter->format('Y-m-d');
        $date = DateTime::createFromFormat('Y-m-d', $dateString);
        $this->createSchedule($manager, $coach1, $dateAfter,$date);

        $dateAfter = new \DateTime('+2 days');
        $dateString = $dateAfter->format('Y-m-d');
        $date = DateTime::createFromFormat('Y-m-d', $dateString);
        $this->createSchedule($manager, $coach1, $dateAfter,$date);

        $dateAfter = new \DateTime('+3 days');
        $dateString = $dateAfter->format('Y-m-d');
        $date = DateTime::createFromFormat('Y-m-d', $dateString);
        $this->createSchedule($manager, $coach1, $dateAfter,$date);

        // Dans 3 jours
        $dateAfter = new \DateTime('+4 days');
        $dateString = $dateAfter->format('Y-m-d');
        $date = DateTime::createFromFormat('Y-m-d', $dateString);
        $this->createSchedule($manager, $coach1, $dateAfter,$date);

        $manager->flush();
    }


    private function createSchedule(ObjectManager $manager, Coach $coach, \DateTime $startDate, \DateTime $date): void
    {
        $endDate = clone $startDate;
        $endDate->setTime(19, 0, 0); // Fin à 23h00

        $object = (new Schedule())
            ->setCoach($coach)
            ->setStartDate($startDate->setTime(8, 0, 0)) // Commence à 8h00
            ->setEndDate($endDate)
            ->setDate( $date);

        $manager->persist($object);
    }

    public function getDependencies(): array
    {
        return [
            CoachFixtures::class,

        ];
    }
}


