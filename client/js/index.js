const buscador = document.querySelector("#buscador");
const contenedorPaises = document.querySelector(".contenedor-lista");

document.addEventListener("DOMContentLoaded", function () {
    buscador.addEventListener("keyup", buscarPaises);
})

function buscarPaises(e) {
    const textoBuscado = e.target.value;
    contenedorPaises.innerHTML = "";

    if (textoBuscado) {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", "/buscar?pais=" + textoBuscado);

        xhr.onload = function () {

            if (xhr.status === 200) {

                const respuesta = JSON.parse(xhr.responseText);

                if (respuesta.length > 0) {

                    const lista = document.createElement("ul");
                    contenedorPaises.appendChild(lista);

                    respuesta.forEach(pais => {
                        let buscado = textoBuscado.toLowerCase();
                        let paisEncontrado = pais.toLowerCase();

                        //Separa la palabra en primera parte antes de lo buscado y en ultima parte despues de lo buscado
                        const primeraParte = pais.slice(0, paisEncontrado.indexOf(buscado));
                        const ultimaParte = pais.slice(paisEncontrado.indexOf(buscado) + buscado.length);

                        const palabra = `${primeraParte}<b>${buscado}</b>${ultimaParte}` //Palabra a mostrar

                        //ARMA Y MUESTRA EL PAIS EN EL DOM
                        const item = document.createElement("li");
                        item.innerHTML = palabra;
                        lista.appendChild(item);

                        //A cada item de la lista le agregamos el evento
                        item.addEventListener("click", function () {
                            buscador.value = "";
                            buscador.value = pais;
                        })
                    });
                } else {
                    contenedorPaises.innerHTML = "<h2>No se encontraron resultados</h2>";
                }
            }
        }
        xhr.send();
    }
}