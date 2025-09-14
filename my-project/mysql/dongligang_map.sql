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
INSERT INTO `map` VALUES (1,_binary '\0\0\0\0\0\0\0\Üôg?R]@cE\r¦aôC@','åŒ—äº¬è¥¿å•å……ç”µç«™',1,135),(2,_binary '\0\0\0\0\0\0\0?XÆ†n_^@˜„y<?@','ä¸Šæµ·é™†å®¶å˜´å……ç”µç«™',2,125),(3,_binary '\0\0\0\0\0\0\0x¹ˆ\ï\ÄT\\@¯\n\Ôbğ7@','å¹¿å·èŠ±åŸå¹¿åœºå……ç”µç«™',2,123),(4,_binary '\0\0\0\0\0\0\0xµÜ™	Š\\@vúA]¤H6@','æ·±åœ³å¤§æ¢…æ²™å……ç”µç«™',1,110),(5,_binary '\0\0\0\0\0\0\0÷Ì’\05Z@kôj€Ò¨>@','æˆéƒ½å¤©åºœå¹¿åœºå……ç”µç«™',5,125),(6,_binary '\0\0\0\0\0\0\0®ô\Úl¬<[@”JxB¯!A@','è¥¿å®‰é’Ÿæ¥¼å……ç”µç«™',4,115),(7,_binary '\0\0\0\0\0\0\0Î¥¸ª\ì	^@[[x^*F>@','æ­å·è¥¿æ¹–å……ç”µç«™',1,104),(8,_binary '\0\0\0\0\0\0\0\Ğ{c\0³]@\Ò5“o¶@@','å—äº¬å¤«å­åº™å……ç”µç«™',2,129),(9,_binary '\0\0\0\0\0\0\0S\Í\ç\ÜL]@0\Ùx°ÅŠC@','å¤©æ´¥æ„å¤§åˆ©é£æƒ…åŒºå……ç”µç«™',2,123),(10,_binary '\0\0\0\0\0\0\0q\È\Ò\Å^@Zg|_\\B@','é’å²›æ ˆæ¡¥å……ç”µç«™',1,123),(11,_binary '\0\0\0\0\0\0\0Y\Û‹“\\@QJVÕ—>@','æ­¦æ±‰é»„é¹¤æ¥¼å……ç”µç«™',2,102),(12,_binary '\0\0\0\0\0\0\0t]øÁù\Ò]@µR\ä:@','ç¦å·ä¸‰åŠä¸ƒå··å……ç”µç«™',4,107),(13,_binary '\0\0\0\0\0\0\0>Y1\\R]@j¤¥òv\Ü?@','åˆè‚¥åŒ…å…¬å›­å……ç”µç«™',2,100),(14,_binary '\0\0\0\0\0\0\0hz‰±L£Z@ŠZš[!=@','é‡åº†è§£æ”¾ç¢‘å……ç”µç«™',2,117),(15,_binary '\0\0\0\0\0\0\0’’[@+L\ßkF9@','æ¡‚æ—æ¼“æ±Ÿå……ç”µç«™',2,106),(16,_binary '\0\0\0\0\0\0\0\æ\ØG§\'^@ó&\Z¤L?@','è‹å·å›­åŒºå……ç”µç«™',2,115),(17,_binary '\0\0\0\0\0\0\0—qSµY@Ï¡U1\á8@','æ˜†æ˜æ»‡æ± å……ç”µç«™',1,112),(18,_binary '\0\0\0\0\0\0\0\á{ƒö[@„›Œ*\Ã\Ğ6@','å—å®é’ç§€å±±å……ç”µç«™',2,117),(19,_binary '\0\0\0\0\0\0\0¹ÁP‡<\\@\"§¯\çk:<@','é•¿æ²™æ©˜å­æ´²å¤´å……ç”µç«™',2,112),(20,_binary '\0\0\0\0\0\0\0\\:\æ<¢_@™Ö¦±½\æF@','å“ˆå°”æ»¨ä¸­å¤®å¤§è¡—å……ç”µç«™',2,107),(21,_binary '\0\0\0\0\0\0\0H\Ã)só \\@Y6sHjC@','çŸ³å®¶åº„æ­£å®šå¤åŸå……ç”µç«™',4,103),(22,_binary '\0\0\0\0\0\0\01?74eõY@›’¬\Ã\ÑB@','å…°å·é»„æ²³æ¡¥å……ç”µç«™',5,126),(23,_binary '\0\0\0\0\0\0\0\ã5¯\ê¬?]@…™¶eWB@','æµå—å¤§æ˜æ¹–å……ç”µç«™',1,132),(24,_binary '\0\0\0\0\0\0\0Á\ÄE\Û^@¿µ%!\çD@','æ²ˆé˜³æ•…å®«å……ç”µç«™',4,108),(25,_binary '\0\0\0\0\0\0\0\Å7>[\Ó]@e¦´ş–:@','ç¦å·è¥¿æ¹–å……ç”µç«™',2,113),(26,_binary '\0\0\0\0\0\0\0\çR\\Uö^@RóUò±?@','æ— é”¡çµå±±å¤§ä½›å……ç”µç«™',1,123),(27,_binary '\0\0\0\0\0\0\0u\ÌyÆ¾c\\@¸Z\'.\ÇmA@','éƒ‘å·äºŒä¸ƒå¹¿åœºå……ç”µç«™',1,120),(28,_binary '\0\0\0\0\0\0\0\'\Ü+óVg^@¹\àştC@','å¤§è¿æ˜Ÿæµ·å¹¿åœºå……ç”µç«™',2,117),(29,_binary '\0\0\0\0\0\0\0¸\àŸRc^@£\Î\ÜC\Â\ß=@','å®æ³¢å¤©ä¸€å¹¿åœºå……ç”µç«™',4,130),(30,_binary '\0\0\0\0\0\0\0—\Z¡Ÿ©­Z@\Û\ŞnI”:@','è´µé˜³ç”²ç§€æ¥¼å……ç”µç«™',1,114),(31,_binary '\0\0\0\0\0\0\0\á´\àEe\\@\ï¨1!\æF6@','ç æµ·é•¿éš†æµ·æ´‹ç‹å›½å……ç”µç«™',1,114),(32,_binary '\0\0\0\0\0\0\0rS\Í\çl]@’^\Ô\îW…C@','å¤©æ´¥æ»¨æµ·æ–°åŒºå……ç”µç«™',1,129),(33,_binary '\0\0\0\0\0\0\0rS\Í\çl]@’^\Ô\îW…C@','å¤©æ´¥æ»¨æµ·æ–°åŒºå……ç”µç«™12',1,109),(35,_binary '\0\0\0\0\0\0\0U/¿\Ódó\\@\'¾\ÚQœ§<@','å—æ˜Œç«™',4,188);
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
