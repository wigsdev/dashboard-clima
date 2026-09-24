# Weather Dashboard — Propuesta de Diseño UI/UX y Sistema Visual

Documento de especificación de diseño visual, experiencia de usuario (UX), arquitectura de componentes y maquetación responsiva para el proyecto **Weather Dashboard**, elaborado tomando como referencia estructural `revision-diseno.md`.

---

## 1. Contexto y Objetivos de UX

### 1.1 Propósito de la Aplicación
**Weather Dashboard** es un panel de control meteorológico moderno, minimalista y de alta legibilidad diseñado para que el usuario consulte rápidamente las condiciones climáticas de cualquier ciudad del mundo, visualice métricas esenciales y mantenga un historial interactivo de acceso inmediato.

### 1.2 Perfil del Usuario
- **Evaluador / Docente**: Requiere verificar con rapidez que todos los conceptos solicitados (Arreglos, DOM, Eventos, Promesas, async/await, POO) se reflejen de forma clara y funcional en la interfaz.
- **Usuario Final**: Busca una herramienta ágil, sin distracciones, con feedback visual instantáneo (estados de carga, confirmaciones y mensajes de error comprensibles).

### 1.3 Principios de Diseño
1. **Claridad sobre Saturación**: La información climática principal (temperatura, ciudad, icono, condición) domina visualmente la pantalla; los datos secundarios se organizan en tarjetas complementarias.
2. **Feedback Inmediato**: Toda interacción asíncrona comunica su estado (spinner mientras consulta la API, alertas ante errores de red o 404, toasts flotantes de confirmación).
3. **Diseño Mobile-First y Adaptativo**: La experiencia es óptima desde pantallas compactas de 360px hasta monitores ultra-anchos.
4. **CSS Moderno**: Uso de variables en `:root`, espaciados fluidos con `clamp()`, propiedades lógicas (`padding-inline`) y Media Queries con sintaxis de rango (`@media (width > ...em)`).

---

## 2. Decisiones Técnicas de CSS Moderno

Siguiendo el estándar de desarrollo frontend contemporáneo:

### 2.1 Variables Personalizadas (`:root`)
Centralización de tokens semánticos:
```css
:root {
  /* Colores de marca y superficies */
  --color-primary: #0284c7;         /* Azul cielo meteorológico */
  --color-primary-hover: #0369a1;
  --color-accent: #f59e0b;          /* Ámbar cálido / sol */
  --bg-body: #f8fafc;              /* Fondo suave neutro */
  --bg-surface: #ffffff;           /* Superficie de tarjetas */
  --bg-surface-elevated: #f1f5f9;  /* Superficie secundaria / métricas */
  --border-color: #e2e8f0;
  --border-focus: #38bdf8;

  /* Textos */
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --text-inverse: #ffffff;

  /* Estados */
  --badge-condition-bg: #e0f2fe;
  --badge-condition-text: #0369a1;
  --error-bg: #fef2f2;
  --error-text: #991b1b;
  --error-border: #fecaca;

  /* Tipografía y medidas */
  --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --radius-sm: 0.375rem;   /* 6px */
  --radius-md: 0.625rem;   /* 10px */
  --radius-lg: 1rem;       /* 16px */
  --radius-full: 9999px;
  --max-width: 54rem;      /* ~864px */
}
```

### 2.2 Márgenes y Paddings Fluidos con `clamp()` y Propiedades Lógicas
En lugar de valores fijos en píxeles, los contenedores utilizan funciones matemáticas adaptativas y propiedades lógicas que respetan la dirección del flujo de texto:
```css
.container {
  width: 100%;
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: clamp(1rem, 0.38rem + 2.72vw, 2.5rem);
}
```

### 2.3 Media Queries con Sintaxis de Rango (`Range Syntax`) en `em`
Se reemplaza el clásico `@media (min-width: ...)` por la sintaxis moderna con unidades relativas `em` que responden fielmente a configuraciones de accesibilidad y zoom del navegador:
```css
/* Breakpoint Tablet / Mediano */
@media (width > 36em) { /* > 576px */
  .search-input-group {
    flex-direction: row;
  }
  .weather-metrics {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Breakpoint Desktop / Computadora */
@media (width > 62em) { /* > 992px */
  .main.container {
    padding-block: 2.5rem;
  }
  .weather-main-group {
    padding-inline: 1.5rem;
  }
}
```

---

## 3. Modelos de Interfaz y Wireframes (ASCII)

---

### 3.1 Vista Desktop (`width > 62em` / `> 992px`)

En computadoras de escritorio, la pantalla aprovecha el ancho visual distribuyendo el contenido en una estructura jerárquica clara con buscador central, tarjeta de clima principal prominente y sección de historial integrada:

```
┌────────────────────────────────────────────────────────────────────────┐
│  🌤️  Weather Dashboard                                     [°C | °F]  │  <header class="header">
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   ┌───────────────────────────────────────────────────┐ ┌────────────┐ │
│   │ [🔍 Escribe una ciudad: Cajamarca, Madrid...    ] │ │  [Buscar]  │ │  <form id="search-form" class="search-form">
│   └───────────────────────────────────────────────────┘ └────────────┘ │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────────┐ │
│   │ CONDICIÓN ACTUAL                         [ ⛅ Parcialmente Nublado ]│ │  <section id="weather-container" class="weather-section">
│   │ Cajamarca, Perú                                                  │ │  <article id="weather-card" class="weather-card">
│   │                                                                  │ │
│   │   18 °C                                         🌤️               │ │
│   │                                                                  │ │
│   │ ┌───────────────────┐ ┌───────────────────┐ ┌──────────────────┐ │ │
│   │ │ 🌡️ Sensación      │ │ 💧 Humedad        │ │ 💨 Viento        │ │ │  <div class="weather-metrics">
│   │ │ 17 °C             │ │ 65 %              │ │ 12 km/h          │ │ │
│   │ └───────────────────┘ └───────────────────┘ └──────────────────┘ │ │
│   └──────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────────┐ │
│   │ HISTORIAL DE BÚSQUEDAS (4)                 [ Limpiar historial ] │ │  <section id="history-container" class="history-section">
│   │                                                                  │ │
│   │  [📍 Cajamarca]   [📍 Lima]   [📍 Madrid]   [📍 Tokio]            │ │  <div id="history-list" class="history-list">
│   └──────────────────────────────────────────────────────────────────┘ │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│  Weather Dashboard © 2026 — Proyecto Integrador G4                     │  <footer class="footer">
└────────────────────────────────────────────────────────────────────────┘
```

---

### 3.2 Vista Tablet (`36em < width <= 62em` / `576px – 992px`)

En tabletas se conserva la disposición fluida de ancho completo, reajustando el tamaño de la tipografía y los márgenes con `clamp()`:

```
┌────────────────────────────────────────────────────────────────┐
│  🌤️  Weather Dashboard                             [°C | °F]  │  <header class="header">
└────────────────────────────────────────────────────────────────┘
│                                                                │
│  ┌──────────────────────────────────────────────┐ ┌──────────┐ │
│  │ [🔍 Introduce una ciudad...                ] │ │ [Buscar] │ │  <form id="search-form" class="search-form">
│  └──────────────────────────────────────────────┘ └──────────┘ │
│                                                                │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ CONDICIÓN ACTUAL                   [ ⛅ Parcialmente Nub. ]│ │  <section id="weather-container" class="weather-section">
│  │ Cajamarca, Perú                                           │ │  <article id="weather-card" class="weather-card">
│  │                                                           │ │
│  │   18 °C                                    🌤️             │ │
│  │                                                           │ │
│  │ ┌───────────────┐  ┌───────────────┐  ┌─────────────────┐ │ │
│  │ │ 🌡️ Sensación  │  │ 💧 Humedad    │  │ 💨 Viento       │ │ │  <div class="weather-metrics">
│  │ │ 17 °C         │  │ 65 %          │  │ 12 km/h         │ │ │
│  │ └───────────────┘  └───────────────┘  └─────────────────┘ │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ HISTORIAL DE BÚSQUEDAS (4)            [ Limpiar historial]│ │  <section id="history-container" class="history-section">
│  │ [📍 Cajamarca]  [📍 Lima]  [📍 Madrid]  [📍 Tokio]        │ │  <div id="history-list" class="history-list">
│  └───────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

---

### 3.3 Vista Mobile (`width <= 36em` / `< 576px`)

En teléfonos móviles, la maquetación se convierte en una sola columna vertical estricta; el formulario apila el botón y las métricas secundarias se reorganizan:

```
┌──────────────────────────────────────────┐
│  🌤️  Weather Dashboard                   │  <header class="header">
└──────────────────────────────────────────┘
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ [🔍 Ciudad: Cajamarca, Lima...   ] │  │  <input id="search-input" class="search-input">
│  └────────────────────────────────────┘  │
│  ┌────────────────────────────────────┐  │
│  │              [ Buscar ]            │  │  <button id="btn-search" class="btn btn-search">
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ CONDICIÓN ACTUAL                   │  │  <section id="weather-container" class="weather-section">
│  │ Cajamarca, Perú                    │  │  <article id="weather-card" class="weather-card">
│  │ [ ⛅ Parcialmente Nublado ]         │  │
│  │                                    │  │
│  │       18 °C          🌤️            │  │
│  │                                    │  │
│  │ ┌────────────────────────────────┐ │  │
│  │ │ 🌡️ Sensación: 17 °C            │ │  │  <div class="weather-metrics">
│  │ ├────────────────────────────────┤ │  │
│  │ │ 💧 Humedad: 65 %               │ │  │
│  │ ├────────────────────────────────┤ │  │
│  │ │ 💨 Viento: 12 km/h             │ │  │
│  │ └────────────────────────────────┘ │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ HISTORIAL (4)  [Limpiar historial] │  │  <section id="history-container" class="history-section">
│  │ [📍 Cajamarca]  [📍 Lima]          │  │  <div id="history-list" class="history-list">
│  │ [📍 Madrid]     [📍 Tokio]         │  │
│  │ └──────────────────────────────────┘  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

---

### 3.4 Estados Asíncronos en la Interfaz (Carga y Error)

Los estados de feedback asíncrono se intercalan entre el buscador y la tarjeta de resultados:

#### Estado de Carga (`#loading-spinner` activo)
```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                      ╭───╮                                             │
│                      │ ⟳ │  (Spinner circular giratorio)               │
│                      ╰───╯                                             │
│       Consultando información meteorológica de Cajamarca...            │  <div id="loading-spinner" class="loader-wrapper">
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

#### Estado de Error (`#error-card` activo)
```
┌────────────────────────────────────────────────────────────────────────┐
│  ⚠️  No se pudo obtener el clima                                       │  <div id="error-card" class="error-card">
│      Ciudad "Atlantis" no encontrada. Verifica la ortografía.          │  <p id="error-message" class="error-message">
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Anatomía Detallada de Componentes (Alineación con HTML Oficial)

Cada especificación visual mapea de forma unívoca a la jerarquía definida en la **Sección 4 de `guia-desarrollo.md`**:

### 4.1 Contenedor Raíz y Encabezado (`.app-layout` > `header.header`)
- **Jerarquía HTML**:
  ```html
  <div class="app-layout">
    <header class="header">
      <div class="container header-container">
        <div class="logo">
          <span class="logo-icon"> 🌤️ </span>
          <h1 class="logo-name"> Weather Dashboard </h1>
        </div>
        <div id="header-actions" class="header-actions">
          <!-- Selector °C / °F (T-12) -->
        </div>
      </div>
    </header>
  ```
- **Diseño Visual**:
  - Encabezado con borde inferior sutil (`border-bottom: 1px solid var(--border-color)`), fondo blanco translúcido con efecto glassmorphism (`backdrop-filter: blur(8px); background-color: rgba(255, 255, 255, 0.9)`).
  - Distribución interna `.header-container` con `display: flex; justify-content: space-between; align-items: center;`.
  - Tipografía del logotipo con peso `700`, color `--text-primary`.

### 4.2 Buscador de Ciudades (`section.search-section` > `form#search-form.search-form`)
- **Jerarquía HTML**:
  ```html
  <section class="search-section" aria-label="Búsqueda de ciudades">
    <form id="search-form" class="search-form" novalidate>
      <div class="search-input-group">
        <label class="sr-only" for="search-input"> Nombre de la ciudad </label>
        <input id="search-input" class="search-input" type="text"
               placeholder="Introduce una ciudad (ej. Cajamarca, Madrid...)"
               autocomplete="off" required>
        <button id="btn-search" class="btn btn-primary btn-search" type="submit">
          Buscar
        </button>
      </div>
      <p id="search-feedback" class="search-feedback hidden" role="alert"></p>
    </form>
  </section>
  ```
- **Diseño Visual**:
  - En móviles (`width <= 36em`): `.search-input-group` se apila verticalmente con `flex-direction: column; gap: 0.5rem;`.
  - En pantallas medianas y grandes (`width > 36em`): se alinea en horizontal con `flex-direction: row; gap: 0.75rem;`.
  - `#search-input`: Superficie blanca con borde `--border-color`, radio `--radius-md` (10px), transición suave de 0.2s al foco con anillo `--border-focus` (`#38bdf8`) y sombra `box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2)`.
  - `#btn-search`: Botón con gradiente de color primario (`--color-primary`), sombra suave, estado `:hover` con elevación y `:active` con escala `scale(0.98)`.
  - `#search-feedback`: Mensaje de alerta debajo del grupo de inputs, color rojo carmesí (`--error-text`), visible solo ante validaciones fallidas.

### 4.3 Estados Asíncronos: Carga y Error (`#loading-spinner` y `#error-card`)
- **Jerarquía HTML**:
  ```html
  <!-- Loader -->
  <div id="loading-spinner" class="loader-wrapper hidden" aria-live="polite" aria-busy="false">
    <div class="spinner"></div>
    <p class="loader-text"> Consultando información meteorológica... </p>
  </div>

  <!-- Error Card -->
  <div id="error-card" class="error-card hidden" role="alert">
    <div class="error-icon" aria-hidden="true"> ⚠️ </div>
    <div class="error-content">
      <h3 class="error-title"> No se pudo obtener el clima </h3>
      <p id="error-message" class="error-message"></p>
    </div>
  </div>
  ```
- **Diseño Visual**:
  - `.loader-wrapper`: Centrado con `display: flex; flex-direction: column; align-items: center; padding: 2.5rem;`.
  - `.spinner`: Anillo circular de 40px con borde de 3px, borde superior coloreado con `--color-primary`, animado continuamente mediante `@keyframes spin { to { transform: rotate(360deg); } }`.
  - `.error-card`: Superficie con fondo de peligro `--error-bg` (`#fef2f2`), borde `--error-border` (`#fecaca`), texto `--error-text` (`#991b1b`), bordes redondeados `--radius-md` y disposición `flex` con icono grande a la izquierda y mensaje explicativo a la derecha.

### 4.4 Tarjeta Principal de Clima (`section#weather-container` > `article#weather-card.weather-card`)
- **Jerarquía HTML**:
  ```html
  <section id="weather-container" class="weather-section hidden" aria-label="Resultados meteorológicos">
    <article id="weather-card" class="weather-card">
      <header class="weather-card-header">
        <div>
          <span class="weather-label"> Condición Actual </span>
          <h2 id="weather-city-name" class="weather-city-name"> -- </h2>
        </div>
        <span id="weather-badge" class="badge badge-condition"> -- </span>
      </header>
      <div class="weather-main-group">
        <div class="weather-temp-wrapper">
          <span id="weather-temp" class="weather-temp"> -- </span>
          <span id="weather-unit" class="weather-unit"> °C </span>
        </div>
        <div class="weather-condition-group">
          <div id="weather-icon" class="weather-icon" aria-hidden="true"> 🌤️ </div>
          <p id="weather-condition" class="weather-condition"> -- </p>
        </div>
      </div>
      <div class="weather-metrics">
        <div class="metric-item">
          <span class="metric-icon"> 🌡️ </span>
          <div class="metric-info">
            <span class="metric-label"> Sensación </span>
            <span id="weather-apparent" class="metric-value"> -- </span>
          </div>
        </div>
        <div class="metric-item">
          <span class="metric-icon"> 💧 </span>
          <div class="metric-info">
            <span class="metric-label"> Humedad </span>
            <span id="weather-humidity" class="metric-value"> -- </span>
          </div>
        </div>
        <div class="metric-item">
          <span class="metric-icon"> 💨 </span>
          <div class="metric-info">
            <span class="metric-label"> Viento </span>
            <span id="weather-wind" class="metric-value"> -- </span>
          </div>
        </div>
      </div>
    </article>
  </section>
  ```
- **Diseño Visual**:
  - `article.weather-card`: Tarjeta elevada con fondo blanco (`--bg-surface`), sombra de profundidad suave (`box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)`), borde `--border-color` y esquinas redondeadas con `--radius-lg` (16px).
  - `.weather-card-header`: Distribución flex con separación `space-between`. Badge con fondo `--badge-condition-bg` (`#e0f2fe`) y texto `--badge-condition-text` (`#0369a1`).
  - `.weather-main-group`: Disposición `flex; justify-content: space-between; align-items: center;`. La temperatura `#weather-temp` tiene tamaño fluido `clamp(3.5rem, 2.5rem + 3vw, 5rem)` y peso `800`.
  - `.weather-metrics`: Rejilla con `display: grid; gap: 1rem;`. En móviles adopta 1 columna; a partir de `width > 36em` pasa a `repeat(3, 1fr)`. Cada `.metric-item` tiene fondo `--bg-surface-elevated` (`#f1f5f9`), borde redondeado `--radius-md` y padding interno.

### 4.5 Historial de Búsquedas (`section#history-container.history-section`)
- **Jerarquía HTML**:
  ```html
  <section id="history-container" class="history-section" aria-label="Historial de ciudades consultadas">
    <div class="history-header">
      <div class="history-title-group">
        <h3 class="history-title"> Historial de búsquedas </h3>
        <span id="history-count" class="history-count"> (0) </span>
      </div>
      <button id="btn-clear-history" class="btn btn-secondary btn-sm btn-clear" type="button">
        Limpiar historial
      </button>
    </div>
    <div id="history-list" class="history-list">
      <p id="history-empty" class="history-empty">
        No hay búsquedas recientes. Las ciudades consultadas aparecerán aquí.
      </p>
      <!-- Inyección JS: <button type="button" class="history-chip" data-city="Cajamarca"> -->
    </div>
  </section>
  ```
- **Diseño Visual**:
  - `.history-header`: Alineación `flex` con `space-between; align-items: center; margin-bottom: 1rem;`.
  - `#history-count`: Texto badge sutil `--text-muted` indicando la cantidad de elementos.
  - `#btn-clear-history`: Botón secundario compacto (`btn-sm`) con texto atenuado que adquiere contraste al pasar el cursor (`:hover`).
  - `.history-list`: Contenedor flexible con `display: flex; flex-wrap: wrap; gap: 0.5rem;`.
  - `.history-chip`: Botón píldora interactivo (`border-radius: var(--radius-full)`), fondo blanco con borde `--border-color`, icono 📍 y nombre de la ciudad. Estado `:hover` con elevación suave (`transform: translateY(-1px)`), cambio de color a `--color-primary` y sombra sutil.

### 4.6 Sistema de Toasts y Pie de Página (`#toast-container` y `footer.footer`)
- **Jerarquía HTML**:
  ```html
  <footer class="footer">
    <div class="container footer-container">
      <p> Weather Dashboard © 2026 — Proyecto Integrador G4 </p>
      <p class="footer-credits"> Datos provistos por Open-Meteo </p>
    </div>
  </footer>

  <div id="toast-container" class="toast-container" aria-live="polite"></div>
  ```
- **Diseño Visual**:
  - `footer.footer`: Borde superior sutil, padding vertical con `clamp()`, texto centrado de bajo contraste `--text-muted` y tamaño `0.875rem`.
  - `#toast-container`: Posicionamiento fijo `position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 1000; display: flex; flex-direction: column; gap: 0.5rem;`.
  - `.toast`: Notificación flotante con sombra pronunciada, bordes redondeados `--radius-md`, fondo oscuro `--text-primary` y texto `--text-inverse`, con animación de entrada deslizante (`transform: translateY(20px) -> translateY(0)` y fade in).

## 5. Matriz de Impacto en las Tareas del Backlog

| Componente de Diseño | Tarea Asociada | Requerimiento Técnico |
|---|---|---|
| Esquema HTML, contenedores e IDs | **T-02** | Implementación semántica de `<header>`, `<main>`, `<section>`, `<form>` con el mapa oficial de IDs. |
| Tokens, `clamp()`, Media Queries y estilos | **T-03** | Variables en `:root`, propiedades lógicas (`padding-inline`), rejilla responsive en `em` y tarjetas visuales. |
| Modelo de datos para poblar tarjeta | **T-04** | Atributos de `Clima` (`temperatura`, `sensacionTermica`, `humedad`, `viento`, `icono`). |
| Colección para chips de historial | **T-05** | Arreglo inmutable en `Historial` para renderizar chips sin duplicados. |
| Proveedor de datos para la tarjeta | **T-06** | `WeatherService` mapea códigos WMO a textos y emojis de la tarjeta. |
| Renderizado dinámico de la tarjeta y chips | **T-07** | `DomRenderer` crea y actualiza los elementos visuales con `textContent` y `createElement`. |
| Conexión de formulario y feedback | **T-08** | Control del evento `submit` y validación de campo vacío. |
| Interacción con chips del historial | **T-09** | Delegación de eventos en `.history-chip` para re-consulta inmediata. |
| Visualización de `.error-card` y `.loader` | **T-10** | Control de visibilidad de estados de carga y errores de red / 404. |
| Persistencia visual de chips | **T-11** | Los chips reaparecen al recargar la página gracias a `localStorage`. |
| Selector de unidades (°C / °F) | **T-12** | Recálculo dinámico de los valores en la tarjeta de clima. |
