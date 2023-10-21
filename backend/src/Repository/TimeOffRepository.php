<?php

namespace App\Repository;

use App\Entity\TimeOff;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TimeOff>
 *
 * @method TimeOff|null find($id, $lockMode = null, $lockVersion = null)
 * @method TimeOff|null findOneBy(array $criteria, array $orderBy = null)
 * @method TimeOff[]    findAll()
 * @method TimeOff[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TimeOffRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TimeOff::class);
    }

//    /**
//     * @return TimeOff[] Returns an array of TimeOff objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?TimeOff
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
