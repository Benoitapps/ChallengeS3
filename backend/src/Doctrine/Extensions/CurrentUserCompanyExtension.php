<?php
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
class CurrentUserCompanyExtension implements QueryItemExtensionInterface
{
    public function __construct(private readonly Security $security)
    {
    }
    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, Operation $operation = null, array $context = []): void
    {
        $user = $this->security->getUser();
        if (Company::class !== $resourceClass) {
            return;
        }

        if (!($operation->getName() === 'GetMyCompany' && $this->security->isGranted('ROLE_MANAGER'))) {
           return;
        }

        $manager = $user->getManager();
        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere(sprintf('%s.manager = :current_user_manager',$rootAlias));
        $queryBuilder->setParameter('current_user_manager',  $manager->getId());

    }


}
