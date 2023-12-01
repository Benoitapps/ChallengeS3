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
        for ($i = 0; $i <= 8; $i++) {
            $franchise = $manager->getRepository(Franchise::class)->findAll()[$i];

            for ($j=0; $j < 2; $j++) { 
                $object = (new Prestation())
                    ->setFranchise($franchise)
                    ->setName("Prestation" . $j)
                    ->setDescription("Description" . $j)
                    ->setPrice(rand(10, 100));

                $manager->persist($object);
            }
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            FranchiseFixture::class,
        ];
    }
}


