<?php

namespace App\DataFixtures;

use App\Entity\Coach;
use App\Entity\Franchise;
use App\Entity\Manager;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class CoachFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $user1 = $manager->getRepository(User::class)->findOneBy(['email' => "coach@user.fr"]);
        $user2 = $manager->getRepository(User::class)->findOneBy(['email' => "coach2@user.fr"]);

        $franchise1 = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Franchise1"]);

        $object = (new Coach())
            ->setAuth($user1)
            ->setFranchise($franchise1)
            ->setBiography("Biography1");

        $manager->persist($object);

        $object = (new Coach())
            ->setAuth($user2)
            ->setFranchise($franchise1)
            ->setBiography("Biography2");

        $manager->persist($object);

        $manager->flush();

        for ($i = 0; $i <= 3; $i++) {
            $franchise = $manager->getRepository(Franchise::class)->findAll()[$i];
            $prestations = $franchise->getPrestations();

            foreach ($prestations as $key => $prestation) {
                $coach = $manager->getRepository(Coach::class)->findAll()[$key];
                $prestation->addCoach($coach);
            }

            $manager->persist($prestation);
        }

        $manager->flush();
    }
    
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            FranchiseFixture::class,
        ];
    }
}


