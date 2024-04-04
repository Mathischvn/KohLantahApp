import React from "react"
import "./inventoryPage.css"
import { InventoryBag } from './inventoryBag/inventoryBag'
import { StatBar } from "./statBar/statBar"
import { ProfilePicture } from "../profilePicture/profilePicture"

export const InventoryPage = () => {
    return (
        <>
            <div className="inventory">
                <div className="inventory-left">
                    <h1>Vos bijoux</h1>
                        <InventoryBag bagSize={4} icon={"fa-solid fa-gem"}></InventoryBag>
                    <h1>Vos artéfacts</h1>
                        <InventoryBag bagSize={4} icon={"fa-solid fa-wand-sparkles"}></InventoryBag>
                    <h1>Vos livres</h1>
                        <InventoryBag bagSize={4} icon={"fa-solid fa-book-bookmark"}></InventoryBag>
                </div>
                
                <div className="inventory-right">
                    <ProfilePicture></ProfilePicture>
                    <h1>Vos statistiques</h1>
                        <div className="character-container">
                            <StatBar stat={"Force"} value={"20"} color={"red"}></StatBar>
                            <StatBar stat={"Intelligence"} value={"75"} color={"blue"}></StatBar>
                            <StatBar stat={"Santé mentale"} value={"100"} color={"green"}></StatBar>
                        </div>

                    <h1>Votre inventaire</h1>
                        <div className="main-bag">
                            <InventoryBag bagSize={16}></InventoryBag>
                        </div>
                </div>
            </div>
        </>
    )
}