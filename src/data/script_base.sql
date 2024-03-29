-- Active: 1711532157725@@127.0.0.1@5432@db_test
DROP TABLE if exists recompense;
DROP TABLE if exists objet;
DROP TABLE if exists section;

CREATE TABLE IF NOT EXISTS entite (
    id SERIAL PRIMARY KEY, 
	libelle VARCHAR(255),
	description_prompt TEXT, 
	statistiques VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS objet (
    id SERIAL PRIMARY KEY, 
	booleen_equipable BOOLEAN, 
	booleen_utilisation_unique BOOLEAN, 
	statistiques VARCHAR(255), -- separateur ;
    emplacement VARCHAR(50) -- ex : bijoux, etc.
);

CREATE TABLE IF NOT EXISTS section (
    id INT PRIMARY KEY,
	titre VARCHAR(50), 
	libelle TEXT, 
	description_fond_prompt TEXT, 
	choix1 INT, 
	condition_choix1 VARCHAR(50), 
	libelle_choix1 VARCHAR(50), 
	choix2 INT, 
	condition_choix2 VARCHAR(50), 
	libelle_choix2 VARCHAR(50), 
	choix3 INT, 
	condition_choix3 VARCHAR(50),
	libelle_choix3 VARCHAR(50), 
	booleen_combat BOOLEAN, 
	entite INT, 
	booleen_lancer_de BOOLEAN,
	action_reussite INT,
	action_echec INT,
	booleen_enigme BOOLEAN, 
	condition_reussite_action VARCHAR(50), 
	libelle_action_reussie TEXT, 
	libelle_action_ratee TEXT, 
	FOREIGN KEY (action_reussite) REFERENCES section (id), 
	FOREIGN KEY (action_echec) REFERENCES section (id), 
	FOREIGN KEY (entite) REFERENCES entite (id), 
	FOREIGN KEY (choix1) REFERENCES section (id), 
	FOREIGN KEY (choix2) REFERENCES section (id), 
	FOREIGN KEY (choix3) REFERENCES section (id)
);

CREATE TABLE IF NOT EXISTS recompense (
    id_section INT, 
	id_objet INT, 
	libelle VARCHAR(255), 
	PRIMARY KEY (id_section, id_objet), 
	FOREIGN KEY (id_objet) REFERENCES objet (id), 
	FOREIGN KEY (id_section) REFERENCES section (id)
);

-- ENTITEES
INSERT INTO
	entite (description_prompt, libelle, statistiques)
VALUES (null, 'Polus', null);

-- SECTIONS

INSERT INTO
    section (id, titre, libelle, description_fond_prompt, choix1, condition_choix1, libelle_choix1, choix2, condition_choix2, 
	libelle_choix2, choix3, condition_choix3, libelle_choix3, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES (
	25, 
	'Évasion de la bibliothèque', 'Avec le livre 269 en main, vous vous dirigez vers la sortie de la bibliothèque, votre cœur léger d''avoir réussi votre quête. Vous traversez les rayonnages de livres, revivant les aventures incroyables que vous avez vécues. Finalement, vous atteignez les grandes portes de la bibliothèque et sortez dans la lumière du jour, prêt à partager vos exploits avec le monde extérieur.',
		null,
		null, null, null, null, null, null, null, null, null, false, null, false, false, null, null, null);

INSERT INTO
    section (id, titre, libelle, description_fond_prompt, choix1, condition_choix1, libelle_choix1, choix2, condition_choix2, 
	libelle_choix2, choix3, condition_choix3, libelle_choix3, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES (
	24, 
	'Découverte du livre 269', 'Après avoir surmonté les nombreux défis de la bibliothèque, vous arrivez enfin à l''emplacement du livre 269. Il repose sur un piédestal, brillant d''une lueur mystique.
Avec un sourire de satisfaction, vous le ramassez, sachant que votre mission est accomplie. Vous avez triomphé des épreuves de la bibliothèque des mystères et acquis le précieux livre tant recherché.',
		null,
		25, null, 'S''évader de la bibliothèque', null, null, null, null, null, null, false, null, false, false, null, null, null);

INSERT INTO
    section (id, titre, libelle, description_fond_prompt, choix1, condition_choix1, libelle_choix1, choix2, condition_choix2, 
	libelle_choix2, choix3, condition_choix3, libelle_choix3, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES (
	23, 
	'Combat contre une créature cachée dans les miroirs', 'La créature surgit de l''un des miroirs, ses yeux luisant d''une lueur maléfique. Vous vous préparez à l''affronter, sachant que votre vie dépend de votre habileté au combat.',
		null,
		null, null, null, null, null, null, null, null, null, 24, null, true, 'entite à mettre à là', false, false, 'defence>12;combat>15;intelligence>143', 'Bravo ! Vous avez vaincu le monstre', 'Dommage :(');

INSERT INTO
    section (id, titre, libelle, description_fond_prompt, choix1, condition_choix1, libelle_choix1, choix2, condition_choix2, 
	libelle_choix2, choix3, condition_choix3, libelle_choix3, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES (
	22, 
	'Résolution de l''énigme des réflexions', 'Vous méditez sur l''énigme, essayant de déchiffrer ses mystères. Après un moment de réflexion, vous réalisez que votre reflet ne vous suit pas lorsque vous regardez dans une direction spécifique.
Avec prudence, vous vous dirigez vers cette direction et découvrez une porte cachée derrière un faux mur de miroirs. Vous l''ouvrez et passez à travers, impatient de voir ce qui vous attend.',
		null, 
		null, null, 'Passer la porte cachée', null, null, null, null, 24, null, false, null, false, true, null, null, null);

INSERT INTO
    section (id, titre, libelle, description_fond_prompt, choix1, condition_choix1, libelle_choix1, choix2, condition_choix2, 
	libelle_choix2, choix3, condition_choix3, libelle_choix3, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES (
	21, 
	'Combat contre une créature cachée dans les miroirs','Alors que vous avancez dans la salle des miroirs, une créature émerge soudainement d''un des reflets, prête à vous attaquer. Vous prenez une profonde inspiration et vous préparez à affronter votre ennemi.
		Lancez le dé pour déterminer le résultat de votre combat.',
		null, 
		null, null, 'Passer la porte cachée', null, null, null, null, null, null, 24, null, true, 'entite à mettre à là', false, false, null, null, null);

INSERT INTO
    section (id, titre, libelle, description_fond_prompt, choix1, condition_choix1, libelle_choix1, choix2, condition_choix2, 
	libelle_choix2, choix3, condition_choix3, libelle_choix3, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES (
	20, 
	'Résolution de l''énigme des réflexions','Vous observez attentivement les miroirs, cherchant des indices qui pourraient vous aider à trouver la sortie. Après un moment de réflexion, vous avez une idée.
"La sortie se trouve là où votre reflet ne vous suit pas."
Vous suivez vos instincts et vous dirigez vers l''endroit où votre reflet semble se comporter différemment.',
		null, 
		null, null, 'Passer la porte cachée', null, null, null, null, null, null, 24, null, false, null, false, false, null, null, null);

INSERT INTO
    section (id, titre, libelle, description_fond_prompt, choix1, condition_choix1, libelle_choix1, choix2, condition_choix2, 
	libelle_choix2, choix3, condition_choix3, libelle_choix3, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES (
	19, 
	'Utiliser un dé pour naviguer à travers les miroirs','Vous lancez le dé avec précaution, espérant qu''il vous guidera à travers les miroirs sans vous perdre.
Le dé roule sur le sol et s''arrête sur un chiffre. Vous suivez cette direction, espérant que ce soit le bon chemin.',
		null, 
		null, null, null, null, null, null, null, null, null, 20, 21, false, null, true, false, 'lancer>3', null, null);

INSERT INTO
    section (id, titre, libelle, description_fond_prompt, choix1, condition_choix1, libelle_choix1, choix2, condition_choix2, 
	libelle_choix2, choix3, condition_choix3, libelle_choix3, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES (
	18,
	'Vous entrez dans une salle remplie de miroirs qui réfléchissent votre image dans toutes les directions. Vous réalisez rapidement que trouver la sortie sera plus difficile que prévu.
Que choisissez-vous ?',
		null, 
		19, null, 'Utiliser un dé pour naviguer à travers les miroirs', 22, null, 'Tenter de résoudre l''énigme des réflexions pour trouver la sortie', 23, null, 'Préparez-vous au combat contre une créature cachée dans les miroirs', false, null, false, false, null, null, null);











----------------------------------------------------------------------------

INSERT INTO
    section (titre, libelle, description_fond_prompt, choix1, condition_choix1, libelle_choix1, choix2, condition_choix2, 
	libelle_choix2, choix3, condition_choix3, libelle_choix3, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Première intersection', 'En visitant la bibliothèque, vous atteignez un croisement. À gauche, un couloir sombre semble s''étendre à l''infini. À droite, une lumière tamisée attire votre attention.',
		null,
		null, null, 'Aller à gauche', , null, 'Aller à droite', null, null, null, false, 1, false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, choix1, condition_choix1, libelle_choix1, choix2, condition_choix2, 
	libelle_choix2, choix3, condition_choix3, libelle_choix3, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Introduction', 'Heureux de faire votre connaissance #username. Mon nom est Polus, le gardien de ces lieux. Je vois que vous possédez la clé. Entrez-donc.',
		null,
		2, null, 'Entrer dans la bibliotèque', null, null, null, null, null, null, false, 1, false, false, null, null, null);