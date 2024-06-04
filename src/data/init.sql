-- Active: 1712062701963@@127.0.0.1@5432@db_livre
DROP TABLE if exists section_choix;

DROP TABLE if exists section_action;

DROP TABLE if exists inventaire;

DROP TABLE if exists personnage;

DROP TABLE if exists recompense;

DROP TABLE if exists section;

DROP TABLE if exists objet;

DROP TABLE if exists entite;

CREATE TABLE IF NOT EXISTS entite (
    id SERIAL PRIMARY KEY,
    libelle VARCHAR(255),
    description_prompt TEXT,
    statistiques VARCHAR(255),
    image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS section (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(50),
    libelle TEXT,
    description_fond_prompt TEXT,
    entite INT,
    FOREIGN KEY (entite) REFERENCES entite (id)
);

CREATE TABLE IF NOT EXISTS personnage (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    statistiques VARCHAR(255),
    mdp VARCHAR(255),
    id_section int,
    FOREIGN KEY (id_section) REFERENCES section (id)
);

CREATE TABLE IF NOT EXISTS objet (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    booleen_equipable BOOLEAN,
    booleen_utilisation_unique BOOLEAN,
    statistiques VARCHAR(255), -- separateur ;
    emplacement VARCHAR(50), -- ex : bijoux, etc.
    chemin_image VARCHAR(255),
    acquire_section INT
);

CREATE TABLE IF NOT EXISTS inventaire (
    id_objet INT,
    id_personnage INT,
    PRIMARY KEY (id_personnage, id_objet),
    FOREIGN KEY (id_objet) REFERENCES objet (id),
    FOREIGN KEY (id_personnage) REFERENCES personnage (id)
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
    FOREIGN KEY (id_section) REFERENCES section (id),
    FOREIGN KEY (id_choix) REFERENCES section (id)
);

CREATE TABLE IF NOT EXISTS section_action (
    id_section INT,
    id_section_reussite INT,
    id_section_echec INT,
    condition_reussite VARCHAR(255),
    libelle_action_reussite VARCHAR(255),
    libelle_action_echec VARCHAR(255),
    booleen_combat BOOLEAN,
    booleen_lancer_de BOOLEAN,
    booleen_enigme BOOLEAN,
    PRIMARY KEY (id_section),
    FOREIGN KEY (id_section) REFERENCES section (id),
    FOREIGN KEY (id_section_reussite) REFERENCES section (id),
    FOREIGN KEY (id_section_echec) REFERENCES section (id)
);

-- ENTITEES
INSERT INTO
    entite (
        description_prompt,
        libelle,
        statistiques,
        image
    )
VALUES (null, 'Polus', null, null);

INSERT INTO
    entite (
        description_prompt,
        libelle,
        statistiques,
        image
    )
VALUES (
        null,
        'L''oracle',
        null,
        'oracle.jpg'
    );

INSERT INTO
    entite (
        description_prompt,
        libelle,
        statistiques,
        image
    )
VALUES (
        null,
        'Fantôme',
        'force:2;intelligence:10;force_mentale:1',
        'fantome.jpg'
    );

INSERT INTO
    entite (
        description_prompt,
        libelle,
        statistiques,
        image
    )
VALUES (
        null,
        'Fantôme effrayant',
        'force:2;intelligence:10;force_mentale:1',
        'fantome_effrayant.jpg'
    );

INSERT INTO
    entite (
        description_prompt,
        libelle,
        statistiques,
        image
    )
VALUES (
        null,
        'Fantôme cauchemardesque',
        'force:3;intelligence:10;force_mentale:2',
        'fantome_cauchemardesque.jpg'
    );

-- SECTIONS
INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Introduction',
        'Heureux de faire votre connaissance #username. Mon nom est Polus, le gardien de ces lieux. Je vois que vous possédez la clé. Entrez-donc.',
        null,
        1
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Première intersection',
        'En visitant la bibliothèque, vous atteignez un croisement. À gauche, un couloir sombre semble s''étendre à l''infini. 
	À droite, une lumière tamisée attire votre attention.',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Couloir de gauche',
        'Vous avancez dans le couloir obscur, une tension grandissante dans votre poitrine. 
	Soudain, vous trébuchez sur quelque chose et découvrez un parchemin. Il semble contenir un indice.
"Pour avancer, résolvez cette énigme : ''Je mets mes dents entre tes dents, qui suis-je ?''"
Quelle est votre réponse ?',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Réponse à l''énigme',
        'Vous murmurez "une fourchette" et le parchemin s''illumine avant de se désintégrer. Une porte secrète s''ouvre devant vous.',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Rencontre avec une créature',
        'Alors que vous avancez, une silhouette sombre émerge des ombres. C''est une créature étrange, mi-humaine mi-bête. Elle grogne et se prépare à attaquer.
Préparez-vous au combat ! Lancez un dé pour déterminer votre succès.',
        null,
        3
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Couloir de droite',
        'Vous décidez de prendre le couloir éclairé. À mesure que vous avancez, une figure encapuchonnée émerge de l''ombre.
"Je suis l''Oracle de la bibliothèque. Répondez à cette énigme pour poursuivre votre quête : 
	''Pour moi, l''accouchement est avant la grossesse, l''enfance avant la naissance, l''adolescence avant l''enfance, la mort avant la vie. Qui suis-je ?''"
Quelle est votre réponse ?',
        null,
        2
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Réponse à l''énigme',
        'Vous réfléchissez un moment avant de répondre : "un dictionnaire". 
	L''Oracle hoche la tête, satisfait de votre réponse, et vous montre le chemin vers une nouvelle section de la bibliothèque.',
        null,
        2
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Exploration de différentes étagères',
        'Vous vous retrouvez devant une série d''étagères remplies de livres poussiéreux. Une étagère semble instable, prête à s''effondrer à tout moment.
Que choisissez-vous ?',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Descendre vers le sous-sol',
        'Vous descendez précautionneusement l''escalier vers l''obscurité du sous-sol. Une fois en bas, vous entendez un grognement sourd venant d''un coin sombre de la pièce.
Préparez-vous au combat ! Lancez un dé pour déterminer votre succès.',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Combat contre une créature',
        'Une créature hideuse surgit de l''ombre, ses griffes acérées prêtes à vous déchirer. Vous prenez une profonde inspiration, prêt à défendre votre vie.
Lancez le dé pour déterminer le résultat de votre combat.',
        null,
        4
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Monter l''escalier à côté de l''étagère instable',
        'Vous décidez de prendre l''escalier, espérant trouver quelque chose d''intéressant en haut. Vous montez avec précaution, sentant l''instabilité de la structure sous vos pieds.
Arrivé en haut, vous découvrez une petite pièce cachée remplie de vieux manuscrits. Parmi eux, un livre attire votre attention.',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Découverte d''un livre utile',
        'Vous examinez le livre et découvrez qu''il s''agit d''un guide sur les mystères de la bibliothèque. À l''intérieur se trouve une carte détaillée de l''emplacement du livre 269.
Vous prenez le livre avec vous, reconnaissant pour cette précieuse trouvaille.',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Tirer un livre de l''étagère',
        'En tirant le livre, l’étagère instable vous tombe dessus. Vous êtes légèrement sonné. Vous remettez l’étagère en place, aidée par vos esprits.',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Rencontre avec un gardien',
        ' Soudain, un gardien apparaît dans la pièce, surpris de vous voir. Il bloque votre chemin, exigeant de savoir ce que vous faites ici.
Que choisissez-vous ?',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Tenter de convaincre le gardien',
        ' Vous expliquez votre quête au gardien, montrant le livre que vous avez trouvé comme preuve de vos intentions pacifiques. Après un moment d''hésitation, le gardien acquiesce et vous laisse partir.
Vous continuez votre exploration, reconnaissant d''avoir évité un conflit.',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Pièce secrète contenant une énigme',
        ' En descendant l''escalier, vous remarquez une porte dissimulée derrière une étagère. Vous l''ouvrez prudemment pour découvrir une petite pièce secrète.
Au centre de la pièce se trouve une table avec une énigme gravée sur son dessus.
"Je vous vois vieillir sans jamais rien vous dire. Qui suis-je?”
Quelle est votre réponse ?',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Réponse à l''énigme',
        ' La table émet un léger bourdonnement et la porte secrète s''ouvre lentement, révélant un passage menant à une nouvelle section de la bibliothèque.
Vous passez par la porte, curieux de découvrir ce qui vous attend.',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Passage dans une salle des miroirs',
        'Vous entrez dans une salle remplie de miroirs qui réfléchissent votre image dans toutes les directions. Vous réalisez rapidement que trouver la sortie sera plus difficile que prévu.
Que choisissez-vous ?',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Utiliser un dé pour naviguer à travers les miroirs',
        'Vous lancez le dé avec précaution, espérant qu''il vous guidera à travers les miroirs sans vous perdre.
Le dé roule sur le sol et s''arrête sur un chiffre. Vous suivez cette direction, espérant que ce soit le bon chemin.',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Résolution de l''énigme des réflexions',
        'Vous observez attentivement les miroirs, cherchant des indices qui pourraient vous aider à trouver la sortie. Après un moment de réflexion, vous regardez en l''air.
	Au plafond, une tablette contient les instructions suivantes : "Pour retrouver votre chemin, murmurez la réponse à cette énigme : "Je peux voyager autour du monde tout en restant dans mon coin. Qui suis-je ?""',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Combat contre une créature cachée dans les miroirs',
        'Alors que vous avancez dans la salle des miroirs, une créature émerge soudainement d''un des reflets, prête à vous attaquer. Vous prenez une profonde inspiration et vous préparez à affronter votre ennemi.
		Lancez le dé pour déterminer le résultat de votre combat.',
        null,
        4
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Résolution de l''énigme des réflexions',
        'Vous méditez sur l''énigme, essayant de déchiffrer ses mystères.
	Après un moment de réflexion, vous murmurez "un timbre", et le plafond se met à s''illuminer, vous montrant le chemin à suivre.
	Avec prudence, vous vous dirigez vers cette direction et découvrez une porte cachée derrière un faux mur de miroirs. 
	Vous l''ouvrez et passez à travers, impatient de voir ce qui vous attend.',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Combat contre une créature cachée dans les miroirs',
        'La créature surgit de l''un des miroirs, ses yeux luisant d''une lueur maléfique. 
	Vous vous préparez à l''affronter, sachant que votre vie dépend de votre habileté au combat.',
        null,
        4
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Découverte du livre 269',
        'Après avoir surmonté les nombreux défis de la bibliothèque, vous arrivez enfin à l''emplacement du livre 269. 
	Il repose sur un piédestal, brillant d''une lueur mystique.
	Avec un sourire de satisfaction, vous le ramassez, sachant que votre mission est accomplie. 
	Vous avez triomphé des épreuves de la bibliothèque des mystères et acquis le précieux livre tant recherché.',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Évasion de la bibliothèque',
        'Avec le livre 269 en main, vous vous dirigez vers la sortie de la bibliothèque, votre cœur léger d''avoir réussi votre quête. 
	Vous traversez les rayonnages de livres, revivant les aventures incroyables que vous avez vécues.
	Finalement, vous atteignez les grandes portes de la bibliothèque et sortez dans la lumière du jour, 
	prêt à partager vos exploits avec le monde extérieur. Au moment de sortir, vous tombez dans les pommes et vos souvenirs se dissipent.',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Évanouissement',
        'Vous vous évanouissez. Vos souvenirs se troublent.',
        null,
        null
    );

INSERT INTO
    section (
        titre,
        libelle,
        description_fond_prompt,
        entite
    )
VALUES (
        'Évanouissement',
        'Le gardien n''apprécie pas votre comportement. Il vous fait voler à travers la pièce. Vous vous évanouissez. Vos souvenirs se troublent.',
        null,
        null
    );

----------------------------------------------------------------------------
INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        1,
        2,
        null,
        'Entrer dans la bibliothèque'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        2,
        3,
        null,
        'Prendre le couloir de gauche.'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        2,
        6,
        null,
        'Prendre le couloir de droite.'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (4, 8, null, 'Passer la porte');

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        5,
        8,
        null,
        'Continuer à avancer'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        7,
        8,
        null,
        'Continuer à avancer'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        8,
        9,
        null,
        'Descendre vers le sous-sol'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        8,
        11,
        null,
        'Monter l''escalier à côté de l''étagère instable.'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        8,
        13,
        null,
        'Essayer de tirer un livre de l’étagère'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        9,
        10,
        null,
        'Se préparer au combat'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        11,
        12,
        null,
        'Examiner le livre'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        12,
        14,
        null,
        'Continuer son chemin'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        13,
        8,
        null,
        'Faire autre chose'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        14,
        15,
        null,
        'Tenter de convaincre le gardien de votre mission.'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        14,
        27,
        null,
        'Essayer de trouver un moyen de contourner le gardien.'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        15,
        16,
        null,
        'Descendre vers l''escalier'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        17,
        18,
        null,
        'Se diriger vers la salle au miroir'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        18,
        19,
        null,
        'Utiliser un dé pour naviguer à travers les miroirs'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        18,
        20,
        null,
        'Tenter de résoudre l''énigme des réflexions pour trouver la sortie'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        18,
        23,
        null,
        'Préparez-vous au combat contre une créature cachée dans les miroirs'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        20,
        22,
        null,
        'Se diriger vers la sortie'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        22,
        24,
        null,
        'Se diriger vers la sortie'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        24,
        25,
        null,
        'S''évader de la bibliothèque'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        26,
        1,
        null,
        'Essayer de se réveiller'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        25,
        1,
        null,
        'Essayer de se réveiller'
    );

INSERT INTO
    section_choix (
        id_section,
        id_choix,
        condition_choix,
        libelle_choix
    )
VALUES (
        27,
        1,
        null,
        'Essayer de se réveiller'
    );

----------------------------------------------------------------------------

INSERT INTO
    section_action (
        id_section,
        id_section_reussite,
        id_section_echec,
        condition_reussite,
        libelle_action_reussite,
        libelle_action_echec,
        booleen_combat,
        booleen_lancer_de,
        booleen_enigme
    )
VALUES (
        3,
        4,
        2,
        'reponse:une fourchette',
        'Bravo ! Vous avez trouvé la réponse !',
        'Vous avez échoué.',
        false,
        false,
        true
    );

INSERT INTO
    section_action (
        id_section,
        id_section_reussite,
        id_section_echec,
        condition_reussite,
        libelle_action_reussite,
        libelle_action_echec,
        booleen_combat,
        booleen_lancer_de,
        booleen_enigme
    )
VALUES (
        5,
        8,
        26,
        'intelligence>2',
        'Bravo ! Vous avez gagné le combat !',
        'Vous avez perdu.',
        true,
        false,
        false
    );

INSERT INTO
    section_action (
        id_section,
        id_section_reussite,
        id_section_echec,
        condition_reussite,
        libelle_action_reussite,
        libelle_action_echec,
        booleen_combat,
        booleen_lancer_de,
        booleen_enigme
    )
VALUES (
        6,
        7,
        2,
        'reponse:un dictionnaire',
        'Bravo ! Vous avez trouvé la réponse !',
        'Vous avez échoué.',
        false,
        false,
        true
    );

INSERT INTO
    section_action (
        id_section,
        id_section_reussite,
        id_section_echec,
        condition_reussite,
        libelle_action_reussite,
        libelle_action_echec,
        booleen_combat,
        booleen_lancer_de,
        booleen_enigme
    )
VALUES (
        10,
        14,
        26,
        'intelligence>3',
        'Bravo ! Vous avez gagné le combat !',
        'Vous avez perdu.',
        true,
        false,
        false
    );

INSERT INTO
    section_action (
        id_section,
        id_section_reussite,
        id_section_echec,
        condition_reussite,
        libelle_action_reussite,
        libelle_action_echec,
        booleen_combat,
        booleen_lancer_de,
        booleen_enigme
    )
VALUES (
        16,
        17,
        2,
        'reponse:un miroir',
        'Bravo ! Vous avez trouvé la réponse !',
        'Vous avez échoué.',
        false,
        false,
        true
    );

INSERT INTO
    section_action (
        id_section,
        id_section_reussite,
        id_section_echec,
        condition_reussite,
        libelle_action_reussite,
        libelle_action_echec,
        booleen_combat,
        booleen_lancer_de,
        booleen_enigme
    )
VALUES (
        19,
        20,
        21,
        'lancer>3',
        'Bravo ! Vous avez eu de la chance !',
        'Pas de bol.',
        false,
        true,
        false
    );

INSERT INTO
    section_action (
        id_section,
        id_section_reussite,
        id_section_echec,
        condition_reussite,
        libelle_action_reussite,
        libelle_action_echec,
        booleen_combat,
        booleen_lancer_de,
        booleen_enigme
    )
VALUES (
        21,
        24,
        26,
        'intelligence > 6',
        'Bravo ! Vous avez gagné le combat !',
        'Vous avez perdu.',
        true,
        false,
        false
    );

INSERT INTO
    section_action (
        id_section,
        id_section_reussite,
        id_section_echec,
        condition_reussite,
        libelle_action_reussite,
        libelle_action_echec,
        booleen_combat,
        booleen_lancer_de,
        booleen_enigme
    )
VALUES (
        20,
        22,
        2,
        'reponse:un timbre',
        'Bravo ! Vous avez trouvé la réponse !',
        'Vous avez échoué.',
        false,
        false,
        true
    );

INSERT INTO
    section_action (
        id_section,
        id_section_reussite,
        id_section_echec,
        condition_reussite,
        libelle_action_reussite,
        libelle_action_echec,
        booleen_combat,
        booleen_lancer_de,
        booleen_enigme
    )
VALUES (
        23,
        24,
        26,
        'defense>12;combat>15;intelligence>143',
        'Bravo ! Vous avez gagné le combat !',
        'Vous avez perdu.',
        true,
        false,
        false
    );

INSERT INTO
    objet (
        nom,
        booleen_equipable,
        booleen_utilisation_unique,
        statistiques,
        emplacement,
        chemin_image,
        acquire_section
    )
VALUES (
        'Collier du grand-père',
        true,
        false,
        'intelligence:3;force:0;hp:0',
        'bijoux',
        '/images/collier-grand-pere.jpg',
        1
    );

INSERT INTO
    objet (
        nom,
        booleen_equipable,
        booleen_utilisation_unique,
        statistiques,
        emplacement,
        chemin_image,
        acquire_section
    )
VALUES (
        'Livre de force',
        true,
        false,
        'intelligence:0;force:5;hp:3',
        'livre',
        '/images/livre-force.jpg',
        2
    );