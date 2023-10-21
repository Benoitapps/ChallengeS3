<?php

namespace App\Repository;

use App\Entity\ReviewCoach;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ReviewCoach>
 *
 * @method ReviewCoach|null find($id, $lockMode = null, $lockVersion = null)
 * @method ReviewCoach|null findOneBy(array $criteria, array $orderBy = null)
 * @method ReviewCoach[]    findAll()
 * @method ReviewCoach[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReviewCoachRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ReviewCoach::class);
    }

//    /**
//     * @return ReviewCoach[] Returns an array of ReviewCoach objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('r.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ReviewCoach
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
