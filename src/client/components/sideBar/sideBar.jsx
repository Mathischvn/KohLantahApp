import React from "react"
import "./sideBar.css"
import { useState } from "react"
import SlideIn from "../slideIn/SlideIn"
import { InventoryPage } from "../inventoryPage/inventoryPage"

export const SideBar = ({inventory, stats}) => {
    const [startAnimation, setStartAnimation] = useState(false);
    const [closeInventory, setCloseInventory] = useState(false);

    return (
        <div>
            <SlideIn startAnimation={startAnimation}>
                <InventoryPage inventory={inventory} stats={stats}/>
            </SlideIn>
            {!closeInventory && 
            <div className="side-bar side-bar-open" onClick={() => {setStartAnimation(!startAnimation), setCloseInventory(true)}}>
                <img className="inventory-image-open" src="/public/images/inventory.png" alt="Inventory Logo" title="Ouvrir l'inventaire"/>
            </div>}
            {closeInventory && 
            <div className="side-bar side-bar-close" onClick={() => {setStartAnimation(!startAnimation), setCloseInventory(false)}}>
                <img className="inventory-image-close" src="/public/images/croix.png" alt="Inventory Logo" title="Fermer l'inventaire"/>
            </div>}
        </div>
    )
    
}