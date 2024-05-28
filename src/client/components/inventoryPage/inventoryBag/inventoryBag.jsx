import React from "react";

export const InventoryBag = ({bagSize, icon, inventory, stats}) => {
    const handleClick = (item) => {
        if(item !== undefined) {
            console.log(`You clicked on ${item.nom}`);
            console.log(`Stats: ${item.statistiques}`);
            console.log(item.statistiques.split(';')[0].split(':')[1]);
            console.log(item.statistiques.split(';')[1].split(':')[1]);
            console.log(item.statistiques.split(';')[2].split(':')[1]);

            stats[0] = parseInt(stats[0]) + parseInt(item.statistiques.split(';')[0].split(':')[1]);
            stats[1] = parseInt(stats[1]) + parseInt(item.statistiques.split(';')[1].split(':')[1]);
            stats[2] = parseInt(stats[2]) + parseInt(item.statistiques.split(';')[2].split(':')[1]);
            console.log(stats);
        } else {
            console.log('You clicked on an empty slot');
        }
    };

    if (inventory === undefined) {
        inventory = [];
    } else {
        console.log(inventory);
    }

    return (
        <div className="inventory-bag">
            {Array.from({ length: bagSize }, (_, index) => {
                if (inventory[index] !== undefined && inventory[index][0] !== undefined) {
                    return (
                        <img
                        className="inventory-slot"
                        key={index}
                        src={inventory[index][0].chemin_image}
                        alt={`Inventory Slot ${index}`}
                        onClick={() => handleClick(inventory[index][0])}
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