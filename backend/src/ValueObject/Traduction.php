<?php

declare(strict_types=1);

namespace App\ValueObject;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
//use App\Processor\ColorStateProcessor;
use App\Provider\TradProvider;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    provider: TradProvider::class,
    normalizationContext: ['groups' => ['trad:read']],
    denormalizationContext: ['groups' => ['trad:write']],
    operations: [
        new GetCollection(),
        new Get(),
        new Post(),
    ]
)]
class Traduction
{
    public function __construct(
        protected string $id = '',
        protected string $name = '',
        protected string $traduction = '',

    ) {}


    #[ApiProperty(writable: false, identifier: false)]
    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): void
    {
        $this->id = $id;
    }

    #[Groups(['trad:read'])]
    public function getName(): string
    {
        return $this->name;
    }

    #[Groups(['trad:write'])]
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    #[Groups(['trad:read'])]
    public function getTraduction(): string
    {
        return $this->traduction;
    }

    #[Groups(['trad:write'])]
    public function setTraduction(string $traduction): void
    {
        $this->traduction = $traduction;
    }



}
