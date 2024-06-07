import React from "react"
import "./inventoryPage.css"
import { InventoryBag } from './inventoryBag/inventoryBag'
import { StatBar } from "./statBar/statBar"
import { ProfilePicture } from "../profilePicture/profilePicture"
import { useState } from "react"

export const InventoryPage = ({inventory, setPlayerInventory, stats, setPlayerStats, equippedItems, setEquippedItems, equippedJewels, setEquippedJewels, equippedArtifacts, setEquippedArtifacts, equippedBooks, setEquippedBooks}) => {

    const playerName = document.cookie.match(/(?<=name=)[^;]*/)[0];

    const [clickItem, setClickItem] = useState(false);
    
    // À chaque actualisation des items équipés, on met à jour les sacs d'items équipés
    React.useEffect(() => {
        for (let index = 0; index < equippedItems.length; index++) {
            const item = equippedItems[index];
            let isAlreadyEquippedJewel = false;
            let isAlreadyEquippedArtifact = false;
            let isAlreadyEquippedBook = false;
            if (item.emplacement === "bijoux") {
                for(let jewel of equippedJewels) {
                    if(jewel.id === item.id) {
                        isAlreadyEquippedJewel = true;
                    }
                }


                if(!isAlreadyEquippedJewel) {
                    setEquippedJewels([...equippedJewels, item]);
                }

            } else if (item.emplacement === "artefacts") {
                for(let artifact of equippedArtifacts) {
                    if(artifact.id === item.id) {
                        isAlreadyEquippedArtifact = true;
                    }
                }
                if(!isAlreadyEquippedArtifact) {
                    setEquippedArtifacts([...equippedArtifacts, item]);
                }
            } else if (item.emplacement === "livre") {
                for(let book of equippedBooks) {
                    if(book.id === item.id) {
                        isAlreadyEquippedBook = true;
                    }
                }
                if(!isAlreadyEquippedBook) {
                    setEquippedBooks([...equippedBooks, item]);
                }
            }
        }
    }, [equippedItems]);

    


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
                    <InventoryBag bagSize={2} 
                    icon={"fa-gem"} 
                    className={"jewelry-bag"}
                    stats={stats} 
                    setPlayerStats={setPlayerStats}
                    setPlayerInventory={setPlayerInventory}
                    equippedItems={equippedItems} setEquippedItems={setEquippedItems}
                    setEquippedJewels={setEquippedJewels} equippedJewels={equippedJewels}>
                    </InventoryBag>

                    <InventoryBag bagSize={2} 
                    icon={"fa-wand-sparkles"} 
                    className={"artifacts-bag"} 
                    stats={stats} 
                    setPlayerStats={setPlayerStats}
                    setPlayerInventory={setPlayerInventory}
                    equippedItems={equippedItems} setEquippedItems={setEquippedItems} 
                    setEquippedArtifacts={setEquippedArtifacts} equippedArtifacts={equippedArtifacts}>
                    </InventoryBag>

                    <InventoryBag bagSize={2} 
                    icon={"fa-book-bookmark"} 
                    className={"books-bag"} 
                    stats={stats} 
                    setPlayerStats={setPlayerStats} 
                    equippedItems={equippedItems} setEquippedItems={setEquippedItems} 
                    setPlayerInventory={setPlayerInventory} 
                    setEquippedBooks={setEquippedBooks} equippedBooks={equippedBooks}>
                    </InventoryBag>

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
                            <InventoryBag bagSize={17} 
                            inventory={inventory} 
                            stats={stats} 
                            className={"main-bag"} 
                            setPlayerStats={setPlayerStats} 
                            setPlayerInventory={setPlayerInventory} 
                            equippedItems={equippedItems} setEquippedItems={setEquippedItems} 
                            setEquippedJewels={setEquippedJewels} equippedJewels={equippedJewels} 
                            setEquippedBooks={setEquippedBooks} equippedBooks={equippedBooks} 
                            setEquippedArtifacts={setEquippedArtifacts} equippedArtifacts={equippedArtifacts}></InventoryBag>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}