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

        $coach1 = $manager->getRepository(Coach::class)->findAll()[0];
        $coach2 = $manager->getRepository(Coach::class)->findAll()[1];
        $coach3 = $manager->getRepository(Coach::class)->findAll()[2];
        $coach4 = $manager->getRepository(Coach::class)->findAll()[3];

        $prestation1 = $manager->getRepository(Prestation::class)->findAll()[0];
        $prestation2 = $manager->getRepository(Prestation::class)->findAll()[1];
        $prestation3 = $manager->getRepository(Prestation::class)->findAll()[2];
        $prestation4 = $manager->getRepository(Prestation::class)->findAll()[3];
        $prestation5 = $manager->getRepository(Prestation::class)->findAll()[4];
        $prestation6 = $manager->getRepository(Prestation::class)->findAll()[5];
        $prestation7 = $manager->getRepository(Prestation::class)->findAll()[6];
        $prestation8 = $manager->getRepository(Prestation::class)->findAll()[7];

        $coach1->addPrestation($prestation1);
        $coach4->addPrestation($prestation1);

        $coach2->addPrestation($prestation2);
        $coach3->addPrestation($prestation2);

        $coach3->addPrestation($prestation3);
        $coach2->addPrestation($prestation3);

        $coach4->addPrestation($prestation4);
        $coach1->addPrestation($prestation4);

        $coach1->addPrestation($prestation5);
        $coach2->addPrestation($prestation5);

        $coach2->addPrestation($prestation6);
        $coach3->addPrestation($prestation6);

        $coach3->addPrestation($prestation7);
        $coach4->addPrestation($prestation7);

        $coach4->addPrestation($prestation8);
        $coach1->addPrestation($prestation8);

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


