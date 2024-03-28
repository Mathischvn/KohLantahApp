-- Active: 1711532157725@@127.0.0.1@5432@db_test
CREATE TABLE IF NOT EXISTS section (
    id SERIAL PRIMARY KEY,
    numero_section INT,
    libelle VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS sous_section (
  	id SERIAL PRIMARY KEY,
	libelle VARCHAR(255),
  	enfant1 INT,
  	condition_enfant1 VARCHAR(50),
  	enfant2 INT,
  	condition_enfant2 VARCHAR(50),
  	enfant3 INT,
  	condition_enfant3 VARCHAR(50),
  	section INT,
   	booleen_combat BOOLEAN,
  	entite INT,
  	booleen_lancer_de BOOLEAN,
    booleen_enigme BOOLEAN,
  	condition_reussite_action VARCHAR(50),
  	libelle_action_reussie VARCHAR(255),
  	libelle_action_ratee VARCHAR(255),
  	recompenses VARCHAR(50),
   	FOREIGN KEY(section) REFERENCES section(id),
  	FOREIGN KEY(entite) REFERENCES entite(id),
  	FOREIGN KEY(enfant1) REFERENCES sous_section(id),
  	FOREIGN KEY(enfant2) REFERENCES sous_section(id),
  	FOREIGN KEY(enfant3) REFERENCES sous_section(id)
);

CREATE TABLE IF NOT EXISTS objet (
	id SERIAL PRIMARY KEY,
	booleen_equipable BOOLEAN,
	booleen_utilisation_unique BOOLEAN,
  	statistiques VARCHAR(255),
  	emplacement VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS entite (
	id SERIAL PRIMARY KEY,
	booleen_agressivite BOOLEAN,
  	statistiques VARCHAR(255)
);

