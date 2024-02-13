<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\Manager;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class CompanyFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $manager1 = $manager->getRepository(Manager::class)->findAll();

        $object = (new Company())
            ->setManager($manager1[0])
            ->setName("Fitness Park")
            ->setDescription("Fitness Park est une salle de sport qui propose des cours collectifs, des machines de musculation et de cardio, des espaces de crossfit et de boxe, des saunas et des hammams. Nous proposons également des coachs sportifs pour vous accompagner dans votre progression.")
            ->setKbis("KBIS de l'entreprise")
            ->setIsVerified(true);

        $manager->persist($object);

        $object = (new Company())
            ->setManager($manager1[1])
            ->setName("Keep Cool")
            ->setDescription("Keep Cool est une salle de sport qui propose des cours collectifs, des machines de musculation et de cardio, des espaces de crossfit et de boxe, des saunas et des hammams. Nous proposons également des coachs sportifs pour vous accompagner dans votre progression.")
            ->setKbis("KBIS de l'entreprise")
            ->setIsVerified(true);

        $manager->persist($object);

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            ManagerFixtures::class,

        ];
    }
}


