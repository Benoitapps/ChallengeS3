<?php

namespace App\DataFixtures;

use App\Entity\Manager;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ManagerFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $user1 = $manager->getRepository(User::class)->findAll()[0];
        $user2 = $manager->getRepository(User::class)->findAll()[1];

        $object = (new Manager())
            ->setAuth($user1);

        $manager->persist($object);

        $object2 = (new manager())
            ->setAuth($user2);

        $manager->persist($object2);
        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,

        ];
    }
}


