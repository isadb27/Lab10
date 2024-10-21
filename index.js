class Tarea {
    constructor(nombre, estado = 'pendiente') {
        this.nombre = nombre;
        this.estado = estado;
    }
}

let tareas = [];

function agregarTarea() {
    const inputTarea = document.getElementById('nueva-tarea');
    const nombreTarea = inputTarea.value.trim();
    if (nombreTarea) {
        const nuevaTarea = new Tarea(nombreTarea);
        tareas.push(nuevaTarea);
        inputTarea.value = '';
        actualizarUI();
    }
}

function moverTarea(index, nuevoEstado) {
    if (
        (tareas[index].estado === 'pendiente' && nuevoEstado === 'haciendo') ||
        (tareas[index].estado === 'haciendo' && (nuevoEstado === 'pendiente' || nuevoEstado === 'completada'))
    ) {
        tareas[index].estado = nuevoEstado;
        actualizarUI();
    }
}

function actualizarUI() {
    const columnas = {
        pendiente: document.getElementById('pendiente'),
        haciendo: document.getElementById('haciendo'),
        completada: document.getElementById('completada')
    };

    for (const estado in columnas) {
        columnas[estado].innerHTML = `<h2>${estado.charAt(0).toUpperCase() + estado.slice(1)}</h2>`;
    }

    tareas.forEach((tarea, index) => {
        const tareaElement = document.createElement('div');
        tareaElement.className = 'tarea';
        tareaElement.innerHTML = `<span>${tarea.nombre}</span><div>`;

        if (tarea.estado === 'pendiente') {
            tareaElement.innerHTML += `
                <button onclick="moverTarea(${index}, 'haciendo')" class="btn-mover-haciendo">Mover a Haciendo</button>
            `;
        } else if (tarea.estado === 'haciendo') {
            tareaElement.innerHTML += `
                <button onclick="moverTarea(${index}, 'pendiente')" class="btn-mover-pendiente">Mover a Pendiente</button>
                <button onclick="moverTarea(${index}, 'completada')" class="btn-mover-completada">Mover a Completada</button>
            `;
        }

        tareaElement.innerHTML += '</div>';
        columnas[tarea.estado].appendChild(tareaElement);
    });
}