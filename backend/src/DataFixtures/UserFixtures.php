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

        $object = (new User())
            ->setEmail('user@user.fr')
            ->setPassword($pwd)
            ->setRoles([])
            ->setFirstname('Michel')
            ->setLastname('Scoot')
            ->setRoles(["ROLE_CLIENT"]);

        $manager->persist($object);

        $object = (new User())
            ->setEmail('user2@user.fr')
            ->setPassword($pwd)
            ->setRoles([])
            ->setFirstname('Jaqueline')
            ->setLastname('Joure')
            ->setRoles(["ROLE_CLIENT"])

        ;
        $manager->persist($object);

        $object = (new User())
            ->setEmail('manager@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_MANAGER"])
            ->setFirstname('Mickael')
            ->setLastname('Pytre')
        ;
        $manager->persist($object);

        $object = (new User())
            ->setEmail('manager2@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_MANAGER"])
            ->setFirstname('George')
            ->setLastname('Fouet')
        ;
        $manager->persist($object);


        $object = (new User())
            ->setEmail('coach@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_COACH"])
            ->setFirstname('Tony')
            ->setLastname('Parker')
        ;
        $manager->persist($object);

        $object = (new User())
            ->setEmail('coach2@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_COACH"])
            ->setFirstname('Pierre')
            ->setLastname('Afeu')
        ;
        $manager->persist($object);

        $object = (new User())
            ->setEmail('coach3@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_COACH"])
            ->setFirstname('Michel')
            ->setLastname('Polnareff')
        ;
        $manager->persist($object);

        $object = (new User())
            ->setEmail('coach4@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_COACH"])
            ->setFirstname('Marie')
            ->setLastname('Popins')
        ;
        $manager->persist($object);

        $object = (new User())
            ->setEmail('admin@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_ADMIN"])
            ->setFirstname('Michel')
            ->setLastname('Dupont')
        ;
        $manager->persist($object);

        $manager->flush();
    }
}
