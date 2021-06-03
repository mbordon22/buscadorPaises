const express = require('express');
const path = require('path');
const paises = require('./paises.json');

const PUERTO = 3000;
const app = express();

//Carpeta donde buscar los archivos estaticos
app.use(express.static(path.join(__dirname, "/client")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/client", "index.html"));
})

app.get("/buscar", (req, res) => {
    const paisBuscado = req.query.pais;

    let respuesta;

    if(paisBuscado){
        respuesta = paises.filter(pais => pais.toLowerCase().includes(paisBuscado.toLowerCase()));
    }

    res.json(respuesta);

})

app.listen(PUERTO, () => {
    console.log("Escuchando el puerto " + PUERTO);
})