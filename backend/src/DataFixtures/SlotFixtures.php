<?php

namespace App\DataFixtures;

use App\Entity\Client;
use App\Entity\Coach;
use App\Entity\Franchise;
use App\Entity\Manager;
use App\Entity\Prestation;
use App\Entity\Schedule;
use App\Entity\Slot;
use App\Entity\TimeOff;
use App\Entity\User;
use Container0Ff2dKE\SimpleLoaderGhostB8c01d0;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class SlotFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $client1 = $manager->getRepository(Client::class)->findOneBy(['city' => "Paris"]);
        $client2 = $manager->getRepository(Client::class)->findOneBy(['city' => "Montreuil"]);

        $prestation1 = $manager->getRepository(Prestation::class)->findOneBy(['name' => "Prestation1"]);
        $prestation2 = $manager->getRepository(Prestation::class)->findOneBy(['name' => "Prestation2"]);

        $coach1 = $manager->getRepository(Coach::class)->findOneBy(['biography' => "Biography1"]);
        $coach2 = $manager->getRepository(Coach::class)->findOneBy(['biography' => "Biography2"]);


        $timeoff1 = $manager->getRepository(TimeOff::class)->findOneBy(['name' => "Vacances1"]);

        $object = (new Slot())
            ->setPrestation($prestation1)
            ->setClient($client1)
            ->setStartDate((new \DateTime('now'))->modify('+3 hours'))
            ->setEndDate((new \DateTime('now'))->modify('+4 hours'))
            ->setCoach($coach1);

        $manager->persist($object);

        $object = (new Slot())
            ->setTimeOff($timeoff1)
            ->setClient($client1)
            ->setStartDate((new \DateTime('now'))->modify('+7 hours'))
            ->setEndDate((new \DateTime('now'))->modify('+8 hours'))
            ->setCoach($coach2);

        $manager->persist($object);

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            CoachFixtures::class,
            ClientFixtures::class,
            PrestationFixtures::class,
            TimeoffFixtures::class

        ];
    }
}


