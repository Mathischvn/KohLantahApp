import React from "react"
import "./statBar.css"

export const StatBar = ({stat, value, color}) => {
    return (
        <>
        <div className="stat-container">
            <p className="statName">{stat}</p>
            <div className="stat">
                <div className="stat-bar" style={{width: value*10+"px", backgroundColor: color}}></div>
                <p className="stat-bar-value">{value}</p>
            </div>
        </div>
        </>
    )
    
}