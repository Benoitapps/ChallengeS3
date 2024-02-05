<?php

namespace App\Tests\Unit;
use App\Entity\Slot;
use App\Entity\Prestation;
use App\Entity\Client;
use App\Entity\Coach;
use Doctrine\DBAL\Types\Types;
use PHPUnit\Framework\TestCase;

class SlotTest extends TestCase
{
    public function testGetStartDate()
    {
        $slot = new Slot();
        $startDate = new \DateTime();
        $slot->setStartDate($startDate);

        $this->assertSame($startDate, $slot->getStartDate());
    }

    public function testGetEndDate()
    {
        $slot = new Slot();
        $endDate = new \DateTime();
        $slot->setEndDate($endDate);

        $this->assertSame($endDate, $slot->getEndDate());
    }

    public function testSetAndGetPrestation()
    {
        $slot = new Slot();
        $prestation = new Prestation();

        $slot->setPrestation($prestation);

        $this->assertSame($prestation, $slot->getPrestation());
    }

    public function testSetAndGetClient()
    {
        $slot = new Slot();
        $client = new Client();

        $slot->setClient($client);

        $this->assertSame($client, $slot->getClient());
    }

    public function testSetAndGetCoach()
    {
        $slot = new Slot();
        $coach = new Coach();

        $slot->setCoach($coach);

        $this->assertSame($coach, $slot->getCoach());
    }
}
