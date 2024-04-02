import React from "react"
import { FightPage } from "../../fightPage/fightPage.jsx"
import { EnigmaPage } from "../../enigmaPage/enigmaPage.jsx"
import { DicePage } from "../../dicePage/dicePage.jsx"
import { ChoicePage } from "../../choicePage/choicePage.jsx"
import "./blankPage.css"
export const BlankPage = () => {
    return (
        <>
            <div className="blankPage">
                <h1 className="">section.libelle</h1>
                { if section.combat != null }
                    <FightPage/>
                { endif }
                { if section.enigme != null }
                    <EngimaPage/>
                { endif }
                { if section.lancer_de != null }
                    <DicePage/>
                { endif }
                { if section.choix != null }
                    for(choix of section.choix){
                        <ChoicePage/>
                    }
                { endif }
            </div>
            <div><H1 className="">section.titre</H1></div>
        </>
    )
}
