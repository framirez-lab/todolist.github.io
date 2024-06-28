const btnAgregar = document.getElementById('btnAgregar');
const nuevaTareaInp = document.getElementById('nuevaTarea');
const tareasBody = document.getElementById('tareasBody');
const totalCount = document.getElementById('totalCount');
const totalCompletadas = document.getElementById('totalCompletadas');

const tasks = [
    { id: Date.now(), name: 'Tarea 1', completed: true },
    { id: Date.now() +1, name: 'Tarea 2', completed: false },
    { id: Date.now() +2, name: 'Tarea 3', completed: false }
]
// Función para agregar una nueva tarea
const agregarTarea = () => {
    const nombreTarea = nuevaTareaInp.value.trim();
    if (nombreTarea === '') return;

    const idCounter = Date.now(); // Genera ID único basado en tiempo
    const nuevaTarea = { id: idCounter, name: nombreTarea, completed: false };
    tasks.push(nuevaTarea);
    nuevaTareaInp.value = "";

    actualizarTareas();
    actualizarContadores();
};



// Función para actualizar la lista de tareas en el HTML
const actualizarTareas = () => {
    let template = "";
    tasks.forEach(tarea => {
        const tareaCompletada = tarea.completed ? 'tachado' : '';
        template += `
            <tr>
                <td class="${tareaCompletada}">${tarea.id}</td>
                <td class="${tareaCompletada}">${tarea.name}</td>
                <td><input type="checkbox" class="checkbox" data-id="${tarea.id}" ${tarea.completed ? 'checked' : ''}></td>
                <td><button class="eliminarBtn" data-id="${tarea.id}">Eliminar</button></td>
            </tr>
        `;
    });
    tareasBody.innerHTML = template;

    // Añadir eventos a los nuevos elementos
    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (x) => {
            const taskId = parseInt(x.target.getAttribute('data-id'));
            const task = tasks.find(y => y.id === taskId);
            task.completed = x.target.checked;
            actualizarTareas();
            actualizarContadores();
        });
    });

    document.querySelectorAll('.eliminarBtn').forEach(btn => {
        btn.addEventListener('click', (x) => {
            const taskId = parseInt(x.target.getAttribute('data-id'));
            const taskIndex = tasks.findIndex(y => y.id === taskId);
            tasks.splice(taskIndex, 1);
            actualizarTareas();
            actualizarContadores();
        });
    });
};

// Función para actualizar los contadores de tareas
const actualizarContadores = () => {
    const totalTask = tasks.length;
    const completedTask = tasks.filter(y => y.completed).length;
    totalCount.textContent = totalTask;
    totalCompletadas.textContent = completedTask;
};

// Event listener para el botón de agregar tarea
btnAgregar.addEventListener("click", agregarTarea);

// Inicialización inicial de la lista de tareas y contadores
actualizarTareas();
actualizarContadores();
