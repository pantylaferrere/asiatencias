let estudiantes = [];
const capacidadMaxima = 60;  // Cupo máximo de estudiantes
                                       //yamo al front//
const mensajes = document.getElementById("mensajes");

// Funciones para abrir cada modal de acción
                                                                                     //muestra elementos ocultos//
const openCreateModal = () => new bootstrap.Modal(document.getElementById('createModal')).show();
const openEditModal = () => {
    showModifyTable();
    mostrarCuposDisponibles();

    new bootstrap.Modal(document.getElementById('editModal')).show();
};     //busca y confirma el elemento a eliminar//
const openDeleteModal = () => {
    showDeleteTable();
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
};

// Función para mostrar mensajes
const mostrarMensaje = (mensaje, color = "white") => {
    mensajes.textContent = mensaje;
    mensajes.style.color = color;
};

// Función para crear estudiante
const crearEstudiante = () => {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const gmail = document.getElementById("gmail").value;
    const telefono = document.getElementById("telefono").value;
    const fecha = document.getElementById("fecha de nacimiento").value;
    const pais = document.getElementById("pais").value;
              //$ busca y seleccona elementos//
    if (nombre && apellido && dni && gmail && telefono && fecha && pais) {
        estudiantes.push({ nombre, apellido, dni, gmail, telefono, fecha, pais });
        mostrarMensaje(`Estudiante ${nombre} ${apellido} creado exitosamente.`);
        document.getElementById("formCreate").reset();
    } else {
        mostrarMensaje("Complete todos los campos",);
    }
};

// Validar DNI
function validarDni(event) {
               
    const dni = event.target.value; //asigna el valor del event//
    const regex = /^[0-9]{0,8}$/;  //  regex deja poner lo que este dentro del rango //
    if (!regex.test(dni)) {   //condicion verifica //
        event.target.value = dni.slice(0, 8); //toma los primeros 8 numeros //
    }
}

// Mostrar tabla para modificar estudiantes
function showModifyTable() {
    const tableBody = document.getElementById('table__body_modify');
    tableBody.innerHTML = '';
         //agrega contenido al html//
    estudiantes.forEach((estudiante, index) => { // forEach verifica cada uno de los elentos (index aselera la consulta//
        const row = document.createElement('tr');
        for (const key in estudiante) {//recorre las propiedades de un objeto en un bucle//
            const cell = document.createElement('td');
            if (key === 'dni') {
                cell.textContent = estudiante[key]; // El campo DNI no es editable
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = estudiante[key];
                input.classList.add('table__input');
                input.dataset.key = key;
                input.dataset.index = index;
                input.onchange = (event) => updateStudent(event, index);
                cell.appendChild(input);
            }
            row.appendChild(cell);
        }

        const actionsCell = document.createElement('td');
        const modifyButton = document.createElement('input');
        modifyButton.type = 'button';
        modifyButton.value = 'Guardar';
        modifyButton.classList.add('table__button');
        modifyButton.onclick = () => saveStudent(index);

        actionsCell.appendChild(modifyButton);
        row.appendChild(actionsCell);
        tableBody.appendChild(row);//agrega una nueva celda o fil en la tabla//
    });
}

// Mostrar tabla para eliminar estudiantes
function showDeleteTable() {
    const tableBody = document.getElementById('table__body_delete');
    tableBody.innerHTML = ''; //agrega contenido al html//

    estudiantes.forEach((estudiante, index) => {
        const row = document.createElement('tr');

        for (const key of ['nombre', 'apellido', 'dni']) {
            const cell = document.createElement('td');
            cell.textContent = estudiante[key];
            row.appendChild(cell);
        }

        const actionsCell = document.createElement('td');
        const deleteButton = document.createElement('input');
        deleteButton.type = 'button';
        deleteButton.value = 'Eliminar';
        deleteButton.classList.add('table__button');
        deleteButton.onclick = () => deleteStudent(index);

        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });
}

// Función para actualizar estudiante
function updateStudent(event, index) {
    const { key } = event.target.dataset;
    estudiantes[index][key] = event.target.value;
}

// Función para guardar cambios en estudiante
function saveStudent(index) {
    mostrarMensaje(`Estudiante ${estudiantes[index].nombre} actualizado.`);
}

// Función para eliminar estudiante
function deleteStudent(index) {
    const { nombre, apellido } = estudiantes[index];
    estudiantes.splice(index, 1);
    mostrarMensaje(`Estudiante ${nombre} ${apellido} eliminado.`);
    showDeleteTable();

}
 // Muestra los estudiantes que todavía no han sido registrados
 function mostrarCuposDisponibles() {
    const disponibles = capacidadMaxima - estudiantes.length;
    alert(`Cupos disponibles: ${disponibles}`);
}
// Función para mostrar los cupos disponibles
function mostrarCuposDisponibles() {
// Calcular la cantidad de cupos disponibles
const cuposDisponibles = capacidadMaxima - estudiantes.length;

// Verificar si hay cupos disponibles o si ya no hay espacio
const mensaje = cuposDisponibles > 0
    ? `Quedan ${cuposDisponibles} cupos disponibles.`
    : 'No quedan más cupos disponibles.';

// Mostrar el mensaje en el modal
document.getElementById("cuposDisponiblesContenido").textContent = mensaje;

// Abrir el modal de Cupos Disponibles
new bootstrap.Modal(document.getElementById('cuposdisponiblesModal')).show();
}

function cerrarSesion() {
    alert("Sesion cerrada.");
    // Se puede redirigir a otra página de inicio de sesión si es necesario//
    window.location.href = 'index.html';
}