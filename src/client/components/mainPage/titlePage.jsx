import React from "react"
import "./titlePage.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const TitlePage = () => {
    const navigate = useNavigate(); // Hook permettant de naviguer entre les pages
    const [createLoadingSave, setCreateLoadingSave] = useState(false); // Etat permettant de savoir si l'utilisateur veut créer ou charger une partie
    const [activeButton, setActiveButton] = useState('new'); 
    const minLengthPassword = 6; // Longueur minimum du mot de passe
    
    const createSave = () => { // Fonction permettant de créer une partie 
        const inputName = document.querySelector(".player_name_input_create").value;
        const inputMdp = document.querySelector(".player_mdp_input_create").value;
        const errorMessage = document.querySelector(".error-message");

        errorMessage.style.opacity = "0";

        if(verifyPasswordPresence()) { // Si un mot de passe est présent alors 
            if(verifyConfirmPassword()) { // On vérifie si le mot de passe et le mot de passe de confirmation sont identiques
                if(verifyLengthPassword()) { // On vérifie ensuite si la taille du mot de passe est suffisante
                    const fetchData = async () => { // On envoie une requête pour vérifier si le nom du joueur n'existe pas déjà
                        const response = await fetch(`http://localhost:3000/api/player/insertPlayer/${inputName}/${inputMdp}`);
                        const data = await response.json();
                        if(data.length === 0) { // Si le nom n'existe pas alors on crée le joueur
                            document.cookie = `name=${inputName}`; // On stocke le nom du joueur dans les cookies
                            navigate("/game"); // On redirige l'utilisateur vers la page du jeu
                        } else { // Si le nom existe déjà alors on affiche un message d'erreur
                            errorMessage.style.opacity = "1";
                            errorMessage.innerHTML = "Ce nom existe déjà, veuillez prendre un autre nom.";
                        }
                    }
                    fetchData();
                } else { // Si le mot de passe est trop court alors on affiche un message d'erreur
                    errorMessage.style.opacity = "1";
                    errorMessage.innerHTML = "Mot de passe trop court, mettez au moins 6 caractères.";
                }
            } else { // Si les mots de passe ne sont pas identiques alors on affiche un message d'erreur
                errorMessage.style.opacity = "1";
                errorMessage.innerHTML = "Mots de passe différents";
            }
        } else { // Si aucun mot de passe n'est présent alors on affiche un message d'erreur
            errorMessage.style.opacity = "1";
            errorMessage.innerHTML = "Veuillez entrer un mot de passe.";
        }
    };

    const loadSave = () => { // Fonction permettant de charger une partie d'un joueur
        const inputName = document.querySelector(".player_name_input_loading").value; // On récupère le nom du joueur
        const inputMdp = document.querySelector(".player_mdp_input_loading").value; // On récupère le mot de passe du joueur
        const buttonStart = document.querySelector(".start-button"); 
        const errorMessage = document.querySelector(".error-message");
        
        errorMessage.style.opacity = "0";
        buttonStart.innerHTML = 'Charger la partie <i class="fa-solid fa-spinner fa-spin-pulse"></i>';
        
        if(verifyPasswordPresence()) { // Si un mot de passe est présent alors on vérifie si le nom et le mot de passe correspondent à un joueur
            setTimeout(() => {
                const fetchData = async () => { // On envoie une requête pour vérifier si le nom et le mot de passe correspondent à un joueur
                    const response = await fetch(`http://localhost:3000/api/player/getPlayer/${inputName}/${inputMdp}`);
                    const data = await response.json();
                    if(data.length !== 0) { // Si le joueur existe et possède un partie alors on redirige l'utilisateur vers la page du jeu
                        document.cookie = `name=${inputName}`;
                        navigate("/game");
                    } else { // Si le joueur n'existe pas alors on affiche un message d'erreur
                        errorMessage.style.opacity = "1";
                        errorMessage.innerHTML = "Nom ou mot de passe incorrect";
                    }
                    buttonStart.innerHTML = 'Charger la partie <i class="fa-solid fa-play"></i>';
                }
                fetchData();
            }, "500");
        } else {
            errorMessage.style.opacity = "1";
            errorMessage.innerHTML = "Veuillez entrer un mot de passe.";
            buttonStart.innerHTML = 'Charger la partie <i class="fa-solid fa-play"></i>';
        }
    };

    const verifyPasswordPresence = () => { // Fonction permettant de vérifier si un mot de passe a été entré
        let inputMdp;
        document.querySelector(".player_mdp_input_create") !== null ? 
            inputMdp = document.querySelector(".player_mdp_input_create").value 
            : inputMdp = document.querySelector(".player_mdp_input_loading").value;

        let presencePassword = true;
        if(inputMdp === "") {
            presencePassword = false;
        }
        return presencePassword;
    };

    const verifyConfirmPassword = () => { // Fonction permettant de vérifier si le mot de passe et le mot de passe de confirmation sont identiques
        const inputMdp = document.querySelector(".player_mdp_input_create").value;
        const inputConfirmMdp = document.querySelector(".player_confirm_mdp_input_create").value;
        let samePassword = true;
        if(inputMdp !== inputConfirmMdp) {
            samePassword = false;
        }
        return samePassword;
    };

    const verifyLengthPassword = () => { // Fonction permettant de vérifier si la taille du mot de passe est suffisante
        const inputMdp = document.querySelector(".player_mdp_input_create").value;
        let passWordSafe = true;
        if(inputMdp.length < minLengthPassword) {
            passWordSafe = false;
        }
        return passWordSafe;
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
                    onClick={() => changeMenu(false, 'new')}>
                    Créer une nouvelle partie
                </button>
                <button
                    className={activeButton === 'load' ? 'active' : ''}
                    onClick={() => changeMenu(true, 'load')}>
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
            <div className="bg-animation">
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
            </div>
        </div>
    );
}