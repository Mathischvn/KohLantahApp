import React from "react"
export const InventoryBag = ({bagSize, icon}) => {
    
    const handleClick = () => {
        console.log("clicked")
    }

    return (
        <>
        <div className="inventory-bag">
            {Array.from({ length: bagSize }, (_, index) => (
                <button key={index} className="inventory-slot" onClick={() => handleClick()}><i className={icon}></i></button>
            ))}
        </div>
        </>
    )
    
}