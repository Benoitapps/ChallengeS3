<?php
// api/src/Doctrine/CurrentUserExtension.php
namespace App\Doctrine\Extensions;

use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use App\Entity\Slot;
use App\Entity\Client;
use App\Entity\Coach;

use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\SecurityBundle\Security;
class CurrentUserSlotExtension implements QueryCollectionExtensionInterface
{
    public function __construct(private readonly Security $security)
    {
    }
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        $user = $this->security->getUser();
        if (Slot::class !== $resourceClass || $this->security->isGranted('ROLE_ADMIN') || null === $user) {
            return;
        }

        if ($this->security->isGranted('ROLE_COACH')) {
            $coach = $user->getCoach();
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere(sprintf('%s.coach = :current_user',$rootAlias));
            $queryBuilder->setParameter('current_user',  $coach->getId());
        }
        else{
            $client = $user->getClient();
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere(sprintf('%s.client = :current_user',$rootAlias));
            $queryBuilder->setParameter('current_user',  $client->getId());
        }

    }
}
