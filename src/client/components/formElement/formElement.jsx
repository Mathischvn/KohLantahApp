import React from "react";
import "./formElement.css"

// Composant permettant de retourner un élément de formulaire avec un label et un input
export const FormElement = ({ label, type, name, value, onChange}) => {
    // Retourne un élément de formulaire avec un label en fonction des paramètres passés et un input.
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                className="input-answer"
                id={name}
                name={name}
                value={value}
                onChange={onChange}

            />
            
            
        </div>
    )
}