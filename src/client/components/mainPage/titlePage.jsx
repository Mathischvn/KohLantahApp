import React from "react"
import "./titlePage.css"
import { useNavigate } from "react-router-dom"

export const TitlePage = () => {
    const navigate = useNavigate()

    const insertName = () => {
        const inputName = document.querySelector(".player_name_input").value;
        if (inputName !== "") {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:3000/api/player/${inputName}`);
                const data = await response.json();
                if(data.length === 0) {
                    document.cookie = `name=${inputName}`;
                    navigate("/game");
                } else {
                    document.querySelector(".already-existed").style.opacity = "1";
                }
            }
            fetchData();
        }
    };

    return (
        <>
            <div className="title-page">
                <h1 className="">La quête du Livre 269</h1>
                <div className="container-title-page">
                    <p className="already-existed">Ce nom existe déjà, veuillez prendre un autre nom.</p>
                    <input className="player_name_input" type="text" placeholder="Votre nom"/>
                    <button className="start-button" onClick={() => insertName()}>
                        Commencer
                    </button>
                </div>
            </div>
        </>
    )
}