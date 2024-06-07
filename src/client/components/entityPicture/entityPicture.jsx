import React from "react"
import "./entityPicture.css"

export const EntityPicture = (entityImage) => {
    return (
        <img src={entityImage.entityImage} alt="Photo de l'entité" />
        
    )
}