import React from "react"
export const InventoryBag = ({bagSize, icon, inventory}) => {
    
    const handleClick = () => {
        console.log("clicked")
    }
    return (
        <>
        <div className="inventory-bag">
            {Array.from({ length: bagSize }, (_, index) => (
                <button key={index} className="inventory-slot" onClick={() => handleClick()}><i className={icon}></i></button>
            ))}

            {inventory && inventory.map((item, index) => (
                <button key={index} className="inventory-slot" onClick={() => handleClick()}><i className={item.chemin_image}></i></button>
            ))}
        </div>
        </>
    )
    
}