Proyecto integrador: Dashboard del Clima
1. Enunciado

Desarrolla una aplicación web denominada “Weather Dashboard”, cuyo objetivo sea permitir al usuario consultar información meteorológica de diferentes ciudades mediante una API externa.

La aplicación deberá contar con una interfaz gráfica desarrollada con HTML, CSS y JavaScript, permitiendo al usuario buscar una ciudad, consultar su información meteorológica, visualizar los resultados dinámicamente y mantener un historial de las ciudades consultadas.

El proyecto deberá demostrar el uso integrado de los siguientes conceptos de JavaScript:

Arreglos
Manipulación del DOM
Eventos
Promesas
async/await
Programación Orientada a Objetos

El alumno deberá ser capaz de explicar durante la presentación qué problema resuelve cada concepto y en qué parte de su código lo está utilizando.

2. Requisitos funcionales
A. Buscador de ciudades

La aplicación debe tener un buscador que permita introducir el nombre de una ciudad.

Ejemplo:

┌─────────────────────────────────────────────┐
│          🌤️ WEATHER DASHBOARD              │
│                                             │
│  [ Cajamarca                    ] [Buscar]  │
│                                             │
└─────────────────────────────────────────────┘
Requisitos
Campo de texto para introducir la ciudad.
Botón Buscar.
La búsqueda debe poder ejecutarse:
haciendo clic en el botón;
presionando Enter.
No debe permitirse realizar búsquedas con el campo vacío.
Debe mostrarse un mensaje apropiado cuando el usuario no introduzca una ciudad.
3. Consumo de una API

El proyecto debe utilizar una API meteorológica externa.

El alumno deberá investigar y elegir una API adecuada.

La aplicación debe obtener información como mínimo sobre:

Ciudad.
País.
Temperatura actual.
Sensación térmica.
Humedad.
Velocidad del viento.
Condición meteorológica.
Icono representativo del clima.

Por ejemplo:

Cajamarca, Perú

🌤️ 18 °C
Parcialmente nublado

Sensación térmica: 17 °C
Humedad: 65 %
Viento: 12 km/h
Importante

Los datos no deben estar escritos manualmente en HTML.

Deben obtenerse de la API y posteriormente incorporarse al documento mediante JavaScript.

4. Uso de Promesas

El proyecto debe utilizar Promesas para realizar operaciones asíncronas.

Por ejemplo, utilizando:

fetch()

El alumno debe demostrar que comprende que una petición HTTP es una operación que puede tardar y que su resultado se obtiene posteriormente.

Debe existir un manejo adecuado de:

.then()
.catch()
.finally()

o una combinación equivalente que permita demostrar el conocimiento de Promesas.

5. Uso de async/await

Además del conocimiento de Promesas, el proyecto deberá utilizar obligatoriamente:

async

y

await

para realizar las peticiones a la API.

Por ejemplo:

async function obtenerClima(ciudad) {
    // ...
}

El alumno deberá explicar durante la presentación:

qué hace async;
qué hace await;
por qué la función es asíncrona;
qué sucede mientras se espera la respuesta de la API.
6. Manipulación del DOM

Toda la información obtenida de la API deberá mostrarse dinámicamente utilizando JavaScript.

El alumno deberá utilizar métodos y propiedades del DOM, por ejemplo:

document.querySelector()
document.createElement()
element.textContent
element.innerHTML
element.classList

No es necesario utilizar todos estos métodos, pero sí debe existir una manipulación real y significativa del DOM.

Ejemplo

Cuando el usuario busque:

Lima

JavaScript deberá actualizar la interfaz con los datos correspondientes.

Si posteriormente busca:

Cusco

la información anterior deberá reemplazarse dinámicamente.

7. Manejo de eventos

La aplicación deberá implementar diferentes eventos.

Como mínimo:

Evento 1 — Buscar
button.addEventListener("click", ...)
Evento 2 — Enter

El usuario debe poder presionar:

Enter

para ejecutar la búsqueda.

Evento 3 — Historial

El usuario deberá poder seleccionar una ciudad del historial para volver a consultar su información.

Se espera que el alumno utilice:

addEventListener()

y comprenda correctamente el funcionamiento de los eventos.

8. Historial de búsquedas

La aplicación deberá almacenar las ciudades que el usuario haya consultado.

Por ejemplo:

Historial

📍 Cajamarca
📍 Lima
📍 Cusco
📍 Arequipa
📍 Trujillo

Este historial deberá manejarse mediante un arreglo.

Ejemplo conceptual:

const historial = [
    "Cajamarca",
    "Lima",
    "Cusco"
];
Requisitos
Cada nueva búsqueda debe incorporarse al arreglo.
No deben existir ciudades duplicadas.
El historial debe actualizarse en el DOM.
Al hacer clic sobre una ciudad del historial, debe volver a consultarse su clima.
Debe existir una opción para limpiar el historial.
9. Programación Orientada a Objetos

Este es uno de los requisitos centrales del proyecto.

El alumno deberá utilizar clases para organizar la lógica de la aplicación.

Como mínimo deberá existir una clase relacionada con el clima.

Por ejemplo:

class Clima {
    constructor(ciudad, temperatura, humedad, viento) {
        this.ciudad = ciudad;
        this.temperatura = temperatura;
        this.humedad = humedad;
        this.viento = viento;
    }

    obtenerResumen() {
        // ...
    }
}

El alumno deberá demostrar que comprende:

clases;
constructor;
propiedades;
métodos;
creación de objetos;
this.
Recomendación

Puede utilizarse una arquitectura similar a:

Clima
 ├── propiedades
 └── métodos

Historial
 ├── arreglo de ciudades
 └── métodos para administrar historial

WeatherApp
 ├── eventos
 ├── API
 └── actualización del DOM

No es obligatorio utilizar exactamente estas clases, pero sí debe existir una utilización coherente de POO.

10. Manejo de errores

La aplicación debe contemplar situaciones en las que algo salga mal.

Como mínimo:

Ciudad inexistente
❌ No encontramos información para "Xyzabc".
Error de conexión
❌ No fue posible obtener la información meteorológica.
Inténtalo nuevamente.
Campo vacío
⚠️ Introduce una ciudad para realizar la búsqueda.
API en proceso

Mientras se espera la respuesta:

⏳ Consultando información meteorológica...

Esto permitirá evaluar si el alumno entiende realmente el flujo de una operación asíncrona.

11. Indicador de carga

Mientras se realiza la petición a la API debe aparecer algún indicador visual.

Por ejemplo:

⏳ Buscando información...

Cuando termine la petición, el indicador debe desaparecer.

Esto debe manejarse mediante JavaScript y DOM.

12. Información adicional

El alumno puede agregar funcionalidades adicionales.

Algunas posibilidades:

🌡️ Temperatura máxima y mínima.
🌅 Hora del amanecer.
🌇 Hora del atardecer.
📅 Pronóstico de varios días.
⭐ Ciudades favoritas.
🌙 Modo oscuro.
📍 Geolocalización.
🔄 Botón para actualizar el clima.
🌎 Conversión Celsius/Fahrenheit.
📊 Gráficos.
💾 localStorage.

Estas funcionalidades no reemplazan los requisitos obligatorios.

13. Requisitos técnicos

El proyecto deberá cumplir:

HTML

Utilizar HTML semántico:

<header>
<main>
<section>
<form>
<footer>

cuando corresponda.

CSS

La interfaz debe ser:

responsive;
organizada;
legible;
usable en escritorio y móvil.
JavaScript

Debe utilizar obligatoriamente:

✅ Arreglos
✅ DOM
✅ Eventos
✅ Promesas
✅ async/await
✅ POO

No se permitirá resolver el proyecto únicamente con código copiado de un tutorial.

El alumno debe poder explicar su propio código.

14. Estructura sugerida

No es obligatorio utilizar exactamente esta estructura, pero pueden trabajar con:

weather-dashboard/
│
├── index.html
│
├── css/
│   └── styles.css
│
└── js/
    ├── app.js
    ├── clima.js
    └── historial.js

Una posible responsabilidad:

clima.js
→ Clase Clima

historial.js
→ Clase Historial

app.js
→ Eventos
→ API
→ DOM
→ integración general
15. Presentación del proyecto

Cada alumno deberá realizar una presentación en la que explique:

1. Funcionamiento

Demostrar:

búsqueda;
resultados;
historial;
errores;
indicador de carga.
2. Arreglos

Mostrar dónde utiliza el arreglo y explicar:

¿Por qué utilizaste un arreglo?

3. DOM

Mostrar dónde genera o modifica elementos HTML mediante JavaScript.

4. Eventos

Explicar qué eventos utiliza y cuándo se ejecutan.

5. Promesas

Explicar qué es una Promesa y cómo interviene en la petición a la API.

6. async/await

Explicar:

async
await
try
catch

y el flujo de la petición.

7. POO

Mostrar sus clases y explicar:

constructor;
propiedades;
métodos;
objetos creados.