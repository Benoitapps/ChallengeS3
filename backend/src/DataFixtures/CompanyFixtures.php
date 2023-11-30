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
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
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


