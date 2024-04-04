import React from "react"
import "./titlePage.css"
import { useNavigate } from "react-router-dom"
export const TitlePage = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="title-page">
                <h1 className="">La quête du Livre 269</h1>
                <div>
                    <button className="start-button" onClick={() => navigate("/game")}>
                        Commencer
                    </button>
                </div>
            </div>
        </>
    )
}