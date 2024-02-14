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

        $franchise = $manager->getRepository(Franchise::class)->findAll();

        $coach1 = (new Coach())
            ->setAuth($user1)
            ->setFranchise($franchise[0])
            ->setBiography("Je suis un coach sportif professionnel, je suis passionné par mon métier et je suis là pour vous aider à atteindre vos objectifs. Je suis spécialisé dans la perte de poids, la prise de masse et la préparation physique. Je suis également diplômé en nutrition et je peux vous aider à établir un régime alimentaire adapté à vos besoins. N'hésitez pas à me contacter pour plus d'informations.");

        $manager->persist($coach1);

        $coach2 = (new Coach())
            ->setAuth($user2)
            ->setFranchise($franchise[1])
            ->setBiography("Je suis toujours à l'écoute de mes clients et je m'adapte à leurs besoins. Je suis spécialisé dans la perte de poids, la prise de masse et la préparation physique. Je suis également diplômé en nutrition et je peux vous aider à établir un régime alimentaire adapté à vos besoins. N'hésitez pas à me contacter pour plus d'informations.");

        $manager->persist($coach2);

        $manager->flush();

        // for ($i = 0; $i <= 3; $i++) {
        //     $franchise = $manager->getRepository(Franchise::class)->findAll()[$i];
        //     $prestations = $franchise->getPrestations();

        //     foreach ($prestations as $key => $prestation) {
        //         $coach = $manager->getRepository(Coach::class)->findAll()[$key];
        //         $prestation->addCoach($coach1);
        //     }

        //     $manager->persist($prestation);
        // }

        // $manager->flush();
    }
    
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            FranchiseFixture::class,
        ];
    }
}


