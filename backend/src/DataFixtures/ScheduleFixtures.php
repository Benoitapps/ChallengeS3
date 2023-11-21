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


        $object = (new Schedule())
            ->setCoach($coach1)
            ->setStartDate(new \DateTime('2021-01-01 10:00:00'))
            ->setEndDate(new \DateTime('2021-01-01 11:00:00'));


        $manager->persist($object);

        $object = (new Schedule())
            ->setCoach($coach2)
            ->setStartDate(new \DateTime('2021-01-01 10:00:00'))
            ->setEndDate(new \DateTime('2021-01-01 11:00:00'));

        $manager->persist($object);


        $object = (new Schedule())
            ->setCoach($coach2)
            ->setStartDate(new \DateTime('2021-01-01 10:00:00'))
            ->setEndDate(new \DateTime('2021-01-01 11:00:00'));

        $manager->persist($object);

        //Lundi
        $object = (new Schedule())
            ->setCoach($coach2)
            ->setStartDate(new \DateTime('2023-11-13 08:00:00'))
            ->setEndDate(new \DateTime('2023-11-13 18:00:00'));

        $manager->persist($object);
        //mardi
        $object = (new Schedule())
            ->setCoach($coach2)
            ->setStartDate(new \DateTime('2023-11-14 08:00:00'))
            ->setEndDate(new \DateTime('2023-11-14 17:00:00'));

        $manager->persist($object);
        //mercredi
        $object = (new Schedule())
            ->setCoach($coach2)
            ->setStartDate(new \DateTime('2023-11-15 09:00:00'))
            ->setEndDate(new \DateTime('2023-11-15 15:00:00'));

        $manager->persist($object);
        //jeudi
        $object = (new Schedule())
            ->setCoach($coach2)
            ->setStartDate(new \DateTime('2023-11-16 08:00:00'))
            ->setEndDate(new \DateTime('2023-11-16 18:00:00'));

        $manager->persist($object);
        //vendredi
        $object = (new Schedule())
            ->setCoach($coach2)
            ->setStartDate(new \DateTime('2023-11-17 08:00:00'))
            ->setEndDate(new \DateTime('2023-11-17 08:00:00'));

        $manager->persist($object);
        //samedi
        $object = (new Schedule())
            ->setCoach($coach2)
            ->setStartDate(new \DateTime('2023-11-18 08:00:00'))
            ->setEndDate(new \DateTime('2023-11-18 08:00:00'));

        $manager->persist($object);
        //dimanche
        $object = (new Schedule())
            ->setCoach($coach2)
            ->setStartDate(new \DateTime('2023-11-12 08:00:00'))
            ->setEndDate(new \DateTime('2023-11-12 08:00:00'));

        $manager->persist($object);


        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            CoachFixtures::class,

        ];
    }
}


