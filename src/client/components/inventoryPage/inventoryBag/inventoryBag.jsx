import React from "react";

export const InventoryBag = ({bagSize, icon, inventory, stats, className}) => {
    const handleClick = (item) => {
        if(item !== undefined) {
            //console.log(`You clicked on ${item.nom}`);
            //console.log(`Stats: ${item.statistiques}`);
            //console.log(item.statistiques.split(';')[0].split(':')[1]);
            //console.log(item.statistiques.split(';')[1].split(':')[1]);
            //console.log(item.statistiques.split(';')[2].split(':')[1]);

            stats[0] = parseInt(stats[0]) + parseInt(item.statistiques.split(';')[0].split(':')[1]);
            stats[1] = parseInt(stats[1]) + parseInt(item.statistiques.split(';')[1].split(':')[1]);
            stats[2] = parseInt(stats[2]) + parseInt(item.statistiques.split(';')[2].split(':')[1]);
            //console.log(stats);
        } else {
            //console.log('You clicked on an empty slot');
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
                            <i className={icon}></i>
                        </button>
                    );
                }
            })}
        </div>
    );
};