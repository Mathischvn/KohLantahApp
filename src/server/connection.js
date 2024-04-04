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
const queryEntity = async (name) => {
    try {
        const entites = await pool`
        SELECT
          *
        FROM entite
        WHERE libelle=${name}
        `;
        return entites;
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error);
    }
};

export const querySection = async (id) => {
    try {
        const section = await pool`
        SELECT
          *
        FROM section
        WHERE id=${id}
        `;
        const section_action = await pool`
        SELECT
          *
        FROM section_action
        WHERE id_section=${id}
        `;
        const section_choix = await pool`
        SELECT
          *
        FROM section_choix
        WHERE id_section=${id}
        `;
        section.map((item) => {
            item.action = section_action;
            item.choix = section_choix;
        });
        return section;
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error);
    }
};

export const resEntite = await queryEntity("Polus");
export const resSection = await querySection("1");