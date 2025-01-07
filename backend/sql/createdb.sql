CREATE SCHEMA IF NOT EXISTS `portfolio`;
USE portfolio;

#creating tables

CREATE TABLE Klients (
    ID INT NOT NULL AUTO_INCREMENT,
    Imie VARCHAR(20) NOT NULL,
    Nazwisko VARCHAR(20) NOT NULL,
    Kontakt VARCHAR(40) NOT NULL,
    CONSTRAINT Klient_pk PRIMARY KEY (ID)
);

CREATE TABLE Autor (
    ID INT NOT NULL AUTO_INCREMENT,
    Imie VARCHAR(20) NOT NULL,
    Nazwisko VARCHAR(20) NOT NULL,
    Biografia VARCHAR(1000),
    Email VARCHAR(30),
    LinkInstagram VARCHAR(100),
    LinkFiverr VARCHAR(100),
    CONSTRAINT Autor_pk PRIMARY KEY (ID)
);

CREATE TABLE Kategoria (
    ID INT NOT NULL AUTO_INCREMENT,
    Opis VARCHAR(100) NOT NULL,
    Nazwa_narzedzi VARCHAR(40),
    CONSTRAINT Kategoria_pk PRIMARY KEY (ID)
);

CREATE TABLE Projekt (
    ID INT NOT NULL AUTO_INCREMENT,
    Opis VARCHAR(300) NOT NULL,
    Termin DATE NOT NULL,
    Status_pr VARCHAR(20) NOT NULL,
    Cena INT NOT NULL,
    Autor_ID INT,
    Kategoria_ID INT,
    CONSTRAINT Projekt_pk PRIMARY KEY (ID)
);

CREATE TABLE Recenzja (
    Projekt_ID INT NOT NULL,
    Klient_ID INT NOT NULL,
    Ocena_wymagan FLOAT(3, 2) NOT NULL,
    Ocena_czasu FLOAT(3, 2) NOT NULL,
    Wrazenie VARCHAR(500),
    CONSTRAINT Recenzja_pk PRIMARY KEY (Projekt_ID, Klient_ID)
);

#foreign keys
ALTER TABLE Projekt ADD CONSTRAINT Project_Autor FOREIGN KEY Autor_Project (Autor_ID)
    REFERENCES Autor (ID);

ALTER TABLE Projekt ADD CONSTRAINT Project_Kategoria FOREIGN KEY Project_Kategoria (Kategoria_ID)
    REFERENCES Kategoria (ID);


ALTER TABLE Recenzja 
    ADD CONSTRAINT Recenzja_Project FOREIGN KEY (Projekt_ID)
    REFERENCES Projekt (ID);

ALTER TABLE Recenzja 
    ADD CONSTRAINT Recenzja_Klients FOREIGN KEY (Klients_ID)
    REFERENCES Klients (ID);
