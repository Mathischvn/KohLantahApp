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
    id SERIAL PRIMARY KEY,
	titre VARCHAR(50), 
	libelle TEXT, 
	description_fond_prompt TEXT, 
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

CREATE TABLE IF NOT EXISTS section_choix (
    id_section INT, 
	id_choix INT,
	condition_choix VARCHAR(255),
	libelle_choix VARCHAR(255), 
	PRIMARY KEY (id_section, id_choix), 
	FOREIGN KEY (id_section) REFERENCES section(id), 
	FOREIGN KEY (id_choix) REFERENCES section(id)
);

-- ENTITEES
INSERT INTO
	entite (description_prompt, libelle, statistiques)
VALUES (null, 'Polus', null);

-- SECTIONS
INSERT INTO
    section (titre, libelle, description_fond_prompt, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Introduction', 
	'Heureux de faire votre connaissance #username. Mon nom est Polus, le gardien de ces lieux. Je vois que vous possédez la clé. Entrez-donc.',
		null,
		false, 1, false, false, null, null, null);


INSERT INTO
    section (titre, libelle, description_fond_prompt, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Première intersection', 
	'En visitant la bibliothèque, vous atteignez un croisement. À gauche, un couloir sombre semble s''étendre à l''infini. 
	À droite, une lumière tamisée attire votre attention.',
		null,
		false, null, false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Couloir de gauche', 
	'Vous avancez dans le couloir obscur, une tension grandissante dans votre poitrine. 
	Soudain, vous trébuchez sur quelque chose et découvrez un parchemin. Il semble contenir un indice.
"Pour avancer, résolvez cette énigme : ''Je mets mes dents entre tes dents, qui suis-je ?''"
Quelle est votre réponse ?
',
		null,
		4, 2, false, null, false, true, 'reponse:une fourchette', null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Réponse à l''énigme', 
	'Vous murmurez "une fourchette" et le parchemin s''illumine avant de se désintégrer. Une porte secrète s''ouvre devant vous.
',
		null,
		false, null, false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Rencontre avec une créature', 
	'Alors que vous avancez, une silhouette sombre émerge des ombres. C''est une créature étrange, mi-humaine mi-bête. Elle grogne et se prépare à attaquer.
Préparez-vous au combat ! Lancez un dé pour déterminer votre succès.

',
		null,
		8, 26, true, 'entite à insérer', false, false, 'intelligence>2', 'Bravo ! Vous avez gagné !', 'Perdu :(');

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Couloir de droite', 
	'Vous décidez de prendre le couloir éclairé. À mesure que vous avancez, une figure encapuchonnée émerge de l''ombre.
"Je suis l''Oracle de la bibliothèque. Répondez à cette énigme pour poursuivre votre quête : 
	''Pour moi, l''accouchement est avant la grossesse, l''enfance avant la naissance, l''adolescence avant l''enfance, la mort avant la vie. Qui suis-je ?''"
Quelle est votre réponse ?

',
		null,
		7, 1, false, 'insérer oracle', false, true, 'reponse:un dictionnaire', null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Réponse à l''énigme', 
	'Vous réfléchissez un moment avant de répondre : "un dictionnaire". 
	L''Oracle hoche la tête, satisfait de votre réponse, et vous montre le chemin vers une nouvelle section de la bibliothèque.

',
		null,
		null, null, false, 'insérer oracle', false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Exploration de différentes étagères', 
	'Vous vous retrouvez devant une série d''étagères remplies de livres poussiéreux. Une étagère semble instable, prête à s''effondrer à tout moment.
Que choisissez-vous ?
',
		null,
		null, null, false, null, false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Exploration de différentes étagères', 
	'Vous vous retrouvez devant une série d''étagères remplies de livres poussiéreux. Une étagère semble instable, prête à s''effondrer à tout moment.
Que choisissez-vous ?
',
		null,
		null, null, false, null, false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Descendre vers le sous-sol', 
	'Vous descendez précautionneusement l''escalier vers l''obscurité du sous-sol. Une fois en bas, vous entendez un grognement sourd venant d''un coin sombre de la pièce.
Préparez-vous au combat ! Lancez un dé pour déterminer votre succès.
',
		null,
		null, null, false, null, false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Combat contre une créature', 
	'Une créature hideuse surgit de l''ombre, ses griffes acérées prêtes à vous déchirer. Vous prenez une profonde inspiration, prêt à défendre votre vie.
Lancez le dé pour déterminer le résultat de votre combat.
',
		null,
		14, 26, false, 'insérer créature ici', false, true, 'intelligence>3', null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Monter l''escalier à côté de l''étagère instable', 
	'Vous décidez de prendre l''escalier, espérant trouver quelque chose d''intéressant en haut. Vous montez avec précaution, sentant l''instabilité de la structure sous vos pieds.
Arrivé en haut, vous découvrez une petite pièce cachée remplie de vieux manuscrits. Parmi eux, un livre attire votre attention.
',
		null,
		null, null, false, null, false, false, null, null, null);


INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Découverte d''un livre utile',
	'Vous examinez le livre et découvrez qu'il s'agit d''un guide sur les mystères de la bibliothèque. À l''intérieur se trouve une carte détaillée de l''emplacement du livre 269.
Vous prenez le livre avec vous, reconnaissant pour cette précieuse trouvaille.
',
		null, 
		false, null, false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Tirer un livre de l''étagère',
	'En tirant le livre, l’étagère instable vous tombe dessus. Vous êtes légèrement sonné. Vous remettez l’étagère en place, aidée par vos esprits.',
		null, 
		false, null, false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, choix1, condition_choix1, libelle_choix1, choix2, condition_choix2, 
	libelle_choix2, choix3, condition_choix3, libelle_choix3, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Rencontre avec un gardien',
	' Soudain, un gardien apparaît dans la pièce, surpris de vous voir. Il bloque votre chemin, exigeant de savoir ce que vous faites ici.
Que choisissez-vous ?
',
		null, 
		false, null, false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Tenter de convaincre le gardien',
	' Vous expliquez votre quête au gardien, montrant le livre que vous avez trouvé comme preuve de vos intentions pacifiques. Après un moment d''hésitation, le gardien acquiesce et vous laisse partir.
Vous continuez votre exploration, reconnaissant d''avoir évité un conflit.
',
		null, 
		false, null, false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ( 'Pièce secrète contenant une énigme',
	' En descendant l''escalier, vous remarquez une porte dissimulée derrière une étagère. Vous l''ouvrez prudemment pour découvrir une petite pièce secrète.
Au centre de la pièce se trouve une table avec une énigme gravée sur son dessus.
"Je vous vois vieillir sans jamais rien vous dire. Qui suis-je?”
Quelle est votre réponse ?
',
		null, 
	 	17, null, false, null, false, true, 'reponse:miroir', null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Réponse à l''énigme',
	' La table émet un léger bourdonnement et la porte secrète s''ouvre lentement, révélant un passage menant à une nouvelle section de la bibliothèque.
Vous passez par la porte, curieux de découvrir ce qui vous attend.
',
		null, 
		false, null, false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Passage dans une salle des miroirs',
	'Vous entrez dans une salle remplie de miroirs qui réfléchissent votre image dans toutes les directions. Vous réalisez rapidement que trouver la sortie sera plus difficile que prévu.
Que choisissez-vous ?',
		null, 
		false, null, false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Utiliser un dé pour naviguer à travers les miroirs',
	'Vous lancez le dé avec précaution, espérant qu''il vous guidera à travers les miroirs sans vous perdre.
Le dé roule sur le sol et s''arrête sur un chiffre. Vous suivez cette direction, espérant que ce soit le bon chemin.',
		null, 
		20, 21, false, null, true, false, 'lancer>3', null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Résolution de l''énigme des réflexions',
	'Vous observez attentivement les miroirs, cherchant des indices qui pourraient vous aider à trouver la sortie. Après un moment de réflexion, vous avez une idée.
"La sortie se trouve là où votre reflet ne vous suit pas."
Vous suivez vos instincts et vous dirigez vers l''endroit où votre reflet semble se comporter différemment.',
		null, 
		24, null, false, null, false, true, 'integrer une énigme ici', null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Combat contre une créature cachée dans les miroirs',
	'Alors que vous avancez dans la salle des miroirs, une créature émerge soudainement d''un des reflets, prête à vous attaquer. Vous prenez une profonde inspiration et vous préparez à affronter votre ennemi.
		Lancez le dé pour déterminer le résultat de votre combat.',
		null, 
		24, null, true, 'entite à mettre à là', false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ( 
	'Résolution de l''énigme des réflexions', 'Vous méditez sur l''énigme, essayant de déchiffrer ses mystères. Après un moment de réflexion, vous réalisez que votre reflet ne vous suit pas lorsque vous regardez dans une direction spécifique.
Avec prudence, vous vous dirigez vers cette direction et découvrez une porte cachée derrière un faux mur de miroirs. Vous l''ouvrez et passez à travers, impatient de voir ce qui vous attend.',
		null, 
		24, null, false, null, false, true, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, action_reussite, action_echec, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Combat contre une créature cachée dans les miroirs', 
	'La créature surgit de l''un des miroirs, ses yeux luisant d''une lueur maléfique. Vous vous préparez à l''affronter, sachant que votre vie dépend de votre habileté au combat.',
		null,
		24, null, true, 'entite à mettre à là', false, false, 'defence>12;combat>15;intelligence>143', 
		'Bravo ! Vous avez vaincu le monstre', 'Dommage :(');

INSERT INTO
    section (titre, libelle, description_fond_prompt, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Découverte du livre 269', 
	'Après avoir surmonté les nombreux défis de la bibliothèque, vous arrivez enfin à l''emplacement du livre 269. Il repose sur un piédestal, brillant d''une lueur mystique.
Avec un sourire de satisfaction, vous le ramassez, sachant que votre mission est accomplie. Vous avez triomphé des épreuves de la bibliothèque des mystères et acquis le précieux livre tant recherché.',
		null,
		false, null, false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES ('Évasion de la bibliothèque', 
	'Avec le livre 269 en main, vous vous dirigez vers la sortie de la bibliothèque, votre cœur léger d''avoir réussi votre quête. Vous traversez les rayonnages de livres, revivant les aventures incroyables que vous avez vécues. Finalement, vous atteignez les grandes portes de la bibliothèque et sortez dans la lumière du jour, prêt à partager vos exploits avec le monde extérieur.',
		null,
		false, null, false, false, null, null, null);

INSERT INTO
    section (titre, libelle, description_fond_prompt, booleen_combat, entite, booleen_lancer_de, booleen_enigme, 
	condition_reussite_action, libelle_action_reussie, libelle_action_ratee)
VALUES (
	'Mort', 'Le gardien vous élimine en une fraction de seconde. Vos souvenirs se troublent.', null, false, null, false, false, null, null, null);





















----------------------------------------------------------------------------
INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 1, 2, null, 'Entrer dans la bibliothèque');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 2, 3, null, 'Prendre le couloir de gauche.');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 2, 6, null, 'Prendre le couloir de droite.');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 4, 8, null, 'Passer la porte');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 5, 8, null, 'Continuer à avancer');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 7, 8, null, 'Continuer à avancer');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 8, 9, null, 'Descendre vers le sous-sol');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 8, 11, null, 'Monter l''escalier à côté de l''étagère instable.');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 8, 13, null, 'Essayer de tirer un livre de l’étagère');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 9, 10, null, 'Se préparer au combat');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 11, 12, null, 'Se préparer au combat');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 12, 14, null, 'Continuer son chemin');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 13, 8, null, 'Faire autre chose');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 14, 15, null, 'Tenter de convaincre le gardien de votre mission.');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 14, 26, null, 'Essayer de trouver un moyen de contourner le gardien.');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 15, 16, null, 'Descendre vers l''escalier');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 17, 18, null, 'Se diriger vers la salle au miroir');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 18, 19, null, 'Utiliser un dé pour naviguer à travers les miroirs');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 18, 22, null, 'Tenter de résoudre l''énigme des réflexions pour trouver la sortie');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 18, 23, null, 'Préparez-vous au combat contre une créature cachée dans les miroirs');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 24, 25, null, 'S''evader de la bibliothèque');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 24, 25, null, 'S''evader de la bibliothèque');

INSERT INTO
    section_choix (id_section, id_choix, condition_choix, libelle_choix)
VALUES ( 26, 1, null, 'Essayer de se réveiller');
