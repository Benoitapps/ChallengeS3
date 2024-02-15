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

        $prestation1 = $manager->getRepository(Prestation::class)->findOneBy(['name'=> "Football"]);
        $prestation2 = $manager->getRepository(Prestation::class)->findOneBy(['name'=> "Basketball"]);
        $prestation3 = $manager->getRepository(Prestation::class)->findOneBy(['name'=> "Yoga"]);;
        $prestation4 = $manager->getRepository(Prestation::class)->findOneBy(['name'=> "Pilates"]);
        $prestation5 = $manager->getRepository(Prestation::class)->findOneBy(['name'=> "Crossfit"]);
        $prestation6 = $manager->getRepository(Prestation::class)->findOneBy(['name'=> "Boxe"]);
        $prestation7 = $manager->getRepository(Prestation::class)->findOneBy(['name'=> "MusculationMusculation"]);

        $coach1->addPrestation($prestation1);
        $coach3->addPrestation($prestation1);

        $coach2->addPrestation($prestation2);
        $coach4->addPrestation($prestation2);

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


