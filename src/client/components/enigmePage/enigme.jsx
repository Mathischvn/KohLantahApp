import React from "react"
import { FormElement } from "../formElement/formElement" 
import "./enigme.css"

export const Enigme = ({setSectionID, section_action}) => {
    const [state, setState] = React.useState({
        answer: "",
        userAnswer: ""
    })
    var compteur = 2

    const handleValidation = () => {
        if (state.userAnswer.toLowerCase() === state.answer.toLowerCase()){ 
            setSectionID(section_action.id_section_reussite)
        }
        else{
            alert("Mauvaise réponse. Réessayez !")
            compteur--
            if (compteur == 0 ){
                setSectionID(section_action.id_section_echec)
            }
        }
    }
    const handleUserAnswerChange = (e) => {
        setState({
            ...state,
            userAnswer: e.target.value
        })
    }
    React.useEffect(() => {
        setState({
            answer: section_action.condition_reussite.replace("reponse:",""),
            userAnswer: state.userAnswer
        })        
    }, []) 

    return (
        <div className="enigme">
            <div className="form-answer">
                <div className="input-answer">
                    <FormElement 
                        label={"Reponse"} 
                        type={"text"} 
                        name={"reponse"} 
                        value={state.userAnswer} 
                        onChange={handleUserAnswerChange}
                    />
                    <button className="button-submit" onClick={handleValidation}>Valider</button>
                </div>
                
            </div>
        </div>
    )
}
