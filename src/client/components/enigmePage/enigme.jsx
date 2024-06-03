import { FormElement } from "../formElement/formElement"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import levenshtein from "../../Levenshtein.js"
import React, { useState, useEffect } from 'react';
import correctAnswer from '/sound_effects/correctAnswer.mp3?url';
import "./enigme.css"



export const Enigme = ({setSectionID, section_action}) => {
    const [goodAnswer, setGoodAnswer] = useState(false);

    const [state, setState] = React.useState({
        answer: "",
        userAnswer: ""
    })
    const [compteur, setCompteur] = React.useState(3)
    
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
      if (goodAnswer) {
        const audio = new Audio(correctAnswer);
        audio.play();
      }
    }, [isPlaying]);

    const handleValidation = () => {
        if (levenshtein(state.userAnswer.toLowerCase(), state.answer.toLowerCase()) < 5){
            toast.success('Bonne Réponse', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                icon:false,
                progress: undefined,
                theme: "light",
                style: {"backgroundColor":"#71553a", "color":"#fafafa", "font-family":'Irish Grover', 'border':'3px solid #fafafa'}
            })
            setGoodAnswer(true)
            setIsPlaying(true)
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
                icon:false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                style: {"backgroundColor":"#71553a", "color":"#fafafa", "font-family":'Irish Grover', 'border':'3px solid #000000'}
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
