<?php

namespace App\DataFixtures;

use App\Entity\Coach;
use App\Entity\Franchise;
use App\Entity\Manager;
use App\Entity\Schedule;
use App\Entity\User;
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
        $this->createSchedule($manager, $coach1, $dateBefore);

        $dateBefore = new \DateTime('-1 days');
        $this->createSchedule($manager, $coach1, $dateBefore);

        // Aujourd'hui
        $today = new \DateTime('now');
        $this->createSchedule($manager, $coach1, $today);

        $dateAfter = new \DateTime('+1 days');
        $this->createSchedule($manager, $coach1, $dateAfter);

        $dateAfter = new \DateTime('+2 days');
        $this->createSchedule($manager, $coach1, $dateAfter);

        $dateAfter = new \DateTime('+3 days');
        $this->createSchedule($manager, $coach1, $dateAfter);

        // Dans 3 jours
        $dateAfter = new \DateTime('+4 days');
        $this->createSchedule($manager, $coach1, $dateAfter);

        $manager->flush();
    }


    private function createSchedule(ObjectManager $manager, Coach $coach, \DateTime $startDate): void
    {
        $endDate = clone $startDate;
        $endDate->setTime(19, 0, 0); // Fin à 23h00

        $object = (new Schedule())
            ->setCoach($coach)
            ->setStartDate($startDate->setTime(8, 0, 0)) // Commence à 8h00
            ->setEndDate($endDate);

        $manager->persist($object);
    }

    public function getDependencies(): array
    {
        return [
            CoachFixtures::class,

        ];
    }
}


