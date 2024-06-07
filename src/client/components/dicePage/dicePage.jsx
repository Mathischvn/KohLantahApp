import React from "react"
import "./dicePage.css"
import { useState } from 'react';

export const DicePage = ({setSectionID, section_action}) => {
    
    //redirige sur la page de réussite ou d'échec au bout de 4 secondes
    function waitFourSeconds(reussite) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reussite ? setSectionID(section_action.id_section_reussite) : setSectionID(section_action.id_section_echec); // Résoudre la promesse après 5 secondes
          }, 4000); // 5000 millisecondes = 5 secondes
        });
      }

    const [numberDice, setNumberDice] = useState("?");
    const [rolling, setRolling] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [showAnswer, setShowAnswer] = useState(false);
    const [success, setSuccess] = useState(false);

    //cache le bouton de lancer de dés lorsqu'il est cliqué
    const clickButton = () => {
        setShowButton(false);
    };

    //génére un nombre aléatoire pour le dé du joueur
    const handleRandomDice = () => {
        if (!rolling) {
            setRolling(true);
            let counter = 0;
            const intervalId = setInterval(() => {
                const randomNumber = Math.floor(Math.random() * (6 - 1 + 1) + 1);
                setNumberDice(randomNumber);
                counter++;
                if (counter === 10) {
                    clearInterval(intervalId);
                    setRolling(false);
                    document.querySelector(".diceBlockNumber").classList.add("fadeanime");
                    verifyConditionSuccess(randomNumber);
                    setShowAnswer(true);
                }
            }, 100);
        }
        document.querySelector(".diceBlockNumber").classList.remove("fadeanime");
    };

    //vérifie si la dé correspond à la condition de réussite
    const verifyConditionSuccess = (number) => {
        let conditionSuccess = section_action.condition_reussite.replace("lancer", "");
        if(conditionSuccess.includes(">=")) {
            setSuccess(number>=parseInt(conditionSuccess.replace(">=", "")));
        }
        if(conditionSuccess.includes("<=")) {
            setSuccess(number<=parseInt(conditionSuccess.replace("<=", "")));
        }
        if(conditionSuccess.includes(">")) {
            setSuccess(number>parseInt(conditionSuccess.replace(">", "")));
        }
        if(conditionSuccess.includes("<")) {
            setSuccess(number<parseInt(conditionSuccess.replace("<", "")));
        }
    };

    if (showAnswer) {
        waitFourSeconds(success);
    }
    return (
        <>
            <div className="diceContainer">
                <div className="diceBlockNumber">{numberDice}</div>
                {showButton && <button className="rollDice" onClick={() => {handleRandomDice(), clickButton()}}>Lancer le dé</button>}
                {showAnswer && <div className="answerDice">{success ? section_action.libelle_action_reussite : section_action.libelle_action_echec}</div>}
            </div>
        </>
    )
}