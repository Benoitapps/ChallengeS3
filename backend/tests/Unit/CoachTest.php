<?php

use App\Entity\Coach;
use App\Entity\Franchise;
use App\Entity\ReviewClient;
use App\Entity\ReviewCoach;
use App\Entity\Schedule;
use App\Entity\Slot;
use App\Entity\TimeOff;
use App\Entity\User;
use App\Entity\Prestation;
use PHPUnit\Framework\TestCase;

class CoachTest extends TestCase
{
    public function testSetAndGetAuth()
    {
        $coach = new Coach();
        $user = new User();

        $coach->setAuth($user);

        $this->assertSame($user, $coach->getAuth());
    }

    public function testSetAndGetFranchise()
    {
        $coach = new Coach();
        $franchise = new Franchise();

        $coach->setFranchise($franchise);

        $this->assertSame($franchise, $coach->getFranchise());
    }

    public function testAddRemoveSchedule()
    {
        $coach = new Coach();
        $schedule = new Schedule();

        $coach->addSchedule($schedule);

        $this->assertTrue($coach->getSchedules()->contains($schedule));
        $this->assertSame($coach, $schedule->getCoach());

        $coach->removeSchedule($schedule);

        $this->assertFalse($coach->getSchedules()->contains($schedule));
        $this->assertNull($schedule->getCoach());
    }

    public function testAddRemoveReviewClient()
    {
        $coach = new Coach();
        $reviewClient = new ReviewClient();

        $coach->addReviewClient($reviewClient);

        $this->assertTrue($coach->getReviewClients()->contains($reviewClient));
        $this->assertSame($coach, $reviewClient->getCoach());

        $coach->removeReviewClient($reviewClient);

        $this->assertFalse($coach->getReviewClients()->contains($reviewClient));
        $this->assertNull($reviewClient->getCoach());
    }

    public function testGetId()
    {
        $coach = new Coach();

        $this->assertNull($coach->getId());

        $reflectedCoach = new \ReflectionClass(Coach::class);
        $idProperty = $reflectedCoach->getProperty('id');
        $idProperty->setAccessible(true);
        $idProperty->setValue($coach, 1);

        $this->assertEquals(1, $coach->getId());
    }
}