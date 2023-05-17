-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema craftseeker
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema craftseeker
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `craftseeker` DEFAULT CHARACTER SET utf8mb3 ;
USE `craftseeker` ;

-- -----------------------------------------------------
-- Table `craftseeker`.`clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `craftseeker`.`clients` (
  `clientId` VARCHAR(255) NOT NULL,
  `clientFirstName` VARCHAR(45) NOT NULL,
  `clientAdress` VARCHAR(255) NOT NULL,
  `clientEmail` VARCHAR(45) NOT NULL,
  `clientPhone` VARCHAR(45) NOT NULL,
  `clientDateOfBirth` DATE NOT NULL,
  `clientLastName` VARCHAR(45) NOT NULL,
  `clientPassword` VARCHAR(255) NOT NULL,
  `imageUrl` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`clientId`),
  UNIQUE INDEX `idclients_UNIQUE` (`clientId` ASC) VISIBLE,
  UNIQUE INDEX `clientEmail_UNIQUE` (`clientEmail` ASC) VISIBLE,
  UNIQUE INDEX `clientPhone_UNIQUE` (`clientPhone` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `craftseeker`.`workers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `craftseeker`.`workers` (
  `workersId` VARCHAR(255) NOT NULL,
  `workerFirstName` VARCHAR(45) NOT NULL,
  `workerLastName` VARCHAR(45) NOT NULL,
  `workerAdress` VARCHAR(45) NOT NULL,
  `workerEmail` VARCHAR(45) NOT NULL,
  `workerCategory` VARCHAR(255) NOT NULL,
  `workerDateOfBirth` VARCHAR(45) NOT NULL,
  `workerYearsOfExperience` INT NULL DEFAULT NULL,
  `workerRating` INT NULL DEFAULT NULL,
  `workerPhoneNumber` VARCHAR(45) NOT NULL,
  `workerNumberOfJobs` INT NULL DEFAULT NULL,
  `workerAvailabillity` TINYINT NULL DEFAULT NULL,
  `workerPassword` VARCHAR(255) NOT NULL,
  `workerJob` VARCHAR(255) NOT NULL,
  `workerProfessionalSummary` LONGTEXT NULL DEFAULT NULL,
  `workerTotalRating` INT NULL DEFAULT NULL,
  `workerBio` LONGTEXT NULL DEFAULT NULL,
  `workerHourlyPrice` INT NULL DEFAULT NULL,
  `imageUrl` VARCHAR(255) NULL DEFAULT NULL,
  `worker` INT NULL DEFAULT NULL,
  `activeTask` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`workersId`),
  UNIQUE INDEX `workersId_UNIQUE` (`workersId` ASC) VISIBLE,
  UNIQUE INDEX `workerEmail_UNIQUE` (`workerEmail` ASC) VISIBLE,
  UNIQUE INDEX `workerPhoneNumber_UNIQUE` (`workerPhoneNumber` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `craftseeker`.`chatrooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `craftseeker`.`chatrooms` (
  `roomId` VARCHAR(255) NOT NULL,
  `clientId` VARCHAR(255) NOT NULL,
  `workersId` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`roomId`),
  INDEX `reportsoftheworkers_ibfk_10_idx` (`clientId` ASC) VISIBLE,
  INDEX `reportsoftheworkers_ibfk_20_idx` (`workersId` ASC) VISIBLE,
  CONSTRAINT `reportsoftheworkers_ibfk_10`
    FOREIGN KEY (`clientId`)
    REFERENCES `craftseeker`.`clients` (`clientId`),
  CONSTRAINT `reportsoftheworkers_ibfk_20`
    FOREIGN KEY (`workersId`)
    REFERENCES `craftseeker`.`workers` (`workersId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `craftseeker`.`reportsoftheclients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `craftseeker`.`reportsoftheclients` (
  `clientReportId` INT NOT NULL AUTO_INCREMENT,
  `clientId` VARCHAR(255) NOT NULL,
  `workersId` VARCHAR(255) NOT NULL,
  `clientReportingWorkerTitle` VARCHAR(255) NOT NULL,
  `clientReportingWorkerBody` LONGTEXT NOT NULL,
  `clientReportDate` DATETIME NOT NULL,
  PRIMARY KEY (`clientReportId`),
  INDEX `reportsoftheclients_ibfk_1_idx` (`clientId` ASC) VISIBLE,
  INDEX `reportsoftheclients_ibfk_2_idx` (`workersId` ASC) VISIBLE,
  CONSTRAINT `reportsoftheclients_ibfk_1`
    FOREIGN KEY (`clientId`)
    REFERENCES `craftseeker`.`clients` (`clientId`),
  CONSTRAINT `reportsoftheclients_ibfk_2`
    FOREIGN KEY (`workersId`)
    REFERENCES `craftseeker`.`workers` (`workersId`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `craftseeker`.`reportsoftheworkers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `craftseeker`.`reportsoftheworkers` (
  `workerReportId` INT NOT NULL AUTO_INCREMENT,
  `clientId` VARCHAR(255) NOT NULL,
  `workersId` VARCHAR(255) NOT NULL,
  `workerReportingClientTitle` VARCHAR(255) NOT NULL,
  `workerReportingClientBody` LONGTEXT NOT NULL,
  `workerReportDate` DATETIME NOT NULL,
  PRIMARY KEY (`workerReportId`),
  INDEX `reportsoftheworkers_ibfk_1_idx` (`clientId` ASC) VISIBLE,
  INDEX `reportsoftheworkers_ibfk_2_idx` (`workersId` ASC) VISIBLE,
  CONSTRAINT `reportsoftheworkers_ibfk_1`
    FOREIGN KEY (`clientId`)
    REFERENCES `craftseeker`.`clients` (`clientId`),
  CONSTRAINT `reportsoftheworkers_ibfk_2`
    FOREIGN KEY (`workersId`)
    REFERENCES `craftseeker`.`workers` (`workersId`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `craftseeker`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `craftseeker`.`reviews` (
  `reviewId` INT NOT NULL AUTO_INCREMENT,
  `clients_clientId` VARCHAR(255) NOT NULL,
  `workers_workersId` VARCHAR(255) NOT NULL,
  `reviewText` LONGTEXT NOT NULL,
  `reviewDate` DATETIME NOT NULL,
  PRIMARY KEY (`reviewId`),
  INDEX `reviews_ibfk_1_idx` (`clients_clientId` ASC) VISIBLE,
  INDEX `reviews_ibfk_2_idx` (`workers_workersId` ASC) VISIBLE,
  CONSTRAINT `reviews_ibfk_1`
    FOREIGN KEY (`clients_clientId`)
    REFERENCES `craftseeker`.`clients` (`clientId`),
  CONSTRAINT `reviews_ibfk_2`
    FOREIGN KEY (`workers_workersId`)
    REFERENCES `craftseeker`.`workers` (`workersId`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `craftseeker`.`tasks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `craftseeker`.`tasks` (
  `taskId` INT NOT NULL AUTO_INCREMENT,
  `clients_clientId` VARCHAR(255) NOT NULL,
  `workers_workersId` VARCHAR(255) NOT NULL,
  `taskTitle` VARCHAR(255) NOT NULL,
  `taskText` LONGTEXT NOT NULL,
  `taskDate` DATETIME NOT NULL,
  `taskStatus` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`taskId`),
  INDEX `tasks_ibfk_1_idx` (`clients_clientId` ASC) VISIBLE,
  INDEX `tasks_ibfk_2_idx` (`workers_workersId` ASC) VISIBLE,
  CONSTRAINT `tasks_ibfk_1`
    FOREIGN KEY (`clients_clientId`)
    REFERENCES `craftseeker`.`clients` (`clientId`),
  CONSTRAINT `tasks_ibfk_2`
    FOREIGN KEY (`workers_workersId`)
    REFERENCES `craftseeker`.`workers` (`workersId`))
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
