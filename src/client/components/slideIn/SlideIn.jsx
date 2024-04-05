import React, { useState, useEffect } from 'react';
import './SlideIn.css';
import inventoryOpenSound from '/sound_effects/inventory-open.mp3?url'; // Importez le fichier audio
import inventoryCloseSound from '/sound_effects/inventory-close.mp3?url'; // Importez le fichier audio
import './SlideIn.css';
const SlideIn = ({ children, startAnimation }) => {
  function waitFiveSeconds() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(); // Résoudre la promesse après 5 secondes
      }, 5000); // 5000 millisecondes = 5 secondes
    });
  }

  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (startAnimation && !isPlaying) {
      const audio = new Audio(inventoryOpenSound);
      audio.play();
      setIsPlaying(true);
      waitFiveSeconds()
      setIsPlaying(false)
    }
    else if(!startAnimation && !isPlaying){
      const audio = new Audio(inventoryCloseSound);
      audio.play();
      setIsPlaying(true);
      waitFiveSeconds()
      setIsPlaying(false)
    }
  }, [startAnimation, isPlaying]);


  const transtionProperties = startAnimation
    ? { marginLeft: '0px', opacity: 1 }
    : { marginLeft: '-3000px', opacity: 1 };
  if (startAnimation){
    return (
      <div className="slide-in" style={transtionProperties}>
        {children}
      </div>
    );
  }
  else{
    return (
      <div className="slide-out" style={transtionProperties}>
        {children}
      </div>
    );
  }
};
export default SlideIn;