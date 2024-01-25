<?php

namespace App\Tests\Unit;

use App\Entity\ReviewClient;
use App\Entity\Client;
use App\Entity\Coach;
use PHPUnit\Framework\TestCase;

class ReviewClientTest extends TestCase
{
    public function testGetNote()
    {
        $review = new ReviewClient();
        $review->setNote(4);

        $this->assertSame(4, $review->getNote());
    }

    public function testSetAndGetClient()
    {
        $review = new ReviewClient();
        $client = new Client();

        $review->setClient($client);

        $this->assertSame($client, $review->getClient());
    }

    public function testSetAndGetCoach()
    {
        $review = new ReviewClient();
        $coach = new Coach();

        $review->setCoach($coach);

        $this->assertSame($coach, $review->getCoach());
    }

    public function testInvalidNoteException()
    {
        $this->expectException(\InvalidArgumentException::class);

        $review = new ReviewClient();
        $review->setNote(6);
    }
}
