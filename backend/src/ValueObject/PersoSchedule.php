<?php

declare(strict_types=1);

namespace App\ValueObject;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
//use App\Processor\ColorStateProcessor;
use App\Controller\ScheduleController;
use App\Entity\Coach;
use App\Provider\TradProvider;
use DateTimeInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Validator\ContainsSchedulePerso as ContainsSchedulePerso;

#[ApiResource(
    normalizationContext: ['groups' => ['ShedulePerso:read']],
    operations: [
        new Post(
            controller: ScheduleController::class,
            denormalizationContext: ['groups' => ['ShedulePerso:write']],
//            security: "is_granted('ROLE_MANAGER') and object.getCoach().getFranchise.getCompany().getId() === user.getCompany().getId()",

        )
    ]
)]

#[ContainsSchedulePerso]
class PersoSchedule
{
    public function __construct(
        protected DateTimeInterface $dateStart,
        protected DateTimeInterface $dateEnd,
        protected DateTimeInterface $dateTimeStart,
        protected DateTimeInterface $dateTimeEnd,
        protected Coach $coach

    ) {}

    /**
     * @return DateTimeInterface
     */
    #[Groups(['ShedulePerso:read'])]
    public function getDateStart(): DateTimeInterface
    {
        return $this->dateStart;
    }

    /**
     * @param DateTimeInterface $dateStart
     */
    #[Groups(['ShedulePerso:write'])]
    public function setDateStart(DateTimeInterface $dateStart): void
    {
        $this->dateStart = $dateStart;
    }

    /**
     * @return DateTimeInterface
     */
    #[Groups(['ShedulePerso:read'])]
    public function getDateEnd(): DateTimeInterface
    {
        return $this->dateEnd;
    }

    /**
     * @param DateTimeInterface $dateEnd
     */
    #[Groups(['ShedulePerso:write'])]
    public function setDateEnd(DateTimeInterface $dateEnd): void
    {
        $this->dateEnd = $dateEnd;
    }

    /**
     * @return DateTimeInterface
     */
    #[Groups(['ShedulePerso:read'])]
    public function getDateTimeStart(): DateTimeInterface
    {
        return $this->dateTimeStart;
    }

    /**
     * @param DateTimeInterface $dateTimeStart
     */
    #[Groups(['ShedulePerso:write'])]
    public function setDateTimeStart(DateTimeInterface $dateTimeStart): void
    {
        $this->dateTimeStart = $dateTimeStart;
    }

    /**
     * @return DateTimeInterface
     */
    #[Groups(['ShedulePerso:read'])]
    public function getDateTimeEnd(): DateTimeInterface
    {
        return $this->dateTimeEnd;
    }

    /**
     * @param DateTimeInterface $dateTimeEnd
     */
    #[Groups(['ShedulePerso:write'])]
    public function setDateTimeEnd(DateTimeInterface $dateTimeEnd): void
    {
        $this->dateTimeEnd = $dateTimeEnd;
    }

    /**
     * @return Coach
     */
    #[Groups(['ShedulePerso:read'])]
    public function getCoach(): Coach
    {
        return $this->coach;
    }

    /**
     * @param Coach $coach
     */
    #[Groups(['ShedulePerso:write'])]
    public function setCoach(Coach $coach): void
    {
        $this->coach = $coach;
    }








}
