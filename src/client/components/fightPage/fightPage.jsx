import React from "react"
import "./fightPage.css"
import { useState } from 'react';
import { ProfilePicture } from "../profilePicture/profilePicture"
import { EntityPicture } from "../entityPicture/entityPicture"
import damage_sound from '/sound_effects/damage_sound.mp3?url'
import rolling_dice_sound from '/sound_effects/rolling_dice_sound.mp3?url'

export const FightPage = ({setSectionID, section_action, playerStats, entity, setPlayerStats}) => {
    
    function waitFiveSeconds(reussite) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (reussite){
                setPlayerStats([playerStats[0], playerStats[1], playerHp.value])
            }
            else{
                setPlayerStats([playerStats[0], playerStats[1], 10])
            }
            reussite ? setSectionID(section_action.id_section_reussite) : setSectionID(section_action.id_section_echec); // Résoudre la promesse après 5 secondes
          }, 5000); // 5000 millisecondes = 5 secondes
        });
      }

    const [numberDicePlayer, setNumberDicePlayer] = useState("?");
    const [numberDiceEnemy, setNumberDiceEnemy] = useState("?");
    const [rolling, setRolling] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [showAnswer, setShowAnswer] = useState(false);
    const [bonusPlayer, setBonusPlayer] = useState(false);
    const [bonusEnemy, setBonusEnemy] = useState(false);
    const [success, setSuccess] = useState(false);
    const [booleenSuperieurInferieur, setBooleenSuperieurInferieur] = useState(false);
    const [booleenAffichageSuperieurInferieur, setBooleenAffichageSuperieurInferieur] = useState(false);
    const audio = new Audio(damage_sound);
    const audio_rolling_dice = new Audio(rolling_dice_sound)

    const clickButton = () => {
        setShowButton(false)
    }
    console.log("Section action :",section_action)
    console.log("Entity : ",entity)
    const handleRandomDice = () => {
        audio_rolling_dice.play()
        if (!rolling) {
            setRolling(true);
            let counter = 0;
            const intervalId = setInterval(() => {
                const randomNumberPlayer = Math.floor(Math.random() * (6 - 1 + 1) + 1);
                setNumberDicePlayer(randomNumberPlayer);
                const randomNumberEnemy = Math.floor(Math.random() * (6 - 1 + 1) + 1);
                setNumberDiceEnemy(randomNumberEnemy);
                counter++;
                if (counter === 10) {
                    clearInterval(intervalId);
                    setRolling(false);
                    document.querySelector(".diceBlockNumber").classList.add("fadeanime");
                    verifyConditionSuccess(randomNumberEnemy, randomNumberPlayer);
                }
            }, 100);
        }
        document.querySelector(".diceBlockNumber").classList.remove("fadeanime");
        setShowButton(true)
    };

    const verifyConditionSuccess = (numberEnemy, numberPlayer) => {
        setBooleenAffichageSuperieurInferieur(true)
        let checkedStat = section_action.condition_reussite.split(/[<>]/)[0]
        let booleanStatChecked = false
        let entityStats = entity.statistiques 
        let entityStatChecked = entityStats.split(checkedStat)[1].split(";")[0].replace(":","")
        booleanStatChecked = (Number(playerStats[0]) >= Number(entityStatChecked))
        if (booleanStatChecked){
            audio.play()
            setBonusPlayer(true)
            setSuccess(numberEnemy < numberPlayer+2);
            if (numberEnemy < numberPlayer+2){
                setBooleenSuperieurInferieur(true)
                var enemyHp = document.getElementById("enemyHp")
                enemyHp.value = Number(enemyHp.value)-2
                let ancienne_couleur = enemyHp.style.accentColor
                enemyHp.style.accentColor = "red"
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        enemyHp.style.accentColor = ancienne_couleur
                    }, 150); 
                  });
                if (Number(enemyHp.value) <= 0){
                    setSuccess(true)
                    setShowButton(false)
                    setShowAnswer(true)
                }
                else{
                    setShowButton(true)
                }
            }
            else{
                audio.play();
                setBooleenSuperieurInferieur(false)
                var playerHp = document.getElementById("playerHp")
                playerHp.value = Number(playerHp.value)-2
                let ancienne_couleur = playerHp.style.accentColor
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        playerHp.style.accentColor = ancienne_couleur
                    }, 150);
                  });
                if (Number(playerHp.value) <= 0){
                    setSuccess(false)
                    setShowButton(false)
                    setShowAnswer(true)
                }
                else{
                    setShowButton(true)
                }
            }
        }    
        else{
            audio.play();
            setBonusEnemy(true)
            if (numberEnemy+2 < numberPlayer){
                setBooleenSuperieurInferieur(true)
                var enemyHp = document.getElementById("enemyHp")
                enemyHp.value = Number(enemyHp.value)-2
                let ancienne_couleur = enemyHp.style.accentColor
                enemyHp.style.accentColor = "red"
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        enemyHp.style.accentColor = ancienne_couleur
                    }, 150); 
                  });
                if (Number(enemyHp.value) <= 0){
                    setSuccess(true)
                    setShowButton(false)
                    setShowAnswer(true)
                }
                else{
                    setShowButton(true)
                }
            }
            else{
                audio.play();
                setBooleenSuperieurInferieur(false)
                var playerHp = document.getElementById("playerHp")
                playerHp.value = Number(playerHp.value)-2
                let ancienne_couleur = playerHp.style.accentColor
                playerHp.style.accentColor = "red"
                
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        playerHp.style.accentColor = ancienne_couleur
                    }, 150);
                  });
                if (Number(playerHp.value) <= 0){
                    setSuccess(false)
                    setShowButton(false)
                    setShowAnswer(true)
                }
                else{
                    setShowButton(true)
                }
            }
        }
    };

    if (showAnswer) {
        waitFiveSeconds(success);
    }
    if (section_action.condition_reussite.split(/[<>]/)[0] == "intelligence"){
        var chaine_bonus = "INT"
    }
    else{
        var chaine_bonus = "FOR"
    }

    console.log("Entity : ", entity)
    return (
        <>
            <div className="diceContainer">
                <div style={{ flexDirection:"row", display:"flex", gap:150}}>
                    <div style={{ flexDirection:"column", display:"flex", alignItems:"center", width:"190px"}}>
                        <progress id="playerHp" className="hpBar" value={playerStats[2]} max={playerStats[2]}></progress>
                        <img src="/images/profile-picture.jpg" alt="Photo de profil" />                    </div>
                    <div style = {{ flexDirection:"row", display:"flex", gap:15 }}>
                        <div style={{ flexDirection:"column"}}>
                            <div className="diceBlockNumber diceBlockNumberPlayer">{numberDicePlayer}</div>
                            {bonusPlayer && <p className="bonus">Bonus {chaine_bonus} +2</p>}
                        </div>
                        {booleenAffichageSuperieurInferieur && <p style={{ fontSize:"50px", marginTop:"30px"}}>{ booleenSuperieurInferieur ? ">" : "<" }</p>}
                        <div style={{ flexDirection:"column", display:"flex", alignItems:"center", gap:"2px"}}>
                            <div className="diceBlockNumber diceBlockNumberEnemy">{numberDiceEnemy}</div>
                            {bonusEnemy && <p className="bonus">Bonus {chaine_bonus} +2</p>}
                        </div>
                    </div>
                    <div style={{ flexDirection:"column", display:"flex", alignItems:"center", width:"190px"}}>
                        <progress id="enemyHp" className="hpBar" value={entity.statistiques.split("force_mentale:")[1]} max={entity.statistiques.split("force_mentale:")[1]} ></progress>
                        <EntityPicture entityImage={`/images/entities/${entity.image}`}></EntityPicture>                    
                    </div>
                </div>
                {showButton && <button className="rollDice" onClick={() => {handleRandomDice(), clickButton()}}>Lancer les dés</button>}
                {showAnswer && <div className="answerDice" style={{ flexDirection:"column", display:"flex", alignItems:"center", gap:"2px"}}>{success ? section_action.libelle_action_reussite : section_action.libelle_action_echec}</div>}
            </div>
        </>
    )
}