import React from "react";
import "./formElement.css"

export const FormElement = ({ label, type, name, value, onChange}) => {
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