<?php
declare(strict_types=1);

namespace App\Filters;

use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\PropertyHelperTrait;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\QueryBuilder;

class CustomSlotDateFilter extends AbstractFilter
{
    use PropertyHelperTrait;

    public const DATE_RANGE = 'date_range';

    public const OPERATIONS = [
        self::DATE_RANGE,
    ];

    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        if (
            !$this->isPropertyEnabled($property, $resourceClass) ||
            !$this->isPropertyMapped($property, $resourceClass)
        ) {
            return;
        }

        $searchParameterName = $queryNameGenerator->generateParameterName($property);
        $type = array_key_first($value);
        $value = $value[$type];

        $alias = current($queryBuilder->getRootAliases());
        $propertyWithAlias = "$alias.$property";
        $expr = $queryBuilder->expr();

        switch ($type) {
            case self::DATE_RANGE:
                $start = $value['start_date'];
                $end = $value['end_date'];

                // Ajout de la vérification de la date de début
                $queryBuilder
                    ->andWhere(
                        $expr->between($propertyWithAlias, ":start_date", ":end_date")
                    )
                    ->andWhere(
                        $expr->between(
                            $propertyWithAlias,
                            ':custom_start_date',
                            ':custom_end_date'
                        )
                    )
                    ->setParameter("start_date", $start)
                    ->setParameter("end_date", $end)
                    ->setParameter("custom_start_date", $this->getCustomStartDate($resourceClass))
                    ->setParameter("custom_end_date", $this->getCustomEndDate($resourceClass));

                break;
            default:
                return;
        }
    }

    public function getDescription(string $resourceClass): array
    {
        $description = [];

        $properties = $this->getProperties();
        if (null === $properties) {
            $properties = array_fill_keys($this->getClassMetadata($resourceClass)->getFieldNames(), null);
        }

        foreach ($properties as $property => $nullManagement) {
            if (!$this->isPropertyMapped($property, $resourceClass)) {
                continue;
            }

            foreach (self::OPERATIONS as $operation) {
                $description += $this->getFilterDescription($property, $operation);
            }
        }

        return $description;
    }

    protected function getFilterDescription(string $property, string $period): array
    {
        $propertyName = $this->normalizePropertyName($property);

        return [
            sprintf('%s[%s]', $propertyName, $period) => [
                'property' => $propertyName,
                'type' => \DateTimeInterface::class,
                'required' => false,
            ],
        ];
    }
}
