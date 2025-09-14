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
-- Table structure for table `alarm`
--

DROP TABLE IF EXISTS `alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alarm` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '当前时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `address` varchar(25) COLLATE utf8mb4_general_ci NOT NULL COMMENT '地址',
  `equNo` varchar(25) COLLATE utf8mb4_general_ci NOT NULL COMMENT '设备编号',
  `level` int NOT NULL COMMENT '报警等级 1严重 2紧急 3一般',
  `code` int NOT NULL COMMENT '故障代码',
  `description` varchar(25) COLLATE utf8mb4_general_ci NOT NULL COMMENT '详情',
  `status` int NOT NULL COMMENT '状态 1待指派 2处理中 处理异常',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alarm`
--

LOCK TABLES `alarm` WRITE;
/*!40000 ALTER TABLE `alarm` DISABLE KEYS */;
INSERT INTO `alarm` VALUES (1,'2025-09-13 17:01:37','2025-09-13 17:04:22','北京市东城区','CC1002',1,10023,'充电桩拿不下来',1),(2,'2025-09-13 17:01:37','2025-09-13 17:04:22','上海市浦东新区','CC1003',2,10024,'电动车无法充电',1),(3,'2025-09-13 17:01:37','2025-09-13 17:04:22','上海宝山','CC1004',3,10025,'充电结束未通知',1),(4,'2025-09-13 17:01:37','2025-09-13 17:04:22','广州市天河区','CC1005',1,10026,'充电桩拿不下来',1),(5,'2025-09-13 17:01:37','2025-09-13 17:04:22','深圳市南山区','CC1006',1,10027,'充电桩拿不下来',1),(6,'2025-09-13 17:01:37','2025-09-13 17:04:22','重庆市渝中区','CC1007',2,10028,'充电桩拿不下来',1),(7,'2025-09-13 17:01:37','2025-09-13 17:04:22','上海宝山','CC1008',3,10029,'充电桩拿不下来',1),(8,'2025-09-13 17:01:37','2025-09-13 17:04:22','上海宝山','CD1002',3,10023,'充电桩拿不下来',1),(9,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','CD1003',1,10023,'充电桩拿不下来',1),(10,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','CD1004',1,10023,'充电桩拿不下来',1),(11,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','CD1005',1,10023,'充电桩拿不下来',1),(12,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','CD1006',1,10023,'充电桩拿不下来',1),(13,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','MD1002',1,10023,'充电桩拿不下来',1),(14,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','MD1003',1,10023,'充电桩拿不下来',1),(15,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','MD1004',1,10023,'充电桩拿不下来',1),(16,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','MD1005',1,10023,'充电桩拿不下来',1),(17,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','MD1006',1,10023,'充电桩拿不下来',1),(18,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','MD1007',1,10023,'充电桩拿不下来',1),(19,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','MD1008',1,10023,'充电桩拿不下来',1),(20,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','VX1002',1,10023,'充电桩拿不下来',1),(21,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','VX1003',1,10023,'充电桩拿不下来',1),(22,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','VX1004',1,10023,'充电桩拿不下来',1),(23,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','VX1005',1,10023,'充电桩拿不下来',1),(24,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','VX1006',1,10023,'充电桩拿不下来',1),(25,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','VX1007',1,10023,'充电桩拿不下来',1),(26,'2025-09-13 17:01:37','2025-09-13 17:01:37','上海宝山','VX1008',1,10023,'充电桩拿不下来',1);
/*!40000 ALTER TABLE `alarm` ENABLE KEYS */;
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
