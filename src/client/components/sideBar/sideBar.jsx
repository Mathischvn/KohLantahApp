import React from "react"
import "./sideBar.css"
import { useState } from "react"
import SlideIn from "../slideIn/SlideIn"
import { InventoryPage } from "../inventoryPage/inventoryPage"

export const SideBar = ({inventory}) => {
    const [startAnimation, setStartAnimation] = useState(false);
    return (
        <div>
            <SlideIn startAnimation={startAnimation}>
                <InventoryPage inventoryContent={inventory}/>
            </SlideIn>
            <div className="side-bar" onClick={() => setStartAnimation(!startAnimation)}></div>
        </div>
    )
    
}