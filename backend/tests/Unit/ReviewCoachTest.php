<?php

namespace App\Tests\Unit;

use App\Entity\ReviewCoach;
use App\Entity\Client;
use App\Entity\Coach;
use PHPUnit\Framework\TestCase;

class ReviewCoachTest extends TestCase
{
    public function testGetNote()
    {
        $review = new ReviewCoach();
        $review->setNote(4);

        $this->assertSame(4, $review->getNote());
    }

    public function testSetAndGetClient()
    {
        $review = new ReviewCoach();
        $client = new Client();

        $review->setClient($client);

        $this->assertSame($client, $review->getClient());
    }

    public function testSetAndGetCoach()
    {
        $review = new ReviewCoach();
        $coach = new Coach();

        $review->setCoach($coach);

        $this->assertSame($coach, $review->getCoach());
    }
}
