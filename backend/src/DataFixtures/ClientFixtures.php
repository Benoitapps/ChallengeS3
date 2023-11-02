<?php

namespace App\DataFixtures;

use App\Entity\Client;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ClientFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {

        $object = (new Client())
            ->setAddress("10 chemin cool")
            ->setCity("Paris")
            ->setZipcode("75000");

        $manager->persist($object);


        $object = (new Client())
            ->setAddress("10 chemin triste")
            ->setCity("Montreuil")
            ->setZipcode("75000");

        $manager->persist($object);
        $manager->flush();
    }

}


