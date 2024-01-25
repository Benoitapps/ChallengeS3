<?php

namespace App\Tests\Unit;

use App\Entity\Schedule;
use App\Entity\Coach;
use Doctrine\DBAL\Types\Types;
use PHPUnit\Framework\TestCase;

class ScheduleTest extends TestCase
{
    public function testGetStartDate()
    {
        $schedule = new Schedule();
        $startDate = new \DateTime();
        $schedule->setStartDate($startDate);

        $this->assertSame($startDate, $schedule->getStartDate());
    }

    public function testGetEndDate()
    {
        $schedule = new Schedule();
        $endDate = new \DateTime();
        $schedule->setEndDate($endDate);

        $this->assertSame($endDate, $schedule->getEndDate());
    }

    public function testSetAndGetCoach()
    {
        $schedule = new Schedule();
        $coach = new Coach();

        $schedule->setCoach($coach);

        $this->assertSame($coach, $schedule->getCoach());
    }
}
