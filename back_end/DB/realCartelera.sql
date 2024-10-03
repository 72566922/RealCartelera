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
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asiento`
--

LOCK TABLES `asiento` WRITE;
/*!40000 ALTER TABLE `asiento` DISABLE KEYS */;
INSERT INTO `asiento` VALUES (1,'habilitado','A-1',2),(2,'habilitado','A-5',3),(3,'habilitado','B-5',1),(4,'habilitado','A-1',1),(5,'habilitado','A-2',1),(6,'habilitado','A-3',1),(7,'habilitado','A-4',1),(8,'habilitado','A-5',1),(9,'habilitado','A-6',1),(10,'habilitado','A-7',1),(11,'habilitado','A-8',1),(12,'habilitado','A-9',1),(13,'habilitado','A-10',1),(14,'habilitado','B-1',1),(15,'habilitado','B-2',1),(16,'habilitado','B-3',1),(17,'habilitado','B-4',1),(18,'habilitado','B-6',1),(19,'habilitado','B-7',1),(20,'habilitado','B-8',1),(21,'habilitado','B-9',1),(22,'habilitado','B-10',1),(23,'habilitado','C-1',1),(24,'habilitado','C-2',1),(25,'habilitado','C-3',1),(26,'habilitado','C-4',1),(27,'habilitado','C-5',1),(28,'habilitado','C-6',1),(29,'habilitado','C-7',1),(30,'habilitado','C-8',1),(31,'habilitado','C-9',1),(32,'habilitado','C-10',1),(33,'habilitado','D-1',1),(34,'habilitado','D-2',1),(35,'habilitado','D-3',1),(36,'habilitado','D-4',1),(37,'habilitado','D-5',1),(38,'habilitado','D-6',1),(39,'habilitado','D-7',1),(40,'habilitado','D-8',1),(41,'habilitado','D-9',1),(42,'habilitado','D-10',1),(43,'habilitado','E-1',1),(44,'habilitado','E-2',1),(45,'habilitado','E-3',1),(46,'habilitado','E-4',1),(47,'habilitado','E-5',1),(48,'habilitado','E-6',1),(49,'habilitado','E-7',1),(50,'habilitado','E-8',1),(51,'habilitado','E-9',1),(52,'habilitado','E-10',1),(53,'habilitado','F-1',1),(54,'habilitado','F-2',1),(55,'habilitado','F-3',1),(56,'habilitado','F-4',1),(57,'habilitado','F-5',1),(58,'habilitado','F-6',1),(59,'habilitado','F-7',1),(60,'habilitado','F-8',1),(61,'habilitado','F-9',1),(62,'habilitado','F-10',1),(63,'habilitado','G-1',1),(64,'habilitado','G-2',1),(65,'habilitado','G-3',1),(66,'habilitado','G-4',1),(67,'habilitado','G-5',1),(68,'habilitado','G-6',1),(69,'habilitado','G-7',1),(70,'habilitado','G-8',1),(71,'habilitado','G-9',1),(72,'habilitado','G-10',1),(73,'habilitado','A-2',2),(74,'habilitado','A-3',2),(75,'habilitado','A-4',2),(76,'habilitado','A-5',2),(77,'habilitado','A-6',2),(78,'habilitado','A-7',2),(79,'habilitado','A-8',2),(80,'habilitado','A-9',2),(81,'habilitado','A-10',2),(82,'habilitado','B-1',2),(83,'habilitado','B-2',2),(84,'habilitado','B-3',2),(85,'habilitado','B-4',2),(86,'habilitado','B-5',2),(87,'habilitado','B-6',2),(88,'habilitado','B-7',2),(89,'habilitado','B-8',2),(90,'habilitado','B-9',2),(91,'habilitado','B-10',2),(92,'habilitado','C-1',2),(93,'habilitado','C-2',2),(94,'habilitado','C-3',2),(95,'habilitado','C-4',2),(96,'habilitado','C-5',2),(97,'habilitado','C-6',2),(98,'habilitado','C-7',2),(99,'habilitado','C-8',2),(100,'habilitado','C-9',2),(101,'habilitado','C-10',2),(102,'habilitado','D-1',2),(103,'habilitado','D-2',2),(104,'habilitado','D-3',2),(105,'habilitado','D-4',2),(106,'habilitado','D-5',2),(107,'habilitado','D-6',2),(108,'habilitado','D-7',2),(109,'habilitado','D-8',2),(110,'habilitado','D-9',2),(111,'habilitado','D-10',2),(112,'habilitado','E-1',2),(113,'habilitado','E-2',2),(114,'habilitado','E-3',2),(115,'habilitado','E-4',2),(116,'habilitado','E-5',2),(117,'habilitado','E-6',2),(118,'habilitado','E-7',2),(119,'habilitado','E-8',2),(120,'habilitado','E-9',2),(121,'habilitado','E-10',2),(122,'habilitado','F-1',2),(123,'habilitado','F-2',2),(124,'habilitado','F-3',2),(125,'habilitado','F-4',2),(126,'habilitado','F-5',2),(127,'habilitado','F-6',2),(128,'habilitado','F-7',2),(129,'habilitado','F-8',2),(130,'habilitado','F-9',2),(131,'habilitado','F-10',2),(132,'habilitado','G-1',2),(133,'habilitado','G-2',2),(134,'habilitado','G-3',2),(135,'habilitado','G-4',2),(136,'habilitado','G-5',2),(137,'habilitado','G-6',2),(138,'habilitado','G-7',2),(139,'habilitado','G-8',2),(140,'habilitado','G-9',2),(141,'habilitado','G-10',2),(142,'habilitado','A-1',3),(143,'habilitado','A-2',3),(144,'habilitado','A-3',3),(145,'habilitado','A-4',3),(146,'habilitado','A-6',3),(147,'habilitado','A-7',3),(148,'habilitado','A-8',3),(149,'habilitado','A-9',3),(150,'habilitado','A-10',3),(151,'habilitado','B-1',3),(152,'habilitado','B-2',3),(153,'habilitado','B-3',3),(154,'habilitado','B-4',3),(155,'habilitado','B-5',3),(156,'habilitado','B-6',3),(157,'habilitado','B-7',3),(158,'habilitado','B-8',3),(159,'habilitado','B-9',3),(160,'habilitado','B-10',3),(161,'habilitado','C-1',3),(162,'habilitado','C-2',3),(163,'habilitado','C-3',3),(164,'habilitado','C-4',3),(165,'habilitado','C-5',3),(166,'habilitado','C-6',3),(167,'habilitado','C-7',3),(168,'habilitado','C-8',3),(169,'habilitado','C-9',3),(170,'habilitado','C-10',3),(171,'habilitado','D-1',3),(172,'habilitado','D-2',3),(173,'habilitado','D-3',3),(174,'habilitado','D-4',3),(175,'habilitado','D-5',3),(176,'habilitado','D-6',3),(177,'habilitado','D-7',3),(178,'habilitado','D-8',3),(179,'habilitado','D-9',3),(180,'habilitado','D-10',3),(181,'habilitado','E-1',3),(182,'habilitado','E-2',3),(183,'habilitado','E-3',3),(184,'habilitado','E-4',3),(185,'habilitado','E-5',3),(186,'habilitado','E-6',3),(187,'habilitado','E-7',3),(188,'habilitado','E-8',3),(189,'habilitado','E-9',3),(190,'habilitado','E-10',3),(191,'habilitado','F-1',3),(192,'habilitado','F-2',3),(193,'habilitado','F-3',3),(194,'habilitado','F-4',3),(195,'habilitado','F-5',3),(196,'habilitado','F-6',3),(197,'habilitado','F-7',3),(198,'habilitado','F-8',3),(199,'habilitado','F-9',3),(200,'habilitado','F-10',3),(201,'habilitado','G-1',3),(202,'habilitado','G-2',3),(203,'habilitado','G-3',3),(204,'habilitado','G-4',3),(205,'habilitado','G-5',3),(206,'habilitado','G-6',3),(207,'habilitado','G-7',3),(208,'habilitado','G-8',3),(209,'habilitado','G-9',3),(210,'habilitado','G-10',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bebida`
--

LOCK TABLES `bebida` WRITE;
/*!40000 ALTER TABLE `bebida` DISABLE KEYS */;
INSERT INTO `bebida` VALUES (1,1.5,7.5,143,2),(2,0.5,3.5,255,1),(3,1,3.3,83,3);
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
  `id_cliente` bigint DEFAULT NULL,
  `id_funcion` bigint DEFAULT NULL,
  PRIMARY KEY (`id_boleto`),
  KEY `FK4hvcieg4a6825ix872o2kumk2` (`id_asiento`),
  KEY `FK30cqpepm4at2flx7r4yqng9pa` (`id_cliente`),
  KEY `FK2wv2m5vuexmoj1va2jep5l6m` (`id_funcion`),
  CONSTRAINT `FK2wv2m5vuexmoj1va2jep5l6m` FOREIGN KEY (`id_funcion`) REFERENCES `funcion` (`id_funcion`),
  CONSTRAINT `FK30cqpepm4at2flx7r4yqng9pa` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `FK4hvcieg4a6825ix872o2kumk2` FOREIGN KEY (`id_asiento`) REFERENCES `asiento` (`id_asiento`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleto`
--

LOCK TABLES `boleto` WRITE;
/*!40000 ALTER TABLE `boleto` DISABLE KEYS */;
INSERT INTO `boleto` VALUES (4,2,2,3),(5,3,1,2),(6,1,2,1);
/*!40000 ALTER TABLE `boleto` ENABLE KEYS */;
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
INSERT INTO `comida` VALUES (1,500,24.5,75,4),(2,330,12.2,190,5);
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
  `hora` time(6) DEFAULT NULL,
  `id_pelicula` bigint DEFAULT NULL,
  `precio` double NOT NULL,
  PRIMARY KEY (`id_funcion`),
  KEY `FKi7tai9me0rcy9a0qcj0vei7au` (`id_pelicula`),
  CONSTRAINT `FKi7tai9me0rcy9a0qcj0vei7au` FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula` (`id_pelicula`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcion`
--

LOCK TABLES `funcion` WRITE;
/*!40000 ALTER TABLE `funcion` DISABLE KEYS */;
INSERT INTO `funcion` VALUES (1,'16:00:00.000000',1,13.5),(2,'14:30:00.000000',1,17.5),(3,'23:00:00.000000',3,14.5);
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
  `categoria` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_pelicula`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pelicula`
--

LOCK TABLES `pelicula` WRITE;
/*!40000 ALTER TABLE `pelicula` DISABLE KEYS */;
INSERT INTO `pelicula` VALUES (1,'comedia','descipcion comedia','habilitado','Scary-movie'),(2,'terror','descripcion terror','habilitado','El Aro'),(3,'disney','descripcion disney','habilitado','El Rey Leon');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sala`
--

LOCK TABLES `sala` WRITE;
/*!40000 ALTER TABLE `sala` DISABLE KEYS */;
INSERT INTO `sala` VALUES (1,'habilitado','Sala blue',70,'2',1),(2,'habilitado','Sala eclipse',70,'3',2),(3,'habilitado','Sala neptuno',70,'1',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
INSERT INTO `sede` VALUES (1,'Av-Garcilazo','habilitado',2),(2,'Av-JavierPrado','habilitado',1),(3,'Av-Pachacamac','habilitado',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'987766566','juan@gmail.com','juan gomez','juan123'),(2,'934456646','ricardo@gmail.com','ricardo suarez','ricardo123'),(3,'935545667','william@gmail.com','willian manrique','william');
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

-- Dump completed on 2024-09-29 17:39:28
