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
        $user1 = $manager->getRepository(User::class)->findOneBy(['email' => "manager@user.fr"]);
        $user2 = $manager->getRepository(User::class)->findOneBy(['email' => "manager2@user.fr"]);



        $object = (new Manager())
            ->setAuth($user1);


        $manager->persist($object);


        $object = (new manager())
            ->setAuth($user2);


        $manager->persist($object);
        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,

        ];
    }
}


