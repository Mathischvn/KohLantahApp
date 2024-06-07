import React, { useState, useEffect,useRef } from "react"
import "./blankPage.css"
import { FightPage } from "../fightPage/fightPage";
import { Enigme } from "../enigmePage/enigme";
import { ChoicePage } from "../choicePage/choicePage";
import { DicePage } from "../dicePage/dicePage";
import { SideBar } from "../sideBar/sideBar";
import { ToastContainer, toast } from 'react-toastify';
import ReactHowler from 'react-howler'

import music1 from '/music/musique_fond1.mp3'
import music2 from '/music/musique_fond2.mp3'
import music3 from '/music/Independence - Abandoned.mp3'

export const BlankPage = ({sectionId, setSectionID}) => {
    const [section, setSection] = React.useState([])
    const [playerInventory, setPlayerInventory] = React.useState([])
    const [inventoryLoading, setInventoryLoaded] = React.useState(false)
    const [playerStats, setPlayerStats] = React.useState([])
    const [currentTrack, setCurrentTrack] = useState(0);
    const [currentTrackCombat, setCurrentTrackCombat] = useState(0);
    const [typeplay, settypeplay] = useState(true);
    const [typeplayc, settypeplayc] = useState(false);
    const [booleenChangementSection, setBooleenChangementSection] = React.useState(true)
    const [equippedItems, setEquippedItems] = React.useState([])
    const [equippedJewels, setEquippedJewels] = React.useState([])
    const [equippedArtifacts, setEquippedArtifacts] = React.useState([])
    const [equippedBooks, setEquippedBooks] = React.useState([])
    const [NomMusique, setNomMusique] = React.useState([])
    const [baudio,setBaudio] = useState(0)
    const [caudio,setCaudio] = useState(0)
    const [volume, setVolume] = useState(1);
    const playerRef = useRef(null);

    let booleen_lancement_page = true

    const nomMusique = ["Donovan Jarvis - John Doe",
        "Independence - Abandoned"
    ]

    const nomMusiqueCombat = ["Rafael Krux - Mothership"]

    const playlist = [
        music2,
        music3
      ];
    
    const playlistCombat = [
        music1
    ]

    const handleEnd = () => {
        let ibaudio
        if (baudio < playlist.length -1){
            ibaudio = baudio+1 ;
        }
        else{
            ibaudio=0;
        }
        setCurrentTrack(ibaudio);
        setNomMusique(nomMusique[ibaudio])
        settypeplay(true)
        setBaudio(ibaudio)

  };

  const handleEndCombat = () => {
    if (caudio < playlistCombat.length -1){
        setCaudio(caudio+1);
    }
    else{
        setCaudio(0);
    }
    setCurrentTrackCombat(caudio);
    setNomMusique(nomMusique[caudio])
    settypeplayc(true)

};

function waitFiveSeconds() {
    return new Promise((resolve, reject) => {
      setTimeout(() => 4000); // 5000 millisecondes = 5 secondes
    });
  }
      

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/section/${sectionId}`);
            if (response != undefined) {
                const data = await response.json();
                setSection(data);
            }
            checkItemInsertion(sectionId)
        }
        fetchData();

        if(booleen_lancement_page && booleenChangementSection){
            booleen_lancement_page = false
            setBooleenChangementSection(false)
            let name = document.cookie.match(/(?<=name=)[^;]*/)[0];
            const setSectionWithPlayerHistory = async (name) => {
                const response = await fetch(`/api/player/${name}`);
                let data = await response.json()
                setSectionID(data[0].id_section)
            }
            setSectionWithPlayerHistory(name)
        }
    }, [sectionId]);
    
    const isNotActionEmpty = section.action != [] && section.action != null  && section.action != undefined
    const isCombat = isNotActionEmpty ? (section.action.booleen_combat) :  false
    const isEnigme = isNotActionEmpty ? (section.action.booleen_enigme) :  false
    const isDe = isNotActionEmpty ? (section.action.booleen_lancer_de) :  false
    const isChoix = !(isNotActionEmpty)

    const insertItem = async (name, item) => {        
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
    }

    const getAllItems = async () => {
        const response = await fetch(`/api/items/all/`);
        const data = await response.json();
        if (Array.isArray(data)) {
            const res = data
            return res
        }
        return data
    }


    const getStats = async (name) => {
        const response = await fetch(`/api/player/stats/${name}`);
        if (response.headers.get('content-length') != '0') {
            const data = await response.json();
            if (Array.isArray(data)) {
                setPlayerStats(data);
            } else {
                setInventoryLoaded(false);
            }
        } else {
            setInventoryLoaded(false);
        }
    }

    const getPlayerItems = async (name) => {
        const response = await fetch(`/api/player/inventory/${name}`);
        if (response.headers.get('content-length') != '0') {
            const data = await response.json();
            if (Array.isArray(data)) {
                setPlayerInventory(data);
            } else {
                setInventoryLoaded(false);
            }
        } else {
            setInventoryLoaded(false);
        }
    }
    React.useEffect(() => {
         if(isCombat && typeplay==true){
            settypeplay(false)
            settypeplayc(true)
        }
        else if(!isCombat && typeplay==false){
            settypeplay(true)
            settypeplayc(false)
        }
    }, [section]);

    useEffect(() => {
        // if (playerRef.current) {
        //   playerRef.current.seek(0); // reset the track to the beginning
        // }
      }, [currentTrack]);

    const checkItemInsertion = async (section) => {
        const allItems = await getAllItems();

        for(let i=0; i<allItems.length; i++){
            if(allItems[i].acquire_section == section){
                if (document.cookie.includes("name")) {
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
        if (isCombat){
            handleEndCombat
            setNomMusique(nomMusiqueCombat[caudio])
        }
        else if (!isCombat){
            setNomMusique(nomMusique[baudio])
        }
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
                <ToastContainer></ToastContainer>
                <a className="exitToMenu" href="/" title="Revenir à l'accueil"><i className="fa-solid fa-right-from-bracket"></i></a>
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
                    <div className="NomMusique"><i class="fa-solid fa-music"></i>  {NomMusique }</div>
                    <ReactHowler
                        src= {playlist[currentTrack]}
                        playing={typeplay}
                        volume={volume}
                        onEnd={handleEnd}
                        />
                        <ReactHowler
                        src= {playlistCombat[currentTrackCombat]}
                        playing={typeplayc}
                        onEnd={ handleEndCombat}
                        />
                    
                    <h2 className="titleSection">Section {section.id} : { section.titre }</h2>
                </div>
        
            </>
        )
    }
}