<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\Franchise;
use App\Entity\Manager;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class FranchiseFixture extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $compa1 = $manager->getRepository(Company::class)->findAll();


        $object = (new Franchise())
              ->setCompany($compa1[0])
                ->setName("Franchise1")
                ->setDescription("Description1")
                ->setAddress("address1")
                ->setCity("marignane")
                ->setZipCode("13700");

        $manager->persist($object);

        $object = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Franchise2")
            ->setDescription("Description2")
            ->setAddress("address2")
            ->setCity("Lyon")
            ->setZipCode("69000");

        $manager->persist($object);
        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            CompanyFixtures::class,

        ];
    }
}


