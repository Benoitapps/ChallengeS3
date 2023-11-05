<?php

namespace App\DataFixtures;

use App\Entity\Client;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ClientFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $user1 = $manager->getRepository(User::class)->findOneBy(['email' => "user@user.fr"]);
        $user2 = $manager->getRepository(User::class)->findOneBy(['email' => "user2@user.fr"]);


        $object = (new Client())
            ->setAddress("10 chemin cool")
            ->setCity("Paris")
            ->setZipcode("75000")
            ->setAuth($user1);

        $manager->persist($object);


        $object = (new Client())
            ->setAddress("10 chemin triste")
            ->setCity("Montreuil")
            ->setZipcode("75000")
            ->setAuth($user2);

        $manager->persist($object);
        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            UserFixtures::class

        ];
    }
}


