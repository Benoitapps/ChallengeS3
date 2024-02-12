<?php

namespace App\Tests\Unit;

use App\Entity\User;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    public function testGetEmail()
    {
        $user = new User();
        $user->setEmail('user@user.fr');

        $this->assertSame('user@user.fr', $user->getEmail());
    }

    public function testGetRoles()
    {
        $user = new User();
        $user->setRoles(['ROLE_USER', 'ROLE_ADMIN']);

        $this->assertEquals(['ROLE_USER', 'ROLE_ADMIN'], $user->getRoles());
    }

    public function testSetAndGetPassword()
    {
        $user = new User();
        $user->setPassword('secure_password_lol');

        $this->assertSame('secure_password_lol', $user->getPassword());
    }

    public function testSetAndGetPlainPassword()
    {
        $user = new User();
        $user->setPlainPassword('plain_password');

        $this->assertSame('plain_password', $user->getPlainPassword());
    }

    public function testSetAndGetFirstname()
    {
        $user = new User();
        $user->setFirstname('John');

        $this->assertSame('John', $user->getFirstname());
    }

    public function testSetAndGetLastname()
    {
        $user = new User();
        $user->setLastname('Doe');

        $this->assertSame('Doe', $user->getLastname());
    }

    public function testEraseCredentials()
    {
        $user = new User();
        $user->setPlainPassword('plain_password');

        $user->eraseCredentials();

        $this->assertNull($user->getPlainPassword());
    }
}
