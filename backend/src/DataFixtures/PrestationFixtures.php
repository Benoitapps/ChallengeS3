<?php

namespace App\DataFixtures;

use App\Entity\Coach;
use App\Entity\Franchise;
use App\Entity\Manager;
use App\Entity\Prestation;
use App\Entity\Schedule;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class PrestationFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $coach1 = $manager->getRepository(Coach::class)->findOneBy(['biography' => "Biography1"]);
        $coach2 = $manager->getRepository(Coach::class)->findOneBy(['biography' => "Biography2"]);

        $franchise1 = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Franchise1"]);


        $object = (new Prestation())
            ->setFranchise($franchise1)
            ->setName("Prestation1")
            ->setDescription("Description1")
            ->setPrice(10);

        $manager->persist($object);

        $object = (new Prestation())
            ->setFranchise($franchise1)
            ->setName("Prestation2")
            ->setDescription("Description2")
            ->setPrice(20);

        $manager->persist($object);

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            CoachFixtures::class,
            FranchiseFixture::class

        ];
    }
}


