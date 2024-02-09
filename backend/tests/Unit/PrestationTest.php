<?php

namespace App\Tests\Unit;

use App\Entity\Prestation;
use App\Entity\Coach;
use App\Entity\Franchise;
use PHPUnit\Framework\TestCase;

class PrestationTest extends TestCase
{
    public function testGetSetName()
    {
        $prestation = new Prestation();
        $prestation->setName('Service A');

        $this->assertSame('Service A', $prestation->getName());
    }

    public function testSetAndGetDescription()
    {
        $prestation = new Prestation();
        $prestation->setDescription('Description for service A');

        $this->assertSame('Description for service A', $prestation->getDescription());
    }

    public function testSetAndGetPrice()
    {
        $prestation = new Prestation();
        $prestation->setPrice(100);

        $this->assertSame(100, $prestation->getPrice());
    }

    public function testAddRemoveCoach()
    {
        $prestation = new Prestation();
        $coach = new Coach();

        $prestation->addCoach($coach);

        $this->assertTrue($prestation->getCoach()->contains($coach));

        $prestation->removeCoach($coach);

        $this->assertFalse($prestation->getCoach()->contains($coach));
    }

    public function testSetAndGetFranchise()
    {
        $prestation = new Prestation();
        $franchise = new Franchise();

        $prestation->setFranchise($franchise);

        $this->assertSame($franchise, $prestation->getFranchise());
    }

    public function testAddRemoveSlot()
    {
        $prestation = new Prestation();
        $slot = new \App\Entity\Slot();
    
        $prestation->addSlot($slot);
    
        $this->assertTrue($prestation->getSlots()->contains($slot));
        $this->assertSame($prestation, $slot->getPrestation());
    
        $prestation->removeSlot($slot);
    
        $this->assertFalse($prestation->getSlots()->contains($slot));
        $this->assertNull($slot->getPrestation());
    }
    
}
