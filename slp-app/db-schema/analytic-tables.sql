-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: 172.31.143.93    Database: spsdb_sg
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.16.04.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `eventLog`
--

DROP TABLE IF EXISTS `eventLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eventLog` (
  `eventLogId` int(11) NOT NULL AUTO_INCREMENT,
  `senderId` varchar(45) NOT NULL,
  `sensorId` varchar(45) NOT NULL,
  `lightSN` char(10) NOT NULL,
  `blockNO` char(10) NOT NULL,
  `eventId` varchar(45) NOT NULL,
  `eventType` varchar(45) NOT NULL,
  `parameters` varchar(512) DEFAULT NULL,
  `userId` varchar(45) DEFAULT NULL,
  `serverDateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`eventLogId`),
  UNIQUE KEY `uniqueKey` (`senderId`,`sensorId`,`eventId`,`eventType`,`parameters`,`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=10193912 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `motionDetect`
--

DROP TABLE IF EXISTS `motionDetect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motionDetect` (
  `motionDetectId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `detectedStatus` tinyint(3) unsigned NOT NULL,
  `reportDateTime` datetime DEFAULT NULL,
  `serverDateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `lightSN` char(10) DEFAULT NULL,
  `blockNO` char(10) DEFAULT NULL,
  PRIMARY KEY (`motionDetectId`),
  UNIQUE KEY `uniqueKey` (`detectedStatus`,`reportDateTime`,`lightSN`,`blockNO`),
  KEY `lightId` (`motionDetectId`)
) ENGINE=InnoDB AUTO_INCREMENT=1993381 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `photoSensor`
--

DROP TABLE IF EXISTS `photoSensor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photoSensor` (
  `currentLevelId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `photosensorLevel` int(10) NOT NULL,
  `reportDateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `serverDateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `lightSN` char(10) DEFAULT NULL,
  `blockNO` char(10) DEFAULT NULL,
  PRIMARY KEY (`currentLevelId`),
  UNIQUE KEY `uniqueKey` (`photosensorLevel`,`reportDateTime`,`lightSN`,`blockNO`),
  KEY `lightId` (`currentLevelId`)
) ENGINE=InnoDB AUTO_INCREMENT=431768 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pirDetect`
--

DROP TABLE IF EXISTS `pirDetect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pirDetect` (
  `lightId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `detectedStatus` tinyint(3) unsigned NOT NULL,
  `reportDateTime` datetime DEFAULT NULL,
  `serverDateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `lightSN` char(10) DEFAULT NULL,
  `blockId` char(10) DEFAULT NULL,
  KEY `lightId` (`lightId`)
) ENGINE=InnoDB AUTO_INCREMENT=2471337 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `currentLevel`
--

DROP TABLE IF EXISTS `currentLevel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currentLevel` (
  `currentLevelId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `currentLevel` int(10) unsigned NOT NULL,
  `reportDateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `serverDateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `lightSN` char(10) DEFAULT NULL,
  `blockNO` char(10) DEFAULT NULL,
  PRIMARY KEY (`currentLevelId`),
  UNIQUE KEY `uniqueKey` (`currentLevel`,`reportDateTime`,`lightSN`,`blockNO`),
  KEY `lightId` (`currentLevelId`)
) ENGINE=InnoDB AUTO_INCREMENT=4154019 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`spsclient`@`%`*/ /*!50003 TRIGGER `spsdb_sg`.`currentLevel_AFTER_INSERT` AFTER INSERT ON `currentLevel` FOR EACH ROW
BEGIN
UPDATE smartLight SET reportDateTime = NEW.reportDateTime, isOnline = NEW.currentLevel WHERE displayName=NEW.lightSN AND 
blockId=(SELECT blockId FROM block WHERE blockNO = NEW.blockNO LIMIT 1) AND lightId <> 0;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `pwmCurrentLevel`
--

DROP TABLE IF EXISTS `pwmCurrentLevel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pwmCurrentLevel` (
  `lightId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `currentLevel` tinyint(3) unsigned NOT NULL,
  `reportDateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `serverDateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `lightSN` char(10) DEFAULT NULL,
  `blockId` char(10) DEFAULT NULL,
  KEY `lightId` (`lightId`)
) ENGINE=InnoDB AUTO_INCREMENT=5119699 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `energyConsumption`
--

DROP TABLE IF EXISTS `energyConsumption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `energyConsumption` (
  `energyConsumptionId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `energyConsumed` decimal(19,4) NOT NULL,
  `reportDateTime` datetime NOT NULL,
  `lightSN` char(10) DEFAULT NULL,
  `blockNO` char(10) DEFAULT NULL,
  PRIMARY KEY (`energyConsumptionId`),
  UNIQUE KEY `uniqueKey` (`energyConsumed`,`reportDateTime`,`lightSN`,`blockNO`),
  KEY `lightId` (`energyConsumptionId`)
) ENGINE=InnoDB AUTO_INCREMENT=5963518 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `energyConsumptionDay`
--

DROP TABLE IF EXISTS `energyConsumptionDay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `energyConsumptionDay` (
  `energyConsumptionDayId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dataType` tinyint(3) DEFAULT NULL,
  `dataId` int(10) DEFAULT NULL,
  `hourEnergy1` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy2` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy3` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy4` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy5` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy6` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy7` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy8` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy9` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy10` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy11` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy12` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy13` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy14` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy15` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy16` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy17` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy18` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy19` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy20` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy21` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy22` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy23` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `hourEnergy24` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `reportDate` date NOT NULL,
  PRIMARY KEY (`energyConsumptionDayId`),
  UNIQUE KEY `unique_key` (`dataType`,`dataId`,`reportDate`),
  KEY `communityId` (`energyConsumptionDayId`)
) ENGINE=InnoDB AUTO_INCREMENT=13407663 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `energyConsumptionMonth`
--

DROP TABLE IF EXISTS `energyConsumptionMonth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `energyConsumptionMonth` (
  `energyConsumptionMonthId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dataType` tinyint(3) DEFAULT NULL,
  `dataId` int(10) DEFAULT NULL,
  `dayEnergy1` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy2` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy3` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy4` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy5` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy6` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy7` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy8` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy9` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy10` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy11` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy12` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy13` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy14` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy15` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy16` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy17` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy18` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy19` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy20` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy21` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy22` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy23` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy24` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy25` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy26` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy27` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy28` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `dayEnergy29` decimal(19,4) DEFAULT '0.0000',
  `dayEnergy30` decimal(19,4) DEFAULT '0.0000',
  `dayEnergy31` decimal(19,4) DEFAULT '0.0000',
  `reportMonth` int(10) NOT NULL,
  `reportYear` year(4) NOT NULL,
  PRIMARY KEY (`energyConsumptionMonthId`),
  UNIQUE KEY `unique_key` (`dataType`,`dataId`,`reportMonth`,`reportYear`),
  KEY `communityId` (`energyConsumptionMonthId`)
) ENGINE=InnoDB AUTO_INCREMENT=10242688 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `energyConsumptionYear`
--

DROP TABLE IF EXISTS `energyConsumptionYear`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `energyConsumptionYear` (
  `energyConsumptionYearId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dataType` tinyint(3) DEFAULT NULL,
  `dataId` int(10) DEFAULT NULL,
  `monthEnergy1` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `monthEnergy2` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `monthEnergy3` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `monthEnergy4` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `monthEnergy5` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `monthEnergy6` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `monthEnergy7` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `monthEnergy8` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `monthEnergy9` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `monthEnergy10` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `monthEnergy11` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `monthEnergy12` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `reportYear` year(4) NOT NULL,
  PRIMARY KEY (`energyConsumptionYearId`),
  UNIQUE KEY `unique_key` (`dataType`,`dataId`,`reportYear`),
  KEY `communityId` (`energyConsumptionYearId`)
) ENGINE=InnoDB AUTO_INCREMENT=10242682 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-10  2:48:03
