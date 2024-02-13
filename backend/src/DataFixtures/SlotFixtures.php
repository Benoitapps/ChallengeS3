<?php

namespace App\DataFixtures;

use App\Entity\Client;
use App\Entity\Coach;
use App\Entity\Franchise;
use App\Entity\Manager;
use App\Entity\Prestation;
use App\Entity\Schedule;
use App\Entity\Slot;
use App\Entity\User;
use Container0Ff2dKE\SimpleLoaderGhostB8c01d0;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;


class SlotFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $client1 = $manager->getRepository(Client::class)->findAll()[0];
        $client2 = $manager->getRepository(Client::class)->findAll()[1];

        $prestation1 = $manager->getRepository(Prestation::class)->findAll()[0];
        $prestation2 = $manager->getRepository(Prestation::class)->findAll()[1];

        $coach1 = $manager->getRepository(Coach::class)->findAll()[0];
        $coach2 = $manager->getRepository(Coach::class)->findAll()[1];

        $dateTest = new \DateTime('now');
        $dateString = $dateTest->format('Y-m-d');
        $date = DateTime::createFromFormat('Y-m-d', $dateString);

        $object = (new Slot())
            ->setPrestation($prestation1)
            ->setClient($client1)
            ->setStartDate((new \DateTime('now'))->modify('+3 hours'))
            ->setEndDate((new \DateTime('now'))->modify('+4 hours'))
            ->setCoach($coach1)
            ->setVacation(false)
            ->setStartDate($date);

        $manager->persist($object);

        $object = (new Slot())
            ->setStartDate((new \DateTime('now'))->modify('+7 hours'))
            ->setEndDate((new \DateTime('now'))->modify('+8 hours'))
            ->setCoach($coach2)
            ->setVacation(false)
            ->setStartDate($date);

        $manager->persist($object);

        $object = (new Slot())
            ->setPrestation($prestation2)
            ->setClient($client2)
            ->setStartDate((new \DateTime('now'))->modify('+4 hours'))
            ->setEndDate((new \DateTime('now'))->modify('+5 hours'))
            ->setCoach($coach1)
            ->setVacation(false)
            ->setStartDate($date);

        $manager->persist($object);

        $object = (new Slot())
            ->setStartDate((new \DateTime('now'))->modify('+8 hours'))
            ->setEndDate((new \DateTime('now'))->modify('+9 hours'))
            ->setCoach($coach2)
            ->setVacation(false)
            ->setStartDate($date);

        $manager->persist($object);

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            CoachFixtures::class,
            ClientFixtures::class,
            PrestationFixtures::class,

        ];
    }
}


