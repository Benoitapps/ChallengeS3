<?php

namespace App\Doctrine\Extensions;
use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use App\Entity\Franchise;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\SecurityBundle\Security;

final class FindFranchisesExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    public function __construct(private readonly Security $security)
    {
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        if (Franchise::class !== $resourceClass || $operation->getUriTemplate() !== '/franchises/with-prestations') {
            return;
        }
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, Operation $operation = null, array $context = []): void
    {
        if (Franchise::class !== $resourceClass || $operation->getUriTemplate() !== '/franchises/with-prestations') {
            return;
        }
        $this->addWhere($queryBuilder, $resourceClass);
    }
    
    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void
    {
        $rootAlias = $queryBuilder->getRootAliases()[0];
        // min one relation with prestations
        $queryBuilder->andWhere("$rootAlias.prestations IS NOT EMPTY");
    }
}