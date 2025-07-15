const container = document.querySelector("#espaciosContainer")
const formNuevoEspacio = document.querySelector("#formNuevoEspacio")
const formNuevoComponente = document.querySelector("#formNuevoComponente")
const tablaComponentes = document.querySelector("#tablaComponentes")
const detallesEspacioModal= new bootstrap.Modal(document.querySelector("#detallesEspacioModal"))

let espacios = [] //Array para los espacios de componentes
let espacioActivo = null //Espacio seleccionado actualmente

//Crear un nuevo espacio
formNuevoEspacio.addEventListener("submit",(e)=>{
    e.preventDefault()
    const nombre = document.querySelector("#nombreEspacio").value
    const nuevoEspacio = {
        nombre,
        componentes:[]//Cada espacio tiene su lista de componentes
    }
    espacios.push(nuevoEspacio)
    const div = document.createElement("div")
    div.classList.add("espacio","col-12","col-md-3","m-3")
    div.textContent= nombre
    div.dataset.index= espacios.length - 1 //Guardar el índice del espacio
    container.appendChild(div)

    bootstrap.Modal.getInstance(document.querySelector("#nuevoEspacioModal")).hide()
    formNuevoEspacio.reset()
})
    
    //Abrir el modal de detalles del espacio
    container.addEventListener("click",function (e) {
        if(e.target.classList.contains("espacio")){
            const index = e.target.dataset.index
            espacioActivo = espacios[index]
            document.querySelector("#detallesEspacioModalLabel").textContent= 
            `Espacio:${espacioActivo.nombre}`
            renderizarComponentes()
            detallesEspacioModal.show()
            
        }
    
    })


   //Crear un nuevo componente
   formNuevoComponente.addEventListener("submit", function (e) {
    e.preventDefault()
    const nuevoComponente={
        nombre: document.querySelector("#nombreComponente").value,
        footprint: document.querySelector("#footprintComponente").value,
        modelo3d: document.querySelector("#modelo3dComponente").value,
        nota: document.querySelector("#notaComponente").value
    }

    espacioActivo.componentes.push(nuevoComponente)
    renderizarComponentes()
    formNuevoComponente.reset()
})

function renderizarComponentes() {
    tablaComponentes.innerHTML = ""; // Limpiar la tabla
    espacioActivo.componentes.forEach((c, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${c.nombre}</td>
            <td>
                <i class="bi bi-copy btn-copiar d-flex justify-content-center align-items-center"
                data-text="${c.footprint}" title="Copiar FootPrint"></i>
            </td>
            <td>
                <i class="bi bi-copy btn-copiar d-flex justify-content-center align-items-center"
                data-text="${c.modelo3d}" title="Copiar Modelo 3d"></i>
            </td>
            <td>${c.nota}</td>
        `;
        tablaComponentes.appendChild(fila);
    });

    // Crear eventos de copia a todos los botones de copiar
    const botonesCopiar = tablaComponentes.querySelectorAll(".btn-copiar");
    botonesCopiar.forEach(btn => {
        btn.addEventListener("click", () => {
            const text = btn.dataset.text;
            navigator.clipboard.writeText(text)
                .then(() => {
                    btn.classList.replace("bi-copy", "bi-clipboard-check");
                    setTimeout(() => btn.classList.replace("bi-clipboard-check", "bi-copy"), 2000);
                })
                .catch(err => {
                    console.error("Error al copiar:", err);
                });
        });
    });
}