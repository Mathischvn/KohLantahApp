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
        const section_entite = await pool`
        SELECT
        *
        FROM entite
        WHERE id  = ${section[0].entite}
        `;
        section.map((item) => {
            item.action = section_action[0];
            item.choix = section_choix;
            if (section_entite != undefined){
                item.entite = section_entite[0];
            }
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

  export const getPlayerWithPassword = async (name, password) => {
    try {
        const player = await pool`
        SELECT
          *
        FROM personnage
        WHERE nom=${name} AND mdp=${password}
        `;
        return player;
    } catch (error) {
        console.error('Erreur lors de la récupération du personnage :', error);
    }
  };

  export const queryItem = async (id) => {
    try {
        const item = await pool`
        SELECT
          *
        FROM objet
        WHERE id=${id}
        `;
        return item;
    } catch (error) {
        console.error('Erreur lors de l\'insertion du personnage :', error);
    }
  };
  
  
  export const insertPlayer = async (name, password) => {
    try {
        await pool`
        INSERT INTO
          personnage (nom, statistiques, mdp, id_section)
        VALUES (${name}, 'intelligence:10;force:10;hp:10', ${password}, 1);
        `;
    } catch (error) {
        console.error('Erreur lors de l\'insertion du personnage :', error);
    }
  };

  export const updatePlayerSection = async (name, id_section) => {
    try {
        await pool`
        UPDATE personnage SET id_section = ${id_section}
        WHERE nom = ${name};
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
          console.error('Erreur lors de la récupération de l\item depuis l\'inventaire :', error);
      }
  }
  
  
    export const insertItem = async (name, id_item) => {
        try {
            console.error("Name :", name)
            const player = await getIdPersonnage(name);
            console.error("Player :", player)
            console.error("Player :", player[0])
            const inventoryItem = await getInventoryItemPlayer(player[0].id, id_item);

            

            if (inventoryItem.length === 0) {
                await pool`
                    INSERT INTO inventaire (id_objet, id_personnage, is_equipped) VALUES (${id_item}, ${player[0].id}, false); 
                `;
                //console('Item inséré avec succès.');
            } else {
                console.error('L\'item est déjà présent dans l\'inventaire.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'insertion de l\'item :', error);
        }
    }

    export const verifyItem = async (name, id_item) => {
        try {
            const player = await getIdPersonnage(name);
            const inventory = await pool`
            SELECT (id_objet, id_personnage) FROM inventaire WHERE id_personnage=${player[0].id} AND id_objet=${id_item};
            `;
            console.log(inventory)
            if (inventory.length > 0){
                return true
            }
            else{
                return false
            }
        } catch (error) {
            console.error('Erreur lors de l\'insertion du personnage :', error);
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
  
  
  export const getItemsInInventory = async (playerName) => {
      try {
          const inventory = await getPlayerInventory(playerName);
  
          if (inventory.length === 0) {
              console.error('L\'inventaire est vide.');
              return null; // Ou une autre valeur par défaut selon votre logique
          }
  
          for (let i = 0; i < inventory.length; i++) {
              const inventoryItem = await pool`
                  SELECT *
                  FROM objet
                  WHERE id=${inventory[i].row.split(',')[0].replace("(", "")}
              `;
              inventory[i] = inventoryItem;
          }
          //console('Inventaire récupéré avec succès :', inventory);
          return inventory;
      } catch (error) {
          console.error('Erreur lors de la récupération de l\'item :', error);
      }
  }
  
  
  export const getPlayerStats = async (name) => {
      try {
          const player = await getPlayer(name);
          //console('Statistiques récupérées avec succès :', player[0].statistiques);
          const intelligence = player[0].statistiques.split(';')[0].split(':')[1];
          const force = player[0].statistiques.split(';')[1].split(':')[1];
          const hp = player[0].statistiques.split(';')[2].split(':')[1];
          return [intelligence, force, hp]
      } catch (error) {
          console.error('Erreur lors de la récupération des statistiques du joueur : ', error);
      }
  }
  
  
  export const getAllItems = async () => {
      //console("récupération des tous les items")
      try {
          const allItems = await pool`
          SELECT *
          FROM objet;`;
      
          if (allItems.length === 0){
              //console("Pas d'items disponible")
          } else {
              //console("Les items disponibles : ", allItems)
          }
  
      return allItems
  
      } catch (error) {
          console.error("Erreur lors de la récupération des items : ", error)
      }
  }
  
  
  export const getItemById = async (id_objet) => {
      try {
          const item = await pool`
          SELECT
              *
          FROM objet
          WHERE id=${id_objet}
          `;
          return item;
      } catch (error) {
          console.error('Erreur lors de la récupération de l\item :', error);
      }
  }

  export const equip_item = async (nom_personnage, id_objet) => {
    try {
        const player = await getIdPersonnage(nom_personnage);
        const inventoryItem = await getInventoryItemPlayer(player[0].id, id_objet);
        console.log("Inventory item : ", inventoryItem);

        if (inventoryItem[0].is_equipped === false) {
            await pool`
                UPDATE inventaire
                SET is_equipped = TRUE
                WHERE id_personnage=${player[0].id} AND id_objet=${id_objet};
            `;
            console.log(`L'item ${id_objet} a été équipé.`);
        } else {
            await pool`
                UPDATE inventaire
                SET is_equipped = FALSE
                WHERE id_personnage=${player[0].id} AND id_objet=${id_objet};
            `;
            console.log(`L'item ${id_objet} a été déséquipé.`);
        }
    } catch (error) {
        console.error('Erreur lors de l\'équipement de l\'item :', error);
    }
  }

  
  export const resEntite = await queryEntity("Polus");
  export const resSection = await querySection("1");