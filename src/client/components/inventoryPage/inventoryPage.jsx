import React from "react"
import "./inventoryPage.css"
export const InventoryPage = () => {
    return (
        <>
            <div className="inventory">
                <h1 className="">Votre inventaire</h1>
                <div className="inventory-bag">
                    {Array.from({ length: 10 }, (_, index) => (
                        <button key={index} className="inventory-slot"></button>
                    ))}
                </div>
            </div>
        </>
    )
}