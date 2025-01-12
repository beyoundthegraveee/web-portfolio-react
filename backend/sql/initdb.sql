USE portfolio;

INSERT INTO Klients (Imie, Nazwisko, Kontakt) VALUES
('John', 'Smith', 'john.smith@gmail.com'),
('Emily', 'Johnson', 'emily.johnson@gmail.com'),
('Michael', 'Brown', 'michael.brown@gmail.com'),
('Emma', 'Davis', 'emma.davis@gmail.com'),
('William', 'Miller', 'william.miller@gmail.com'),
('Sophia', 'Wilson', 'sophia.wilson@gmail.com'),
('James', 'Moore', 'james.moore@gmail.com'),
('Olivia', 'Taylor', 'olivia.taylor@gmail.com'),
('Benjamin', 'Anderson', 'benjamin.anderson@gmail.com'),
('Charlotte', 'Thomas', 'charlotte.thomas@gmail.com');


INSERT INTO Autor (Imie, Nazwisko, Biografia, Email, LinkInstagram, LinkFiverr) VALUES
('Bogdan', 'Lazarenko', 'Bogdan Lazarenko is a talented designer and artist from Belarus with over 5 years of experience in the creative industry. His passion for art and design started early, leading him to explore a variety of visual mediums and techniques. Known for his unique style and attention to detail, Bogdan specializes in creating functional and visually compelling designs that leave a lasting impression. Over the years, he has worked on numerous projects for startups, creative agencies, and personal art pieces, always striving to bring beauty and creativity to life. When he is not working on client projects, Bogdan enjoys sharing his artistic journey and expertise with aspiring designers. His goal is to inspire others and make the world a more beautiful place through his work.', 'k1llm31mmortal@gmail.com', 'https://www.instagram.com/k1llm31mmortal?', 'https://www.fiverr.com/crmsnlpstck');


INSERT INTO Kategoria (Opis, Nazwa_narzedzi) VALUES
('Album cover', 'Adobe Photoshop'),
('Logo', 'Adobe Photoshop'),
('Tattoo sketch', 'Adobe Illustrator'),
('Banner', 'Adobe Photoshop'),
('Art', 'Adobe Illustrator');

INSERT INTO Projekt (Opis, Termin, Status_pr, Cena, Autor_ID, Kategoria_ID) VALUES
('b1oodrayne soundcloud header', '2024-04-10', 'Done', 200, 1, 4),
('extinct logo', '2024-10-20', 'Done', 200, 1, 2),
('album cover for nezzus with leongagenous', '2024-05-01', 'Done', 300, 1, 1),
('EP cover for weyce', '2024-05-10', 'Done', 300, 1, 1),
('EP cover for veryrare', '2024-03-12', 'Done', 300, 1, 1),
('EP cover for veryrare', '2024-05-22', 'Done', 250, 1, 1),
('tatoo sketch for beyondthegraveee', '2024-06-10', 'Done', 300, 1, 3),
('art for nosgov', '2024-06-16', 'Done', 150, 1, 5),
('scullstructure artwork originally for Sla1', '2024-06-22', 'Done', 250, 1, 5),
('logo for nfdsetsionn', '2024-06-27', 'Done', 300, 1, 2);

INSERT INTO Recenzja (Projekt_ID, Klients_ID, Ocena_wymagan, Ocena_czasu, Wrazenie) VALUES
(1, 1, 4.5, 4.8, 'Excellent work! Highly professional.'),
(2, 2, 4.2, 4.6, 'Creative approach and great execution.'),
(3, 3, 4.8, 4.5, 'Highly recommended. Very satisfied.'),
(4, 4, 5.0, 4.9, 'The best experience I have ever had.'),
(5, 5, 4.7, 4.8, 'Impressive and outstanding work!'),
(6, 6, 4.6, 4.7, 'Great quality and attention to detail.'),
(7, 7, 4.9, 4.8, 'Amazing creativity and quick delivery.'),
(8, 8, 4.4, 4.5, 'Solid and reliable performance.'),
(9, 9, 4.8, 4.7, 'Professional and pleasant to work with.'),
(10, 10, 5.0, 5.0, 'Perfect in every way! Exceeded expectations.');

INSERT INTO Admins (Login, Email, Password)
VALUES ('admin', 'admin@gmail.com', 'admin');

INSERT INTO Comments (Project_ID, Content) 
VALUES 
(1, 'This is the first comment for project 1'),
(1, 'Another insightful comment for project 1'),
(1, 'Great progress on project 1! Keep it up.');

