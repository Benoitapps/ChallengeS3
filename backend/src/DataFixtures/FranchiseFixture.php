<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\Franchise;
use App\Entity\Manager;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class FranchiseFixture extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $compa1 = $manager->getRepository(Company::class)->findAll();

        $object = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Paris")
            ->setDescription("Fitness Park Paris est la première salle de sport de la franchise Fitness Park. Elle propose des cours collectifs, des machines de musculation et de cardio, des espaces de crossfit et de boxe, des saunas et des hammams. Nous proposons également des coachs sportifs pour vous accompagner dans votre progression.")
            ->setAddress("Rue de la paix")
            ->setCity("Paris")
            ->setLat(48.84917076352597)
            ->setLng(2.3897329073928284)
            ->setZipCode("75011");
        
        $manager->persist($object);

        $object2 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Lyon")
            ->setDescription("La meilleure salle de sport de Lyon. Elle propose des cours collectifs, des machines de musculation et de cardio, des espaces de crossfit et de boxe, des saunas et des hammams. Nous proposons également des coachs sportifs pour vous accompagner dans votre progression.")
            ->setAddress("Rue de la Joie")
            ->setCity("Lyon")
            ->setLat(45.764043)
            ->setLng(4.835659)
            ->setZipCode("69001");
        
        $manager->persist($object2);

        $object3 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Marseille")
            ->setDescription("Cette salle de sport est la troisième salle de sport de la franchise Fitness Park. Elle propose des cours collectifs, des machines de musculation et de cardio, des espaces de crossfit et de boxe, des saunas et des hammams. Nous proposons également des coachs sportifs pour vous accompagner dans votre progression.")
            ->setAddress("Rue de Provence")
            ->setCity("Marseille")
            ->setLat(43.296482)
            ->setLng(5.36978)
            ->setZipCode("13001");

        $manager->persist($object3);

        $object4 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Bordeaux")
            ->setDescription("En pensant à votre bien-être, nous avons créé un espace de 2000 m² dédié à la remise en forme et au bien-être. Nous vous proposons des cours collectifs, des machines de musculation et de cardio, des espaces de crossfit et de boxe, des saunas et des hammams. Nous proposons également des coachs sportifs pour vous accompagner dans votre progression.")
            ->setAddress("Rue de la Garonne")
            ->setCity("Bordeaux")
            ->setLat(44.837789)
            ->setLng(-0.57918)
            ->setZipCode("33000");

        $manager->persist($object4);

        $object5 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Lille")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de la Flandre")
            ->setCity("Lille")
            ->setLat(50.62925)
            ->setLng(3.057256)
            ->setZipCode("59000");

        $manager->persist($object5);

        $object6 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Toulouse")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de la Garonne")
            ->setCity("Toulouse")
            ->setLat(43.604652)
            ->setLng(1.444209)
            ->setZipCode("31000");
        
        $manager->persist($object6);

        $object7 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Nantes")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de la Loire")
            ->setCity("Nantes")
            ->setLat(47.218371)
            ->setLng(-1.553621)
            ->setZipCode("44000");

        $manager->persist($object7);

        $object8 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Strasbourg")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de l'Alsace")
            ->setCity("Strasbourg")
            ->setLat(48.573405)
            ->setLng(7.752111)
            ->setZipCode("67000");
        
        $manager->persist($object8);

        $object9 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Montpellier")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de la Méditerranée")
            ->setCity("Montpellier")
            ->setLat(43.610769)
            ->setLng(3.876716)
            ->setZipCode("34000");
        
        $manager->persist($object9);

        $object10 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Rennes")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de la Bretagne")
            ->setCity("Rennes")
            ->setLat(48.117266)
            ->setLng(-1.677792)
            ->setZipCode("35000");
        
        $manager->persist($object10);

        $object11 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Nice")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de la Côte d'Azur")
            ->setCity("Nice")
            ->setLat(43.7101728)
            ->setLng(7.2619532)
            ->setZipCode("06000");
        
        $manager->persist($object11);

        $object12 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Toulon")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de la Méditerranée")
            ->setCity("Toulon")
            ->setLat(43.124228)
            ->setLng(5.928)
            ->setZipCode("83000");
        
        $manager->persist($object12);

        $object13 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Grenoble")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de l'Isère")
            ->setCity("Grenoble")
            ->setLat(45.188529)
            ->setLng(5.724523)
            ->setZipCode("38000");

        $manager->persist($object13);

        $object14 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Dijon")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de la Bourgogne")
            ->setCity("Dijon")
            ->setLat(47.321581)
            ->setLng(5.041470)
            ->setZipCode("21000");

        $manager->persist($object14);

        $object15 = (new Franchise())
            ->setCompany($compa1[0])
            ->setName("Fitness Park Angers")
            ->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia, nunc nisl aliquet nunc, quis aliquam nisl nisl")
            ->setAddress("Rue de l'Anjou")
            ->setCity("Angers")
            ->setLat(47.473988)
            ->setLng(-0.551904)
            ->setZipCode("49000");

        $manager->persist($object15);

        $object16 = (new Franchise())
            ->setCompany($compa1[1])
            ->setName("Keep Cool Paris")
            ->setDescription("Keep Cool Paris est la première salle de sport de la franchise Keep Cool. Elle propose des cours collectifs, des machines de musculation et de cardio, des espaces de crossfit et de boxe, des saunas et des hammams. Nous proposons également des coachs sportifs pour vous accompagner dans votre progression.")
            ->setAddress("Rue de la martinique")
            ->setCity("Londres")
            ->setLat(51.507351)
            ->setLng(-0.127758)
            ->setZipCode("75011");
        
        $manager->persist($object16);

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            CompanyFixtures::class,
        ];
    }
}


