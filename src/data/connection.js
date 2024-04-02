import postgres from 'postgres'
import dotenv from 'dotenv';
dotenv.config()

const connectionString = `postgres://${process.env.SQL_USER}:${process.env.SQL_PASSWORD}@${process.env.SQL_HOST}:${process.env.SQL_PORT}/${process.env.SQL_DB}`;

const pool = postgres(connectionString, {     
    host     : process.env.SQL_HOST,
    port     : process.env.SQL_PORT,
    database : process.env.SQL_DB,
    username : process.env.SQL_USER,
    password : process.env.SQL_PASSWORD,
});

// il y aura toute la liste des fonctions contenant les requêtes SQL nécessaires avec les paramètres adéquats

// Utiliser une promesse pour gérer les requêtes
const queryDatabase = async () => {
    try {
        const entites = await pool`
        select
          *
        from entite
        `;
        return entites;
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error);
    }
};

export const resultatTestFN = await queryDatabase();