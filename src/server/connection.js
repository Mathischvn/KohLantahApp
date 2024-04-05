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
            item.action = section_action[0];
            item.choix = section_choix;
        });
        return section[0];
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error);
    }
};

export const getPlayer = async (name) => {
  try {
      const player = await pool`
      SELECT
        *
      FROM personnage
      WHERE nom=${name}
      `;
      return player;
  } catch (error) {
      console.error('Erreur lors de l\'insertion du personnage :', error);
  }
};

export const insertPlayer = async (name) => {
  try {
      await pool`
      INSERT INTO
        personnage (nom, statistiques)
      VALUES (${name}, 'intelligence:10;force:10;hp:10');
      `;
  } catch (error) {
      console.error('Erreur lors de l\'insertion du personnage :', error);
  }
};

export const getIdPersonnage = async (name) => {
    try {
        const player = await pool`
        SELECT
            id
        FROM personnage
        WHERE nom=${name}
        `;
        return player;
    } catch (error) {
        console.error('Erreur lors de l\'insertion du personnage :', error);
    }
}

export const getInventoryItemPlayer = async (id_personnage, id_objet) => {
    try {
        const inventoryItem = await pool`
        SELECT
            *
        FROM inventaire
        WHERE id_personnage=${id_personnage} AND id_objet=${id_objet}
        `;
        return inventoryItem;
    } catch (error) {
        console.error('Erreur lors de l\'insertion du personnage :', error);
    }
}
export const insertItem = async (name, id_item) => {
    try {
        const player = await getIdPersonnage(name);
        const lengthInventoryRequest = await getInventoryItemPlayer(player[0].id, id_item)
        if (lengthInventoryRequest.length == 0) {
            console.log('Item déjà présent dans l\'inventaire');
            await pool`
            INSERT INTO inventaire(id_objet, id_personnage) VALUES(${id_item}, ${player[0].id}); 
            `;
        }
    } catch (error) {
        console.error('Erreur lors de l\'insertion de l\'item :', error);
    }
}

export const getPlayerInventory = async (name) => {
    try {
        const player = await getIdPersonnage(name);
        const inventory = await pool`
        SELECT (id_objet, id_personnage) FROM inventaire WHERE id_personnage=${player[0].id};
        `;
        return inventory;
    } catch (error) {
        console.error('Erreur lors de l\'insertion du personnage :', error);
    }
}


export const getItem = async (playerName) => {
    try {
        const inventory = await getPlayerInventory(playerName);
        const inventoryItem = inventory[0].row.split(',')[0].replace("(", "");
        console.log(inventory);
        console.log(inventoryItem)
        const item = await pool`
        SELECT
            *
        FROM objet
        WHERE id=${inventoryItem}
        `;
        return item;
    } catch (error) {
        console.error('Erreur lors de l\'insertion du personnage :', error);
    }
}


export const resEntite = await queryEntity("Polus");
export const resSection = await querySection("1");