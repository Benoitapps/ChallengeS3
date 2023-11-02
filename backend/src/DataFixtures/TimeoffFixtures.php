<?php

namespace App\DataFixtures;

use App\Entity\Coach;
use App\Entity\Franchise;
use App\Entity\Manager;
use App\Entity\Prestation;
use App\Entity\Schedule;
use App\Entity\TimeOff;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class TimeoffFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {

        $object = (new TimeOff())
            ->setName("Vacances1");


        $manager->persist($object);


        $manager->flush();
    }

}


