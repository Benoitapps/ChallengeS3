<?php

use App\Entity\Client;
use App\Entity\ReviewClient;
use App\Entity\ReviewCoach;
use App\Entity\Slot;
use App\Entity\User;
use PHPUnit\Framework\TestCase;

class ClientTest extends TestCase
{
    public function testSetGetAddress()
    {
        $client = new Client();
        $client->setAddress('123 rue de Paris');

        $this->assertSame('123 rue de Paris', $client->getAddress());
    }

    public function testSetGetCity()
    {
        $client = new Client();
        $client->setCity('Paris');

        $this->assertSame('Paris', $client->getCity());
    }

    public function testSetGetZipCode()
    {
        $client = new Client();
        $client->setZipCode('12345');

        $this->assertSame('12345', $client->getZipCode());
    }

    public function testSetAndGetAuth()
    {
        $client = new Client();
        $user = new User();

        $client->setAuth($user);

        $this->assertSame($user, $client->getAuth());
    }

    public function testAddRemoveReviewClient()
    {
        $client = new Client();
        $reviewClient = new ReviewClient();

        $client->addReviewClient($reviewClient);

        $this->assertTrue($client->getReviewClients()->contains($reviewClient));
        $this->assertSame($client, $reviewClient->getClient());

        $client->removeReviewClient($reviewClient);

        $this->assertFalse($client->getReviewClients()->contains($reviewClient));
        $this->assertNull($reviewClient->getClient());
    }

    public function testGetId()
    {
        $client = new Client();

        $this->assertNull($client->getId());

        $reflectedClient = new \ReflectionClass(Client::class);
        $idProperty = $reflectedClient->getProperty('id');
        $idProperty->setAccessible(true);
        $idProperty->setValue($client, 1);

        $this->assertEquals(1, $client->getId());
    }
}
