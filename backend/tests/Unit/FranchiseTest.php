<?php

namespace App\Tests\Unit;

use App\Entity\Coach;
use App\Entity\Company;
use App\Entity\Franchise;
use App\Entity\Prestation;
use PHPUnit\Framework\TestCase;

class FranchiseTest extends TestCase
{
    public function testSetGetName()
    {
        $franchise = new Franchise();
        $franchise->setName('Franchise A');

        $this->assertSame('Franchise A', $franchise->getName());
    }

    public function testSetAndGetDescription()
    {
        $franchise = new Franchise();
        $franchise->setDescription('Description for franchise A');

        $this->assertSame('Description for franchise A', $franchise->getDescription());
    }

    public function testSetAndGetAddress()
    {
        $franchise = new Franchise();
        $franchise->setAddress('123 rue étoile');

        $this->assertSame('123 rue étoile', $franchise->getAddress());
    }

    public function testSetAndGetCity()
    {
        $franchise = new Franchise();
        $franchise->setCity('Paris city A');

        $this->assertSame('Paris city A', $franchise->getCity());
    }

    public function testSetAndGetZipCode()
    {
        $franchise = new Franchise();
        $franchise->setZipCode('12345');

        $this->assertSame('12345', $franchise->getZipCode());
    }

    public function testSetAndGetCompany()
    {
        $franchise = new Franchise();
        $company = new Company();

        $franchise->setCompany($company);

        $this->assertSame($company, $franchise->getCompany());
    }

    public function testAddRemoveCoach()
    {
        $franchise = new Franchise();
        $coach = new Coach();

        $franchise->addCoach($coach);

        $this->assertTrue($franchise->getCoachs()->contains($coach));

        $franchise->removeCoach($coach);

        $this->assertFalse($franchise->getCoachs()->contains($coach));
    }

    public function testAddRemovePrestation()
    {
        $franchise = new Franchise();
        $prestation = new Prestation();

        $franchise->addPrestation($prestation);

        $this->assertTrue($franchise->getPrestations()->contains($prestation));
        $this->assertSame($franchise, $prestation->getFranchise());

        $franchise->removePrestation($prestation);

        $this->assertFalse($franchise->getPrestations()->contains($prestation));
        $this->assertNull($prestation->getFranchise());
    }

    public function testSetAndGetLat()
    {
        $franchise = new Franchise();
        $franchise->setLat(12.34);

        $this->assertSame(12.34, $franchise->getLat());
    }

    public function testSetAndGetLng()
    {
        $franchise = new Franchise();
        $franchise->setLng(56.78);

        $this->assertSame(56.78, $franchise->getLng());
    }

    public function testGetId()
    {
        $franchise = new Franchise();

        $this->assertNull($franchise->getId());

        $reflectedFranchise = new \ReflectionClass(Franchise::class);
        $idProperty = $reflectedFranchise->getProperty('id');
        $idProperty->setAccessible(true);
        $idProperty->setValue($franchise, 1);

        $this->assertEquals(1, $franchise->getId());
    }
}
