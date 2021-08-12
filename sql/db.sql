SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE SCHEMA IF NOT EXISTS `tickets` DEFAULT CHARACTER SET latin1 ;
USE `tickets` ;
-- -----------------------------------------------------
-- Table `tickets`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tickets`.`users` ;
CREATE TABLE IF NOT EXISTS `tickets`.`users` (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  email varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  password varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email))
ENGINE=InnoDB;
-- -----------------------------------------------------
-- Table `tickets`.`tickets`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tickets`.`tickets` ;
CREATE TABLE IF NOT EXISTS `tickets`.`tickets` (
  `id` INT(70) NOT NULL AUTO_INCREMENT,
  `user_id` INT(70) NOT NULL,
  `titre` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `tickets_foreign_key`
    FOREIGN KEY (`user_id`)
    REFERENCES `tickets`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;





