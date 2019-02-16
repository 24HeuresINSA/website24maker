-- MySQL dump 10.13  Distrib 5.7.22, for Win64 (x86_64)
--
-- Host: localhost    Database: db_courses
-- ------------------------------------------------------
-- Server version	5.7.22-log

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
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorie` (
  `categorie_id` varchar(128) NOT NULL,
  `categorie_nom` varchar(45) NOT NULL,
  `categorie_description` varchar(512) DEFAULT NULL,
  `categorie_nb_max` int(11) DEFAULT NULL,
  `categorie_type` varchar(15) DEFAULT NULL,
  `categorie_nb_total` int(11) DEFAULT NULL,
  `categorie_prix_normal` double DEFAULT NULL,
  `categorie_prix_va` double DEFAULT NULL,
  `categorie_complet` tinyint(4) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`categorie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie`
--

LOCK TABLES `categorie` WRITE;
/*!40000 ALTER TABLE `categorie` DISABLE KEYS */;
INSERT INTO `categorie` VALUES ('2bf600f1-9ff5-49ab-ac7f-a8d6c0720b39','TRIATHLON - Solo','4h de natation, 14h de vélo et 6h de course à pied seul',1,'TRIATHLON',NULL,25,20,NULL,'2019-02-10 14:41:13','2019-02-10 14:31:10'),('43c33381-e002-4ec3-9e89-c1ceef0cbd58','VELO - Solo','24h de courses à vélo seul',1,'VELO',NULL,20,15,NULL,'2019-02-10 14:25:51','2019-02-10 14:25:51'),('57ef6c74-f737-44bb-9316-12fda5ff18d9','VELO - Equipe','24h de courses à vélo par équipe de 2 à 4',4,'VELO',NULL,15,10,NULL,'2019-02-10 14:26:29','2019-02-10 14:26:29'),('9b15e78d-c072-4aa6-abf6-f38d9210cf09','TRIATHLON - Equipe','4h de natation, 14h de vélo et 6h de course à pied par équipe de 2 à 4',4,'TRIATHLON',NULL,20,15,NULL,'2019-02-10 14:31:44','2019-02-10 14:31:44'),('b360c745-165d-44fb-9b1d-b3b5bfb84f3d','TRIATHLON - Loisir','4h de natation, 14h de vélo et 6h de course à pied par équipe de 2 à 12',12,'TRIATHLON',NULL,15,10,NULL,'2019-02-10 14:32:13','2019-02-10 14:32:13'),('bb2413fb-e19f-486e-bd9b-08080be1ee77','COURSE A PIED - Loisir','24h de course à pied par équipe de 2 à 12',12,'COURSE A PIED',NULL,12,8,NULL,'2019-02-10 14:28:15','2019-02-10 14:28:15'),('c22a1732-36f6-4ed7-b161-98cf3ec72997','VELO - Loisir','24h de courses à vélo par équipe de 2 à 12',1,'VELO',NULL,12,8,NULL,'2019-02-10 14:27:36','2019-02-10 14:27:36'),('d4a30378-6b2c-4d40-bd8c-c1d98fde7834','COURSE A PIED - Solo','24h de course à pied seul',1,'COURSE A PIED',NULL,20,15,NULL,'2019-02-10 14:28:58','2019-02-10 14:28:58'),('f7aa2e25-30f6-46b8-8cc3-0c7152ef4204','COURSE A PIED - Equipe','24h de course à pied par équipe de 2 à 4',4,'COURSE A PIED',NULL,15,10,NULL,'2019-02-10 14:28:38','2019-02-10 14:28:38');
/*!40000 ALTER TABLE `categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coureur`
--

DROP TABLE IF EXISTS `coureur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coureur` (
  `coureur_id` varchar(128) COLLATE utf8_bin NOT NULL,
  `coureur_prenom` varchar(45) COLLATE utf8_bin NOT NULL,
  `coureur_nom` varchar(45) COLLATE utf8_bin NOT NULL,
  `coureur_date_naissance` date NOT NULL,
  `coureur_equipe` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `coureur_etudiant` tinyint(4) DEFAULT '0',
  `coureur_certificat` blob,
  `coureur_certificat_valide` tinyint(4) DEFAULT '0',
  `coureur_paiement` tinyint(4) DEFAULT '0',
  `coureur_taille_tee_shirt` varchar(2) COLLATE utf8_bin DEFAULT NULL,
  `coureur_commentaire` varchar(512) COLLATE utf8_bin DEFAULT NULL,
  `coureur_telephone` varchar(15) COLLATE utf8_bin DEFAULT NULL,
  `coureur_email` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`coureur_id`),
  KEY `FK_coureur_equipe_idx` (`coureur_equipe`),
  CONSTRAINT `FK_coureur_equipe` FOREIGN KEY (`coureur_equipe`) REFERENCES `equipe` (`equipe_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coureur`
--

LOCK TABLES `coureur` WRITE;
/*!40000 ALTER TABLE `coureur` DISABLE KEYS */;
/*!40000 ALTER TABLE `coureur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipe`
--

DROP TABLE IF EXISTS `equipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipe` (
  `equipe_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `equipe_nom` varchar(45) DEFAULT NULL,
  `equipe_mdp` varchar(512) DEFAULT NULL,
  `equipe_categorie` varchar(128) DEFAULT NULL,
  `equipe_valide` tinyint(4) DEFAULT '0',
  `equipe_sel` varchar(512) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`equipe_id`),
  KEY `equipe_categorie_FK_idx` (`equipe_categorie`),
  CONSTRAINT `FK_equipe_categorie` FOREIGN KEY (`equipe_categorie`) REFERENCES `categorie` (`categorie_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipe`
--

LOCK TABLES `equipe` WRITE;
/*!40000 ALTER TABLE `equipe` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipe` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-10 22:58:46
