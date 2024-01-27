<?php

namespace App\Tests\Unit;

use App\Entity\TimeOff;
use App\Entity\Coach;
use App\Entity\Slot;
use Doctrine\Common\Collections\ArrayCollection;
use PHPUnit\Framework\TestCase;

class TimeOffTest extends TestCase
{
    public function testGetName()
    {
        $timeOff = new TimeOff();
        $timeOff->setName('Vacances au ski');

        $this->assertSame('Vacances au ski', $timeOff->getName());
    }

    public function testAddAndRemoveCoach()
    {
        $timeOff = new TimeOff();
        $coach = new Coach();

        $timeOff->addCoach($coach);

        $this->assertInstanceOf(ArrayCollection::class, $timeOff->getCoachs());
        $this->assertTrue($timeOff->getCoachs()->contains($coach));

        $timeOff->removeCoach($coach);

        $this->assertFalse($timeOff->getCoachs()->contains($coach));
    }

    public function testAddAndRemoveSlot()
    {
        $timeOff = new TimeOff();
        $slot = new Slot();

        $timeOff->addSlot($slot);

        $this->assertInstanceOf(ArrayCollection::class, $timeOff->getSlots());
        $this->assertTrue($timeOff->getSlots()->contains($slot));
        $this->assertSame($timeOff, $slot->getTimeOff());

        $timeOff->removeSlot($slot);

        $this->assertFalse($timeOff->getSlots()->contains($slot));
        $this->assertNull($slot->getTimeOff());
    }
}
