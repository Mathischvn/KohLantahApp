import React from "react"
import "./blankPage.css"
import { Enigme } from "../enigmePage/enigme";
import { ChoicePage } from "../choicePage/choicePage";
import { DicePage } from "../dicePage/dicePage";
import { SideBar } from "../sideBar/sideBar";

export const BlankPage = ({sectionId, setSectionID}) => {
    const [section, setSection] = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/section/${sectionId}`);
            const data = await response.json();
            setSection(data);
        }
        fetchData();
    }, [sectionId]);
    
    const isNotActionEmpty = section.action != [] && section.action != null  && section.action != undefined
    const isCombat = isNotActionEmpty ? (section.action.booleen_combat) :  false
    const isEnigme = isNotActionEmpty ? (section.action.booleen_enigme) :  false
    const isDe = isNotActionEmpty ? (section.action.booleen_lancer_de) :  false
    const isChoix = !(isNotActionEmpty)

    React.useEffect(() => {
        const section_libelle = document.querySelector(".libelle");
        if (section_libelle && document.cookie.includes("name")) {
            section_libelle.textContent = section.libelle.replace(/#username/g, document.cookie.match(/(?<=name=)[^;]*/)[0]);
        }
    }, [section]);

    if ((isChoix && (section.choix != undefined && section.choix != [] && section.choix != null)) || (isNotActionEmpty)){
        return (
            <>
                <SideBar></SideBar>
                <div className="blank-page">
                    <p className="libelle">{ section.libelle }</p>
                    
                    {
                        isCombat ? <div>Combat</div> : ""
                    }
                    {
                        isEnigme ? <Enigme setSectionID={setSectionID} section_action={section.action}/> : ""
                    }
                    {
                        isDe ? <DicePage setSectionID={setSectionID} section_action={section.action}/> : ""
                    }
                    {
                        isChoix ? <ChoicePage setSectionID={setSectionID} liste_choix={section.choix}/> : ""
                    }
                    {
                        isCombat ? <button onClick={() => setSectionID(sectionId + 1)}>Suivant</button> : ""
                    }
                    

                    <p className="libelle">{ section.titre }</p>
                </div>
        
            </>
        )
    }
}
