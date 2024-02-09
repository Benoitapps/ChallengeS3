<?php

namespace App\Tests\Unit;

use App\Entity\Manager;
use App\Entity\Company;
use App\Entity\User;
use PHPUnit\Framework\TestCase;

class ManagerTest extends TestCase
{
    public function testSetAndGetAuth()
    {
        $manager = new Manager();
        $user = new User();

        $manager->setAuth($user);

        $this->assertSame($user, $manager->getAuth());
    }

    public function testSetAndGetCompany()
    {
        $manager = new Manager();
        $company = new Company();

        $manager->setCompany($company);

        $this->assertSame($company, $manager->getCompany());
        $this->assertSame($manager, $company->getManager());
    }

    public function testGetId()
    {
        $manager = new Manager();

        $this->assertNull($manager->getId());

        $reflectedManager = new \ReflectionClass(Manager::class);
        $idProperty = $reflectedManager->getProperty('id');
        $idProperty->setAccessible(true);
        $idProperty->setValue($manager, 1);

        $this->assertEquals(1, $manager->getId());
    }
}
