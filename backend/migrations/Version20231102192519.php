<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231102192519 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE client_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE coach_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE company_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE franchise_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE manager_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE prestation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE review_client_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE review_coach_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE schedule_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE slot_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE time_off_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE client (id INT NOT NULL, auth_id INT DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, zip_code VARCHAR(5) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C74404558082819C ON client (auth_id)');
        $this->addSql('CREATE TABLE coach (id INT NOT NULL, auth_id INT NOT NULL, franchise_id INT NOT NULL, biography TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_3F596DCC8082819C ON coach (auth_id)');
        $this->addSql('CREATE INDEX IDX_3F596DCC523CAB89 ON coach (franchise_id)');
        $this->addSql('CREATE TABLE company (id INT NOT NULL, manager_id INT NOT NULL, name VARCHAR(255) NOT NULL, description TEXT DEFAULT NULL, kbis TEXT NOT NULL, is_verified BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_4FBF094F783E3463 ON company (manager_id)');
        $this->addSql('CREATE TABLE franchise (id INT NOT NULL, company_id INT NOT NULL, name VARCHAR(255) NOT NULL, description TEXT DEFAULT NULL, address VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, zip_code VARCHAR(5) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_66F6CE2A979B1AD6 ON franchise (company_id)');
        $this->addSql('CREATE TABLE manager (id INT NOT NULL, auth_id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_FA2425B98082819C ON manager (auth_id)');
        $this->addSql('CREATE TABLE prestation (id INT NOT NULL, franchise_id INT NOT NULL, name VARCHAR(255) NOT NULL, description TEXT DEFAULT NULL, price DOUBLE PRECISION NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_51C88FAD523CAB89 ON prestation (franchise_id)');
        $this->addSql('CREATE TABLE prestation_coach (prestation_id INT NOT NULL, coach_id INT NOT NULL, PRIMARY KEY(prestation_id, coach_id))');
        $this->addSql('CREATE INDEX IDX_FDD2264D9E45C554 ON prestation_coach (prestation_id)');
        $this->addSql('CREATE INDEX IDX_FDD2264D3C105691 ON prestation_coach (coach_id)');
        $this->addSql('CREATE TABLE review_client (id INT NOT NULL, client_id INT NOT NULL, coach_id INT NOT NULL, note INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_4D32439519EB6921 ON review_client (client_id)');
        $this->addSql('CREATE INDEX IDX_4D3243953C105691 ON review_client (coach_id)');
        $this->addSql('CREATE TABLE review_coach (id INT NOT NULL, client_id INT NOT NULL, coach_id INT NOT NULL, note INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_2CD741D719EB6921 ON review_coach (client_id)');
        $this->addSql('CREATE INDEX IDX_2CD741D73C105691 ON review_coach (coach_id)');
        $this->addSql('CREATE TABLE schedule (id INT NOT NULL, coach_id INT NOT NULL, start_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, end_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5A3811FB3C105691 ON schedule (coach_id)');
        $this->addSql('CREATE TABLE slot (id INT NOT NULL, prestation_id INT DEFAULT NULL, time_off_id INT DEFAULT NULL, client_id INT DEFAULT NULL, start_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, end_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_AC0E20679E45C554 ON slot (prestation_id)');
        $this->addSql('CREATE INDEX IDX_AC0E206780A965CA ON slot (time_off_id)');
        $this->addSql('CREATE INDEX IDX_AC0E206719EB6921 ON slot (client_id)');
        $this->addSql('CREATE TABLE time_off (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE time_off_coach (time_off_id INT NOT NULL, coach_id INT NOT NULL, PRIMARY KEY(time_off_id, coach_id))');
        $this->addSql('CREATE INDEX IDX_DE4A11380A965CA ON time_off_coach (time_off_id)');
        $this->addSql('CREATE INDEX IDX_DE4A1133C105691 ON time_off_coach (coach_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('ALTER TABLE client ADD CONSTRAINT FK_C74404558082819C FOREIGN KEY (auth_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE coach ADD CONSTRAINT FK_3F596DCC8082819C FOREIGN KEY (auth_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE coach ADD CONSTRAINT FK_3F596DCC523CAB89 FOREIGN KEY (franchise_id) REFERENCES franchise (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE company ADD CONSTRAINT FK_4FBF094F783E3463 FOREIGN KEY (manager_id) REFERENCES manager (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE franchise ADD CONSTRAINT FK_66F6CE2A979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE manager ADD CONSTRAINT FK_FA2425B98082819C FOREIGN KEY (auth_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FAD523CAB89 FOREIGN KEY (franchise_id) REFERENCES franchise (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE prestation_coach ADD CONSTRAINT FK_FDD2264D9E45C554 FOREIGN KEY (prestation_id) REFERENCES prestation (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE prestation_coach ADD CONSTRAINT FK_FDD2264D3C105691 FOREIGN KEY (coach_id) REFERENCES coach (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE review_client ADD CONSTRAINT FK_4D32439519EB6921 FOREIGN KEY (client_id) REFERENCES client (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE review_client ADD CONSTRAINT FK_4D3243953C105691 FOREIGN KEY (coach_id) REFERENCES coach (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE review_coach ADD CONSTRAINT FK_2CD741D719EB6921 FOREIGN KEY (client_id) REFERENCES client (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE review_coach ADD CONSTRAINT FK_2CD741D73C105691 FOREIGN KEY (coach_id) REFERENCES coach (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE schedule ADD CONSTRAINT FK_5A3811FB3C105691 FOREIGN KEY (coach_id) REFERENCES coach (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT FK_AC0E20679E45C554 FOREIGN KEY (prestation_id) REFERENCES prestation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT FK_AC0E206780A965CA FOREIGN KEY (time_off_id) REFERENCES time_off (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT FK_AC0E206719EB6921 FOREIGN KEY (client_id) REFERENCES client (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE time_off_coach ADD CONSTRAINT FK_DE4A11380A965CA FOREIGN KEY (time_off_id) REFERENCES time_off (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE time_off_coach ADD CONSTRAINT FK_DE4A1133C105691 FOREIGN KEY (coach_id) REFERENCES coach (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE client_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE coach_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE company_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE franchise_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE manager_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE prestation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE review_client_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE review_coach_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE schedule_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE slot_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE time_off_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE client DROP CONSTRAINT FK_C74404558082819C');
        $this->addSql('ALTER TABLE coach DROP CONSTRAINT FK_3F596DCC8082819C');
        $this->addSql('ALTER TABLE coach DROP CONSTRAINT FK_3F596DCC523CAB89');
        $this->addSql('ALTER TABLE company DROP CONSTRAINT FK_4FBF094F783E3463');
        $this->addSql('ALTER TABLE franchise DROP CONSTRAINT FK_66F6CE2A979B1AD6');
        $this->addSql('ALTER TABLE manager DROP CONSTRAINT FK_FA2425B98082819C');
        $this->addSql('ALTER TABLE prestation DROP CONSTRAINT FK_51C88FAD523CAB89');
        $this->addSql('ALTER TABLE prestation_coach DROP CONSTRAINT FK_FDD2264D9E45C554');
        $this->addSql('ALTER TABLE prestation_coach DROP CONSTRAINT FK_FDD2264D3C105691');
        $this->addSql('ALTER TABLE review_client DROP CONSTRAINT FK_4D32439519EB6921');
        $this->addSql('ALTER TABLE review_client DROP CONSTRAINT FK_4D3243953C105691');
        $this->addSql('ALTER TABLE review_coach DROP CONSTRAINT FK_2CD741D719EB6921');
        $this->addSql('ALTER TABLE review_coach DROP CONSTRAINT FK_2CD741D73C105691');
        $this->addSql('ALTER TABLE schedule DROP CONSTRAINT FK_5A3811FB3C105691');
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT FK_AC0E20679E45C554');
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT FK_AC0E206780A965CA');
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT FK_AC0E206719EB6921');
        $this->addSql('ALTER TABLE time_off_coach DROP CONSTRAINT FK_DE4A11380A965CA');
        $this->addSql('ALTER TABLE time_off_coach DROP CONSTRAINT FK_DE4A1133C105691');
        $this->addSql('DROP TABLE client');
        $this->addSql('DROP TABLE coach');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE franchise');
        $this->addSql('DROP TABLE manager');
        $this->addSql('DROP TABLE prestation');
        $this->addSql('DROP TABLE prestation_coach');
        $this->addSql('DROP TABLE review_client');
        $this->addSql('DROP TABLE review_coach');
        $this->addSql('DROP TABLE schedule');
        $this->addSql('DROP TABLE slot');
        $this->addSql('DROP TABLE time_off');
        $this->addSql('DROP TABLE time_off_coach');
        $this->addSql('DROP TABLE "user"');
    }
}
