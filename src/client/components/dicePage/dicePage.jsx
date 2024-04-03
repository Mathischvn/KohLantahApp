import React from "react"
import "./dicePage.css"
import { useState } from 'react';

export const DicePage = () => {
    
    const [numberDice, setNumberDice] = useState("?");
    const [rolling, setRolling] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [showAnswer, setShowAnswer] = useState(false);

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
                    setShowAnswer(true);
                }
            }, 100);
        }
        document.querySelector(".diceBlockNumber").classList.remove("fadeanime");
    };

    return (
        <>
            <div className="diceContainer">
                <div className="diceBlockNumber">{numberDice}</div>
                {showButton && <button className="rollDice" onClick={() => {handleRandomDice(), clickButton()}}>Lancer le dé</button>}
                {showAnswer && <div className="answerDice">Vous avez gagné :D</div>}
            </div>
        </>
    )
}