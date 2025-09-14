-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dongligang
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25) COLLATE utf8mb4_bin NOT NULL COMMENT '名字',
  `account` varchar(25) COLLATE utf8mb4_bin NOT NULL COMMENT '账号',
  `phone` varchar(25) COLLATE utf8mb4_bin NOT NULL COMMENT '手机号',
  `idNo` varchar(25) COLLATE utf8mb4_bin NOT NULL COMMENT '身份证号',
  `position` varchar(25) COLLATE utf8mb4_bin NOT NULL,
  `department` varchar(25) COLLATE utf8mb4_bin NOT NULL,
  `pageAuthority` varchar(25) COLLATE utf8mb4_bin NOT NULL,
  `btnAuthority` varchar(25) COLLATE utf8mb4_bin NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (5,'周浩然','Qr9St0','15200005555','11010519840505005X','Boss','总裁办','admin','custom','2025-09-14 10:14:58','2025-09-14 10:14:58'),(6,'吴雅婷','Uv1Wx2','15300006666','11010619850606006X','客服专员','客服部','user','edit','2025-09-14 10:14:58','2025-09-14 10:14:58'),(7,'郑博文','Yz3Ab4','15400007777','11010719860707007X','市场经理','市场部','manager','add','2025-09-14 10:14:58','2025-09-14 10:14:58'),(8,'王雪梅','Cd5Ef6','15500008888','11010819870808008X','技术经理','技术部','admin','all','2025-09-14 10:14:58','2025-09-14 10:14:58'),(9,'冯志强','Gh7Ij8','15600009999','11010919880909009X','运营专员','运营部','user','delete','2025-09-14 10:14:58','2025-09-14 10:14:58'),(10,'陈雨薇','Kl9Mn0','15700001010','11011019891010010X','Boss','总裁办','admin','custom','2025-09-14 10:14:58','2025-09-14 10:14:58'),(11,'褚天佑','Op1Qr2','15800001111','11011119901111011X','客服经理','客服部','manager','edit','2025-09-14 10:14:58','2025-09-14 10:14:58'),(12,'卫晓琳','St3Uv4','15900001212','11011219911212012X','市场专员','市场部','user','add','2025-09-14 10:14:58','2025-09-14 10:14:58'),(13,'蒋宇航','Wx5Yz6','16000001313','11011319921313013X','技术工程师','技术部','admin','all','2025-09-14 10:14:58','2025-09-14 10:14:58'),(14,'沈梦琪','Ab7Cd8','16100001414','11011419931414014X','运营经理','运营部','manager','delete','2025-09-14 10:14:58','2025-09-14 10:14:58'),(15,'韩明轩','Ef9Gh0','16200001515','11011519941515015X','Boss','总裁办','admin','custom','2025-09-14 10:14:58','2025-09-14 10:14:58'),(16,'杨若曦','Ij1Kl2','16300001616','11011619951616016X','客服专员','客服部','user','edit','2025-09-14 10:14:58','2025-09-14 10:14:58'),(17,'朱浩宇','Mn3Op4','16400001717','11011719961717017X','市场经理','市场部','manager','add','2025-09-14 10:14:58','2025-09-14 10:14:58'),(18,'秦雨桐','Qr5St6','16500001818','11011819971818018X','技术经理','技术部','admin','all','2025-09-14 10:14:58','2025-09-14 10:14:58'),(19,'尤志明','Uv7Wx8','16600001919','11011919981919019X','运营专员','运营部','user','delete','2025-09-14 10:14:58','2025-09-14 10:14:58'),(20,'许雅静','Yz9Ab0','16700002020','11012019992020020X','Boss','总裁办','admin','custom','2025-09-14 10:14:58','2025-09-14 10:14:58'),(21,'何俊杰','Cd1Ef2','16800002121','11012120002121021X','客服经理','客服部','manager','edit','2025-09-14 10:14:58','2025-09-14 10:14:58'),(22,'吕晓萱','Gh3Ij4','16900002222','11012220012222022X','市场专员','市场部','user','add','2025-09-14 10:14:58','2025-09-14 10:14:58'),(23,'施宇航','Kl5Mn6','17000002323','11012320022323023X','技术工程师','技术部','admin','all','2025-09-14 10:14:58','2025-09-14 10:14:58'),(24,'张梦瑶','Op7Qr8','17100002424','11012420032424024X','运营经理','运营部','manager','delete','2025-09-14 10:14:58','2025-09-14 10:14:58'),(25,'孔明哲','St9Uv0','17200002525','11012520042525025X','Boss','总裁办','admin','custom','2025-09-14 10:14:58','2025-09-14 10:14:58'),(26,'曹若兰','Wx1Yz2','17300002626','11012620052626026X','客服专员','客服部','user','edit','2025-09-14 10:14:58','2025-09-14 10:14:58'),(27,'严浩南','Ab3Cd4','17400002727','11012720062727027X','市场经理','市场部','manager','add','2025-09-14 10:14:58','2025-09-14 10:14:58'),(28,'华雨欣','Ef5Gh6','17500002828','11012820072828028X','技术经理','技术部','admin','all','2025-09-14 10:14:58','2025-09-14 10:14:58'),(29,'金志强','Ij7Kl8','17600002929','11012920082929029X','运营专员','运营部','user','delete','2025-09-14 10:14:58','2025-09-14 10:14:58'),(30,'魏雅雯','Mn9Op0','17700003030','11013020093030030X','Boss','总裁办','admin','custom','2025-09-14 10:14:58','2025-09-14 10:14:58');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-14 19:45:34
