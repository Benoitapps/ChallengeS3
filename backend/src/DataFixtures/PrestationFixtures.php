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
        $franchiseOne = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Fitness Park Paris"]);
        $franchiseTwo = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Fitness Park Lyon"]);
        $franchiseThree = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Fitness Park Marseille"]);
        $franchiseFour = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Fitness Park Bordeaux"]);
        $franchiseFive = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Fitness Park Lille"]);
        $franchiseSix = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Fitness Park Toulouse"]);
        $franchiseSeven = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Fitness Park Nantes"]);

        $object = (new Prestation())
            ->setFranchise($franchiseOne)
            ->setName("Football")
            ->setDescription("La séance de football est un entraînement complet qui permet de travailler l'endurance, la coordination, la vitesse, la force et la souplesse. C'est un sport collectif qui permet de se défouler et de se dépenser tout en s'amusant.")
            ->setPrice(rand(10, 100));

        $manager->persist($object);

        $object2 = (new Prestation())
            ->setFranchise($franchiseTwo)
            ->setName("Basketball")
            ->setDescription("La séance de basketball est un entraînement complet qui permet de travailler l'endurance, la coordination, la vitesse, la force et la souplesse. C'est un sport collectif qui permet de se défouler et de se dépenser tout en s'amusant.")
            ->setPrice(rand(10, 100));

        $manager->persist($object2);

        $object3 = (new Prestation())
            ->setFranchise($franchiseThree)
            ->setName("Yoga")
            ->setDescription("Le yoga est une discipline qui permet de travailler la souplesse, la respiration, la concentration et la relaxation. C'est une activité qui permet de se détendre et de se relaxer tout en travaillant son corps et son esprit.")
            ->setPrice(rand(10, 100));

        $manager->persist($object3);

        $object4 = (new Prestation())
            ->setFranchise($franchiseFour)
            ->setName("Pilates")
            ->setDescription("Le pilates est une discipline qui permet de travailler la souplesse, la respiration, la concentration et la relaxation. C'est une activité qui permet de se détendre et de se relaxer tout en travaillant son corps et son esprit.")
            ->setPrice(rand(10, 100));

        $manager->persist($object4);

        $object5 = (new Prestation())
            ->setFranchise($franchiseFive)
            ->setName("Crossfit")
            ->setDescription("Le crossfit est une discipline qui permet de travailler la force, la vitesse, l'endurance, la coordination et la souplesse. C'est une activité qui permet de se défouler et de se dépenser tout en s'amusant.")
            ->setPrice(rand(10, 100));

        $manager->persist($object5);

        $object6 = (new Prestation())
            ->setFranchise($franchiseSix)
            ->setName("Boxe")
            ->setDescription("La boxe est une discipline qui permet de travailler la force, la vitesse, l'endurance, la coordination et la souplesse. C'est une activité qui permet de se défouler et de se dépenser tout en s'amusant.")
            ->setPrice(rand(10, 100));

        $manager->persist($object6);

        $object7 = (new Prestation())
            ->setFranchise($franchiseSeven)
            ->setName("Musculation")
            ->setDescription("La musculation est une discipline qui permet de travailler la force, la vitesse, l'endurance, la coordination et la souplesse. C'est une activité qui permet de se défouler et de se dépenser tout en s'amusant.")
            ->setPrice(rand(10, 100));

        $manager->persist($object7);

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            FranchiseFixture::class,
        ];
    }
}


