import React from "react"
import "./inventoryPage.css"
import { InventoryBag } from './inventoryBag/inventoryBag'
import { StatBar } from "./statBar/statBar"
import { ProfilePicture } from "../profilePicture/profilePicture"
import { useState } from "react"

export const InventoryPage = ({inventory, stats}) => {

    const playerName = document.cookie.match(/(?<=name=)[^;]*/)[0];

    return (
        <>
            <div className="inventory">
                <div className="player-profile">
                    <h1 className="playerName">{playerName}</h1>
                    <ProfilePicture></ProfilePicture>
                    <InventoryBag bagSize={2} icon={"fa-solid fa-gem"} className={"jewelry-bag"}></InventoryBag>
                    <InventoryBag bagSize={2} icon={"fa-solid fa-wand-sparkles"} className={"artifacts-bag"}></InventoryBag>
                    <InventoryBag bagSize={2} icon={"fa-solid fa-book-bookmark"} className={"books-bagh"}></InventoryBag>
                </div>
                
                <div className="player-stats-inventory">
                    <div>
                        <h1>Vos statistiques</h1>
                        <div className="character-container">
                            <StatBar stat={"Intelligence"} value={stats[0]} color={"#5353c1"}></StatBar>
                            <StatBar stat={"Force"} value={stats[1]} color={"#e32222"}></StatBar>
                            <StatBar stat={"Santé mentale"} value={stats[2]} color={"#3db23d"}></StatBar>
                        </div>
                    </div>

                    <div>
                        <h1>Votre inventaire</h1>
                        <div className="main-bag">
                            <InventoryBag bagSize={16} inventory={inventory} stats={stats}></InventoryBag>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}