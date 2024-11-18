-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.0 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for akio
DROP DATABASE IF EXISTS `akio-db`;
CREATE DATABASE IF NOT EXISTS `akio-db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `akio-db`;

-- Dumping structure for table akio.authorities
DROP TABLE IF EXISTS `authorities`;
CREATE TABLE IF NOT EXISTS `authorities` (
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `authority` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table akio.authorities: ~5 rows (approximately)
INSERT INTO `authorities` (`username`, `authority`) VALUES
	('Ira', 'ROLE_EMPLOYEE'),
	('Ira', 'ROLE_SUPERUSER'),
	('user', 'ROLE_EMPLOYEE'),
	('Alex', 'ROLE_ADMIN');

-- Dumping structure for table akio.expenses
DROP TABLE IF EXISTS `expenses`;
CREATE TABLE IF NOT EXISTS `expenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `source` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `dest` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `due_day` int DEFAULT NULL,
  `amount` bigint DEFAULT NULL,
  `percent` float DEFAULT NULL,
  `description` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `container_idx` (`source`,`dest`),
  KEY `container_idx1` (`dest`),
  CONSTRAINT `dest` FOREIGN KEY (`dest`) REFERENCES `money_containers` (`container`),
  CONSTRAINT `source` FOREIGN KEY (`source`) REFERENCES `money_containers` (`container`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table akio.expenses: ~10 rows (approximately)
INSERT INTO `expenses` (`id`, `source`, `dest`, `due_day`, `amount`, `percent`, `description`) VALUES
	(1, 'bank', 'expenses', NULL, NULL, 0.023, 'bank fee'),
	(2, 'bank', 'expenses', 31, NULL, 0.04, 'tax'),
	(3, 'bank', 'expenses', 1, 1600, NULL, 'JKH'),
	(4, 'bank', 'expenses', 20, 3500, NULL, 'heating'),
	(5, 'bank', 'expenses', 20, 3000, NULL, 'electricity'),
	(6, 'bank', 'expenses', 20, 300, NULL, 'water'),
	(7, 'bank', 'expenses', 1, 2800, NULL, 'Soft-logic\'s software'),
	(8, 'safe', 'expenses', 1, 4000, NULL, 'bonus for Ira'),
	(9, 'outflow', 'Ira', 1, 4000, NULL, 'monthly bonus'),
	(10, 'bank', 'expenses', 20, 150, NULL, 'trash');

-- Dumping structure for table akio.money_containers
DROP TABLE IF EXISTS `money_containers`;
CREATE TABLE IF NOT EXISTS `money_containers` (
  `container` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  `min_balance` decimal(10,2) DEFAULT NULL,
  `access_level` int NOT NULL,
  PRIMARY KEY (`container`),
  UNIQUE KEY `cash_container_name_UNIQUE` (`container`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table akio.money_containers: ~11 rows (approximately)
INSERT INTO `money_containers` (`container`, `balance`, `min_balance`, `access_level`) VALUES
	('Alex', 0.00, 0.00, 1),
	('Ira', 0.00, NULL, 1),
	('bank', 0.00, NULL, 3),
	('clients', 0.00, NULL, 2),
	('expenses', 0.00, NULL, 3),
	('outflow', 0.00, NULL, 1),
	('safe', 0.00, 0.00, 2),
	('terminal', 0.00, 0.00, 2),
	('user', 0.00, NULL, 1),
	('wallet', 0.00, NULL, 1);

-- Dumping structure for table akio.money_containers_log
DROP TABLE IF EXISTS `money_containers_log`;
CREATE TABLE IF NOT EXISTS `money_containers_log` (
  `timestamp` datetime NOT NULL,
  `container` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  PRIMARY KEY (`container`,`timestamp`),
  KEY `container_idx` (`container`),
  CONSTRAINT `container` FOREIGN KEY (`container`) REFERENCES `money_containers` (`container`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping structure for table akio.money_flow
DROP TABLE IF EXISTS `money_flow`;
CREATE TABLE IF NOT EXISTS `money_flow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `receipt_num` int DEFAULT NULL,
  `time_stamp` datetime NOT NULL,
  `source` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `dest` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `description` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `initiator` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7376 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping structure for table akio.sixhaircut
DROP TABLE IF EXISTS `sixhaircut`;
CREATE TABLE IF NOT EXISTS `sixhaircut` (
  `start_date_time` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`start_date_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table akio.sixhaircut: ~2 rows (approximately)
INSERT INTO `sixhaircut` (`start_date_time`, `price`) VALUES
	('2023-08-12 13:27:00', 300.00),
	('2024-07-30 12:30:00', 350.00);

-- Dumping structure for table akio.transactions
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_time` datetime NOT NULL,
  `finished` tinyint(1) NOT NULL,
  `receipt_num` int NOT NULL,
  `phone_num` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `has_free_haircut` tinyint(1) NOT NULL,
  `money_accepted` decimal(10,2) NOT NULL,
  `money_posted` decimal(10,2) NOT NULL,
  `payment_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `services` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `employee` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_date_receipt` (`date_time`,`receipt_num`)
) ENGINE=InnoDB AUTO_INCREMENT=4159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping structure for table akio.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table akio.users: ~4 rows (approximately)
INSERT INTO `users` (`username`, `password`, `enabled`) VALUES
	('Alex', 'BCrypt 10iter', 1),
	('Ira', 'BCrypt 10iter', 1),
	('user', 'BCrypt 10iter', 1);

-- Dumping structure for table akio.work_schedule
DROP TABLE IF EXISTS `work_schedule`;
CREATE TABLE IF NOT EXISTS `work_schedule` (
  `date` date NOT NULL,
  `employee` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`date`,`employee`),
  KEY `master_idx` (`employee`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping structure for trigger akio.users_AFTER_INSERT
DROP TRIGGER IF EXISTS `users_AFTER_INSERT`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO';
DELIMITER //
CREATE TRIGGER `users_AFTER_INSERT` AFTER INSERT ON `users` FOR EACH ROW BEGIN
	INSERT INTO `akio-db`.`money_containers` VALUES (NEW.username, 0, 0,1);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger akio.users_BEFORE_DELETE
DROP TRIGGER IF EXISTS `users_BEFORE_DELETE`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `users_BEFORE_DELETE` BEFORE DELETE ON `users` FOR EACH ROW BEGIN
	DELETE FROM `akio-db`.`money_containers` WHERE (`container` = OLD.username);
    DELETE FROM  `akio-db`.`authorities` WHERE (`username` = OLD.username);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
