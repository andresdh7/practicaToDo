const contenedor = document.getElementById('contenedor');
const inputNombre = document.getElementById('inputNombre');
const selector1 = document.getElementById('selector1');
const btnGuardar = document.querySelector('#btnGuardar');
const selector2 = document.getElementById('selector2');
const inputNombre2 = document.getElementById('inputNombre2');

btnGuardar.addEventListener('click', guardarTarea)

function guardarTarea(event) {
    event.preventDefault();
    const nuevaTarea = {
        'idTarea': listaTareas.length + 1,
        'titulo': inputNombre.value,
        'prioridad': selector1.value
    }
    listaTareas.push(nuevaTarea);
    let tareaNueva = pintarTarea(nuevaTarea);
    contenedor.appendChild(tareaNueva);
}

/* <article class="d-flex">
   <p class="col-9">Estudiar JavaScript</p>
   <button id="btnEliminar1" class="btn btn-danger col-3">Eliminar</button>
   </article> */

function pintarTarea(pTarea) {
    let article = document.createElement('article');
    let p = document.createElement('p');
    let button = document.createElement('button');

    //article.classList.add(pTarea.prioridad);
    article.style.backgroundColor = getColorPriority(pTarea.prioridad);

    p.innerText = pTarea.titulo;
    button.innerText = "Eliminar";
    button.dataset.idTarea = pTarea.idTarea;
    button.addEventListener('click', (event) => {
        let idTarea = event.target.dataset.idTarea;
        let nuevoArray = borrarTarea(idTarea, listaTareas);
        event.target.parentNode.remove();
    });

    article.appendChild(p);
    article.appendChild(button);

    return article;
}

function getColorPriority(pPriority) {
    let color = '';
    switch (pPriority) {
        case 'urgente':
            color = 'tomato';
            break;
        case 'diaria':
            color = 'orange';
            break;
        case 'mensual':
            color = 'greenyellow';
            break;
    }
    return color;
}

function pintarTareas(pLista, pSection) {
    pSection.innerText = '';
    for (let tarea of pLista) {
        const article = pintarTarea(tarea);
        pSection.appendChild(article);
    }
}

function borrarTarea(idTarea, listaTareas) {
    const nuevoArray = new Array();
    for (const tarea of listaTareas) {
        if (tarea.idTarea !== idTarea) {
            nuevoArray.push(tarea);
        }
    }
    return nuevoArray;
}

pintarTareas(listaTareas, contenedor);

selector2.addEventListener('change', seleccionarPrioridad);

function seleccionarPrioridad($event) {
    const nuevoArrayPrioridad = new Array();
    for (const tarea of listaTareas) {
        if (tarea.prioridad === $event.target.value) {
            nuevoArrayPrioridad.push(tarea);
        }
    }
    pintarTareas(nuevoArrayPrioridad, contenedor);
}

inputNombre2.addEventListener('input', seleccionarTexto);

function seleccionarTexto($event) {
    const nuevoArrayText = new Array();
    for (const tarea of listaTareas) {
        if (tarea.titulo.toLowerCase().includes($event.target.value.toLowerCase())) {
            nuevoArrayText.push(tarea);

        }
    }
    console.log(nuevoArrayText);
    pintarTareas(nuevoArrayText, contenedor);
}