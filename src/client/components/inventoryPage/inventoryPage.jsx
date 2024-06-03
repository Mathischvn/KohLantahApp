import React from "react"
import "./inventoryPage.css"
import { InventoryBag } from './inventoryBag/inventoryBag'
import { StatBar } from "./statBar/statBar"
import { ProfilePicture } from "../profilePicture/profilePicture"
import { useState } from "react"

export const InventoryPage = ({inventory, stats}) => {

    const playerName = document.cookie.match(/(?<=name=)[^;]*/)[0];

    const [clickItem, setClickItem] = useState(false);

    const activeTuto = () => {
        const backgroundTuto = document.querySelector(".tuto");
        const tooltipTuto = document.querySelector(".tooltip-tuto");
        const firstSlotInventory = document.querySelector(".player-stats-inventory .inventory-bag > :first-child");

        if(backgroundTuto !== null) {
            backgroundTuto.style.display = "block";
            tooltipTuto.style.display = "block";
            firstSlotInventory.classList.add("animationTuto");
    
            firstSlotInventory.addEventListener('click', () => {
                firstSlotInventory.classList.remove("animationTuto");
                backgroundTuto.style.display = "none";
                tooltipTuto.style.display = "none";
                setClickItem(true);
            });
        }
    };

    if(!clickItem) {
        activeTuto()
    }

    return (
        <>
            <div className="inventory">
                <div className="tuto"></div>
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
                            <div className="tooltip-tuto">
                                Cliquer sur votre objet pour l'équiper et améliorer vos statistiques.
                            </div>
                            <InventoryBag bagSize={16} inventory={inventory} stats={stats}></InventoryBag>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}