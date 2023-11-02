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

class CoachPrestationFixture extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {

        $coach1 = $manager->getRepository(Coach::class)->findOneBy(['biography' => "Biography1"]);
        $coach2 = $manager->getRepository(Coach::class)->findOneBy(['biography' => "Biography2"]);

        $prestation1 = $manager->getRepository(Prestation::class)->findOneBy(['name' => "Prestation1"]);
        $prestation2 = $manager->getRepository(Prestation::class)->findOneBy(['name' => "Prestation2"]);


        $coach1->addPrestation($prestation1);
        $coach2->addPrestation($prestation1);

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            CoachFixtures::class,
            PrestationFixtures::class

        ];
    }
}


