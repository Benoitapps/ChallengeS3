<?php
// api/src/Doctrine/CurrentUserExtension.php
namespace App\Doctrine\Extensions;

use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use App\Entity\Franchise;
use App\Entity\Manager;
use App\Entity\Company;

use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\SecurityBundle\Security;
class CurrentUserFranchiseExtension implements QueryCollectionExtensionInterface
{
    public function __construct(private readonly Security $security)
    {
    }
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        $user = $this->security->getUser();
        if (Franchise::class !== $resourceClass || $this->security->isGranted('ROLE_ADMIN') || null === $user) {
            return;
        }

        if ($this->security->isGranted('ROLE_MANAGER')) {
            $manager = $user->getManager();
            $company = $manager->getCompany();
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere(sprintf('%s.company = :current_user_company',$rootAlias));
            $queryBuilder->setParameter('current_user_company',  $company->getId());
        }

    }


}
