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
            ->setName("Fitness Park Paris")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de la paix")
            ->setCity("Paris")
            ->setLat(48.84917076352597)
            ->setLng(2.3897329073928284)
            ->setZipCode("75011");
        
        $manager->persist($object);

        $object2 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Lyon")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de la Joie")
            ->setCity("Lyon")
            ->setLat(45.764043)
            ->setLng(4.835659)
            ->setZipCode("69001");
        
        $manager->persist($object2);

        $object3 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Marseille")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de Provence")
            ->setCity("Marseille")
            ->setLat(43.296482)
            ->setLng(5.36978)
            ->setZipCode("13001");

        $manager->persist($object3);

        $object4 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Bordeaux")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de la Garonne")
            ->setCity("Bordeaux")
            ->setLat(44.837789)
            ->setLng(-0.57918)
            ->setZipCode("33000");

        $manager->persist($object4);

        for ($i = 0; $i <= 10; $i++) {
            $fakeObject = (new Franchise())
                ->setCompany($compa1[0])
                ->setName("Franchise" . $i)
                ->setDescription("Description" . $i)
                ->setAddress("address" . $i)
                ->setCity("city" . $i)
                ->setLat(48.84 + (.1 * $i))
                ->setLng(2.38 + (.1 * $i))
                ->setZipCode("75001");

            $manager->persist($fakeObject);
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


