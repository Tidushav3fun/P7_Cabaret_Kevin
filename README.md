  Backend

  Installation
    Démarrez npm install puis vous devez créer un fichier .env dans le dossier backend du projet et y renseigner les champs suivants :
        DATABASE = le nom de la base de données souhaité
        DATABASE_HOST = le host souhaité (ex : localhost)
        DATABASE_PASSWORD = le mot de passe utilisateur de votre admin MySQL
        DATABASE_USER = le nom de votre utilisateur (ex : root)
        TOKEN_SECRET = votre token souhaité

    Lancer node config_db.js
    Enfin, lancez le serveur avec nodemon server

  Frontend

    Ouvrir le terminal dans le dossier frontend et exécuter npm install pour installer les     dépendances.
    Intallez Sass : npm i --s node-sass@4.14.1
    Accéder au serveur de développement npm start
    Rendez-vous à l'adresse suivante : http://localhost:3000
