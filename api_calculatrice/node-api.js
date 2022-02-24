// Importer le paquet express
const express = require('express')

// Creer une application express
const app = express()

// Creer une route pour la page d'accueil '/'
app.get('/', (req, res) => {
    res.sendFile('C:/Users/TOSHIBA/Desktop/mobile/node-api/api_calculatrice/page.html')
})

// Creer une route pour calculer le total de l'addition
// Route : /api/addition?termes=5,2.9,6
app.get('/api/addition', (req, res) => {
    // Recuperer les parametres de l'adresse
    const parametres = req.query
    // Recuperer le parametre 'termes'
    const termes = parametres.termes

    if (termes == null) {
        res.sendStatus(400)
        return
    }
    const total  = termes
        // Découpe le texte selon le délimitateur ','
        .split(',')
        // Convertie chaque element du tableau en nomobre
        .map(element => Number.parseFloat(element))
        // Retire des élément qui ne sont pas des nombres
        .filter(element => Number.isNaN(element) === false)
        // Additionne tous les éléments
        .reduce((element, acc) => acc + element, 0)
    const totalTexte = total.toString(

    )

    res.send(totalTexte)
})
const PORT = 5400
app.listen(PORT, () => {
    console.log(`l\'application demarre a l\'adresse http://localhost:${PORT}`);
})