import React from "react"
import "./choicePage.css"
export const ChoicePage = ({setSectionID, liste_choix}) => {
    console.log(liste_choix)
    return (
        <>
            {liste_choix.map((choix, index) => (
                <button className="choice-button">
                    { <p>{choix.libelle_choix}</p> }
                </button>
            ))}
        </>
    )
}
