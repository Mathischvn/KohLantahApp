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
        if(verifyPassword()) {
            if (inputName !== "" && inputMdp !== "") {
                const fetchData = async () => { 
                    const response = await fetch(`http://localhost:3000/api/player/insertPlayer/${inputName}/${inputMdp}`);
                    const data = await response.json();
                    if(data.length === 0) {
                        document.cookie = `name=${inputName}`;
                        navigate("/game");
                    } else {
                        const errorMessage = document.querySelector(".error-message");
                        errorMessage.style.opacity = "1";
                        errorMessage.innerHTML = "Ce nom existe déjà, veuillez prendre un autre nom.";
                    }
                }
                fetchData();
            }
        } else {
            const errorMessage = document.querySelector(".error-message");
            errorMessage.style.opacity = "1";
            errorMessage.innerHTML = "Mots de passe différents";
        }
    };

    const loadSave = () => {
        const inputName = document.querySelector(".player_name_input_loading").value;
        const inputMdp = document.querySelector(".player_mdp_input_loading").value;
        if (inputName !== "" && inputMdp !== "") {
            document.querySelector(".start-button").innerHTML = 'Charger la partie <i class="fa-solid fa-spinner fa-spin-pulse"></i>';
            setTimeout(() => {
                const fetchData = async () => { 
                    const response = await fetch(`http://localhost:3000/api/player/getPlayer/${inputName}/${inputMdp}`);
                    const data = await response.json();
                    if(data.length !== 0) {
                        document.cookie = `name=${inputName}`;
                        navigate("/game");
                    } else {
                        const errorMessage = document.querySelector(".error-message");
                        errorMessage.style.opacity = "1";
                        errorMessage.innerHTML = "Nom ou mot de passe incorrect";
                    }
                    document.querySelector(".start-button").innerHTML = 'Charger la partie <i class="fa-solid fa-play"></i>';
                }
                fetchData();
            }, "500");              
        }
    };

    const verifyPassword = () => {
        const inputMdp = document.querySelector(".player_mdp_input_create").value;
        const inputConfirmMdp = document.querySelector(".player_confirm_mdp_input_create").value;
        let samePassword = true;
        if(inputMdp !== inputConfirmMdp) {
            samePassword = false;
        }
        return samePassword;
    };

    const changeMenu = (bool, button) => {
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
                    onClick={() => changeMenu(false, 'new')}
                >
                    Créer une nouvelle partie
                </button>
                <button
                    className={activeButton === 'load' ? 'active' : ''}
                    onClick={() => changeMenu(true, 'load')}
                >
                    Charger une partie
                </button>
            </div>
            <p className="error-message"></p>
            {createLoadingSave ? (
                <div className="container-title-page loading-save">
                    <div className="blockInput">
                        <label>Votre nom</label>
                        <input className="player_name_input_loading" type="text" placeholder="" />
                    </div>
                    <div className="blockInput">
                        <label>Votre mot de passe</label>
                        <input className="player_mdp_input_loading" type="password" placeholder="" />
                    </div>
                    <button className="start-button" onClick={loadSave}>
                        Charger la partie <i className="fa-solid fa-play"></i>
                    </button>
                </div>
            ) : (
                <div className="container-title-page create-save">
                    <div className="blockInput">
                        <label>Votre nom</label>
                        <input className="player_name_input_create" type="text" placeholder="Ex: Jean" />
                    </div>
                    <div className="blockInput">
                        <label>Votre mot de passe</label>
                        <input className="player_mdp_input_create" type="password" placeholder="Ex: JZK293ne9" />
                    </div>
                    <div className="blockInput">
                        <label>Confirmer votre mot de passe</label>
                        <input className="player_confirm_mdp_input_create" type="password" placeholder="Ex: JZK293ne9" />
                    </div>
                    <button className="start-button" onClick={createSave}>
                        Commencer une nouvelle partie <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            )}
        </div>
    );
}