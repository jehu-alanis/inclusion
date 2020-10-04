-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: itsx_inclusion
-- ------------------------------------------------------
-- Server version	5.7.21-log

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
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumnos` (
  `idalumnos` int(11) NOT NULL AUTO_INCREMENT,
  `matricula` varchar(45) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `ap_paterno` varchar(255) DEFAULT NULL,
  `ap_materno` varchar(255) DEFAULT NULL,
  `curp` varchar(255) DEFAULT NULL,
  `nss` varchar(255) DEFAULT NULL,
  `Sexo` varchar(255) DEFAULT NULL,
  `Fecha_nacimiento` varchar(255) DEFAULT NULL,
  `T_sangre` varchar(255) DEFAULT NULL,
  `Nacionalidad` varchar(255) DEFAULT NULL,
  `direcccion` varchar(255) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `municipio` varchar(255) DEFAULT NULL,
  `Tel_residencial` varchar(255) DEFAULT NULL,
  `celular` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idalumnos`),
  UNIQUE KEY `matricula_UNIQUE` (`matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (47,'14565465','ezequiel','lopes','martinez','VCA941226HCSLZH05','21169449770','MASCULINO','1998-10-12','O+','México','AV XALAPA','xalapa','xalapa','2222234','6565656','MARTIN@hotmail.com'),(48,'1552O323','maria','lautaro','hernandes','AA343434SLZH05','2116345454','FEMENINO','1999-08-12','O+','México','xochimilco','xalapa','xalapa','228234567','8883434343','Mlh@hotmail.com'),(49,'1459998','antonio','firman','izquierdos','wzwzwzSLZH05','2116343434','MASCULINO','2019-12-10','O+','México','jardines de xalapa','xalapa','xalapa','2222234','2678768768','antonio@hotmail.com'),(50,'123478989','carlos','carrillo','carrillo','CCA226HCSLZH05','21169449745','MASCULINO','2019-12-04','O+','México','jardines de xalapa','xalapa','xalapa','65656565','2678768768','CACARR@hotmail.com');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datos_escolares`
--

DROP TABLE IF EXISTS `datos_escolares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `datos_escolares` (
  `iddatos_escolares` int(11) NOT NULL AUTO_INCREMENT,
  `campus` varchar(45) DEFAULT NULL,
  `no_control` varchar(45) NOT NULL,
  `carrera` varchar(45) DEFAULT NULL,
  `semestre` varchar(45) DEFAULT NULL,
  `plan_de_estudios` varchar(45) DEFAULT NULL,
  `modalidad` varchar(45) DEFAULT NULL,
  `ingreso` varchar(45) DEFAULT NULL,
  `situcion_academica` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`iddatos_escolares`),
  UNIQUE KEY `no_control_UNIQUE` (`no_control`),
  CONSTRAINT `r` FOREIGN KEY (`no_control`) REFERENCES `alumnos` (`matricula`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datos_escolares`
--

LOCK TABLES `datos_escolares` WRITE;
/*!40000 ALTER TABLE `datos_escolares` DISABLE KEYS */;
INSERT INTO `datos_escolares` VALUES (18,'xalapa','14565465','ING. SISTEMAS COMPUTACIONALES','6to','issc','sabatino','2014','ALTA'),(19,'xico','1552O323','ING. GESTION EMPRESARIAL','6to','issc','escolarizado','2014','ALTA'),(20,'xalapa','1459998','ING. MECATRÓNICA','6to','issc','sabatino','2014','ALTA'),(21,'xico','123478989','LIC. GASTRONOMIA','6to','issc','sabatino','2014','ALTA');
/*!40000 ALTER TABLE `datos_escolares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discapacidad`
--

DROP TABLE IF EXISTS `discapacidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discapacidad` (
  `iddiscapacidad` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(255) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `id_matricula` varchar(45) NOT NULL,
  `tipootro` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`iddiscapacidad`),
  KEY `f_idx` (`id_matricula`),
  CONSTRAINT `f` FOREIGN KEY (`id_matricula`) REFERENCES `tutores` (`id_hijo_matricula`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discapacidad`
--

LOCK TABLES `discapacidad` WRITE;
/*!40000 ALTER TABLE `discapacidad` DISABLE KEYS */;
INSERT INTO `discapacidad` VALUES (23,'SORDERA, SORDO_CEGUERA, TDA_TDA_H, ','el alumno es sordo','14565465',''),(24,'SORDERA, DS_CONDUCTA, DS_APRENDIZAJE, ','sin observac','1552O323',''),(25,'DS_CONDUCTA, AS_INTELECTUAL, ','BUEN MUIHCAHO','1459998',''),(26,' ','kjkjlkjlkj','123478989','');
/*!40000 ALTER TABLE `discapacidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutores`
--

DROP TABLE IF EXISTS `tutores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tutores` (
  `idtutores` int(11) NOT NULL AUTO_INCREMENT,
  `nombreT` varchar(255) DEFAULT NULL,
  `ap_paternoT` varchar(255) DEFAULT NULL,
  `ap_maternoT` varchar(255) DEFAULT NULL,
  `curpT` varchar(255) DEFAULT NULL,
  `sexoT` varchar(255) DEFAULT NULL,
  `direccionT` varchar(255) DEFAULT NULL,
  `ciudadT` varchar(255) DEFAULT NULL,
  `municipioT` varchar(255) DEFAULT NULL,
  `Telefono_residencialT` varchar(255) DEFAULT NULL,
  `celularT` varchar(255) DEFAULT NULL,
  `correoT` varchar(255) DEFAULT NULL,
  `id_hijo_matricula` varchar(45) NOT NULL,
  PRIMARY KEY (`idtutores`),
  KEY `d_idx` (`id_hijo_matricula`),
  CONSTRAINT `d` FOREIGN KEY (`id_hijo_matricula`) REFERENCES `datos_escolares` (`no_control`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutores`
--

LOCK TABLES `tutores` WRITE;
/*!40000 ALTER TABLE `tutores` DISABLE KEYS */;
INSERT INTO `tutores` VALUES (18,'marcos','morales','martinez','MMM9829839283','MASCULINO','AV XALAPA','xalapa','xalapa','22888881212','2288456784','ike@HOTMAIL.COM','14565465'),(19,'JOSE','ELTON','URIBE','ULL829839283','MASCULINO','xochimilco','xalapa','xalapa','22888881212','2288456784','JOSE@HOTMAIL.COM','1552O323'),(20,'martin','mercedes','herrera','HHH9829839283','MASCULINO','jardines de xalapa','xalapa','xalapa','22888881212','35434344','HERRERA@HOTMAIL.COM','1459998'),(21,'victor','zavala','carrillo','CZV9829839283','MASCULINO','jardines de xalapa','xalapa','xalapa','235325363623','78212323221','VIC@HOTMAIL.COM','123478989');
/*!40000 ALTER TABLE `tutores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `campus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jehu','123','itsx'),(2,'jehu2','1234','itsx'),(3,'147o02051','$2a$10$BR/uDPol3pSWqIhBWT4eh.FaAJwzIUAWKR50AraFqhOpEKB7xVkOe','xalapa'),(4,'memo','$2a$10$IcewLhY0.xolQDcUzYe2S.V4sElb3t/YN/VDipcbfuj8huKBtRaku','xalapa'),(5,'jehu','$2a$10$sMUfu9kz8XARz38azNdKwuu92seLnywiqqahm5xA7fuBwg/tbzMaC','xalapa'),(6,'jehu','$2a$10$FeJi37Q842rGKK4pn3TnnOB6Qo2MBth.SEI6zIbOiwBdcD1/0fyGO','xalapa'),(7,'xico','$2a$10$RaeloLv8THBq18Graysmf.0e04FI.HVONYOdATfbVKjgAQKmDT1Iq','xico'),(8,'jehu','$2a$10$3QzstFAMYLKd.roKaTx5OuNBgU0SWVtON0S.r9abY9zXi.xENM13y','xico'),(9,'JEHU','$2a$10$zv8DzOqTiwq3wDnm9i2maOYibNxl..VJ6eGe5Pxl0NWsN9qi/aw/i','xalapa');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-03 23:56:40
