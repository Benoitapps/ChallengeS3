<?php

namespace App\DataFixtures;

use App\Entity\Coach;
use App\Entity\Client;
use App\Entity\ReviewCoach;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ReviewCoachFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $clients = $manager->getRepository(Client::class)->findAll();
        $coaches = $manager->getRepository(Coach::class)->findAll();

        $object = (new ReviewCoach())
            ->setClient($clients[0])
            ->setCoach($coaches[1])
            ->setNote(5);

        $manager->persist($object);

        $object = (new ReviewCoach())
            ->setClient($clients[1])
            ->setCoach($coaches[0])
            ->setNote(4);

        $manager->persist($object);

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            ClientFixtures::class,
            CoachFixtures::class,
        ];
    }
}


