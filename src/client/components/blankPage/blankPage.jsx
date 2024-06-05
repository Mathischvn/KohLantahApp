import React, { useState, useEffect } from "react"
import "./blankPage.css"
import { FightPage } from "../fightPage/fightPage";
import { Enigme } from "../enigmePage/enigme";
import { ChoicePage } from "../choicePage/choicePage";
import { DicePage } from "../dicePage/dicePage";
import { SideBar } from "../sideBar/sideBar";
import music1 from '/music/musique_fond1.mp3'
import music2 from '/music/musique_fond2.mp3'
import { ToastContainer, toast } from 'react-toastify';

export const BlankPage = ({sectionId, setSectionID}) => {
    const [section, setSection] = React.useState([])
    const [playerInventory, setPlayerInventory] = React.useState([])
    const [inventoryLoading, setInventoryLoaded] = React.useState(false)
    const [playerStats, setPlayerStats] = React.useState([])
    const [currentTrackIndex, setCurrentTrackIndex] = useState(1);
    const [booleenChangementSection, setBooleenChangementSection] = React.useState(true)
    const [equippedItems, setEquippedItems] = React.useState([])
    const [equippedJewels, setEquippedJewels] = React.useState([])
    const [equippedArtifacts, setEquippedArtifacts] = React.useState([])
    const [equippedBooks, setEquippedBooks] = React.useState([])

    let index_tableau_playlist = 1
    let booleen_lancement_page = true

    const playlist = [
        music1,
        music2
      ];
      
    function backgroundAudio(){
        let audio = new Audio(playlist[index_tableau_playlist]);
        if (!audio.ended){
            audio.play()
        }
        audio.addEventListener("ended", ()=>{
            if(index_tableau_playlist < playlist.length -1){
                index_tableau_playlist++;
                //console.log("if"+index_tableau_playlist+"  "+ audio.duration)
            }
            else{
                index_tableau_playlist=0;
                //console.log("else"+index_tableau_playlist+"  "+ audio.duration)
            }
            backgroundAudio()
        })
    }

    React.useEffect(() => {
        if(booleen_lancement_page && booleenChangementSection){
            //console.log("ici")
            backgroundAudio()
            booleen_lancement_page = false
            setBooleenChangementSection(false)
        }
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/section/${sectionId}`);
            if (response != undefined) {
                const data = await response.json();
                setSection(data);
            }
            checkItemInsertion(sectionId)
            console.log("Section : ", section)
            console.log("equippedItems : ", equippedItems)
            console.log("equippedJewels : ", equippedJewels)
            console.log("equippedArtifacts : ", equippedArtifacts)
            console.log("equippedBooks : ", equippedBooks)
        }
        fetchData();
    }, [sectionId]);
    
    const isNotActionEmpty = section.action != [] && section.action != null  && section.action != undefined
    const isCombat = isNotActionEmpty ? (section.action.booleen_combat) :  false
    const isEnigme = isNotActionEmpty ? (section.action.booleen_enigme) :  false
    const isDe = isNotActionEmpty ? (section.action.booleen_lancer_de) :  false
    const isChoix = !(isNotActionEmpty)

    const insertItem = async (name, item) => {
        //console.log("Objet : ", item)
        
        const fetchData = async () => {
            const response = await fetch(`/api/player/insertItem/${name}/${item}`);
            return response.json();
        }
        const popupItem = async(item) => {
            const response = await fetch(`/api/item/${item}`);
            const data = await response.json();
            let nom_item = data[0].nom
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    //console.log("Test")
                    toast.info(`L'objet ${nom_item} a été ajouté à l'inventaire`, {
                        position: "bottom-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        icon:false,
                        progress: undefined,
                        theme: "light",
                        style: {"backgroundColor":"#71553a", "color":"#fafafa", "fontFamily":'Irish Grover', 'border':'3px solid #fafafa'}
                    })
                }, 4000)
            })
        }
        let ajoutItem = await fetchData();
        if (!ajoutItem){
            popupItem(item)
        }
    };

    const getAllItems = async () => {
        const response = await fetch(`/api/items/all/`);
        const data = await response.json();
        if (Array.isArray(data)) {
            const res = data
            //console.log("Les items : ", res);
            return res
        }
        return data
    }


    const getStats = async (name) => {
        const response = await fetch(`/api/player/stats/${name}`);
        if (response.headers.get('content-length') != '0') {
            const data = await response.json();
            if (Array.isArray(data)) {
                //console.log('Data loaded:', data);
                setPlayerStats(data);
            } else {
                setInventoryLoaded(false);
                //console.log('Data pas loaded:', data);
            }
        } else {
            setInventoryLoaded(false);
            //console.log('response:', response);
        }
    }

    const getPlayerItems = async (name) => {
        const response = await fetch(`/api/player/inventory/${name}`);
        if (response.headers.get('content-length') != '0') {
            const data = await response.json();
            if (Array.isArray(data)) {
                //console.log('Data loaded:', data);
                setPlayerInventory(data);
            } else {
                setInventoryLoaded(false);
                //console.log('Data pas loaded:', data);
            }
        } else {
            setInventoryLoaded(false);
            //console.log('response:', response);
        }
    }

    const checkItemInsertion = async (section) => {
        //console.log("Y'a-t-il des items dans la section : ", section)
        const allItems = await getAllItems();
        //console.log("allitems", allItems)
        //console.log("allitems[0]", allItems[0])

        for(let i=0; i<allItems.length; i++){
            //console.log("Item numéro " + i + " : " + allItems[i].nom)
            if(allItems[i].acquire_section == section){
                if (document.cookie.includes("name")) {
                    //console.log("Insertion de l'item ", allItems[i].nom)
                    let name = document.cookie.match(/(?<=name=)[^;]*/)[0];
                    insertItem(name, allItems[i].id).then(getPlayerItems(name));
                }
            }
        }
    }

    React.useEffect(() => {
        const section_libelle = document.querySelector(".libelle");
        if (section_libelle && document.cookie.includes("name")) {
            section_libelle.textContent = section.libelle.replace(/#username/g, document.cookie.match(/(?<=name=)[^;]*/)[0]);
        }
        let name = document.cookie.match(/(?<=name=)[^;]*/)[0]
        const changeSectionPlayer = async (section, name) => {
            const response = await fetch(`/api/player/changeSection/${name}/${section.id}`);
        }
        changeSectionPlayer(section, name)
    }, [section]);

    React.useEffect(() => {
        if (document.cookie.includes("name")) {
            let name = document.cookie.match(/(?<=name=)[^;]*/)[0];
            getStats(name);
        }
    }, [])

    React.useEffect(() => {
        if (document.cookie.includes("name")) {
            let name = document.cookie.match(/(?<=name=)[^;]*/)[0];
            getPlayerItems(name);
        }
    }, [sectionId]);


    if ((isChoix && (section.choix != undefined && section.choix != [] && section.choix != null)) || (isNotActionEmpty)){
        return (
            <>
                <SideBar inventory={playerInventory} setPlayerInventory={setPlayerInventory} 
                stats={playerStats} setPlayerStats={setPlayerStats} 
                equippedItems={equippedItems} setEquippedItems={setEquippedItems} 
                equippedJewels={equippedJewels} setEquippedJewels={setEquippedJewels}
                equippedArtifacts={equippedArtifacts} setEquippedArtifacts={setEquippedArtifacts}
                equippedBooks={equippedBooks} setEquippedBooks={setEquippedBooks}
                >
                </SideBar>
                <div className="background"></div>
                <div className="blank-page">
                    <p className="libelle">{ section.libelle }</p>
                    
                    {
                        isCombat ? <FightPage setSectionID={setSectionID} section_action={section.action} playerStats={playerStats} entity={section.entite} setPlayerStats={setPlayerStats} /> : ""
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
                    
                    <h2 className="titleSection">Section {section.id} : { section.titre }</h2>
                </div>
        
            </>
        )
    }
}