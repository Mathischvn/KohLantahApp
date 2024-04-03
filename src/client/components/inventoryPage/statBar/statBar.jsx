import React from "react"
import "./statBar.css"

export const StatBar = ({stat, value, color}) => {
    return (
        <>
        <div className="stat-container">
            {stat}
            <div className="stat-bar" style={{width: value+"px", backgroundColor: color}}></div>{value}
        </div>
        </>
    )
    
}