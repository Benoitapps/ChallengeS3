<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Client;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // PWD = test
        $pwd = '$2y$13$FfxqkM/i7SCwlevR3hVD1ucR3X30xf7QZAXeiCu4B6r6x6CnV1.1q';
        $client1 = $manager->getRepository(Client::class)->findOneBy(['city' => "Paris"]);
        $client2 = $manager->getRepository(Client::class)->findOneBy(['city' => "Montreuil"]);


        $object = (new User())
            ->setEmail('user@user.fr')
            ->setPassword($pwd)
            ->setRoles([])
            ->setFirstname('user1')
            ->setLastname('lasname')
            ->setRoles(["ROLE_CLIENT"])

        ;
        $manager->persist($object);

        $object = (new User())
            ->setEmail('user2@user.fr')
            ->setPassword($pwd)
            ->setRoles([])
            ->setFirstname('user2')
            ->setLastname('lasname')
            ->setRoles(["ROLE_CLIENT"])

        ;
        $manager->persist($object);

        $object = (new User())
            ->setEmail('manager@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_MANAGER"])
            ->setFirstname('manager1')
            ->setLastname('lasname')
        ;
        $manager->persist($object);

        $object = (new User())
            ->setEmail('manager2@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_MANAGER"])
            ->setFirstname('manager2')
            ->setLastname('lasname')
        ;
        $manager->persist($object);


        $object = (new User())
            ->setEmail('coach@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_COACH"])
            ->setFirstname('coach1')
            ->setLastname('lasname')
        ;
        $manager->persist($object);

        $object = (new User())
            ->setEmail('coach2@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_COACH"])
            ->setFirstname('coach2')
            ->setLastname('lasname')
        ;
        $manager->persist($object);

        // admin@user.fr
        $object = (new User())
            ->setEmail('admin@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_ADMIN"])
            ->setFirstname('admin')
            ->setLastname('lasname')
        ;
        $manager->persist($object);

        $manager->flush();
    }

}
