import { FormElement } from "../formElement/formElement"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import levenshtein from "../../Levenshtein.js"
import React, { useState, useEffect } from 'react';
import correctAnswer from '/sound_effects/correctAnswer.mp3?url';
import "./enigme.css"



export const Enigme = ({setSectionID, section_action}) => {
    const [goodAnswer, setGoodAnswer] = useState(false); // Variable pour savoir si la réponse est bonne

    const [state, setState] = React.useState({
        answer: "",
        userAnswer: ""
    })
    const [compteur, setCompteur] = React.useState(3) // Compteur pour le nombre d'essais
    
    const [isPlaying, setIsPlaying] = useState(false); // Variable pour savoir si le son est en train de jouer
    useEffect(() => { // Jouer le son si la réponse est bonne
      if (goodAnswer) {
        const audio = new Audio(correctAnswer); // Créer un nouvel objet audio
        audio.play(); // Jouer le son
      }
    }, [isPlaying]);

    const handleValidation = () => {
        if (levenshtein(state.userAnswer.toLowerCase(), state.answer.toLowerCase()) < 5){
            // Affichage d'une notification de succès
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
                style: {"backgroundColor":"#71553a", "color":"#fafafa", "fontFamily":'Irish Grover', 'border':'3px solid #fafafa'}
            }) 
            setGoodAnswer(true)  // Mise à jour de la variable de bonne réponse à true
            setIsPlaying(true) // Joue le son
            setTimeout(() => {
                setSectionID(section_action.id_section_reussite);
            }, 2500); 
        }
        else if(compteur == 0) { // Redirection vers la section d'échec si le compteur est à 0
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
                style: {"backgroundColor":"#71553a", "color":"#fafafa", "fontFamily":'Irish Grover', 'border':'3px solid #000000'}
            }) // Affichage d'une notification d'erreur
            setCompteur(compteur - 1);
            if(compteur === 2) { // Changement de couleur du compteur si c'est le deuxième essai
                document.querySelector(".compteur span").classList.add("warning");
                document.querySelector(".compteur span.plural").style.display = "none";
            }
        }
        if(compteur == 1) { // Affichage d'un message d'avertissement si c'est le dernier essai
            document.querySelector(".compteur p").innerHTML = "C'est votre dernière chance !"
            document.querySelector(".compteur p").classList.add("warning");
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
    }, []) // Fonction qui récupérer la réponse de l'égnigme retourner par l'API et qui la stocke dans un tableau

    return (
        <div className="enigme">
           
            <div className="form-answer">
                <div className="input-answer">
                    {/*Champs texte pour la saisie de la réponse*/}
                    <FormElement 
                        label={"Réponse"} 
                        type={"text"} 
                        name={"reponse"} 
                        value={state.userAnswer} 
                        onChange={handleUserAnswerChange}
                    />
                    {/*Bouton pour valider la réponse*/}
                    <div className="compteur">
                        <p>Il vous reste <span>{compteur} essai<span className="plural">s</span></span></p>
                    </div>
                    <button className="button-submit" onClick={handleValidation}>Valider</button>
                    <ToastContainer /> {/* Composant permettant l'affichage de la notification*/}
                </div>
                
            </div>
        </div>
    )
}
