// JavaScript (app.js)

let listaPreguntas = [];  // Declarar e inicializar listaPreguntas

const objPregunta = {
    id: '',
    pregunta: '',
    comentarios: []
};

let editando = false;

const formulario = document.querySelector('#formulario');
const preguntaInput = document.querySelector('#pregunta');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if (preguntaInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if (editando) {
        editarPregunta();
    } else {
        agregarPregunta();
    }

    formulario.reset();
    limpiarObjeto();
    mostrarPreguntas();
}

function agregarPregunta() {
    objPregunta.id = Date.now();
    objPregunta.pregunta = preguntaInput.value;
    listaPreguntas.push({...objPregunta});
}

function limpiarObjeto() {
    objPregunta.id = '';
    objPregunta.pregunta = '';
}

function mostrarPreguntas() {
    limpiarHTML();

    const divPreguntas = document.querySelector('.div-empleados');
    listaPreguntas.forEach(preguntaItem => {
        const { id, pregunta, comentarios } = preguntaItem;

        const contenedorPregunta = document.createElement('div');
        contenedorPregunta.classList.add('contenedor-pregunta');

        const seccionPublicacion = crearSeccionPublicacion(pregunta, id);
        const seccionComentarios = crearSeccionComentarios(comentarios, id);

        contenedorPregunta.appendChild(seccionPublicacion);
        contenedorPregunta.appendChild(seccionComentarios);

        const hr = document.createElement('hr');
        divPreguntas.appendChild(contenedorPregunta);
        divPreguntas.appendChild(hr);
    });
}


function crearSeccionPublicacion(pregunta, idPregunta) {
    const seccionPublicacion = document.createElement('section');
    seccionPublicacion.classList.add('publicacion');

    const tituloPublicacion = document.createElement('h3');
    tituloPublicacion.textContent = 'Publicaciones';
    tituloPublicacion.style.color = 'whitesmoke';
    seccionPublicacion.appendChild(tituloPublicacion);

    // Texto más grande
    const parrafo = document.createElement('p');
    parrafo.textContent = pregunta;
    parrafo.style.color = '#ffc9c9';
    parrafo.style.fontSize = '1.4em'; // Ajusta el tamaño del texto

    const contenedorComentario = document.createElement('div');
    contenedorComentario.classList.add('contenedor-comentario');

    const comentarioInput = document.createElement('input');
    comentarioInput.type = 'text';
    comentarioInput.placeholder = 'Escribe tu comentario...';

    const btnComentar = document.createElement('button');
    btnComentar.textContent = 'Comentar';
    btnComentar.style.color = '#726161';
    btnComentar.classList.add('btn', 'btn-comentar');
    btnComentar.onclick = function () {
        comentarPregunta(idPregunta, comentarioInput.value);
        mostrarPreguntas();
    };

    contenedorComentario.appendChild(comentarioInput);
    contenedorComentario.appendChild(btnComentar);

    seccionPublicacion.appendChild(parrafo);
    seccionPublicacion.appendChild(contenedorComentario);

    return seccionPublicacion;
}

// ...

function crearSeccionComentarios(comentarios, idPregunta) {
    const seccionComentarios = document.createElement('section');
    seccionComentarios.classList.add('comentarios');

    const tituloComentarios = document.createElement('h3');
    tituloComentarios.textContent = 'Comentarios';
    tituloComentarios.style.color = 'whitesmoke';
    seccionComentarios.appendChild(tituloComentarios);

    // Mostrar los comentarios existentes
    if (comentarios && comentarios.length > 0) {
        const listaComentarios = document.createElement('ul');
        comentarios.forEach(comentario => {
            const comentarioItem = document.createElement('li');
            comentarioItem.textContent = comentario;
            comentarioItem.style.color = 'whitesmoke';
            listaComentarios.appendChild(comentarioItem);
        });
        seccionComentarios.appendChild(listaComentarios);
    }

    return seccionComentarios;
}


// ...

listaPreguntas.forEach((preguntaItem, index) => {
    const { id, pregunta, comentarios } = preguntaItem;

    const contenedorPregunta = document.createElement('div');
    contenedorPregunta.classList.add('contenedor-pregunta');

    const seccionPublicacion = crearSeccionPublicacion(pregunta, id);
    const seccionComentarios = crearSeccionComentarios(comentarios, id);

    contenedorPregunta.appendChild(seccionPublicacion);
    contenedorPregunta.appendChild(seccionComentarios);

    divPreguntas.appendChild(contenedorPregunta);

    // Agregar hr después de cada pregunta excepto la última
    if (index < listaPreguntas.length - 1) {
        const hr = document.createElement('hr');
        divPreguntas.appendChild(hr);
    }
});









function comentarPregunta(idPregunta, comentario) {
    const pregunta = listaPreguntas.find(p => p.id === idPregunta);

    if (pregunta) {
        if (!pregunta.comentarios) {
            pregunta.comentarios = [];
        }
        pregunta.comentarios.push(comentario);
    }
}

function cargarPregunta(preguntaItem) {
    const { id, pregunta } = preguntaItem;
    preguntaInput.value = pregunta;
    objPregunta.id = id;
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;
}

function editarPregunta() {
    objPregunta.pregunta = preguntaInput.value;
    listaPreguntas = listaPreguntas.map(pregunta => {
        return pregunta.id === objPregunta.id ? {...pregunta, pregunta: objPregunta.pregunta} : pregunta;
    });

    limpiarHTML();
    mostrarPreguntas();
    formulario.querySelector('button[type="submit"]').textContent = 'Publicar';
    editando = false;
}

function eliminarPregunta(id) {
    listaPreguntas = listaPreguntas.filter(pregunta => pregunta.id !== id);
    limpiarHTML();
    mostrarPreguntas();
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while (divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}
