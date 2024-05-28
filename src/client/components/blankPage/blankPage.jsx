import React from "react"
import "./blankPage.css"
import { Enigme } from "../enigmePage/enigme";
import { ChoicePage } from "../choicePage/choicePage";
import { DicePage } from "../dicePage/dicePage";
import { SideBar } from "../sideBar/sideBar";

export const BlankPage = ({sectionId, setSectionID}) => {
    const [section, setSection] = React.useState([])
    const [playerInventory, setPlayerInventory] = React.useState([])
    const [inventoryLoading, setInventoryLoaded] = React.useState(false)
    const [playerStats, setPlayerStats] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/section/${sectionId}`);
            console.log('Response vraie:', response);
            if (response != undefined) {
                const data = await response.json();
                setSection(data);
            }
            insertItem(document.cookie.match(/(?<=name=)[^;]*/)[0], 1);
            insertItem(document.cookie.match(/(?<=name=)[^;]*/)[0], 2);
        }
        fetchData();
    }, [sectionId]);
    
    const isNotActionEmpty = section.action != [] && section.action != null  && section.action != undefined
    const isCombat = isNotActionEmpty ? (section.action.booleen_combat) :  false
    const isEnigme = isNotActionEmpty ? (section.action.booleen_enigme) :  false
    const isDe = isNotActionEmpty ? (section.action.booleen_lancer_de) :  false
    const isChoix = !(isNotActionEmpty)

    const insertItem = (name, item) => {
        const fetchData = async () => {
            const response = await fetch(`/api/player/insert/${name}/${item}`);
            console.log('Response insertitem:', response);
            console.log('item inserted');
        }
        fetchData();
    };

    React.useEffect(() => {
        const section_libelle = document.querySelector(".libelle");
        if (section_libelle && document.cookie.includes("name")) {
            section_libelle.textContent = section.libelle.replace(/#username/g, document.cookie.match(/(?<=name=)[^;]*/)[0]);
        }
    }, [section]);

    React.useEffect(() => {
        if (document.cookie.includes("name")) {
            let name = document.cookie.match(/(?<=name=)[^;]*/)[0];
            const getItems = async (name) => {
                const response = await fetch(`/api/player/inventory/${name}`);
                if (response.headers.get('content-length') != '0') {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        console.log('Data loaded:', data);
                        setPlayerInventory(data);
                    } else {
                        setInventoryLoaded(false);
                        console.log('Data pas loaded:', data);
                    }
                } else {
                    setInventoryLoaded(false);
                    console.log('response:', response);
                }
            }

            const getStats = async (name) => {
                const response = await fetch(`/api/player/stats/${name}`);
                if (response.headers.get('content-length') != '0') {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        console.log('Data loaded:', data);
                        setPlayerStats(data);
                    } else {
                        setInventoryLoaded(false);
                        console.log('Data pas loaded:', data);
                    }
                } else {
                    setInventoryLoaded(false);
                    console.log('response:', response);
                }
            }
            getItems(name);
            getStats(name);
            console.log('PlayerInventory:', playerInventory);
        }
    }, [sectionId]);
    
    
    if (inventoryLoading) {
        return <div>Chargement...</div>;
    }

    if ((isChoix && (section.choix != undefined && section.choix != [] && section.choix != null)) || (isNotActionEmpty)){
        return (
            <>
                <SideBar inventory={playerInventory} stats={playerStats}></SideBar>
                <div className="background"></div>
                <div className="blank-page">
                    <p className="libelle">{ section.libelle }</p>
                    
                    {
                        isCombat ? <div>Combat</div> : ""
                    }
                    {
                        isEnigme ? <Enigme setSectionID={setSectionID} section_action={section.action}/> : ""
                    }
                    {
                        isDe ? <DicePage setSectionID={setSectionID} section_action={section.action}/> : ""
                    }
                    {
                        isChoix ? <ChoicePage setSectionID={setSectionID} liste_choix={section.choix}/> : ""
                    }
                    {
                        isCombat ? <button onClick={() => setSectionID(sectionId + 1)}>Suivant</button> : ""
                    }
                    
                    <h2 className="titleSection">Section {section.id} : { section.titre }</h2>
                </div>
        
            </>
        )
    }
}