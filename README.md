Web Portfolio:

Description: The project consists of two parts, backend: which is the express server to run the API with which the client side interacts, frontend: represents the SPA web application through which the user interacts with the application.

- Compilation Steps:
First of all, you need to install all the dependencies in the backend folder:
npm install

You also need to install the dependencies in the frontend/react-app folder:
npm install.

After these steps, we need to create our MySQL database, all the scripts are in the folder: backend/sql.

Now we can run our API and react-app:
in the backend folder: node app.js
in the react-app folder: npm start

- Implemented functionalities:
1) Registration-After entering the application, the user is a guest, and the guest can register by entering correct data.
2) Login-The guest can log in by entering correct data and obtain the role of a user or administrator (if such data has been entered).
3) Logout-The user or administrator can log out and then obtain the role of a guest.
4) Adding a new project-Only the administrator can add new projects to the application, which will be immediately visible.
5) Adding a client to the project-When creating a new project, the administrator will have to create a new client for the project.
6) Adding a review to the project-Creating a review for the project is mandatory and is the responsibility of the administrator.
7) Deleting a project-Administrator functionality.
8) Changing project details-Changes affect only the data of the project itself (administrator functionality).
9) Changing client data-Changes only apply to changes in client data related to the project.
10) Changing review details-Changes only apply to changes to review data related to the project
11) Viewing projects by category-all users.
12) Adding comments-Only logged in users (User) can add comments.
13) Viewing comments-All users can view comments they have left.

- Roles:
1) Guest
2) User
3) Admin

- Technologies:
1) Express.js - Backend (API server)
2) React.js - Frontend (SPA)
3) bcrypt - For password hashing and security
4) React Router - For navigating the app
5) Axios - For making API requests
6) Node.js - For starting the server
7) Sequelize (ORM) - For interacting with the database
8) js-cookie - for managing session cookies and roles on the client.
9) Express-session - for managing user sessions on the server.



