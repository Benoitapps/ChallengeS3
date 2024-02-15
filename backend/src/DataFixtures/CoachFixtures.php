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
        $user3 = $manager->getRepository(User::class)->findOneBy(['email' => "coach3@user.fr"]);
        $user4 = $manager->getRepository(User::class)->findOneBy(['email' => "coach4@user.fr"]);

        $franchise1 = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Fitness Park Paris"]);
        $franchise2 = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Fitness Park Lyon"]);
        $franchise3 = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Fitness Park Marseille"]);
        $franchise4 = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Fitness Park Bordeaux"]);
        $franchise5 = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Fitness Park Lille"]);
        $franchise6 = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Fitness Park Toulouse"]);
        $franchise7 = $manager->getRepository(Franchise::class)->findOneBy(['name' => "Fitness Park Nantes"]);



        $coach1 = (new Coach())
            ->setAuth($user1)
            ->setFranchise($franchise1)
            ->setBiography("Je suis un coach sportif professionnel, je suis passionné par mon métier et je suis là pour vous aider à atteindre vos objectifs. Je suis spécialisé dans la perte de poids, la prise de masse et la préparation physique. Je suis également diplômé en nutrition et je peux vous aider à établir un régime alimentaire adapté à vos besoins. N'hésitez pas à me contacter pour plus d'informations.");

        $manager->persist($coach1);

        $coach2 = (new Coach())
            ->setAuth($user2)
            ->setFranchise($franchise2)
            ->setBiography("Je suis toujours à l'écoute de mes clients et je m'adapte à leurs besoins. Je suis spécialisé dans la perte de poids, la prise de masse et la préparation physique. Je suis également diplômé en nutrition et je peux vous aider à établir un régime alimentaire adapté à vos besoins. N'hésitez pas à me contacter pour plus d'informations.");

        $manager->persist($coach2);

        $coach3 = (new Coach())
            ->setAuth($user3)
            ->setFranchise($franchise1)
            ->setBiography("Je suis un coach sportif professionnel, je suis passionné par mon métier et je suis là pour vous aider à atteindre vos objectifs. Je suis spécialisé dans la perte de poids, la prise de masse et la préparation physique. Je suis également diplômé en nutrition et je peux vous aider à établir un régime alimentaire adapté à vos besoins. N'hésitez pas à me contacter pour plus d'informations.");

        $manager->persist($coach3);

        $coach4 = (new Coach())
            ->setAuth($user4)
            ->setFranchise($franchise2)
            ->setBiography("Je suis toujours à l'écoute de mes clients et je m'adapte à leurs besoins. Je suis spécialisé dans la perte de poids, la prise de masse et la préparation physique. Je suis également diplômé en nutrition et je peux vous aider à établir un régime alimentaire adapté à vos besoins. N'hésitez pas à me contacter pour plus d'informations.");

        $manager->persist($coach4);

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


