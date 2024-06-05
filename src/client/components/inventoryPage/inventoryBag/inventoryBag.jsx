import React from "react";

export const InventoryBag = ({bagSize, icon, inventory, stats, className, setPlayerStats, equippedItems, setEquippedItems, setPlayerInventory, setEquippedJewels, equippedJewels, setEquippedArtifacts, equippedArtifacts, setEquippedBooks, equippedBooks}) => {
    
    const equipItem = async (item) => {
        if (document.cookie.includes("name")) {
            let name = document.cookie.match(/(?<=name=)[^;]*/)[0];
            console.log("Nom du joueur : ", name);
            console.log("Item à équiper : ", item);
            const response = await fetch(`/api/items/equip/${name}/${item}`);
            console.log("Item équipé : ", item);
        }
    }

    const handleClick = (item) => {
        if(item !== undefined) {
            console.log(`You clicked on ${item.nom}`);
            console.log(`Stats: ${item.statistiques}`);
            console.log(item.statistiques.split(';')[0].split(':')[1]);
            console.log(item.statistiques.split(';')[1].split(':')[1]);
            console.log(item.statistiques.split(';')[2].split(':')[1]);
            console.log("Type d'item: ", item.emplacement);
            console.log("Stats du joueur: ", stats);
            
            let newStats = [];
            let isItemAlreadyEquipped = false;

            newStats[0] = parseInt(stats[0]) + parseInt(item.statistiques.split(';')[0].split(':')[1]);
            newStats[1] = parseInt(stats[1]) + parseInt(item.statistiques.split(';')[1].split(':')[1]);
            newStats[2] = parseInt(stats[2]) + parseInt(item.statistiques.split(';')[2].split(':')[1]);

            setPlayerStats(newStats);

            // On vérifie si l'item est déjà équipé
            console.log("equippedItems : ", equippedItems)
            console.log("Item : ", item)
            // console.log("Item déjà équipé : ", equippedItems.includes(item))
            for(let equipped of equippedItems) {
                console.log("Equipped : ", equipped)
                if(equipped.id === item.id) {
                    isItemAlreadyEquipped = true;
                }
            }

            console.log("isAlreadyEquipped : ", isItemAlreadyEquipped)

            if (isItemAlreadyEquipped) {
                console.log('Item déjà équipé');
                equippedItems.pop(item);

                let newStats = [];

                newStats[0] = parseInt(stats[0]) - parseInt(item.statistiques.split(';')[0].split(':')[1]);
                newStats[1] = parseInt(stats[1]) - parseInt(item.statistiques.split(';')[1].split(':')[1]);
                newStats[2] = parseInt(stats[2]) - parseInt(item.statistiques.split(';')[2].split(':')[1]);

                setPlayerStats(newStats);
                equipItem(item.id);
                // On retire l'item des items équipés par slot
                if(item.emplacement === "bijoux") {
                    equippedJewels.pop(item);
                } else if(item.emplacement === "artefacts") {
                    equippedArtifacts.pop(item);
                } else if(item.emplacement === "livre") {
                    equippedBooks.pop(item);
                }
                return;
            } else {
                console.log("Item non équipé : ", item)
                console.log("equippedItems : ", equippedItems)
                setEquippedItems([...equippedItems, item]);
                equipItem(item.id);
            }
            console.log("L'inventaire ", inventory)
            console.log("Les items équipés : ", equippedItems);
        } else {
            console.log('You clicked on an empty slot');
        }
    };

    const setTitleItem = (item) => {
        let title = item.nom + " : ";
        let stats = item.statistiques.split(";")
        for (let index = 0; index < stats.length; index++) {
            const statLabel = stats[index].split(":")[0];
            const statNumber = stats[index].split(":")[1];

            switch (statLabel) {
                case "intelligence":
                    title += "\nIntelligence : ";
                    break;

                case "force":
                    title += "\nForce : ";
                    break;

                case "hp":
                    title += "\nForce mentale : ";
                    break;
            
                default:
                    break;
            }
            title += statNumber;

        }
        return title;
    };

    if (inventory === undefined) {
        inventory = [];
    }

    return (
        <div className={"inventory-bag " + className}>
            {Array.from({ length: bagSize }, (_, index) => {
                if (className=="main-bag") {
                    if (inventory[index] !== undefined && inventory[index][0] !== undefined) {
                        return (
                            <img
                            className="inventory-slot"
                            key={index}
                            src={inventory[index][0].chemin_image}
                            alt={`Inventory Slot ${index}`}
                            onClick={() => handleClick(inventory[index][0])}
                            title={setTitleItem(inventory[index][0])}
                            />
                        );
                    } else {
                        return (
                            <button
                                key={index}
                                className="inventory-slot"
                                onClick={() => handleClick()}
                            >
                                <i className={`fa-solid ${icon}`}></i>
                            </button>
                        );
                    }
                } else if (className=="jewelry-bag") {
                    if (equippedJewels[index] !== undefined) {
                        // console.log("Item équipé test: ", equippedJewels[index].nom)
                        return (
                            <img
                            className="inventory-slot"
                            key={index}
                            src={equippedJewels[index].chemin_image}
                            alt={`Inventory Slot ${index}`}
                            onClick={() => handleClick(equippedJewels[index])}
                            title={setTitleItem(equippedJewels[index])}
                            />
                        );
                    } else {
                        // console.log("index: ", index);
                        // console.log("Item pas équipé test: ", equippedJewels[index]);
                        return (
                            <button
                                key={index}
                                className="inventory-slot"
                                onClick={() => handleClick()}
                            >
                                <i className={`fa-solid ${icon}`}></i>
                            </button>
                        );
                    }
                } else if (className=="artifacts-bag") {
                    if (equippedArtifacts[index] !== undefined) {
                        return (
                            <img
                            className="inventory-slot"
                            key={index}
                            src={equippedArtifacts[index].chemin_image}
                            alt={`Inventory Slot ${index}`}
                            onClick={() => handleClick(equippedArtifacts[index])}
                            title={setTitleItem(equippedArtifacts[index])}
                            />
                        );
                    } else {
                        return (
                            <button
                                key={index}
                                className="inventory-slot"
                                onClick={() => handleClick()}
                            >
                                <i className={`fa-solid ${icon}`}></i>
                            </button>
                        );
                    }
                } else if (className=="books-bag") {
                    if (equippedBooks[index] !== undefined) {
                        return (
                            <img
                            className="inventory-slot"
                            key={index}
                            src={equippedBooks[index].chemin_image}
                            alt={`Inventory Slot ${index}`}
                            onClick={() => handleClick(equippedBooks[index])}
                            title={setTitleItem(equippedBooks[index])}
                            />
                        );
                    } else {
                        return (
                            <button
                                key={index}
                                className="inventory-slot"
                                onClick={() => handleClick()}
                            >
                                <i className={`fa-solid ${icon}`}></i>
                            </button>
                        );
                    }
                }
            })}

        </div>
    );
};