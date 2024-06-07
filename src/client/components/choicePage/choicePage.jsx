import React from "react"
import "./choicePage.css"
export const ChoicePage = ({setSectionID, liste_choix}) => {
    return (
        <>
            {/* On affiche les choix retourner par l'api  */}
            {liste_choix.map((choix, index) => (
                <button className="choice-button"  key={index} onClick={() => setSectionID(choix.id_choix)}>
                    { <p>{choix.libelle_choix}</p> }
                </button>
            ))}
        </>
    )
}
