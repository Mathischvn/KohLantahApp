import express from "express";
import ViteExpress from "vite-express";
import path from "path";
import {resEntite} from "connection.js"

const PORT=3000
const app = express();

// Obtenir le chemin du répertoire actuel
const currentDirectory = new URL('../..', import.meta.url).pathname;

// Construire le chemin complet vers un fichier
const cheminFichier = path.resolve(currentDirectory,'dist', 'index.html');
const __dirname = path.resolve(path.dirname('')); 

app.get('/', (req, res) => {
  // Renvoyer le fichier HTML principal de l'application React
  res.sendFile('index.html', { root: __dirname+'/dist/' });
});

app.get('/select', (req, res)=> {
  res.send(resEntite);
})

app.listen(PORT,()=>{
  //console.log('le serveur est lancé sur le port : localhost:'+PORT)
  //console.log(path.join(currentDirectory,'dist','index.html'))
})

/* afficher les erreurs à réactiver
app.use((err,req,res,next)=>{
  console.error(err.stack)
  res.status(500).send('quelque chose s\'est mal passé')
})
*/
app.get((req,res) =>{
  //console.log('404 ${req.method} ${req.url}')
  res.status(404).end('Pas trouvé')
})