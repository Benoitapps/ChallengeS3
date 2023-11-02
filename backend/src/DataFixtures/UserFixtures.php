<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Client;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture implements DependentFixtureInterface
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
            ->setClient($client1)
            ->setFirstname('user')
            ->setLastname('lasname')
        ;
        $manager->persist($object);

        $object = (new User())
            ->setEmail('user2@user.fr')
            ->setPassword($pwd)
            ->setClient($client2)
            ->setRoles([])
            ->setFirstname('user')
            ->setLastname('lasname')
        ;
        $manager->persist($object);

        $object = (new User())
            ->setEmail('manager@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_MANAGER"])
            ->setFirstname('manager')
            ->setLastname('lasname')
        ;
        $manager->persist($object);

        $object = (new User())
            ->setEmail('manager2@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_MANAGER"])
            ->setFirstname('manager')
            ->setLastname('lasname')
        ;
        $manager->persist($object);


        $object = (new User())
            ->setEmail('coach@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_COACH"])
            ->setFirstname('user')
            ->setLastname('lasname')
        ;
        $manager->persist($object);

        $object = (new User())
            ->setEmail('coach2@user.fr')
            ->setPassword($pwd)
            ->setRoles(["ROLE_COACH"])
            ->setFirstname('user')
            ->setLastname('lasname')
        ;
        $manager->persist($object);

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            ClientFixtures::class,

        ];
    }
}
