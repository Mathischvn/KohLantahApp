import React from "react"
import { FormElement } from "../formElement/formElement" 
import "./enigme.css"

export const Enigme = () => {
    const [state, setState] = React.useState({
        question: "",
        answer: "",
        userAnswer: ""
    })

    const handleValidation = () => {
        state.userAnswer.toLowerCase() === state.answer.toLowerCase() ? alert("Bonne réponse !") : alert("Mauvaise réponse. Réessayez !")
    }
    const handleUserAnswerChange = (e) => {
        setState({
            ...state,
            userAnswer: e.target.value
        })
    }
    React.useEffect(() => {
        setState({
            question: "Quel est le nom de la capitale de la France ?",
            answer: "Paris",
            userAnswer: state.userAnswer
        })        
    }, []) 

    return (
        <div className="enigme">
            <h1>Enigme</h1>
            <div>
                <p>{state.question}</p>
            </div>
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
