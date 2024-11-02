-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: realcartelera
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asiento`
--

DROP TABLE IF EXISTS `asiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asiento` (
  `id_asiento` bigint NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `id_sala` bigint DEFAULT NULL,
  PRIMARY KEY (`id_asiento`),
  KEY `FKkso89jvvxam6yl0nt5qfyg1rp` (`id_sala`),
  CONSTRAINT `FKkso89jvvxam6yl0nt5qfyg1rp` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id_sala`)
) ENGINE=InnoDB AUTO_INCREMENT=351 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asiento`
--

LOCK TABLES `asiento` WRITE;
/*!40000 ALTER TABLE `asiento` DISABLE KEYS */;
INSERT INTO `asiento` VALUES (1,'habilitado','A-1',2),(2,'habilitado','A-5',3),(3,'habilitado','B-5',1),(4,'habilitado','A-1',1),(5,'habilitado','A-2',1),(6,'habilitado','A-3',1),(7,'habilitado','A-4',1),(8,'habilitado','A-5',1),(9,'habilitado','A-6',1),(10,'habilitado','A-7',1),(11,'habilitado','A-8',1),(12,'habilitado','A-9',1),(13,'habilitado','A-10',1),(14,'habilitado','B-1',1),(15,'habilitado','B-2',1),(16,'habilitado','B-3',1),(17,'habilitado','B-4',1),(18,'habilitado','B-6',1),(19,'habilitado','B-7',1),(20,'habilitado','B-8',1),(21,'habilitado','B-9',1),(22,'habilitado','B-10',1),(23,'habilitado','C-1',1),(24,'habilitado','C-2',1),(25,'habilitado','C-3',1),(26,'habilitado','C-4',1),(27,'habilitado','C-5',1),(28,'habilitado','C-6',1),(29,'habilitado','C-7',1),(30,'habilitado','C-8',1),(31,'habilitado','C-9',1),(32,'habilitado','C-10',1),(33,'habilitado','D-1',1),(34,'habilitado','D-2',1),(35,'habilitado','D-3',1),(36,'habilitado','D-4',1),(37,'habilitado','D-5',1),(38,'habilitado','D-6',1),(39,'habilitado','D-7',1),(40,'habilitado','D-8',1),(41,'habilitado','D-9',1),(42,'habilitado','D-10',1),(43,'habilitado','E-1',1),(44,'habilitado','E-2',1),(45,'habilitado','E-3',1),(46,'habilitado','E-4',1),(47,'habilitado','E-5',1),(48,'habilitado','E-6',1),(49,'habilitado','E-7',1),(50,'habilitado','E-8',1),(51,'habilitado','E-9',1),(52,'habilitado','E-10',1),(53,'habilitado','F-1',1),(54,'habilitado','F-2',1),(55,'habilitado','F-3',1),(56,'habilitado','F-4',1),(57,'habilitado','F-5',1),(58,'habilitado','F-6',1),(59,'habilitado','F-7',1),(60,'habilitado','F-8',1),(61,'habilitado','F-9',1),(62,'habilitado','F-10',1),(63,'habilitado','G-1',1),(64,'habilitado','G-2',1),(65,'habilitado','G-3',1),(66,'habilitado','G-4',1),(67,'habilitado','G-5',1),(68,'habilitado','G-6',1),(69,'habilitado','G-7',1),(70,'habilitado','G-8',1),(71,'habilitado','G-9',1),(72,'habilitado','G-10',1),(73,'habilitado','A-2',2),(74,'habilitado','A-3',2),(75,'habilitado','A-4',2),(76,'habilitado','A-5',2),(77,'habilitado','A-6',2),(78,'habilitado','A-7',2),(79,'habilitado','A-8',2),(80,'habilitado','A-9',2),(81,'habilitado','A-10',2),(82,'habilitado','B-1',2),(83,'habilitado','B-2',2),(84,'habilitado','B-3',2),(85,'habilitado','B-4',2),(86,'habilitado','B-5',2),(87,'habilitado','B-6',2),(88,'habilitado','B-7',2),(89,'habilitado','B-8',2),(90,'habilitado','B-9',2),(91,'habilitado','B-10',2),(92,'habilitado','C-1',2),(93,'habilitado','C-2',2),(94,'habilitado','C-3',2),(95,'habilitado','C-4',2),(96,'habilitado','C-5',2),(97,'habilitado','C-6',2),(98,'habilitado','C-7',2),(99,'habilitado','C-8',2),(100,'habilitado','C-9',2),(101,'habilitado','C-10',2),(102,'habilitado','D-1',2),(103,'habilitado','D-2',2),(104,'habilitado','D-3',2),(105,'habilitado','D-4',2),(106,'habilitado','D-5',2),(107,'habilitado','D-6',2),(108,'habilitado','D-7',2),(109,'habilitado','D-8',2),(110,'habilitado','D-9',2),(111,'habilitado','D-10',2),(112,'habilitado','E-1',2),(113,'habilitado','E-2',2),(114,'habilitado','E-3',2),(115,'habilitado','E-4',2),(116,'habilitado','E-5',2),(117,'habilitado','E-6',2),(118,'habilitado','E-7',2),(119,'habilitado','E-8',2),(120,'habilitado','E-9',2),(121,'habilitado','E-10',2),(122,'habilitado','F-1',2),(123,'habilitado','F-2',2),(124,'habilitado','F-3',2),(125,'habilitado','F-4',2),(126,'habilitado','F-5',2),(127,'habilitado','F-6',2),(128,'habilitado','F-7',2),(129,'habilitado','F-8',2),(130,'habilitado','F-9',2),(131,'habilitado','F-10',2),(132,'habilitado','G-1',2),(133,'habilitado','G-2',2),(134,'habilitado','G-3',2),(135,'habilitado','G-4',2),(136,'habilitado','G-5',2),(137,'habilitado','G-6',2),(138,'habilitado','G-7',2),(139,'habilitado','G-8',2),(140,'habilitado','G-9',2),(141,'habilitado','G-10',2),(142,'habilitado','A-1',3),(143,'habilitado','A-2',3),(144,'habilitado','A-3',3),(145,'habilitado','A-4',3),(146,'habilitado','A-6',3),(147,'habilitado','A-7',3),(148,'habilitado','A-8',3),(149,'habilitado','A-9',3),(150,'habilitado','A-10',3),(151,'habilitado','B-1',3),(152,'habilitado','B-2',3),(153,'habilitado','B-3',3),(154,'habilitado','B-4',3),(155,'habilitado','B-5',3),(156,'habilitado','B-6',3),(157,'habilitado','B-7',3),(158,'habilitado','B-8',3),(159,'habilitado','B-9',3),(160,'habilitado','B-10',3),(161,'habilitado','C-1',3),(162,'habilitado','C-2',3),(163,'habilitado','C-3',3),(164,'habilitado','C-4',3),(165,'habilitado','C-5',3),(166,'habilitado','C-6',3),(167,'habilitado','C-7',3),(168,'habilitado','C-8',3),(169,'habilitado','C-9',3),(170,'habilitado','C-10',3),(171,'habilitado','D-1',3),(172,'habilitado','D-2',3),(173,'habilitado','D-3',3),(174,'habilitado','D-4',3),(175,'habilitado','D-5',3),(176,'habilitado','D-6',3),(177,'habilitado','D-7',3),(178,'habilitado','D-8',3),(179,'habilitado','D-9',3),(180,'habilitado','D-10',3),(181,'habilitado','E-1',3),(182,'habilitado','E-2',3),(183,'habilitado','E-3',3),(184,'habilitado','E-4',3),(185,'habilitado','E-5',3),(186,'habilitado','E-6',3),(187,'habilitado','E-7',3),(188,'habilitado','E-8',3),(189,'habilitado','E-9',3),(190,'habilitado','E-10',3),(191,'habilitado','F-1',3),(192,'habilitado','F-2',3),(193,'habilitado','F-3',3),(194,'habilitado','F-4',3),(195,'habilitado','F-5',3),(196,'habilitado','F-6',3),(197,'habilitado','F-7',3),(198,'habilitado','F-8',3),(199,'habilitado','F-9',3),(200,'habilitado','F-10',3),(201,'habilitado','G-1',3),(202,'habilitado','G-2',3),(203,'habilitado','G-3',3),(204,'habilitado','G-4',3),(205,'habilitado','G-5',3),(206,'habilitado','G-6',3),(207,'habilitado','G-7',3),(208,'habilitado','G-8',3),(209,'habilitado','G-9',3),(210,'habilitado','G-10',3),(211,'deshabilitado','A-1',4),(212,'deshabilitado','A-2',4),(213,'habilitado','A-3',4),(214,'habilitado','A-4',4),(215,'habilitado','A-5',4),(216,'habilitado','A-6',4),(217,'habilitado','A-7',4),(218,'habilitado','A-8',4),(219,'habilitado','A-9',4),(220,'habilitado','A-10',4),(221,'habilitado','B-1',4),(222,'habilitado','B-2',4),(223,'habilitado','B-3',4),(224,'habilitado','B-4',4),(225,'habilitado','B-5',4),(226,'habilitado','B-6',4),(227,'habilitado','B-7',4),(228,'habilitado','B-8',4),(229,'habilitado','B-9',4),(230,'habilitado','B-10',4),(231,'habilitado','C-1',4),(232,'habilitado','C-2',4),(233,'habilitado','C-3',4),(234,'habilitado','C-4',4),(235,'habilitado','C-5',4),(236,'habilitado','C-6',4),(237,'habilitado','C-7',4),(238,'habilitado','C-8',4),(239,'habilitado','C-9',4),(240,'habilitado','C-10',4),(241,'habilitado','D-1',4),(242,'habilitado','D-2',4),(243,'habilitado','D-3',4),(244,'habilitado','D-4',4),(245,'habilitado','D-5',4),(246,'habilitado','D-6',4),(247,'habilitado','D-7',4),(248,'habilitado','D-8',4),(249,'habilitado','D-9',4),(250,'habilitado','D-10',4),(251,'habilitado','E-1',4),(252,'habilitado','E-2',4),(253,'habilitado','E-3',4),(254,'habilitado','E-4',4),(255,'habilitado','E-5',4),(256,'habilitado','E-6',4),(257,'habilitado','E-7',4),(258,'habilitado','E-8',4),(259,'habilitado','E-9',4),(260,'habilitado','E-10',4),(261,'habilitado','F-1',4),(262,'habilitado','F-2',4),(263,'habilitado','F-3',4),(264,'habilitado','F-4',4),(265,'habilitado','F-5',4),(266,'habilitado','F-6',4),(267,'habilitado','F-7',4),(268,'habilitado','F-8',4),(269,'habilitado','F-9',4),(270,'habilitado','F-10',4),(271,'habilitado','G-1',4),(272,'habilitado','G-2',4),(273,'habilitado','G-3',4),(274,'habilitado','G-4',4),(275,'habilitado','G-5',4),(276,'habilitado','G-6',4),(277,'habilitado','G-7',4),(278,'habilitado','G-8',4),(279,'habilitado','G-9',4),(280,'habilitado','G-10',4),(281,'habilitado','A-1',5),(282,'habilitado','A-2',5),(283,'habilitado','A-3',5),(284,'habilitado','A-4',5),(285,'habilitado','A-5',5),(286,'habilitado','A-6',5),(287,'habilitado','A-7',5),(288,'habilitado','A-8',5),(289,'habilitado','A-9',5),(290,'habilitado','A-10',5),(291,'habilitado','B-1',5),(292,'habilitado','B-2',5),(293,'habilitado','B-3',5),(294,'habilitado','B-4',5),(295,'habilitado','B-5',5),(296,'habilitado','B-6',5),(297,'habilitado','B-7',5),(298,'habilitado','B-8',5),(299,'habilitado','B-9',5),(300,'habilitado','B-10',5),(301,'habilitado','C-1',5),(302,'habilitado','C-2',5),(303,'habilitado','C-3',5),(304,'habilitado','C-4',5),(305,'habilitado','C-5',5),(306,'habilitado','C-6',5),(307,'habilitado','C-7',5),(308,'habilitado','C-8',5),(309,'habilitado','C-9',5),(310,'habilitado','C-10',5),(311,'habilitado','D-1',5),(312,'habilitado','D-2',5),(313,'habilitado','D-3',5),(314,'habilitado','D-4',5),(315,'habilitado','D-5',5),(316,'habilitado','D-6',5),(317,'habilitado','D-7',5),(318,'habilitado','D-8',5),(319,'habilitado','D-9',5),(320,'habilitado','D-10',5),(321,'habilitado','E-1',5),(322,'habilitado','E-2',5),(323,'habilitado','E-3',5),(324,'habilitado','E-4',5),(325,'habilitado','E-5',5),(326,'habilitado','E-6',5),(327,'habilitado','E-7',5),(328,'habilitado','E-8',5),(329,'habilitado','E-9',5),(330,'habilitado','E-10',5),(331,'habilitado','F-1',5),(332,'habilitado','F-2',5),(333,'habilitado','F-3',5),(334,'habilitado','F-4',5),(335,'habilitado','F-5',5),(336,'habilitado','F-6',5),(337,'habilitado','F-7',5),(338,'habilitado','F-8',5),(339,'habilitado','F-9',5),(340,'habilitado','F-10',5),(341,'habilitado','G-1',5),(342,'habilitado','G-2',5),(343,'habilitado','G-3',5),(344,'habilitado','G-4',5),(345,'habilitado','G-5',5),(346,'habilitado','G-6',5),(347,'habilitado','G-7',5),(348,'habilitado','G-8',5),(349,'habilitado','G-9',5),(350,'habilitado','G-10',5);
/*!40000 ALTER TABLE `asiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bebida`
--

DROP TABLE IF EXISTS `bebida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bebida` (
  `id_bebida` bigint NOT NULL AUTO_INCREMENT,
  `litros` double NOT NULL,
  `precio` double NOT NULL,
  `unidades` int NOT NULL,
  `id_dulce` bigint DEFAULT NULL,
  PRIMARY KEY (`id_bebida`),
  KEY `FKcfh79bgmah44ira0wcgsyf4t6` (`id_dulce`),
  CONSTRAINT `FKcfh79bgmah44ira0wcgsyf4t6` FOREIGN KEY (`id_dulce`) REFERENCES `dulce` (`id_dulce`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bebida`
--

LOCK TABLES `bebida` WRITE;
/*!40000 ALTER TABLE `bebida` DISABLE KEYS */;
INSERT INTO `bebida` VALUES (1,1.5,7.5,49,2),(2,0.5,3.5,54,1),(3,1,3.3,63,3);
/*!40000 ALTER TABLE `bebida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boleto`
--

DROP TABLE IF EXISTS `boleto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boleto` (
  `id_boleto` bigint NOT NULL AUTO_INCREMENT,
  `id_asiento` bigint DEFAULT NULL,
  `id_funcion` bigint DEFAULT NULL,
  `id_usuario` bigint DEFAULT NULL,
  PRIMARY KEY (`id_boleto`),
  KEY `FK4hvcieg4a6825ix872o2kumk2` (`id_asiento`),
  KEY `FK2wv2m5vuexmoj1va2jep5l6m` (`id_funcion`),
  KEY `FK30cqpepm4at2flx7r4yqng9pa` (`id_usuario`),
  CONSTRAINT `FK2wv2m5vuexmoj1va2jep5l6m` FOREIGN KEY (`id_funcion`) REFERENCES `funcion` (`id_funcion`),
  CONSTRAINT `FK4hvcieg4a6825ix872o2kumk2` FOREIGN KEY (`id_asiento`) REFERENCES `asiento` (`id_asiento`),
  CONSTRAINT `FK_boleto_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleto`
--

LOCK TABLES `boleto` WRITE;
/*!40000 ALTER TABLE `boleto` DISABLE KEYS */;
INSERT INTO `boleto` VALUES (2,6,4,1),(3,270,8,2),(4,271,9,1),(7,8,4,1),(8,9,1,15),(15,15,1,3),(16,4,1,3),(17,10,1,4),(18,72,1,4),(19,66,7,4),(20,5,1,4),(21,27,1,4),(24,8,10,4),(25,76,11,4),(26,99,6,4),(27,29,10,4),(28,73,2,4),(29,33,10,4),(30,142,3,4),(31,2,3,4),(32,143,3,4),(33,12,1,4),(34,68,1,4),(35,141,31,4),(36,1,2,4),(37,75,6,4),(38,213,8,4),(39,9,7,4),(40,41,7,4),(41,12,14,4),(42,11,14,4),(43,72,14,4),(44,12,4,4),(45,51,7,4),(46,91,6,4),(47,12,7,4),(48,62,7,4),(49,11,7,4),(50,107,2,4),(51,78,2,4),(52,52,1,4),(53,52,14,4),(54,42,14,4),(55,49,4,4),(56,51,14,4),(57,6,10,4),(58,26,10,4),(59,9,10,4),(60,9,14,4),(61,32,14,4),(62,41,14,4),(63,50,14,4),(64,22,14,4),(65,40,14,4),(66,27,4,4),(67,10,30,4);
/*!40000 ALTER TABLE `boleto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` bigint NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `UK35t4wyxqrevf09uwx9e9p6o75` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'habilitado','comedia'),(2,'habilitado','terror'),(3,'habilitado','disney'),(4,'habilitado','accion'),(5,'habilitado','suspenso'),(22,'habilitado','animacion'),(23,'habilitado','drama'),(24,'habilitado','ficcion'),(25,'habilitado','romance');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` bigint NOT NULL AUTO_INCREMENT,
  `direccion` varchar(255) DEFAULT NULL,
  `id_usuario` bigint DEFAULT NULL,
  `fecha_nacimiento` varchar(255) DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  KEY `FKetx0tojxf5yevxcyt6qb526x5` (`id_usuario`),
  CONSTRAINT `FKetx0tojxf5yevxcyt6qb526x5` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Avenida Siempre Viva 123',1,'1990-01-01','2024-09-29'),(2,'Calle Falsa 456',2,'1985-06-15','2024-09-29');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comida`
--

DROP TABLE IF EXISTS `comida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comida` (
  `id_comida` bigint NOT NULL AUTO_INCREMENT,
  `gramos` double NOT NULL,
  `precio` double NOT NULL,
  `unidades` int NOT NULL,
  `id_dulce` bigint DEFAULT NULL,
  PRIMARY KEY (`id_comida`),
  KEY `FKhrab6ay162qv6nn6blvuumeep` (`id_dulce`),
  CONSTRAINT `FKhrab6ay162qv6nn6blvuumeep` FOREIGN KEY (`id_dulce`) REFERENCES `dulce` (`id_dulce`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comida`
--

LOCK TABLES `comida` WRITE;
/*!40000 ALTER TABLE `comida` DISABLE KEYS */;
INSERT INTO `comida` VALUES (1,500,24.5,8,4),(2,330,12.2,67,5);
/*!40000 ALTER TABLE `comida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distrito`
--

DROP TABLE IF EXISTS `distrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distrito` (
  `id_distrito` bigint NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_distrito`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distrito`
--

LOCK TABLES `distrito` WRITE;
/*!40000 ALTER TABLE `distrito` DISABLE KEYS */;
INSERT INTO `distrito` VALUES (1,'habilitado','Villa El Salvador'),(2,'habilitado','Villa Maria Del Triunfo'),(3,'habilitado','Comas'),(4,'habilitado','San Martin de Porres');
/*!40000 ALTER TABLE `distrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dulce`
--

DROP TABLE IF EXISTS `dulce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dulce` (
  `id_dulce` bigint NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_dulce`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dulce`
--

LOCK TABLES `dulce` WRITE;
/*!40000 ALTER TABLE `dulce` DISABLE KEYS */;
INSERT INTO `dulce` VALUES (1,'habilitado','coca-cola','bebida'),(2,'habilitado','inka-kola','bebida'),(3,'habilitado','pepsi','bebida'),(4,'habilitado','pollo-broaster','comida'),(5,'habilitado','hamburguesa','comida');
/*!40000 ALTER TABLE `dulce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcion`
--

DROP TABLE IF EXISTS `funcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcion` (
  `id_funcion` bigint NOT NULL AUTO_INCREMENT,
  `hora` varchar(255) DEFAULT NULL,
  `precio` decimal(38,2) DEFAULT NULL,
  `id_pelicula` bigint DEFAULT NULL,
  `id_sala` bigint DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id_funcion`),
  KEY `FKi7tai9me0rcy9a0qcj0vei7au` (`id_pelicula`),
  KEY `FKnu9w4japxbymxy7mqya3fo8cu` (`id_sala`),
  CONSTRAINT `FKi7tai9me0rcy9a0qcj0vei7au` FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula` (`id_pelicula`),
  CONSTRAINT `FKnu9w4japxbymxy7mqya3fo8cu` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id_sala`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcion`
--

LOCK TABLES `funcion` WRITE;
/*!40000 ALTER TABLE `funcion` DISABLE KEYS */;
INSERT INTO `funcion` VALUES (1,'16:00:00.000000',13.50,1,1,'habilitado','2024-10-01'),(2,'14:30:00.000000',17.50,1,2,'habilitado','2024-11-05'),(3,'23:00:00.000000',14.50,3,3,'habilitado','2024-12-10'),(4,'20:00:00.000000',12.50,3,1,'habilitado','2024-12-15'),(5,'16:00:00.000000',16.50,4,2,'habilitado','2024-10-15'),(6,'21:00:00.000000',18.00,4,2,'habilitado','2024-10-15'),(7,'21:00:00.000000',18.00,4,1,'habilitado','2024-10-15'),(8,'22:00:00.000000',15.50,4,4,'habilitado','2024-11-12'),(9,'14:00:00.000000',20.50,7,4,'habilitado','2024-11-15'),(10,'10:00:00',12.00,1,1,'habilitado','2024-10-20'),(11,'12:00:00',14.00,1,2,'habilitado','2024-10-20'),(12,'14:30:00',16.00,2,1,'habilitado','2024-10-20'),(13,'16:00:00',18.00,2,2,'habilitado','2024-10-21'),(14,'18:00:00',20.00,3,1,'habilitado','2024-10-21'),(15,'20:00:00',22.00,4,2,'habilitado','2024-10-21'),(16,'21:00:00',19.00,5,1,'habilitado','2024-10-22'),(17,'22:30:00',25.00,6,2,'habilitado','2024-10-22'),(18,'10:30:00',13.00,7,3,'habilitado','2024-10-23'),(19,'13:00:00',15.50,8,4,'habilitado','2024-10-23'),(20,'15:00:00',17.50,9,3,'habilitado','2024-10-23'),(21,'17:30:00',19.50,10,4,'habilitado','2024-10-24'),(22,'19:00:00',21.00,11,1,'habilitado','2024-10-24'),(23,'21:30:00',23.00,12,2,'habilitado','2024-10-24'),(24,'10:00:00',11.00,13,3,'habilitado','2024-10-25'),(25,'12:30:00',14.50,14,4,'habilitado','2024-10-25'),(26,'14:00:00',16.00,15,1,'habilitado','2024-10-26'),(27,'16:30:00',18.00,16,2,'habilitado','2024-10-26'),(28,'18:00:00',20.00,17,3,'habilitado','2024-10-26'),(29,'20:00:00',22.50,18,4,'habilitado','2024-10-27'),(30,'10:30:00',12.50,19,1,'habilitado','2024-10-27'),(31,'12:00:00',14.00,1,2,'habilitado','2024-10-27'),(32,'14:00:00',15.00,2,3,'habilitado','2024-10-28'),(33,'16:30:00',17.00,3,4,'habilitado','2024-10-28'),(34,'19:00:00',19.50,4,1,'habilitado','2024-10-28'),(35,'11:00:00',13.50,7,1,'habilitado','2024-10-20'),(36,'13:30:00',15.00,8,2,'habilitado','2024-10-20'),(37,'16:00:00',17.00,9,1,'habilitado','2024-10-21'),(38,'18:30:00',19.50,10,2,'habilitado','2024-10-21'),(39,'20:00:00',22.00,11,3,'habilitado','2024-10-22'),(40,'22:30:00',24.00,12,4,'habilitado','2024-10-22'),(41,'09:30:00',12.00,13,1,'habilitado','2024-10-23'),(42,'12:00:00',14.50,14,2,'habilitado','2024-10-23'),(43,'14:30:00',16.50,15,3,'habilitado','2024-10-24'),(44,'17:00:00',18.00,16,4,'habilitado','2024-10-24'),(45,'19:30:00',20.00,17,1,'habilitado','2024-10-25'),(46,'21:00:00',22.50,18,2,'habilitado','2024-10-25'),(47,'10:00:00',11.50,19,3,'habilitado','2024-10-26'),(48,'12:30:00',14.00,7,4,'habilitado','2024-10-26'),(49,'15:00:00',16.50,8,1,'habilitado','2024-10-27'),(50,'17:30:00',18.00,9,2,'habilitado','2024-10-27'),(51,'20:00:00',19.00,10,3,'habilitado','2024-10-27'),(52,'22:00:00',23.00,11,4,'habilitado','2024-10-27'),(53,'11:30:00',12.00,12,1,'habilitado','2024-10-28'),(54,'14:00:00',14.50,13,2,'habilitado','2024-10-28'),(55,'20:00:00',20.50,5,5,'habilitado','2024-12-10');
/*!40000 ALTER TABLE `funcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pelicula`
--

DROP TABLE IF EXISTS `pelicula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pelicula` (
  `id_pelicula` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `id_categoria` bigint DEFAULT NULL,
  PRIMARY KEY (`id_pelicula`),
  KEY `FK31qpyboevicc2a2mffl2el966` (`id_categoria`),
  CONSTRAINT `FK31qpyboevicc2a2mffl2el966` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pelicula`
--

LOCK TABLES `pelicula` WRITE;
/*!40000 ALTER TABLE `pelicula` DISABLE KEYS */;
INSERT INTO `pelicula` VALUES (1,'descripcion suspenso','habilitado','interestelar',5),(2,'descripcion pirata','habilitado','piratas-del-caribe-5',4),(3,'descripcion disney','habilitado','el-rey-leon',3),(4,'descripcion accion','habilitado','deadpool-3',4),(5,'descr vampiros y lobos','habilitado','crepusculo-eclipse',4),(6,'descr suspenso','habilitado','sound-of-freedom',5),(7,'descr accion guason','habilitado','guason-2',4),(8,'Un robot inteligente llamado Roz','habilitado','Robot Salvaje',22),(9,'El fantasma más genial ha vuelto','habilitado','Beetlejuice Beetlejuice',2),(10,'Ella está lista para cubrir la ciudad de sangre','habilitado','La maldición de cenicienta',2),(11,'Coleccionista de Almas','habilitado','Longlegs',2),(12,'La historia detrás del éxito','habilitado','Sube a mi nube',24),(13,'El hombre invisible','habilitado','No-hables-con-extraños',5),(14,'El origen de los transformers','habilitado','Transformers uno',22),(15,'La amistad más extraordinaria','habilitado','Mi amigo el pingüino',23),(16,'Rompemos el patrón o el patrón nos rompe','habilitado','Romper el círculo',25),(17,'Llegó él','habilitado','El guardian de la magia',22),(18,'Absolutamente una p*** locura','habilitado','La sustancia',2),(19,'No respires, si no ya fuiste','habilitado','Alien Romulus',2);
/*!40000 ALTER TABLE `pelicula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` bigint NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'habilitado','cajero'),(2,'habilitado','limpieza'),(3,'habilitado','mantenimiento');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sala`
--

DROP TABLE IF EXISTS `sala`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sala` (
  `id_sala` bigint NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `num_asientos` int NOT NULL,
  `piso` varchar(255) DEFAULT NULL,
  `id_sede` bigint DEFAULT NULL,
  PRIMARY KEY (`id_sala`),
  KEY `FKrq1i5apehtuk98fyshlq4xm0q` (`id_sede`),
  CONSTRAINT `FKrq1i5apehtuk98fyshlq4xm0q` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sala`
--

LOCK TABLES `sala` WRITE;
/*!40000 ALTER TABLE `sala` DISABLE KEYS */;
INSERT INTO `sala` VALUES (1,'habilitado','Sala blue',70,'2',1),(2,'habilitado','Sala eclipse',70,'3',2),(3,'habilitado','Sala neptuno',70,'1',3),(4,'habilitado','Sala acuario',68,'2',2),(5,'habilitado','sala gemini',70,'3',4);
/*!40000 ALTER TABLE `sala` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sede`
--

DROP TABLE IF EXISTS `sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sede` (
  `id_sede` bigint NOT NULL AUTO_INCREMENT,
  `direccion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `id_distrito` bigint DEFAULT NULL,
  PRIMARY KEY (`id_sede`),
  KEY `FKbkvowa5yj7eenax5m7chaeqm9` (`id_distrito`),
  CONSTRAINT `FKbkvowa5yj7eenax5m7chaeqm9` FOREIGN KEY (`id_distrito`) REFERENCES `distrito` (`id_distrito`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
INSERT INTO `sede` VALUES (1,'Av-Garcilazo','habilitado',2),(2,'Av-JavierPrado','habilitado',1),(3,'Av-Pachacamac','habilitado',3),(4,'Av-Arriola','habilitado',4);
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` bigint NOT NULL AUTO_INCREMENT,
  `celular` varchar(255) DEFAULT NULL,
  `gmail` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'987766566','juan@gmail.com','juan gomez','juan123'),(2,'934456646','ricardo@gmail.com','ricardo suarez','ricardo123'),(3,'935545667','william@gmail.com','willian manrique','william'),(4,'989445665','jairo123@gmail.com','jairo','morales'),(5,'989445678','carlos123@gmail.com','carlo','zarate'),(6,'988443454','juan123@gmail.com','juan','jauno'),(7,'4534','fag@gmail.com','afga','23424'),(8,'984455321','jose123@gmail.com','jose','pollo'),(9,'989876543','carla123@gmail.com','carla','aea'),(10,'989443445','mario123@gmail.com','mario','aea'),(11,'944833445','pablo123@gmail.com','pablo','erere'),(12,'99883345','jorge123@gmail.com','jorge','aea'),(13,'933233323','patricio123@gmail.com','patricio','ddd'),(14,'989443444','pepe123@gmail.com','pepe','ooo'),(15,'989844334','jesus123@gmail.com','jesus','jeje'),(16,'98944434','aee@gmail.com','ddd','oieo'),(17,'989444345','jairo123@gmail.com','jairo','oor');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-01 21:08:38
