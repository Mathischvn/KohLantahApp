import React from "react"
import "./inventoryPage.css"
import { InventoryBag } from './inventoryBag/inventoryBag'
import { SideBar } from '../sideBar/sideBar'
export const InventoryPage = () => {
    return (
        <>
            <div className="inventory">
                <SideBar></SideBar>
                <div className="inventory-left">
                    <h1 className="">Vos bijoux</h1>
                        <InventoryBag bagSize={4} icon={"fa-solid fa-gem"}></InventoryBag>
                    <h1 className="">Vos artéfacts</h1>
                        <InventoryBag bagSize={4} icon={"fa-solid fa-wand-sparkles"}></InventoryBag>
                    <h1 className="">Vos livres</h1>
                        <InventoryBag bagSize={4} icon={"fa-solid fa-book-bookmark"}></InventoryBag>
                </div>
                
                <div className="inventory-right">
                    <h1 className="">Votre inventaire</h1>
                        <div className="main-bag">
                            <InventoryBag bagSize={16}></InventoryBag>
                        </div>
                </div>
            </div>
        </>
    )
}