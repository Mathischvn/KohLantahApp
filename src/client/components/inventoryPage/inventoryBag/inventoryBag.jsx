import React from "react";

export const InventoryBag = ({bagSize, icon, inventory, stats, className, setPlayerStats, equippedItems, setEquippedItems, setPlayerInventory, setEquippedJewels, equippedJewels, setEquippedArtifacts, equippedArtifacts, setEquippedBooks, equippedBooks}) => {
    
    const equipItem = async (item) => {
        if (document.cookie.includes("name")) {
            let name = document.cookie.match(/(?<=name=)[^;]*/)[0];
            // console.log("Nom du joueur : ", name);
            // console.log("Item à équiper : ", item);
            const response = await fetch(`/api/items/equip/${name}/${item}`);
            // console.log("Item équipé : ", item);
        }
    }

    const handleClick = (item, event) => {
        if(item !== undefined) {
            // console.log(`You clicked on ${item.nom}`);
            // console.log(`Stats: ${item.statistiques}`);
            // console.log(item.statistiques.split(';')[0].split(':')[1]);
            // console.log(item.statistiques.split(';')[1].split(':')[1]);
            // console.log(item.statistiques.split(';')[2].split(':')[1]);
            // console.log("Type d'item: ", item.emplacement);
            // console.log("Stats du joueur: ", stats);
            // console.log(event.target)
            
            let newStats = [];
            let isItemAlreadyEquipped = false;

            newStats[0] = parseInt(stats[0]) + parseInt(item.statistiques.split(';')[0].split(':')[1]);
            newStats[1] = parseInt(stats[1]) + parseInt(item.statistiques.split(';')[1].split(':')[1]);
            newStats[2] = parseInt(stats[2]) + parseInt(item.statistiques.split(';')[2].split(':')[1]);

            setPlayerStats(newStats);

            // On vérifie si l'item est déjà équipé
            // console.log("equippedItem : ", equippedItems[0])
            // console.log("Item : ", item)
            // console.log("Item déjà équipé : ", equippedItems.includes(item))
            for(let equipped of equippedItems) {
                if(equipped.id === item.id) {
                    // console.log("Equipped : ", equipped)
                    isItemAlreadyEquipped = true;
                }
            }

            let item_clique = document.getElementById("item_inventaire_"+event.target.id.split("_")[2])

            console.log("target : ", event.target)
            console.log("item clique : ", item_clique)
            if(item_clique.classList.contains("equipped")){
                item_clique.classList.remove("equipped");
            } else {
                item_clique.classList.add("equipped");
            }

            // console.log("isAlreadyEquipped : ", isItemAlreadyEquipped)

            if (isItemAlreadyEquipped) {
                // console.log('Item déjà équipé');
                // console.log("EquippedItem 0 avant pop: ", equippedItems[0])
                // console.log("EquippedItem 1 avant pop: ", equippedItems[1])
                equippedItems.splice(equippedItems.indexOf(item), 1);
                // console.log("EquippedItem 0 apres pop: ", equippedItems[0])
                // console.log("EquippedItem 1 apres pop: ", equippedItems[1])
                // console.log("equippedItems après pop : ", equippedItems)

                let newStats = [];

                newStats[0] = parseInt(stats[0]) - parseInt(item.statistiques.split(';')[0].split(':')[1]);
                newStats[1] = parseInt(stats[1]) - parseInt(item.statistiques.split(';')[1].split(':')[1]);
                newStats[2] = parseInt(stats[2]) - parseInt(item.statistiques.split(';')[2].split(':')[1]);

                setPlayerStats(newStats);
                equipItem(item.id);
                // On retire l'item des items équipés par slot
                if(item.emplacement === "bijoux") {
                    equippedJewels.splice(equippedJewels.indexOf(item), 1);
                } else if(item.emplacement === "artefacts") {
                    equippedArtifacts.splice(equippedArtifacts.indexOf(item), 1);
                } else if(item.emplacement === "livre") {
                    equippedBooks.splice(equippedBooks.indexOf(item), 1);
                }
                return;
            } else {
                console.log("Item non équipé : ", item)
                console.log("equippedItems : ", equippedItems)
                setEquippedItems([...equippedItems, item]);
                equipItem(item.id);
            }
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
                    title += "\nSanté mentale : ";
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
                            id={"item_inventaire_"+inventory[index][0].id}
                            className="inventory-slot"
                            key={index}
                            src={inventory[index][0].chemin_image}
                            alt={`Inventory Slot ${index}`}
                            onClick={(event) => handleClick(inventory[index][0], event)}
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
                            id={"item_equipe_"+equippedJewels[index].id}
                            className="inventory-slot"
                            key={index}
                            src={equippedJewels[index].chemin_image}
                            alt={`Inventory Slot ${index}`}
                            onClick={(event) => handleClick(equippedJewels[index], event)}
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
                            id={"item_equipe_"+equippedArtifacts[index].id}
                            className="inventory-slot"
                            key={index}
                            src={equippedArtifacts[index].chemin_image}
                            alt={`Inventory Slot ${index}`}
                            onClick={(event) => handleClick(equippedArtifacts[index], event)}
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
                            id={"item_equipe_"+equippedBooks[index].id}
                            className="inventory-slot"
                            key={index}
                            src={equippedBooks[index].chemin_image}
                            alt={`Inventory Slot ${index}`}
                            onClick={(event) => handleClick(equippedBooks[index], event)}
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