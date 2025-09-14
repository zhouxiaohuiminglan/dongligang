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
-- Table structure for table `map`
--

DROP TABLE IF EXISTS `map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `position` point NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `count` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map`
--

LOCK TABLES `map` WRITE;
/*!40000 ALTER TABLE `map` DISABLE KEYS */;
INSERT INTO `map` VALUES (1,_binary '\0\0\0\0\0\0\0\��g?R]@cE\r�a�C@','北京西单充电站',1,135),(2,_binary '\0\0\0\0\0\0\0?XƆn_^@���y<?@','上海陆家嘴充电站',2,125),(3,_binary '\0\0\0\0\0\0\0x��\�\�T\\@�\n\�b�7@','广州花城广场充电站',2,123),(4,_binary '\0\0\0\0\0\0\0x�ܙ	�\\@v�A]�H6@','深圳大梅沙充电站',1,110),(5,_binary '\0\0\0\0\0\0\0�̒\05Z@k�j�Ҩ>@','成都天府广场充电站',5,125),(6,_binary '\0\0\0\0\0\0\0��\�l�<[@�JxB�!A@','西安钟楼充电站',4,115),(7,_binary '\0\0\0\0\0\0\0Υ��\�	^@[[x^*F>@','杭州西湖充电站',1,104),(8,_binary '\0\0\0\0\0\0\0\�{c\0�]@\�5�o�@@','南京夫子庙充电站',2,129),(9,_binary '\0\0\0\0\0\0\0S\�\�\�L]@0\�x�ŊC@','天津意大利风情区充电站',2,123),(10,_binary '\0\0\0\0\0\0\0q\�\�\�^@Zg|_\\B@','青岛栈桥充电站',1,123),(11,_binary '\0\0\0\0\0\0\0Y\����\\@QJV՗>@','武汉黄鹤楼充电站',2,102),(12,_binary '\0\0\0\0\0\0\0t]���\�]@�R\�:@','福州三坊七巷充电站',4,107),(13,_binary '\0\0\0\0\0\0\0>Y1\\R]@j���v\�?@','合肥包公园充电站',2,100),(14,_binary '\0\0\0\0\0\0\0hz��L�Z@�Z�[!�=@','重庆解放碑充电站',2,117),(15,_binary '\0\0\0\0\0\0\0�����[@+L\�kF9@','桂林漓江充电站',2,106),(16,_binary '\0\0\0\0\0\0\0\�\�G�\'^@�&\Z�L?@','苏州园区充电站',2,115),(17,_binary '\0\0\0\0\0\0\0�qS�Y@ϡU1\�8@','昆明滇池充电站',1,112),(18,_binary '\0\0\0\0\0\0\0\�{��[@���*\�\�6@','南宁青秀山充电站',2,117),(19,_binary '\0\0\0\0\0\0\0��P�<\\@\"��\�k:<@','长沙橘子洲头充电站',2,112),(20,_binary '\0\0\0\0\0\0\0\\:\�<�_@�֦��\�F@','哈尔滨中央大街充电站',2,107),(21,_binary '\0\0\0\0\0\0\0H\�)s�\\@Y6sHjC@','石家庄正定古城充电站',4,103),(22,_binary '\0\0\0\0\0\0\01?74e�Y@���\�\�B@','兰州黄河桥充电站',5,126),(23,_binary '\0\0\0\0\0\0\0\�5�\�?]@���eWB@','济南大明湖充电站',1,132),(24,_binary '\0\0\0\0\0\0\0�\�E�\�^@��%!\�D@','沈阳故宫充电站',4,108),(25,_binary '\0\0\0\0\0\0\0\�7>[\�]@e����:@','福州西湖充电站',2,113),(26,_binary '\0\0\0\0\0\0\0\�R\\U�^@R�U�?@','无锡灵山大佛充电站',1,123),(27,_binary '\0\0\0\0\0\0\0u\�yƾc\\@�Z\'.\�mA@','郑州二七广场充电站',1,120),(28,_binary '\0\0\0\0\0\0\0\'\�+�Vg^@�\��tC@','大连星海广场充电站',2,117),(29,_binary '\0\0\0\0\0\0\0�\��Rc^@�\�\�C\�\�=@','宁波天一广场充电站',4,130),(30,_binary '\0\0\0\0\0\0\0�\Z����Z@\�\�nI�:@','贵阳甲秀楼充电站',1,114),(31,_binary '\0\0\0\0\0\0\0\�\�Ee\\@\�1!\�F6@','珠海长隆海洋王国充电站',1,114),(32,_binary '\0\0\0\0\0\0\0rS\�\�l]@�^\�\�W�C@','天津滨海新区充电站',1,129),(33,_binary '\0\0\0\0\0\0\0rS\�\�l]@�^\�\�W�C@','天津滨海新区充电站12',1,109),(35,_binary '\0\0\0\0\0\0\0U/�\�d�\\@\'�\�Q��<@','南昌站',4,188);
/*!40000 ALTER TABLE `map` ENABLE KEYS */;
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
