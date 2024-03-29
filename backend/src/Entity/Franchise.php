<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\FranchiseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: [
                'groups' => [
                    'franchise:read',
                ],
            ],
            security: "is_granted('ROLE_MANAGER')",
        ),
        new GetCollection(
            uriTemplate: '/franchises/with-prestations',
            openapiContext: [
                'description' => 'Retrieves a collection of Franchise resources with Prestation resources informations',
            ],
            paginationItemsPerPage: 4,
            normalizationContext: ['groups' => ['franchise:read']],

        ),
        new GetCollection(
            uriTemplate: 'companies/myCompany/franchises',
            openapiContext: [
                'summary' => 'Retrieves a collection of Franchise resources for my company',
                'description' => 'Retrieves a collection of Franchise resources for my company',
            ],
            shortName: 'Company',
            normalizationContext: ['groups' => ['company:read:franchise']],
            security: "is_granted('ROLE_MANAGER')",
            name: 'GetMyCompanyFranchises',
        ),
        new Get(
            normalizationContext: ['groups' => ['franchise:read']],
        ),
        new Get(
            uriTemplate: 'franchises/{id}/prestations',
            normalizationContext: ['groups' => ['franchise:prestations-list']],
            security: "is_granted('ROLE_MANAGER')",
        ),
        new Post(
            denormalizationContext: ['groups' => ['franchise:write']],
            security: "is_granted('ROLE_MANAGER')",
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Patch(
            denormalizationContext: ['groups' => ['franchise:update']],
            security: "is_granted('ROLE_MANAGER') and object.getCompany().getManager().getAuth().getId() === user.getId()",
        ),
    ],

)]

#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial', 'whiteList' => ['franchise:read']])]

#[ORM\Entity(repositoryClass: FranchiseRepository::class)]
class Franchise
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['franchise:read', 'company:read:franchise', 'coach:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['franchise:read', 'company:read:franchise', 'franchise:write', 'coach:read','stat:money:read','stat:admin:read','franchise:update'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['franchise:read', 'company:read:franchise', 'franchise:write','franchise:update'])]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Groups(['franchise:read', 'company:read:franchise', 'franchise:write', 'coach:read','franchise:update'])]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    #[Groups(['franchise:read', 'company:read:franchise', 'franchise:write','franchise:update'])]
    private ?string $city = null;

    #[ORM\Column(length: 5)]
    #[Groups(['franchise:read', 'company:read:franchise', 'franchise:write','franchise:update'])]
    private ?string $zipCode = null;

    #[ORM\ManyToOne(inversedBy: 'franchises')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['franchise:read', 'franchise:write'])]
    private ?Company $company = null;

    #[ORM\OneToMany(mappedBy: 'franchise', targetEntity: Coach::class)]
    #[Groups(['franchise:read', 'company:read:franchise','stat:coach:read','stat:reservation:read'])]
    private Collection $coachs;

    #[ORM\OneToMany(mappedBy: 'franchise', targetEntity: Prestation::class)]
    #[Groups(['franchise:read', 'company:read:franchise','stat:prestation:read','stat:money:read','stat:admin:read', 'franchise:prestations-list'])]
    private Collection $prestations;
    
    #[ORM\Column]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['franchise:read', 'company:read:franchise', 'franchise:write', 'franchise:update'])]
    private ?float $lat = null;
    
    #[ORM\Column]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['franchise:read', 'company:read:franchise', 'franchise:write', 'franchise:update'])]
    private ?float $lng = null;

    #[Groups(['franchise:read','franchise:write', 'coach:read', 'company:read:franchise'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $image = null;

    public function __construct()
    {
        $this->coachs = new ArrayCollection();
        $this->prestations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zipCode;
    }

    public function setZipCode(string $zipCode): static
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): static
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection<int, Coach>
     */
    public function getCoachs(): Collection
    {
        return $this->coachs;
    }

    public function addCoach(Coach $coach): static
    {
        if (!$this->coachs->contains($coach)) {
            $this->coachs->add($coach);
            $coach->setFranchise($this);
        }

        return $this;
    }

    public function removeCoach(Coach $coach): static
    {
        if ($this->coachs->removeElement($coach)) {
            // set the owning side to null (unless already changed)
            if ($coach->getFranchise() === $this) {
                $coach->setFranchise(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Prestation>
     */
    public function getPrestations(): Collection
    {
        return $this->prestations;
    }

    public function addPrestation(Prestation $prestation): static
    {
        if (!$this->prestations->contains($prestation)) {
            $this->prestations->add($prestation);
            $prestation->setFranchise($this);
        }

        return $this;
    }

    public function removePrestation(Prestation $prestation): static
    {
        if ($this->prestations->removeElement($prestation)) {
            // set the owning side to null (unless already changed)
            if ($prestation->getFranchise() === $this) {
                $prestation->setFranchise(null);
            }
        }

        return $this;
    }

    public function getLat(): ?float
    {
        return $this->lat;
    }

    public function setLat(float $lat): static
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLng(): ?float
    {
        return $this->lng;
    }

    public function setLng(float $lng): static
    {
        $this->lng = $lng;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

        return $this;
    }
}
