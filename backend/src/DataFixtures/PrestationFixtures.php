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
        for ($i = 0; $i <= 35; $i++) {
            $franchise = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Franchise" . $i]);
            if ($franchise) {
                $object = (new Prestation())
                    ->setFranchise($franchise)
                    ->setName("Prestation" . $i)
                    ->setDescription("Description" . $i)
                    ->setPrice($i);
    
                $manager->persist($object);
            }
        }

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            FranchiseFixture::class
        ];
    }
}


