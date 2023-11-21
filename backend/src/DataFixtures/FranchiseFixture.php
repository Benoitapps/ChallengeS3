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

        for ($i = 0; $i <= 35; $i++) {
            $object = (new Franchise())
                ->setCompany($compa1[0])
                ->setName("Franchise" . $i)
                ->setDescription("Description" . $i)
                ->setAddress("address" . $i)
                ->setCity("city" . $i)
                ->setZipCode("75001");

            $manager->persist($object);
        }

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            CompanyFixtures::class,
        ];
    }
}


