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
  id int(70) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  email varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  password varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `titre` VARCHAR(255) NULL,
  `description` VARCHAR(255) NULL,
  `status` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `tickets_foreign_key`
    FOREIGN KEY (`user_id`)
    REFERENCES `tickets`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `tickets`.`comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tickets`.`comments` ;
CREATE TABLE IF NOT EXISTS `tickets`.`comments` (
  `id` INT(70) NOT NULL AUTO_INCREMENT,
  `user_id` INT(70) NOT NULL,
  `ticket_id` INT(70) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `comments_foreign_key`
    FOREIGN KEY (`user_id`)
    REFERENCES `tickets`.`users` (`id`),
    FOREIGN KEY (`ticket_id`)
    REFERENCES `tickets`.`tickets` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

        INSERT INTO users (name, email, password) VALUES ('frfrfr', 'frfr@frfr.frfr', '$2b$10$xtMX5ORGsnUDz82hKKqknuW97K7W.H6JxR7c3ezgrrS1nDNgd7Y4W');
        INSERT INTO users (name, email, password) VALUES ('dedede', 'dede@dede.dede', '$2b$10$WTOditCTgSuJcffrbId/e.7nZcj2XR.VNnk56FwliaEWFTvjN3FzW');


        INSERT INTO tickets (user_id, titre, description, status) VALUES (1,'Ticket - 1','Ticket: display a list of users','todo');
        INSERT INTO tickets (user_id, titre, description, status) VALUES (1,'Ticket - 2','Ticket: delete one user from table','done');
        INSERT INTO tickets (user_id, titre, description, status) VALUES (2,'Ticket - 1','Ticket: edit two users from table','wip');

        INSERT INTO comments (user_id, ticket_id, description) VALUES (1, 1, 'Comment for list of users - add please one user in table');
        INSERT INTO comments (user_id, ticket_id, description) VALUES (1, 1, 'Comment for list of users - delete please two users from table');
        INSERT INTO comments (user_id, ticket_id, description) VALUES (1, 1, 'Comment for list of users - edit please one user from table')

        INSERT INTO comments (user_id, ticket_id, description) VALUES (1, 2, 'Comment for list of users - add please one user in table')
        INSERT INTO comments (user_id, ticket_id, description) VALUES (1, 2, 'Comment for list of users - delete please two users from table')
        INSERT INTO comments (user_id, ticket_id, description) VALUES (1, 2, 'Comment for list of users - edit please one user from table')



