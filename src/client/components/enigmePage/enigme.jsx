import React from "react"
import { FormElement } from "../formElement/formElement"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import levenshtein from "../../Levenshtein.js"
import "./enigme.css"

export const Enigme = ({setSectionID, section_action}) => {
    const [state, setState] = React.useState({
        answer: "",
        userAnswer: ""
    })
    const [compteur, setCompteur] = React.useState(3)

    const handleValidation = () => {
        if (levenshtein(state.userAnswer.toLowerCase(), state.answer.toLowerCase()) < 5){
            toast.success('Bonne Réponse', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setTimeout(() => {
                setSectionID(section_action.id_section_reussite);
            }, 2500); 
        }
        else if(compteur == 0) {
            setSectionID(section_action.id_section_echec)
        }
        else{
            toast.error('Mauvaise réponse. Réessayez !', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setCompteur(compteur - 1)
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
            userAnswer: state.userAnswer.trim()
        })        
    }, []) 

    return (
        <div className="enigme">
           
            <div className="form-answer">
                <div className="input-answer">
                    <FormElement 
                        label={"Réponse"} 
                        type={"text"} 
                        name={"reponse"} 
                        value={state.userAnswer} 
                        onChange={handleUserAnswerChange}
                    />
                    <div className="compteur">
                        <p>Il vous reste {compteur} essais</p>
                    </div>
                    <button className="button-submit" onClick={handleValidation}>Valider</button>
                    <ToastContainer />
                </div>
                
            </div>
        </div>
    )
}
