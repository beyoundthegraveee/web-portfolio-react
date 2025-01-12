Web Portfolio:

Opis: projekt składa się z dwóch części, backend: który jest serwerem ekspresowym do uruchamiania API, z którym strona klienta wchodzi w interakcję, frontend: reprezentuje aplikację internetową SPA, za pośrednictwem której użytkownik korzysta z aplikacji.

- Kroki kompilacji:
Przede wszystkim należy zainstalować wszystkie zależności w folderze backend: 
npm install

Należy również zainstalować zależności w folderze frontend/react-app:
npm install.

Po tych krokach musimy utworzyć naszą bazę danych, wszystkie skrypty znajdują się w folderze: backend/sql.

Teraz możemy uruchomić nasze API i react-app:
w folderze backend: node app.js
w folderze react-app: npm start

- Zimplementowane funkcjonalności:
1) Rejestracja-Po wejściu do aplikacji użytkownik jest gościem, a gość może się zarejestrować, wprowadzając prawidłowe dane.
2) Login-Gość może zalogować się poprzez wprowadzenie poprawnych danych i uzyskać rolę użytkownika lub administratora (jeśli takie dane zostały wprowadzone).
3) Logout-Użytkownik lub administrator może się wylogować, a następnie uzyskać rolę gościa.
4) Dodawanie nowego projektu-Tylko administrator może dodawać nowe projekty do aplikacji, które będą natychmiast widoczne.
5) Dodawanie klienta do projektu-Podczas tworzenia nowego projektu administrator będzie musiał utworzyć nowego klienta dla projektu.
6) Dodawanie recenzji do projektu-Utworzenie recenzji dla projektu jest obowiązkowe i należy do obowiązków administratora.
7) Usuwanie projektu-Funkcjonalność administratora.
8) Zmiana szczegółów projektu-Zmiany mają wpływ tylko na dane samego projektu (funkcjonalność administratora).
9) Zmiana danych klienta-Zmiany dotyczą tylko zmian danych klientów związanych z projektem.
10) Zmiana szczegółów recenzji-Zmiany dotyczą tylko zmian danych recenzji związanych z projektem
11) Wyświetlanie projektów według kategorii-wszyscy użytkownicy.
12) Dodawanie komentarzy-Tylko zalogowani użytkownicy (User) mogą dodawać komentarze.
13) Przeglądanie komentarzy-Wszyscy użytkownicy mogą przeglądać pozostawione przez siebie komentarze.

- Role:
1) Gość
2) User
3) Admin

- Technologie:
1) Express.js – Backend (serwer API)
2) React.js – Frontend (SPA)
3) bcrypt – Do haszowania haseł i bezpieczeństwa
4) React Router – Do nawigacji w aplikacji
5) Axios – Do wykonywania zapytań API
6) Node.js – Do uruchamiania serwera
7) Sequelize (ORM) – Do interakcji z bazą danych
8) js-cookie - do zarządzania ciasteczkami sesyjnymi i rolami na kliencie.
9) Express-session - do zarządzania sesjami użytkowników na serwerze.



