import React from "react"
import "./dicePage.css"
import { useState } from 'react';

export const DicePage = ({conditionSuccess = 'lancer>3', libelle_action_reussite="gg mec", libelle_action_echec="gros boloss"}) => {
    
    const [numberDice, setNumberDice] = useState("?");
    const [rolling, setRolling] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [showAnswer, setShowAnswer] = useState(false);
    const [success, setSuccess] = useState(false);

    const clickButton = () => {
        setShowButton(false);
    };

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

    const verifyConditionSuccess = (number) => {
        conditionSuccess = conditionSuccess.replace("lancer", "");
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

    return (
        <>
            <div className="diceContainer">
                <div className="diceBlockNumber">{numberDice}</div>
                {showButton && <button className="rollDice" onClick={() => {handleRandomDice(), clickButton()}}>Lancer le dé</button>}
                {showAnswer && <div className="answerDice">{success ? libelle_action_reussite : libelle_action_echec}</div>}
            </div>
        </>
    )
}