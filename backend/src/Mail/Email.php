<?php

declare(strict_types=1);

namespace App\Mail;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\Controller\SendEmailAction;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['email:read']],
    denormalizationContext: ['groups' => ['email:write']],
    operations:
    [
        new Post(
            uriTemplate: '/email',
            controller: SendEmailAction::class,
            denormalizationContext: ['groups' => ['email:write']],
        ),

    ],
)
]
class Email
{
    public function __construct(
        protected string $name = '',
        protected string $email = '',
        protected string $subject = '',
        protected string $message = '',
    ) {
    }


    #[Groups(['email:read'])]
    public function getEmail(): string
    {
        return $this->email;
    }
    #[Groups(['email:write'])]
    public function setEmail(string $email): void
    {
        $this->email = $email;

    }

    #[Groups(['email:read'])]
    public function getSubject(): string
    {
        return $this->subject;
    }

    #[Groups(['email:write'])]
    public function setSubject(string $subject): void
    {
        $this->subject = $subject;
    }

    #[Groups(['email:read'])]
    public function getMessage(): string
    {
        return $this->message;
    }

    #[Groups(['email:write'])]
    public function setMessage(string $message): void
    {
        $this->message = $message;

    }
}