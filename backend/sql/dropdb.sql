USE portfolio;

ALTER TABLE `Recenzja` DROP FOREIGN KEY Recenzja_Project;
ALTER TABLE `Recenzja` DROP FOREIGN KEY Recenzja_Klient;
ALTER TABLE `Projekt` DROP FOREIGN KEY Project_Autor;
ALTER TABLE `Projekt` DROP FOREIGN KEY Project_Kategoria;

DROP TABLE IF EXISTS `Recenzja`;
DROP TABLE IF EXISTS `Projekt`;
DROP TABLE IF EXISTS `Kategoria`;
DROP TABLE IF EXISTS `Autor`;
DROP TABLE IF EXISTS `Klients`;


DROP SCHEMA IF EXISTS `portfolio`;