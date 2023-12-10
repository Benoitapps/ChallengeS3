<?php

declare(strict_types=1);

namespace App\ValueObject;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
//use App\Processor\ColorStateProcessor;
use App\Provider\TradProviderFR;
use App\Provider\TradProvider;
use App\Provider\TradProviderEN;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    paginationItemsPerPage: 100,
    normalizationContext: ['groups' => ['trad:read']],
    denormalizationContext: ['groups' => ['trad:write']],
    operations: [
        new GetCollection(
            provider: TradProvider::class,
            uriTemplate: '/traductions/fr',
            normalizationContext: ['groups' => ['trad:read:fr']],
            ),

        new GetCollection(
            provider: TradProvider::class,
            uriTemplate: '/traductions/en',
            normalizationContext: ['groups' => ['trad:read:en']],
        ),
        new Get(),
        new Post(),
    ]
)]
class Traduction
{
    public function __construct(
        protected string $id = '',
        protected string $name = '',
        protected string $traductionEN = '',
        protected string $traductionFR = '',

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

    #[Groups(['trad:read:fr', 'trad:read:en'])]
    public function getName(): string
    {
        return $this->name;
    }

    #[Groups(['trad:write'])]
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    #[Groups(['trad:read:en'])]
    public function getTraductionEN(): string
    {
        return $this->traductionEN;
    }

    #[Groups(['trad:write'])]
    public function setTraductionEN(string $traductionEN): void
    {
        $this->traductionEN = $traductionEN;
    }

    #[Groups(['trad:read:fr'])]
    public function getTraductionFR(): string
    {
        return $this->traductionFR;
    }

    #[Groups(['trad:write'])]
    public function setTraductionFR(string $traductionFR): void
    {
        $this->traductionFR = $traductionFR;
    }



}
