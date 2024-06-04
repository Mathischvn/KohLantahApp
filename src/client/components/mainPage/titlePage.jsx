import React from "react"
import "./titlePage.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const TitlePage = () => {
    const navigate = useNavigate();
    const [createLoadingSave, setCreateLoadingSave] = useState(false);
    const [activeButton, setActiveButton] = useState('new');
    
    const createSave = () => {
        const inputName = document.querySelector(".player_name_input_create").value;
        const inputMdp = document.querySelector(".player_mdp_input_create").value;
        if (inputName !== "" && inputMdp !== "") {
            const fetchData = async () => { 
                const response = await fetch(`http://localhost:3000/api/player/insertPlayer/${inputName}/${inputMdp}`);
                const data = await response.json();
                if(data.length === 0) {
                    document.cookie = `name=${inputName}`;
                    navigate("/game");
                } else {
                    const errorMessage = document.querySelector(".error-message");
                    errorMessage.style.opacity = "1"
                    errorMessage.innerHTMl = "Ce nom existe déjà, veuillez prendre un autre nom.";
                }
            }
            fetchData();
        }
    };

    const loadSave = () => {
        const inputName = document.querySelector(".player_name_input_loading").value;
        const inputMdp = document.querySelector(".player_mdp_input_loading").value;
        if (inputName !== "" && inputMdp !== "") {
            const fetchData = async () => { 
                const response = await fetch(`http://localhost:3000/api/player/getPlayer/${inputName}/${inputMdp}`);
                console.log("CONNARD");
                const data = await response.json();
                console.log(data);
                if(data.length !== 0) {
                    document.cookie = `name=${inputName}`;
                    navigate("/game");
                } else {
                    const errorMessage = document.querySelector(".error-message");
                    errorMessage.style.opacity = "1";
                    errorMessage.innerHTML = "Nom ou mot de passe incorrect";
                }
            }
            fetchData();
        }
    }

    const clickButton = (bool, button) => {
        setCreateLoadingSave(bool);
        setActiveButton(button);
        const inputNameCreate = document.querySelector(".player_name_input_create");
        const inputMdpCreate = document.querySelector(".player_mdp_input_create");
        const inputNameLoading = document.querySelector(".player_name_input_loading");
        const inputMdpLoading = document.querySelector(".player_mdp_input_loading");
        const errorMessage = document.querySelector(".error-message");
        errorMessage.style.opacity = "0";
        if(inputNameCreate != null && inputMdpCreate != null) {
            inputNameCreate.value = "";
            inputMdpCreate.value = "";        
        } else {
            inputNameLoading.value = "";
            inputMdpLoading.value = "";  
        }
    };

    return (
        <div className="title-page">
            <h1>La quête du Livre 269</h1>
            <div className="buttons-title">
                <button
                    className={activeButton === 'new' ? 'active' : ''}
                    onClick={() => clickButton(false, 'new')}
                >
                    Créer une nouvelle partie
                </button>
                <button
                    className={activeButton === 'load' ? 'active' : ''}
                    onClick={() => clickButton(true, 'load')}
                >
                    Charger une partie
                </button>
            </div>
            <p className="error-message"></p>
            {createLoadingSave ? (
                <div className="container-title-page loading-save">
                    <input className="player_name_input_loading" type="text" placeholder="Votre nom" />
                    <input className="player_mdp_input_loading" type="text" placeholder="Votre mot de passe" />
                    <button className="start-button" onClick={loadSave}>
                        Charger la partie
                    </button>
                </div>
            ) : (
                <div className="container-title-page create-save">
                    <input className="player_name_input_create" type="text" placeholder="Votre nom" />
                    <input className="player_mdp_input_create" type="text" placeholder="Votre mot de passe" />
                    <button className="start-button" onClick={createSave}>
                        Commencer une nouvelle partie
                    </button>
                </div>
            )}
        </div>
    );
}