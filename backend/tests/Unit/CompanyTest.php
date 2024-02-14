<?php

use App\Entity\Company;
use App\Entity\Franchise;
use App\Entity\Manager;
use PHPUnit\Framework\TestCase;

class CompanyTest extends TestCase
{
    public function testSetGetName()
    {
        $company = new Company();
        $company->setName('Company A');

        $this->assertSame('Company A', $company->getName());
    }

    public function testSetGetName2()
    {
        $company = new Company();
        $company->setName('Company B');

        $this->assertSame('Company B', $company->getName());
    }

    public function testSetAndGetDescription()
    {
        $company = new Company();
        $company->setDescription('Description for company A');

        $this->assertSame('Description for company A', $company->getDescription());
    }

    public function testSetAndGetDescription2()
    {
        $company = new Company();
        $company->setDescription('Description for company B');

        $this->assertSame('Description for company B', $company->getDescription());
    }

    public function testSetAndGetKbis()
    {
        $company = new Company();
        $company->setKbis('Kbis');

        $this->assertSame('Kbis', $company->getKbis());
    }

    public function testSetAndGetIsVerified()
    {
        $company = new Company();
        $company->setIsVerified(true);

        $this->assertTrue($company->isIsVerified());
    }

    public function testSetAndGetManager()
    {
        $company = new Company();
        $manager = new Manager();

        $company->setManager($manager);

        $this->assertSame($manager, $company->getManager());
    }

    public function testAddRemoveFranchise()
    {
        $company = new Company();
        $franchise = new Franchise();

        $company->addFranchise($franchise);

        $this->assertTrue($company->getFranchises()->contains($franchise));
        $this->assertSame($company, $franchise->getCompany());

        $company->removeFranchise($franchise);

        $this->assertFalse($company->getFranchises()->contains($franchise));
        $this->assertNull($franchise->getCompany());
    }

    public function testGetId()
    {
        $company = new Company();

        $this->assertNull($company->getId());

        $reflectedCompany = new \ReflectionClass(Company::class);
        $idProperty = $reflectedCompany->getProperty('id');
        $idProperty->setAccessible(true);
        $idProperty->setValue($company, 1);

        $this->assertEquals(1, $company->getId());
    }
}
