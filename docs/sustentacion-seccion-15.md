# 🎓 Guía de Sustentación Técnica — Sección 15 del Enunciado Oficial

> **Proyecto Integrador:** Weather Dashboard — Consulta Meteorológica en Tiempo Real  
> **Equipo:** Grupo G4 (Desarrollo Web)  
> **Documento de Referencia:** [docs/Proyecto.md](Proyecto.md) — Sección 15 (Presentación del Proyecto)  
> **Tecnologías:** HTML5 · CSS3 · JavaScript Vanilla (ES6 Modules) · Fetch API · POO

Este documento contiene las respuestas formales, técnicas y pedagógicas preparadas para la defensa del proyecto ante el docente evaluador, resolviendo los 7 apartados obligatorios estipulados en la **Sección 15 de `docs/Proyecto.md`**.

---

## 1. ⚙️ Funcionamiento General de la Aplicación

> **Pauta Oficial:** *Demostrar: búsqueda, resultados, historial, errores, indicador de carga.*

### A. Flujo de Búsqueda
- El usuario ingresa el nombre de una localidad en el campo de texto `#search-input` (ejemplo: *"Cajamarca"*, *"Madrid"*, *"Tokio"*).
- La búsqueda se activa mediante dos mecanismos equivalentes:
  1. Clic en el botón `#btn-search`.
  2. Presionando la tecla **Enter** dentro del formulario.
- Antes de emitir cualquier petición HTTP, el método `buscar()` en [js/app.js](file:///home/wigsdev/GitHub/dashboard-clima/js/app.js) valida que la entrada no esté vacía con `(ciudad || '').trim()`.

### B. Despliegue de Resultados (Tarjeta Meteorológica)
- Cuando la API responde con éxito, se ocultan los estados de carga y error, y se hace visible el contenedor `#weather-container`.
- Se inyecta la información obligatoria estipulada en la Sección 3 del enunciado:
  - **Ubicación:** Ciudad y País (`#weather-city-name`).
  - **Temperatura Actual:** En °C o °F (`#weather-temp`).
  - **Condición Meteorológica:** Descripción textual (`#weather-badge`) e ícono SVG dinámico diurno/nocturno (`#weather-icon`).
  - **Métricas Secundarias:** Sensación térmica (`#weather-feels-like`), porcentaje de humedad (`#weather-humidity`) y velocidad del viento (`#weather-wind`).
- **Modificador Térmico:** Si la temperatura es $\ge 24\text{ °C}$, se aplica la clase `.card--warm` (borde y resplandor naranja); si es $< 10\text{ °C}$, se aplica `.card--cold` (azul gélido).

### C. Historial de Búsquedas Recientes
- La ciudad consultada se agrega automáticamente al historial gestionado por la clase `Historial` en [js/models/Historial.js](file:///home/wigsdev/GitHub/dashboard-clima/js/models/Historial.js).
- Se renderiza un conjunto de botones interactivos (*chips*) en `#history-list`.
- Al hacer clic sobre cualquier chip, se extrae el atributo `data-city` y se relanza la consulta de inmediato sin necesidad de volver a escribir el nombre.
- El usuario cuenta con el botón `#btn-clear-history` para vaciar el historial tanto en memoria como en almacenamiento local.

### D. Manejo de Errores
- Si el usuario busca una ciudad inexistente (ejemplo: *"Xyz123"*), la geocodificación no devuelve resultados y la UI muestra:  
  `❌ No se encontró la ciudad "Xyz123". Verifica la ortografía.`
- Si ocurre una caída de internet, se activa el evento global `offline` con un banner informativo.
- Si el campo se envía vacío, se muestra: `⚠️ Introduce una ciudad para realizar la búsqueda.` sin disparar la API.

### E. Indicador de Carga
- Mientras la promesa asíncrona de `fetch()` está en estado *pending*, se retira la clase `.hidden` de `#loading-spinner`.
- Simultáneamente, se deshabilitan el input y el botón de búsqueda para evitar peticiones duplicadas o condiciones de carrera (*race conditions*).
- Gracias a la cláusula `finally` en `app.js`, el spinner se apaga siempre de manera garantizada, tanto si la consulta tuvo éxito como si arrojó error.

### F. Carga Inicial Reactiva y Consistencia Visual
- Al arrancar la aplicación (`DOMContentLoaded`), el método `cargarEstadoInicial()` en `app.js` recupera las búsquedas previas de `localStorage`.
- Si existen búsquedas, toma la más reciente (`ciudades[0]`); si es la primera visita (historial vacío), recurre a la ciudad institucional por defecto (`"Cajamarca"`).
- Sincroniza automáticamente `#search-input.value` con dicha ciudad y dispara la consulta en tiempo real para que el usuario nunca encuentre la pantalla vacía.

---

## 2. 🗂️ Arreglos (`Array`)

> **Pauta Oficial:** *Mostrar dónde utiliza el arreglo y explicar: ¿Por qué utilizaste un arreglo?*

### ¿Dónde se utiliza en el código?
- En el modelo [js/models/Historial.js](file:///home/wigsdev/GitHub/dashboard-clima/js/models/Historial.js), encapsulado en la propiedad privada/interna `this._ciudades = []`.

### ¿Por qué se utilizó un Arreglo?
1. **Orden Cronológico y Secuencial:** Un arreglo (`Array`) es la estructura de datos lineal por excelencia en JavaScript para colecciones indexadas donde el orden de llegada de los elementos es fundamental.
2. **Prioridad FIFO / LIFO:** Permite colocar las búsquedas más recientes en la primera posición (índice `0`) mediante `unshift()`.
3. **Control Estricto de Capacidad:** Permite truncar fácilmente la colección a un límite máximo de 5 elementos mediante `slice(0, this.limite)`.
4. **Inmutabilidad y Filtrado Funcional:** Facilita la deduplicación con el método funcional `filter()`, asegurando que no existan ciudades duplicadas antes de reinsertarlas.
5. **Iterabilidad en el DOM:** Se recorre de forma limpia mediante `forEach()` para generar los nodos HTML correspondientes en [js/ui/DomRenderer.js](file:///home/wigsdev/GitHub/dashboard-clima/js/ui/DomRenderer.js).

```javascript
// js/models/Historial.js - Deduplicación y Límite con Métodos de Array
agregar(ciudad) {
  const nombreLimpio = (ciudad || '').trim();
  if (!nombreLimpio) return;

  // 1. filter(): Elimina ocurrencias previas (insensible a mayúsculas)
  this._ciudades = this._ciudades.filter(
    (c) => c.toLowerCase() !== nombreLimpio.toLowerCase()
  );

  // 2. unshift(): Inserta en la posición inicial (más reciente)
  this._ciudades.unshift(nombreLimpio);

  // 3. slice(): Garantiza el límite estricto de 5 elementos
  if (this._ciudades.length > this.limite) {
    this._ciudades = this._ciudades.slice(0, this.limite);
  }

  this.guardarEnStorage();
}
```

---

## 3. 🖥️ Manipulación del DOM

> **Pauta Oficial:** *Mostrar dónde genera o modifica elementos HTML mediante JavaScript.*

### ¿Dónde se manipula el DOM?
Toda la manipulación del DOM está centralizada y desacoplada en la clase `DomRenderer` en [js/ui/DomRenderer.js](file:///home/wigsdev/GitHub/dashboard-clima/js/ui/DomRenderer.js). Ninguna otra clase del proyecto interactúa directamente con `document`.

### Métodos y Propiedades del DOM Aplicados:
1. **Caché de Selectores (`document.getElementById`):**  
   En el `constructor()`, se guardan en propiedades de instancia referencias a `#search-form`, `#search-input`, `#weather-card`, `#loading-spinner`, etc. Esto evita releer el árbol del DOM en cada consulta.
2. **Inyección Segura de Texto (`element.textContent`):**  
   Utilizado para actualizar el nombre de la ciudad, temperatura, humedad, viento y mensajes de error. **Garantiza protección contra vulnerabilidades de inyección XSS**, ya que el navegador trata los datos estrictamente como texto plano y nunca interpreta scripts maliciosos.
3. **Creación Dinámica de Nodos (`document.createElement` y `appendChild`):**  
   En `renderizarHistorial(ciudades)`, cada chip de ciudad se genera dinámicamente:
   ```javascript
   const chip = document.createElement('button');
   chip.type = 'button';
   chip.className = 'history-chip';
   chip.dataset.city = ciudad;
   chip.innerHTML = `<span class="chip-pin">📍</span> <span>${ciudad}</span>`;
   this.historyList.appendChild(chip);
   ```
4. **Gestión de Estados y Clases (`element.classList`):**  
   - `.classList.toggle('hidden', !visible)` para controlar la visibilidad del spinner y tarjetas.
   - `.classList.add('card--warm')` o `.classList.add('card--cold')` para aplicar estilos según el rango de temperatura.
5. **Atributos Dinámicos:**  
   - Modificación de `src` y `alt` en la imagen del ícono meteorológico (`this.weatherIcon.src = clima.icono`).
   - Propiedad `disabled` en botones e inputs durante las cargas.

---

## 4. 🖱️ Manejo de Eventos

> **Pauta Oficial:** *Explicar qué eventos utiliza y cuándo se ejecutan.*

Todos los escuchadores de eventos se configuran en `configurarEventos()` dentro de [js/app.js](file:///home/wigsdev/GitHub/dashboard-clima/js/app.js) utilizando el método estándar `addEventListener()`.

| Evento | Elemento Escuchado | ¿Cuándo se ejecuta? | Acción que dispara |
|---|---|---|---|
| **`DOMContentLoaded`** | `document` | Al terminar el análisis del HTML y construir el árbol del DOM. | Instancia `new App()` e invoca `app.iniciar()`. |
| **`submit`** | Formulario `#search-form` | Al hacer clic en el botón *Buscar* o presionar la tecla **Enter**. | Llama a `e.preventDefault()` y ejecuta `this.buscar(input.value)`. |
| **`input`** | Campo `#search-input` | Cada vez que el usuario escribe o borra un carácter. | Limpia mensajes de advertencia previos (`ocultarFeedback()`). |
| **`click` (Delegación)** | Contenedor `#history-list` | Al hacer clic en cualquier parte de la lista de historial. | Detecta con `e.target.closest('.history-chip')` y relanza la búsqueda. |
| **`click`** | Botón `#btn-clear-history` | Al pulsar el botón *Limpiar historial*. | Vacía el historial en memoria y en `localStorage`. |
| **`click`** | Botones de unidad `#unit-toggle` | Al seleccionar el botón pill de `°C` o `°F`. | Alterna la unidad activa y refresca la tarjeta sin llamar a la API. |
| **`online` / `offline`** | `window` | Al perder o recuperar la conexión a internet del dispositivo. | Muestra u oculta el banner flotante de conectividad. |

### Justificación de la Delegación de Eventos en el Historial:
En lugar de asociar un escuchador a cada botón chip que se crea y destruye, se registra **un único listener en el contenedor padre** `#history-list`. Esto ahorra consumo de memoria y previene fugas de memoria (*memory leaks*):
```javascript
this.ui.historyList.addEventListener('click', (e) => {
  const chip = e.target.closest('.history-chip');
  if (!chip) return; // Si el clic no fue en un chip, se ignora
  const ciudad = chip.dataset.city;
  if (ciudad) this.buscar(ciudad);
});
```

---

## 5. 🌐 Promesas

> **Pauta Oficial:** *Explicar qué es una Promesa y cómo interviene en la petición a la API.*

### ¿Qué es una Promesa?
Una **Promesa** es un objeto especial de JavaScript que representa el valor resultante de una operación asíncrona que aún no ha concluido, pero que se resolverá en algún momento del futuro.

Posee 3 estados posibles y excluyentes:
1. **`Pending` (Pendiente):** Estado inicial mientras la solicitud HTTP viaja por la red hacia el servidor de Open-Meteo.
2. **`Fulfilled` (Cumplida / Resuelta):** La operación tuvo éxito y la promesa devuelve la respuesta con los datos.
3. **`Rejected` (Rechazada):** La operación falló (por ejemplo, error de red, DNS o servidor caído) y devuelve un error.

### ¿Cómo interviene en la petición a la API?
En [js/services/WeatherService.js](file:///home/wigsdev/GitHub/dashboard-clima/js/services/WeatherService.js), se utiliza la API nativa `fetch(url)`:
1. `fetch(url)` inicia una petición HTTP asíncrona y devuelve inmediatamente una primera Promesa.
2. Como JavaScript es un lenguaje de **un solo hilo (*single-threaded*)**, la Promesa evita congelar la interfaz del navegador mientras se esperan los paquetes de datos.
3. Una vez recibidos los encabezados HTTP, `respuesta.json()` devuelve una **segunda Promesa** que procesa y decodifica el cuerpo de la respuesta en formato JSON.

---

## 6. ⚡ `async / await`

> **Pauta Oficial:** *Explicar: async, await, try, catch y el flujo de la petición.*

### Explicación de los Conceptos:
- **`async`:** Palabra clave que se antepone a una función para indicar que es asíncrona. Toda función declarada con `async` devuelve implícitamente una Promesa.
- **`await`:** Operador que solo puede utilizarse dentro de funciones `async`. Pausa la ejecución secuencial de la función hasta que la Promesa a su derecha se resuelva o rechace, **sin bloquear el hilo principal de ejecución (`Event Loop`)**.
- **`try`:** Bloque que encapsula el camino feliz (*happy path*). Si cualquier promesa falla o se lanza un error con `throw new Error()`, la ejecución se interrumpe y salta inmediatamente al bloque `catch`.
- **`catch`:** Captura el objeto de excepción lanzado y permite realizar el tratamiento visual del error sin que la aplicación colapse.
- **`finally`:** Bloque opcional pero vital que se ejecuta siempre al finalizar el ciclo, garantizando el apagado del spinner de carga (`mostrarCargando(false)`).

### Flujo Secuencial de la Petición:
```javascript
// js/app.js - Orquestación con try / catch / finally
async ejecutarConsulta(nombreCiudad) {
  try {
    // 1. Activar estado de carga visual
    this.ui.mostrarCargando(true);

    // 2. await pausa aquí hasta que WeatherService complete Geocoding + Forecast
    const clima = await this.weatherService.consultarClima(nombreCiudad);
    this.climaActual = clima;

    // 3. Inyectar datos en el DOM y actualizar historial
    this.ui.renderizarClima(clima, this.unidad);
    this.historial.agregar(clima.ciudad);
    this.ui.renderizarHistorial(this.historial.obtenerTodas());

  } catch (error) {
    // 4. Se ejecuta si la ciudad no existe o falló la conexión
    this.ui.mostrarError(error.message);
  } finally {
    // 5. Garantiza apagar el spinner en cualquier circunstancia
    this.ui.mostrarCargando(false);
  }
}
```

---

## 7. 🏛️ Programación Orientada a Objetos (POO)

> **Pauta Oficial:** *Mostrar sus clases y explicar: constructor, propiedades, métodos, objetos creados.*

El proyecto implementa Programación Orientada a Objetos mediante clases ES6 estructuradas según el principio de responsabilidad única.

### A. Clase `Clima` ([js/models/Clima.js](file:///home/wigsdev/GitHub/dashboard-clima/js/models/Clima.js))
- **Rol:** Modelo de Dominio de la entidad meteorológica.
- **Constructor:** Recibe un objeto de datos desestructurado, normaliza y redondea valores numéricos con `Math.round()`.
- **Propiedades:** `this.ciudad`, `this.pais`, `this.temperatura`, `this.sensacionTermica`, `this.humedad`, `this.viento`, `this.condicion`, `this.icono`, `this.codigoWmo`, `this.esDia`.
- **Métodos de Instancia:**
  - `obtenerUbicacionCompleta()`: Retorna `"Ciudad, País"`.
  - `toFahrenheit(celsius)`: Realiza el cálculo `(°C × 9/5) + 32`.
  - `obtenerTemperatura(unidad)` y `obtenerSensacion(unidad)`: Devuelven el valor según la unidad activa.
  - `esCalido()`: Evalúa si la temperatura es $\ge 24\text{ °C}$.
- **Método Estático:** `Clima.mapearWMO(codigo, esDia)`: Traduce los códigos estándar de la OMM a texto e íconos sin necesidad de instanciar un objeto, conmutando dinámicamente entre variantes diurnas (`clear-day`, `partly-cloudy`) y nocturnas (`clear-night`, `partly-cloudy-night`) según el ciclo solar `is_day`.

### B. Clase `Historial` ([js/models/Historial.js](file:///home/wigsdev/GitHub/dashboard-clima/js/models/Historial.js))
- **Rol:** Modelo gestor de la colección de búsquedas y almacenamiento web.
- **Constructor:** Configura el límite de elementos (5) y la clave de almacenamiento `localStorage`.
- **Propiedades:** `this.limite`, `this.storageKey`, `this._ciudades`.
- **Métodos:**
  - `agregar(ciudad)`: Aplica deduplicación con `filter()`, inserción al inicio con `unshift()` y truncado con `slice()`.
  - `obtenerTodas()`: Devuelve una copia inmutable del arreglo (`[...this._ciudades]`).
  - `guardarEnStorage()` y `cargarDeStorage()`: Serialización con `JSON.stringify` y `JSON.parse`.
  - `limpiar()`: Resetea el arreglo y elimina la clave del navegador.

### C. Clase `WeatherService` ([js/services/WeatherService.js](file:///home/wigsdev/GitHub/dashboard-clima/js/services/WeatherService.js))
- **Rol:** Capa de servicios para consumo asíncrono de APIs externas.
- **Métodos:** `consultarClima(nombreCiudad)` (coordina Geocoding ➔ Pronóstico y devuelve `new Clima(...)`).

### D. Clase `DomRenderer` ([js/ui/DomRenderer.js](file:///home/wigsdev/GitHub/dashboard-clima/js/ui/DomRenderer.js))
- **Rol:** Capa de vista para manipulación protegida del DOM.
- **Constructor:** Almacena en caché todas las referencias de elementos HTML mediante `getElementById`.
- **Métodos:** `renderizarClima()`, `renderizarHistorial()`, `mostrarCargando()`, `mostrarError()`, `mostrarFeedback()`.

### E. Clase `App` ([js/app.js](file:///home/wigsdev/GitHub/dashboard-clima/js/app.js))
- **Rol:** Controlador orquestador general de la aplicación.
- **Objetos Creados en su Constructor:**
  ```javascript
  this.weatherService = new WeatherService();
  this.historial = new Historial(5);
  this.ui = new DomRenderer();
  ```
- **Métodos:** `iniciar()`, `configurarEventos()`, `buscar()`, `ejecutarConsulta()`, `cambiarUnidad()`.

---

## 📊 Resumen para la Sustentación Oral

```
┌────────────────────────────────────────────────────────────────────────┐
│               MAPA CONCEPTUAL PARA LA DEFENSA ANTE EL JURADO           │
├───────────────────┬───────────────────────────┬────────────────────────┤
│ Concepto Rúbrica  │ Archivo Principal         │ Idea Clave a Defender  │
├───────────────────┼───────────────────────────┼────────────────────────┤
│ 1. Funcionamiento │ index.html / app.js       │ SPA fluida sin recarga │
│ 2. Arreglos       │ js/models/Historial.js    │ FIFO, filter, slice(5) │
│ 3. DOM            │ js/ui/DomRenderer.js      │ textContent, sin XSS   │
│ 4. Eventos        │ js/app.js                 │ submit, Enter, closest │
│ 5. Promesas       │ js/services/WeatherService│ No bloqueante, fetch() │
│ 6. async / await  │ WeatherService / app.js   │ try/catch/finally      │
│ 7. POO            │ Clima.js / Historial.js   │ Clases, encapsulamiento│
└───────────────────┴───────────────────────────┴────────────────────────┘
```
