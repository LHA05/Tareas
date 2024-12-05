// VARIABLE
// // left palabra reservada
// let nombre;
// console.log(nombre);
// nombre = "Lizbeth";

// // hola mundo
// console.log("Hola mundo desde consola!");

// // hola mundo desde un alert
// alert("hola mundo desde un alert!");

// tipos de datos
// // string
//  let texto = "soy un texto";
// //  numero
// let numero = 21;
// // boleano tiene dos tipos de dato verdadero o falso
// let verdadero= true;
// // undefined
// let undefined;
// // null
// let vacio = null;

// let a = 10;
// let b = 20;
// console.log(a + b);



// DEFINIR CONSTANTE 
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonAgregar = document.querySelector('#botonAgregar'); // Corrección del selector
const check = 'bi-record-circle';
const tachado = 'tachado';
const uncheck = 'bi-circle';

// LIST variable que se va a definir
let LIST;
let id;

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX', { // Corrección de `toLocalDateString`
    weekday: 'long',
    month: 'short',
    day: 'numeric',
});

// ACCIONES
function agregarTarea(tarea, id, hecho, eliminar) {
    if (eliminar) return;

    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : '';
    const elemento = `
    <li id="elemento">
        <i id="${id}" data="hecho" class="bi ${realizado}"></i>
        <p class="tarea-lista text ${LINE}">${tarea}</p>
        <i id="${id}" data="eliminar" class="bi bi-x"></i>
    </li>`;
    lista.insertAdjacentHTML("beforeend", elemento);
}

function tareaRealizada(elemento) {
    elemento.classList.toggle(check); // Corrección de `classlist`
    elemento.classList.toggle(uncheck); // Corrección de `classlist`
    elemento.parentNode.querySelector('.text').classList.toggle(tachado); // Corrección de `classlist`
    LIST[elemento.id].realizado = LIST[elemento.id].realizado;
}

function tareaEliminada(elemento) {
    elemento.parentNode.parentNode.removeChild(elemento.parentNode);
    LIST[elemento.id].eliminar = true;
}

botonAgregar.addEventListener("click", () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            hecho: false,
            eliminar: false,
        });
        localStorage.setItem("TODO", JSON.stringify(LIST)); // Corrección de `JSON, stringify`
        id++;
        input.value = "";
    }
});

lista.addEventListener("click", function (event) { // Corrección de `getItem`
    const elemento = event.target; // Uso de `elemento` en lugar de `Element`
    const elementoData = elemento.attributes.data.value;

    if (elementoData === "hecho") {
        tareaRealizada(elemento);
    } else if (elementoData === "eliminar") {
        tareaEliminada(elemento);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST)); // Corrección de `JSON, stringify`
});

let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;
}

function cargarLista(array) {
    array.forEach(function (item) {
        agregarTarea(item.nombre, item.id, item.hecho, item.eliminar);
    });
}
