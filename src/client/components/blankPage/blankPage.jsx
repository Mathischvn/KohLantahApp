import React from "react"
import FightPage from "../../fightPage/fightPage.jsx"
import EnigmaPage from "../../enigmaPage/enigmaPage.jsx"
import DicePage from "../../dicePage/dicePage.jsx"
import ChoicePage from "../../choicePage/choicePage.jsx"
import InventoryPage from "../../choicePage/choicePage.jsx"
import "./blankPage.css"
export const BlankPage = () => {
    return (
        <>
            <div className="blankPage">
                <h1 className="">section.libelle</h1>
                { 
                    if section.combat != null {
                        FightPage(section.id)
                    }
                    if section.enigme != null {
                        EnigmaPage(section.id)
                    }
                    if section.lancer_de != null {
                        DicePage(section.id)
                    }
                    if section.choix != null {
                        for(choix of section.choix){
                            ChoicePage(choix.id) 
                        }
                    }
                <InventoryPage/>
                }
            </div>
            <div><H1 className="">section.titre</H1></div>
        </>
    )
}
