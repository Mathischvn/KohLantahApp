import React from "react"
import "./blankPage.css"
import { Enigme } from "../enigmePage/enigme";
import { ChoicePage } from "../choicePage/choicePage";

export const BlankPage = ({sectionId, setSectionID}) => {
    const [section, setSection] = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/section/${sectionId}`);
            const data = await response.json();
            console.log("data", data)
            setSection(data);
        }
        fetchData();
    }, [sectionId]);
    const isNotActionEmpty = section.action != [] && section.action != null  && section.action != undefined
    const isCombat = isNotActionEmpty ? (section.action.booleen_combat) :  false
    const isEnigme = isNotActionEmpty ? (section.action.booleen_enigme) :  false
    const isDe = isNotActionEmpty ? (section.action.booleen_lancer_de) :  false
    const isChoix = section.choix != []

    console.log("isCombat", isCombat)
    console.log("isEnigme", isEnigme)
    console.log("isDe", isDe)
    console.log("isChoix", isChoix)
    
    console.log("section", section)
    
    return (
        <>
            <div className="blankPage">
               
                {
                    isCombat ? <div>Combat</div> : ""
                }
                {
                    isEnigme ? <div>Enigme</div> : ""
                }
                {
                    isDe ? <div>De</div> : ""
                }
                {
                    isChoix ? <div>Choix</div> : ""
                }
                <button onClick={() => setSectionID(sectionId + 1)}>Suivant</button>

                
            </div>
       
        </>
    )
}
