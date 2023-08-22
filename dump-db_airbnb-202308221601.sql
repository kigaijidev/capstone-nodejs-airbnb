-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: db_airbnb
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BinhLuan`
--

DROP TABLE IF EXISTS `BinhLuan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BinhLuan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int DEFAULT NULL,
  `ma_nguoi_binh_luan` int DEFAULT NULL,
  `ngay_binh_luan` timestamp NULL DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `ma_phong` (`ma_phong`),
  KEY `ma_nguoi_binh_luan` (`ma_nguoi_binh_luan`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`id`) ON DELETE CASCADE,
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BinhLuan`
--

LOCK TABLES `BinhLuan` WRITE;
/*!40000 ALTER TABLE `BinhLuan` DISABLE KEYS */;
INSERT INTO `BinhLuan` VALUES (8,6,5,'2023-08-22 07:03:59','comment 1',4,'2023-08-22 07:03:59.033'),(9,6,5,'2023-08-22 07:03:59','comment 1',4,'2023-08-22 07:03:59.225'),(10,6,5,'2023-08-22 07:03:59','comment 1',4,'2023-08-22 07:03:59.389'),(11,6,5,'2023-08-22 07:04:00','Phòng đẹp',5,'2023-08-22 07:03:59.535'),(12,6,5,'2023-08-22 07:04:00','comment 1',4,'2023-08-22 07:03:59.693'),(13,8,5,'2023-08-22 07:04:26','comment 2',4,'2023-08-22 07:04:25.709');
/*!40000 ALTER TABLE `BinhLuan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DatPhong`
--

DROP TABLE IF EXISTS `DatPhong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DatPhong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int DEFAULT NULL,
  `ngay_den` date DEFAULT NULL,
  `ngay_di` date DEFAULT NULL,
  `so_luong_khach` int DEFAULT NULL,
  `ma_nguoi_dat` int DEFAULT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `ma_phong` (`ma_phong`),
  KEY `ma_nguoi_dat` (`ma_nguoi_dat`),
  CONSTRAINT `DatPhong_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`id`) ON DELETE CASCADE,
  CONSTRAINT `DatPhong_ibfk_2` FOREIGN KEY (`ma_nguoi_dat`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DatPhong`
--

LOCK TABLES `DatPhong` WRITE;
/*!40000 ALTER TABLE `DatPhong` DISABLE KEYS */;
INSERT INTO `DatPhong` VALUES (3,6,'2023-08-07','2023-08-08',2,4,'2023-08-21 11:23:45.075'),(5,6,'2023-09-06','2023-09-07',2,5,'2023-08-22 06:57:42.322'),(6,6,'2023-09-02','2023-09-03',2,5,'2023-08-22 06:58:35.524'),(7,6,'2023-09-01','2023-09-01',2,5,'2023-08-22 06:58:41.874');
/*!40000 ALTER TABLE `DatPhong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GhimPhong`
--

DROP TABLE IF EXISTS `GhimPhong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GhimPhong` (
  `ma_nguoi_dung` int NOT NULL,
  `ma_phong` int NOT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`ma_nguoi_dung`,`ma_phong`),
  KEY `GhimPhong_FK_1` (`ma_phong`),
  CONSTRAINT `GhimPhong_FK` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE,
  CONSTRAINT `GhimPhong_FK_1` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GhimPhong`
--

LOCK TABLES `GhimPhong` WRITE;
/*!40000 ALTER TABLE `GhimPhong` DISABLE KEYS */;
/*!40000 ALTER TABLE `GhimPhong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LoaiPhong`
--

DROP TABLE IF EXISTS `LoaiPhong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LoaiPhong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trang_thai` tinyint(1) NOT NULL DEFAULT '1',
  `ten_loai` varchar(255) NOT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LoaiPhong`
--

LOCK TABLES `LoaiPhong` WRITE;
/*!40000 ALTER TABLE `LoaiPhong` DISABLE KEYS */;
INSERT INTO `LoaiPhong` VALUES (1,1,'Nhà nghỉ','2023-08-21 09:27:18.491'),(2,1,'Chung cư','2023-08-21 09:27:40.945');
/*!40000 ALTER TABLE `LoaiPhong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NguoiDung`
--

DROP TABLE IF EXISTS `NguoiDung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NguoiDung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birth_day` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NguoiDung`
--

LOCK TABLES `NguoiDung` WRITE;
/*!40000 ALTER TABLE `NguoiDung` DISABLE KEYS */;
INSERT INTO `NguoiDung` VALUES (4,'Test Admin 1','testadmin1@gmail.com','$2b$10$5fd6mxJH5NgY.vsLfig11O/mCj7CkChIJ2j1W7wVecog0B2wACOTe','0000000000','1995-05-01','male','user',NULL,0,'2023-08-21 08:53:06.328'),(5,'Test User','testuser@gmail.com','$2b$10$Oij4Etk4m9r7UAVco1wQ4OIze8IIo4ECTiG3sUUGxqfI0MVIbmdVu','1111111111','1999-05-06','female','user',NULL,0,'2023-08-21 10:25:25.942');
/*!40000 ALTER TABLE `NguoiDung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Phong`
--

DROP TABLE IF EXISTS `Phong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Phong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_vi_tri` int DEFAULT NULL,
  `ten_phong` varchar(255) DEFAULT NULL,
  `khach` int DEFAULT NULL,
  `phong_ngu` int DEFAULT NULL,
  `giuong` int DEFAULT NULL,
  `phong_tam` int DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `may_giat` tinyint(1) DEFAULT NULL,
  `ban_la` tinyint(1) DEFAULT NULL,
  `tivi` tinyint(1) DEFAULT NULL,
  `dieu_hoa` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `bep` tinyint(1) DEFAULT NULL,
  `do_xe` tinyint(1) DEFAULT NULL,
  `ho_boi` tinyint(1) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `chu_phong` int NOT NULL,
  `loai_phong` int DEFAULT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `ma_vi_tri` (`ma_vi_tri`),
  KEY `Phong_FK_1` (`loai_phong`),
  KEY `Phong_FK` (`chu_phong`),
  CONSTRAINT `Phong_FK` FOREIGN KEY (`chu_phong`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Phong_FK_1` FOREIGN KEY (`loai_phong`) REFERENCES `LoaiPhong` (`id`),
  CONSTRAINT `Phong_ibfk_1` FOREIGN KEY (`ma_vi_tri`) REFERENCES `ViTri` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Phong`
--

LOCK TABLES `Phong` WRITE;
/*!40000 ALTER TABLE `Phong` DISABLE KEYS */;
INSERT INTO `Phong` VALUES (6,8,'101',2,1,1,1,'Phòng đơn',250000,0,0,1,1,1,0,1,0,'/public/images/1692610659156zyro-image.png',4,2,'2023-08-21 09:29:47.466'),(8,11,'103',2,1,1,1,'Phòng đơn',250000,0,0,1,1,1,0,1,0,NULL,4,1,'2023-08-21 09:30:05.362');
/*!40000 ALTER TABLE `Phong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ViTri`
--

DROP TABLE IF EXISTS `ViTri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ViTri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(255) DEFAULT NULL,
  `tinh_thanh` varchar(255) DEFAULT NULL,
  `quoc_gia` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ViTri`
--

LOCK TABLES `ViTri` WRITE;
/*!40000 ALTER TABLE `ViTri` DISABLE KEYS */;
INSERT INTO `ViTri` VALUES (8,'Quận 1','TP.Hồ Chí Minh','Việt Nam',NULL,'2023-08-21 09:09:14.003'),(9,'Quận 2','TP.Hồ Chí Minh','Việt Nam',NULL,'2023-08-21 09:09:20.206'),(11,'Quận 4 Update','TP. Hồ Chí Minh','Việt Name','/public/images/1692609066174on-bich-ha-tai-hien-lai-hinh-anh-dac-ky-lam-mua-lam-gio-ngay-nao-khien-netizen-khong-ngung-xuyt-xoa-095-4952177.jpg','2023-08-21 09:09:28.373');
/*!40000 ALTER TABLE `ViTri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_airbnb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-22 16:01:16
