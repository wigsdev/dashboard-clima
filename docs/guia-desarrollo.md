# Weather Dashboard — Guía de Desarrollo

Manual técnico de referencia para los desarrolladores del equipo.  
Leer antes de comenzar cualquier tarea asignada.

---

## 1. Convenciones de Nomenclatura

### Regla principal

| Propósito | Se usa | Idioma | Ejemplo |
|---|---|---|---|
| **JavaScript** (seleccionar elementos) | `id` | Inglés | `id="search-form"`, `id="weather-card"` |
| **CSS** (estilizar elementos) | `class` | Inglés | `class="weather-card"`, `class="btn-search"` |
| **Propiedades de Datos del Dominio** | variables JS | Español | `clima.ciudad`, `clima.temperatura`, `clima.humedad` |

Un elemento puede tener ambos:
```html
<button id="btn-search" class="btn btn-primary" type="submit">Buscar</button>
```
- JS accede por ID: `document.getElementById('btn-search')`
- CSS estiliza por clase: `.btn-primary { ... }`

### ¿Por qué inglés para IDs y clases, español para datos?
- IDs y clases son convención técnica del código → inglés (estándar global de la industria).
- Los datos del clima (`ciudad`, `pais`, `temperatura`, `sensacionTermica`, `humedad`, `viento`, `condicion`) están en español porque así lo define el enunciado del proyecto integrador ([Docs/Proyecto.md](Proyecto.md)).

### Nomenclatura de clases (prefijo de contexto)

| Prefijo | Contexto |
|---|---|
| `header-` | Encabezado principal y logo |
| `search-` | Barra de búsqueda, input y botones |
| `weather-` | Tarjeta principal de clima y métricas |
| `badge-` | Etiquetas de condición meteorológica |
| `history-` | Contenedor, chips e items del historial |
| `loader-` | Spinner e indicadores de carga asíncrona |
| `error-` | Alertas visuales y contenedores de error |
| `toast-` | Notificaciones flotantes efímeras |
| `btn-` | Botones (variantes: `.btn-primary`, `.btn-secondary`, `.btn-sm`) |

### Modificadores de estado (BEM)
```
.badge-condition          → badge con coloración neutra / azul suave
.weather-card--calido     → modificador visual para climas cálidos (>= 24°C)
.weather-card--frio       → modificador visual para climas fríos (< 10°C)
.toast--info              → notificación informativa
.toast--error             → notificación de fallo
```

---

## 2. Mapa Completo de IDs (para JavaScript)

### Header
| ID | Elemento | Propósito |
|---|---|---|
| `header-actions` | `<div>` | Contenedor para acciones del header (ej. selector °C/°F) |

### Búsqueda y Formulario
| ID | Elemento | Propósito |
|---|---|---|
| `search-form` | `<form>` | Formulario que intercepta el evento `submit` |
| `search-input` | `<input>` | Campo de texto donde se introduce la ciudad |
| `btn-search` | `<button>` | Botón para enviar la búsqueda |
| `search-feedback` | `<p>` | Mensaje de advertencia visual ante campo vacío |

### Indicadores de Estado
| ID | Elemento | Propósito |
|---|---|---|
| `loading-spinner` | `<div>` | Indicador visual de carga asíncrona (`aria-busy`) |
| `error-card` | `<div>` | Contenedor visual de error (404 / red) |
| `error-message` | `<p>` | Texto dinámico descriptivo del error |

### Tarjeta Principal del Clima
| ID | Elemento | Propósito |
|---|---|---|
| `weather-container` | `<section>` | Contenedor que agrupa los resultados meteorológicos |
| `weather-card` | `<article>` | Tarjeta principal del clima |
| `weather-city-name` | `<h2>` | Nombre de la ciudad y país (ej. "Cajamarca, Perú") |
| `weather-badge` | `<span>` | Etiqueta con la condición climática (ej. "Soleado") |
| `weather-temp` | `<span>` | Valor numérico de la temperatura actual |
| `weather-unit` | `<span>` | Unidad de medida (°C o °F) |
| `weather-icon` | `<div>` | Emoji o icono gráfico representativo |
| `weather-condition` | `<p>` | Descripción de la condición meteorológica |
| `weather-apparent` | `<span>` | Valor numérico de la sensación térmica |
| `weather-humidity` | `<span>` | Porcentaje de humedad relativa |
| `weather-wind` | `<span>` | Velocidad del viento en km/h |

### Historial de Búsquedas
| ID | Elemento | Propósito |
|---|---|---|
| `history-container` | `<section>` | Contenedor de la sección de historial |
| `history-count` | `<span>` | Contador de ciudades registradas (ej. "(4)") |
| `btn-clear-history` | `<button>` | Botón para vaciar todo el historial |
| `history-list` | `<div>` | Contenedor interactivo para los chips del historial |
| `history-empty` | `<p>` | Mensaje cuando no hay búsquedas registradas |

### Notificaciones Flotantes
| ID | Elemento | Propósito |
|---|---|---|
| `toast-container` | `<div>` | Contenedor fijo para renderizar toasts efímeros |

---

## 3. Mapa Completo de Clases (para CSS)

### Layout General
- `.app-layout`: Contenedor flex vertical que ocupa el 100vh.
- `.container`: Contenedor centrado con `max-width` y `padding-inline` fluido.
- `.main`: Bloque principal con flujo vertical espaciado.
- `.sr-only`: Utilidad de accesibilidad (oculto a la vista, legible por screen readers).
- `.hidden`: Oculta elementos mediante `display: none !important;`.

### Header
- `.header`: Barra superior fija o estática con borde inferior.
- `.header-container`: Contenedor flex alineado entre logo y acciones.
- `.logo`: Grupo de icono y nombre.
- `.logo-icon`: Tamaño y espaciado del emoji/icono del logo.
- `.logo-name`: Tipografía pesada (`800`) para la marca.

### Formulario y Búsqueda
- `.search-section`: Sección envolvente del buscador.
- `.search-form`: Formulario flex con validaciones.
- `.search-input-group`: Barra contenedora redondeada (`border-radius: var(--radius-lg)`).
- `.search-input`: Input estilizado sin bordes nativos.
- `.search-feedback`: Texto de alerta bajo el input (`color: var(--color-danger)`).

### Tarjeta del Clima
- `.weather-section`: Contenedor general de resultados.
- `.weather-card`: Tarjeta elevada con sombra y borde suave.
- `.weather-card-header`: Flex con nombre de ciudad y badge.
- `.weather-city-name`: Título `1.75rem` en negrita.
- `.badge`: Píldora redondeada para estados.
- `.badge-condition`: Colores azulados suaves para la condición.
- `.weather-main-group`: Flex con temperatura gigante e icono.
- `.weather-temp`: Tipografía `4.25rem` con `font-weight: 800`.
- `.weather-unit`: Unidad `1.75rem` alineada con la cifra.
- `.weather-metrics`: Grid de 3 columnas para métricas secundarias.
- `.metric-item`: Caja con fondo elevado para cada métrica.
- `.metric-icon`, `.metric-label`, `.metric-value`: Partes de la métrica.

### Historial
- `.history-section`: Tarjeta envolvente del historial.
- `.history-header`: Título y botón de vaciado.
- `.history-chip`: Botón tipo píldora interactivo con pin `📍`.
- `.history-empty`: Texto en cursiva para estado sin registros.

### Estados
- `.loader-wrapper`: Contenedor centrado con spinner.
- `.spinner`: Círculo animado con rotación infinita.
- `.error-card`: Tarjeta roja con alerta y mensaje de fallo.
- `.toast`, `.toast--info`, `.toast--error`: Notificaciones flotantes.

---

## 4. Estructura del HTML (Esquema Completo)

```
<body>
└── <div class="app-layout">
    ├── <header class="header">
    │     <div class="container header-container">
    │       <div class="logo">
    │         <span class="logo-icon"> 🌤️ </span>
    │         <h1 class="logo-name"> Weather Dashboard </h1>
    │       </div>
    │       <div id="header-actions" class="header-actions">
    │         <!-- Controles adicionales (ej. selector °C/°F en T-12) -->
    │       </div>
    │     </div>
    │
    ├── <main class="main container">
    │   │
    │   ├── <section class="search-section" aria-label="Búsqueda de ciudades">
    │   │     <form id="search-form" class="search-form" novalidate>
    │   │       <div class="search-input-group">
    │   │         <label class="sr-only" for="search-input"> Nombre de la ciudad </label>
    │   │         <input id="search-input" class="search-input" type="text"
    │   │                placeholder="Introduce una ciudad (ej. Cajamarca, Madrid...)"
    │   │                autocomplete="off" required>
    │   │         <button id="btn-search" class="btn btn-primary btn-search" type="submit">
    │   │           Buscar
    │   │         </button>
    │   │       </div>
    │   │       <p id="search-feedback" class="search-feedback hidden" role="alert"></p>
    │   │     </form>
    │   │
    │   ├── <div id="loading-spinner" class="loader-wrapper hidden" aria-live="polite" aria-busy="false">
    │   │     <div class="spinner"></div>
    │   │     <p class="loader-text"> Consultando información meteorológica... </p>
    │   │   </div>
    │   │
    │   ├── <div id="error-card" class="error-card hidden" role="alert">
    │   │     <div class="error-icon" aria-hidden="true"> ⚠️ </div>
    │   │     <div class="error-content">
    │   │       <h3 class="error-title"> No se pudo obtener el clima </h3>
    │   │       <p id="error-message" class="error-message"></p>
    │   │     </div>
    │   │   </div>
    │   │
    │   ├── <section id="weather-container" class="weather-section hidden" aria-label="Resultados meteorológicos">
    │   │     <article id="weather-card" class="weather-card">
    │   │       <header class="weather-card-header">
    │   │         <div>
    │   │           <span class="weather-label"> Condición Actual </span>
    │   │           <h2 id="weather-city-name" class="weather-city-name"> -- </h2>
    │   │         </div>
    │   │         <span id="weather-badge" class="badge badge-condition"> -- </span>
    │   │       </header>
    │   │       <div class="weather-main-group">
    │   │         <div class="weather-temp-wrapper">
    │   │           <span id="weather-temp" class="weather-temp"> -- </span>
    │   │           <span id="weather-unit" class="weather-unit"> °C </span>
    │   │         </div>
    │   │         <div class="weather-condition-group">
    │   │           <div id="weather-icon" class="weather-icon" aria-hidden="true"> 🌤️ </div>
    │   │           <p id="weather-condition" class="weather-condition"> -- </p>
    │   │         </div>
    │   │       </div>
    │   │       <div class="weather-metrics">
    │   │         <div class="metric-item">
    │   │           <span class="metric-icon"> 🌡️ </span>
    │   │           <div class="metric-info">
    │   │             <span class="metric-label"> Sensación </span>
    │   │             <span id="weather-apparent" class="metric-value"> -- </span>
    │   │           </div>
    │   │         </div>
    │   │         <div class="metric-item">
    │   │           <span class="metric-icon"> 💧 </span>
    │   │           <div class="metric-info">
    │   │             <span class="metric-label"> Humedad </span>
    │   │             <span id="weather-humidity" class="metric-value"> -- </span>
    │   │           </div>
    │   │         </div>
    │   │         <div class="metric-item">
    │   │           <span class="metric-icon"> 💨 </span>
    │   │           <div class="metric-info">
    │   │             <span class="metric-label"> Viento </span>
    │   │             <span id="weather-wind" class="metric-value"> -- </span>
    │   │           </div>
    │   │         </div>
    │   │       </div>
    │   │     </article>
    │   │   </section>
    │   │
    │   └── <section id="history-container" class="history-section" aria-label="Historial de ciudades consultadas">
    │         <div class="history-header">
    │           <div class="history-title-group">
    │             <h3 class="history-title"> Historial de búsquedas </h3>
    │             <span id="history-count" class="history-count"> (0) </span>
    │           </div>
    │           <button id="btn-clear-history" class="btn btn-secondary btn-sm btn-clear" type="button">
    │             Limpiar historial
    │           </button>
    │         </div>
    │         <div id="history-list" class="history-list">
    │           <p id="history-empty" class="history-empty">
    │             No hay búsquedas recientes. Las ciudades consultadas aparecerán aquí.
    │           </p>
    │           <!-- JS renderiza aquí los chips interactivos (.history-chip) -->
    │         </div>
    │       </section>
    │
    ├── <footer class="footer">
    │     <div class="container footer-container">
    │       <p> Weather Dashboard © 2026 — Proyecto Integrador G4 </p>
    │       <p class="footer-credits"> Datos provistos por Open-Meteo </p>
    │     </div>
    │   </footer>
    │
    ├── <div id="toast-container" class="toast-container" aria-live="polite"></div>
    │
    └── <script type="module" src="js/app.js"></script>
```

---

## 5. Estructura de Componentes Dinámicos (Generados por JS)

### 5.1 Chip del Historial (`.history-chip`)
Generado por `DomRenderer.renderizarHistorial(ciudades)`:
```html
<button type="button" class="history-chip" data-city="Cajamarca">
  <span aria-hidden="true">📍</span>
  <span>Cajamarca</span>
</button>
```

### 5.2 Notificación Toast (`.toast`)
Generado por `DomRenderer.mostrarToast(mensaje, tipo)`:
```html
<div class="toast toast--info">
  Clima actualizado para Cajamarca
</div>
```

---

## 6. Selectores JavaScript (Referencia Rápida)

```javascript
// Búsqueda
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const btnSearch = document.getElementById('btn-search');
const searchFeedback = document.getElementById('search-feedback');

// Estados
const loadingSpinner = document.getElementById('loading-spinner');
const errorCard = document.getElementById('error-card');
const errorMessage = document.getElementById('error-message');

// Clima
const weatherContainer = document.getElementById('weather-container');
const weatherCityName = document.getElementById('weather-city-name');
const weatherBadge = document.getElementById('weather-badge');
const weatherTemp = document.getElementById('weather-temp');
const weatherUnit = document.getElementById('weather-unit');
const weatherIcon = document.getElementById('weather-icon');
const weatherCondition = document.getElementById('weather-condition');
const weatherApparent = document.getElementById('weather-apparent');
const weatherHumidity = document.getElementById('weather-humidity');
const weatherWind = document.getElementById('weather-wind');

// Historial
const historyContainer = document.getElementById('history-container');
const historyList = document.getElementById('history-list');
const historyCount = document.getElementById('history-count');
const historyEmpty = document.getElementById('history-empty');
const btnClearHistory = document.getElementById('btn-clear-history');
```

---

## 7. Funciones de UI y Renderizado (`DomRenderer`)

| Método | Argumentos | Propósito |
|---|---|---|
| `mostrarCargando(visible)` | `boolean` | Alterna visualización del spinner y atributo `aria-busy`. |
| `mostrarError(mensaje)` | `string` | Muestra el bloque de error y oculta la tarjeta de clima. |
| `ocultarError()` | — | Oculta la tarjeta de error. |
| `mostrarFeedbackBusqueda(msg)` | `string` | Muestra advertencia bajo el input si está vacío. |
| `renderizarClima(clima, unidad)` | `Clima, string` | Actualiza todos los elementos de la tarjeta con `textContent`. |
| `renderizarHistorial(ciudades)` | `string[]` | Crea dinámicamente los chips de historial con `createElement`. |
| `mostrarToast(mensaje, tipo)` | `string, string` | Inyecta un aviso temporal en `#toast-container` con auto-remove. |

---

## 8. Valores y Constantes Meteorológicas (Tabla WMO)

Mapeo oficial de códigos de la Organización Meteorológica Mundial (WMO) a español y emojis:

| Código WMO | Descripción en Español | Icono |
|---|---|---|
| `0` | Cielo despejado | ☀️ |
| `1` | Mayormente despejado | 🌤️ |
| `2` | Parcialmente nublado | ⛅ |
| `3` | Nublado | ☁️ |
| `45, 48` | Niebla y niebla con escarcha | 🌫️ |
| `51, 53, 55` | Llovizna (ligera, moderada, densa) | 🌧️ |
| `61, 63, 65` | Lluvia (ligera, moderada, intensa) | 🌧️ / ⛈️ |
| `71, 73, 75` | Nieve (ligera, moderada, fuerte) | ❄️ |
| `80, 81, 82` | Chubascos | 🌦️ / ⛈️ |
| `95, 96, 99` | Tormenta eléctrica / Granizo | ⛈️ |

---

## 9. Estructura de los Modelos de Dominio (POO)

### 9.1 Clase `Clima` (`js/models/Clima.js`)
```javascript
export class Clima {
  constructor({ ciudad, pais, temperatura, sensacionTermica, humedad, viento, condicion, icono, codigoWmo = 0, fechaHora = new Date() }) {
    this.ciudad = ciudad;
    this.pais = pais;
    this.temperatura = Math.round(temperatura);
    this.sensacionTermica = Math.round(sensacionTermica);
    this.humedad = Math.round(humedad);
    this.viento = Math.round(viento);
    this.condicion = condicion;
    this.icono = icono;
    this.codigoWmo = codigoWmo;
    this.fechaHora = fechaHora;
  }
  obtenerUbicacionCompleta() { /* ciudad, país */ }
  obtenerTemperaturaFormateada(unidad = 'C') { /* °C o °F */ }
  obtenerSensacionFormateada(unidad = 'C') { /* °C o °F */ }
  esCalido() { return this.temperatura >= 24; }
  obtenerResumen() { /* Síntesis de texto */ }
}
```

### 9.2 Clase `Historial` (`js/models/Historial.js`)
```javascript
export class Historial {
  constructor({ limiteMaximo = 8, storageKey = 'weather_dashboard_history' } = {}) {
    this._ciudades = [];
    this.limiteMaximo = limiteMaximo;
    this.storageKey = storageKey;
    this.cargarDeStorage();
  }
  agregar(ciudad) { /* unshift sin duplicados, respeta límite y guarda */ }
  eliminar(ciudad) { /* filter y guarda */ }
  limpiar() { /* vacía array y guarda */ }
  obtenerTodas() { return [...this._ciudades]; } /* Inmutable */
  get total() { return this._ciudades.length; }
  guardarEnStorage() { /* localStorage.setItem */ }
  cargarDeStorage() { /* localStorage.getItem */ }
}
```

---

## 10. Variables CSS Recomendadas y Sintaxis Moderna

### Variables en `:root`
```css
:root {
  --color-primary: #0284c7;
  --color-primary-hover: #0369a1;
  --color-accent: #f59e0b;
  --bg-body: #f8fafc;
  --bg-surface: #ffffff;
  --bg-surface-elevated: #f1f5f9;
  --border-color: #e2e8f0;
  --border-focus: #38bdf8;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --font-main: 'Plus Jakarta Sans', -apple-system, sans-serif;
  --max-width: 52rem;
}
```

### Espaciados Fluidos con `clamp()` y Propiedades Lógicas
```css
.container {
  width: 100%;
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: clamp(1rem, 0.38rem + 2.72vw, 2.5rem);
}
```

---

## 11. Breakpoints Responsive Modernos (Sintaxis `em`)

| Breakpoint | Consulta CSS | Comportamiento |
|---|---|---|
| **Mobile** | Base / Default | 1 sola columna vertical, formulario apilado, métricas secundarias en 1 columna. |
| **Tablet** | `@media (width > 36em)` | Rejilla de métricas en 3 columnas, padding fluido, chips de historial envueltos. |
| **Desktop** | `@media (width > 62em)` | Ancho completo maximizado a `52rem`, tarjeta amplia con temperatura en `4.25rem`. |

---

## 12. Métodos JavaScript Obligatorios (Rúbrica)

| Requerimiento | Método / Sintaxis | Dónde se Aplica |
|---|---|---|
| **Arreglos: inserción al inicio** | `.unshift()` | `Historial.agregar(ciudad)` |
| **Arreglos: evitar duplicados** | `.filter()` | `Historial.agregar(ciudad)` y `eliminar(ciudad)` |
| **Arreglos: inmutabilidad** | `[...this._ciudades]` / `.slice()` | `Historial.obtenerTodas()` |
| **Arreglos: transformación visual** | `.map()` | `DomRenderer.renderizarHistorial(ciudades)` |
| **Asincronía: peticiones** | `fetch(url)` | `WeatherService.buscarCoordenadas` y `obtenerPronostico` |
| **Asincronía: promesas modernas** | `async / await` | `WeatherService.consultarClima` y `App.ejecutarBusqueda` |
| **Control de excepciones** | `try...catch...finally` | `WeatherService` y `App.ejecutarBusqueda` |
| **POO: instanciación** | `new Clima(...)`, `new Historial(...)` | `WeatherService` y `App` |
| **DOM: creación segura** | `document.createElement()`, `.textContent` | `DomRenderer` |
| **DOM: manipulación de hijos** | `.replaceChildren(...)` | `DomRenderer.renderizarHistorial` |

---

## 13. Eventos Requeridos

| Evento | Elemento | Disparador | Acción |
|---|---|---|---|
| `submit` | `#search-form` | Clic en `#btn-search` o presionar `Enter` | `e.preventDefault()`, valida input y llama a `ejecutarBusqueda()` |
| `input` | `#search-input` | Al escribir en el input | Limpia feedback de error si existía |
| `click` (delegado) | `#history-list` | Clic en `.history-chip` | Extrae `data-city`, setea el input y consulta inmediatamente |
| `click` | `#btn-clear-history` | Clic en el botón | Invoca `historial.limpiar()`, actualiza vista y emite toast |
| `DOMContentLoaded` | `document` | Al cargar la página | Instancia clases, registra eventos y carga historial de storage |

---

## 14. Validaciones del Formulario

1. **Campo vacío**:
   - Condición: `!ciudad.trim()`.
   - Acción: No disparar petición HTTP. Mostrar feedback con `DomRenderer.mostrarFeedbackBusqueda('Por favor, introduce una ciudad.')`.
2. **Ciudad no encontrada (404)**:
   - Condición: La API Geocoding devuelve `data.results` vacío.
   - Acción: Lanzar error específico capturado en `catch` para mostrar: `"No se encontraron resultados para la ciudad 'X'"` en `#error-card`.
3. **Fallo de Red / Offline**:
   - Condición: `!navigator.onLine` o `TypeError` en fetch.
   - Acción: Mostrar mensaje comprensible: `"Sin conexión a internet. Verifica tu red."`.

---

## 15. Referencia de Tareas por Archivo

| Archivo | Tareas que lo Modifican |
|---|---|
| `index.html` | **T-01**, **T-02** |
| `css/styles.css` | **T-01**, **T-03**, **T-12** |
| `js/models/Clima.js` | **T-01**, **T-04** |
| `js/models/Historial.js` | **T-01**, **T-05**, **T-11** |
| `js/services/WeatherService.js` | **T-01**, **T-06** |
| `js/ui/DomRenderer.js` | **T-01**, **T-07**, **T-09**, **T-10** |
| `js/app.js` | **T-01**, **T-08**, **T-09**, **T-10**, **T-12** |
| `README.md` | **T-01**, **T-13** |

---

## 16. Punto de Entrada: `DOMContentLoaded`

### Flujo de Ejecución al Cargar la Página
```
Navegador carga index.html
       │
       ▼
Dispara evento `DOMContentLoaded`
       │
       ▼
Instancia `const app = new App()`
       ├── new WeatherService()
       ├── new Historial({ limiteMaximo: 8 }) ──► Carga de localStorage
       └── new DomRenderer()
       │
       ▼
Ejecuta `app.iniciar()`
       ├── `registrarEventos()` (submit, input, click delegado)
       └── `renderizarEstadoInicial()` ──► Renderiza chips de localStorage
```

---

## 17. Referencia Rápida por Tarea

| Tarea | Nombre | Secciones a Consultar en esta Guía |
|---|---|---|
| **T-01** | Inicialización y Documentación Base | Sección 1 (Nomenclatura), Sección 10 (Tokens), Sección 15 |
| **T-02** | Estructura Semántica HTML5 | Sección 2 (Mapa de IDs), Sección 4 (Esquema HTML), Sección 5 |
| **T-03** | Sistema de Diseño CSS | Sección 3 (Clases), Sección 10 (Tokens y clamp), Sección 11 (Breakpoints) |
| **T-04** | Clase `Clima` (POO) | Sección 8 (WMO), Sección 9.1 (Estructura Clima), Sección 12 |
| **T-05** | Clase `Historial` (POO) | Sección 9.2 (Estructura Historial), Sección 12 (Métodos de Array) |
| **T-06** | `WeatherService` (Async / Fetch) | Sección 8 (WMO), Sección 9.1, Sección 12 (Promesas y async/await) |
| **T-07** | `DomRenderer` (DOM) | Sección 2 (IDs), Sección 5 (Componentes), Sección 7 (Métodos UI) |
| **T-08** | Controlador Principal `app.js` | Sección 6 (Selectores), Sección 13 (Eventos), Sección 14, Sección 16 |
| **T-09** | Interacción con Historial | Sección 5.1 (Chips), Sección 7, Sección 13 (Delegación de eventos) |
| **T-10** | Manejo de Errores | Sección 2 (error-card), Sección 7, Sección 14 (Validaciones) |
| **T-11** | Persistencia `localStorage` | Sección 9.2 (Historial), Sección 12 |
| **T-12** | Mejoras Visuales (°C / °F) | Sección 9.1 (Formateo), Sección 10, Sección 11 |
| **T-13** | Actualización Final README | Sección 15, Sección 17 |
