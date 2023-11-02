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
            ->setName("Company1")
            ->setDescription("Description1")
            ->setKbis("Kbis1")
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


