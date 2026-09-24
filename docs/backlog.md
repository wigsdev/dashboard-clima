# Weather Dashboard — Product Backlog

## Información del Proyecto

| Campo | Valor |
|---|---|
| **Proyecto** | Weather Dashboard — Aplicación Web Meteorológica Interactiva |
| **Repositorio** | `wigsdev/dashboard-clima` |
| **Team Leader** | Wilmer (@wigsdev) |
| **Duración Estimada** | 2 a 3 semanas |
| **Stack Tecnológico** | HTML5 Semántico · CSS3 Moderno (`clamp`, Range Queries) · JavaScript Vanilla (ES6 Modules) · API Open-Meteo |
| **Convenciones** | Conventional Commits · GitHub Flow · POO · Mobile First · DoD Estricto |
| **Automatización** | `scripts/crear-issues.sh` (población automática de issues vía GitHub CLI) |

---

## Sistema de Gestión

### Asignación de Tareas
- El Team Leader asigna tareas mediante GitHub Issues vinculando al desarrollador responsable (*Assignee*) y estableciendo la fecha límite.
- Las tareas son atómicas, autónomas e independientes, sujetas únicamente a las dependencias documentadas formalmente.

### Estados
| Estado | Label en GitHub | Color | Significado |
|---|---|---|---|
| 🔲 Backlog | — | — | Tarea disponible, lista para ser abordada |
| 👤 Asignada | `status: assigned` | `#EDEDED` | Tarea delegada con desarrollador y alcance definido |
| 🔨 En Progreso | `status: in-progress` | `#FEF2C0` | Desarrollador trabajando activamente en su rama |
| 🔍 En Revisión | `status: in-review` | `#D8F8C8` | Pull Request abierto, pendiente de Code Review |
| ✅ Done | — (Issue Cerrado) | — | PR aprobado y mergeado a `main` mediante Squash |

### Prioridades
| Label | Color Hex | Significado |
|---|---|---|
| `priority: critical` | 🔴 `#B60205` | **Bloqueante**: Base estructural, API core o arquitectura indispensable |
| `priority: high` | 🟠 `#D93F0B` | **Core**: Funcionalidad principal del sistema y modelos de dominio |
| `priority: medium` | 🟡 `#FBCA04` | **Importante**: Persistencia, manejo de errores avanzado y optimizaciones |
| `priority: low` | 🟢 `#0E8A16` | **Mejoras**: Extras visuales, selectores de unidades y detalles estéticos |

### Categorías
| Label | Significado |
|---|---|
| `type: structure` | Configuración base, arquitectura de carpetas y maquetación HTML5 |
| `type: style` | Sistema de diseño, CSS tokens, layout responsive y micro-interacciones |
| `type: feature` | Lógica de negocio, modelos POO, consumo asíncrono y persistencia |
| `type: integration` | Conexión entre capas, orquestación de eventos y controlador principal |
| `type: doc` | Documentación técnica, guías, changelog y preparación de sustentación |

### Definition of Done (DoD) General
Referencia completa en [`docs/workflow.md`](workflow.md#6-definition-of-done-dod).  
Una tarea está **Done** cuando:
1. Criterios de aceptación cumplidos y verificados al 100%.
2. Cero errores o excepciones no controladas en la consola del navegador.
3. PR creado con la plantilla obligatoria del proyecto debidamente completada.
4. Commits atómicos conformes a la especificación Conventional Commits.
5. Code Review aprobado formalmente por el Team Leader.
6. Merge consolidado mediante **Squash and Merge** hacia `main`.
7. Rama secundaria eliminada e Issue asociada cerrada.

---

## Backlog Detallado de Tareas

---

### T-01 — Inicialización del Entorno, Estructura Base y Documentación

| Campo | Valor |
|---|---|
| **Prioridad** | `priority: critical` |
| **Tipo** | `type: structure` |
| **Dependencias** | Ninguna |
| **Complejidad** | Baja (1 día) |
| **Asignado a** | Wilmer (@wigsdev) |
| **Archivos afectados** | `.gitignore`, `package.json`, `LICENSE`, `README.md`, `docs/*`, `scripts/crear-issues.sh`, scaffolding en `js/**` y `css/**` |

**Descripción y Contexto Técnico**:  
Establecer la infraestructura de partida del proyecto: archivos de gobernanza (`.gitignore` ignorando `scripts/`, `package.json`, `LICENSE`), el ecosistema documental en `docs/` (`workflow.md`, `guia-desarrollo.md`, `backlog.md`, `diseno.md`, `plan-implementacion.md`), la presentación inicial en `README.md`, el script utilitario para crear las GitHub Issues (`scripts/crear-issues.sh`) y los esqueletos limpios (scaffolding sin lógica) en `css/` y `js/**`.

**Entregables**:
- Repositorio configurado con ramas y reglas de exclusión.
- Suite documental completa y alineada al estándar de la industria.
- Scaffolding de archivos listo para desarrollo modular.

**Criterios de Aceptación**:
- [x] `.gitignore` configurado para ignorar logs, node_modules y `scripts/`.
- [x] `package.json` con metadatos del proyecto y script `"start"`.
- [x] `LICENSE` con licencia MIT.
- [x] `README.md` base con presentación, arquitectura, tecnologías e instrucciones.
- [x] `docs/workflow.md` con roles, Git Flow, Conventional Commits y DoD.
- [x] `docs/guia-desarrollo.md` con las 17 secciones completas y mapa de IDs.
- [x] `docs/diseno.md` con propuesta UI/UX, CSS moderno y modelos ASCII.
- [x] `docs/backlog.md` con desglose granular y dependencias lógicas.
- [x] `docs/plan-implementacion.md` con la propuesta arquitectónica.
- [x] Scaffolding de archivos base creado en `assets/`, `css/` y `js/**`.
- [x] `scripts/crear-issues.sh` preparado para poblar GitHub Issues con `gh`.

---

### T-02 — Maquetación Semántica HTML5 e Infraestructura de IDs

| Campo | Valor |
|---|---|
| **Prioridad** | `priority: critical` |
| **Tipo** | `type: structure` |
| **Dependencias** | T-01 |
| **Complejidad** | Media (1 día) |
| **Asignado a** | — |
| **Archivos afectados** | `index.html` |

**Descripción y Contexto Técnico**:  
Construir el documento `index.html` estructurado bajo estándares semánticos HTML5 (`<header>`, `<main>`, `<section>`, `<form>`, `<article>`, `<footer>`). Es obligatorio implementar el mapa oficial de IDs especificado en `docs/guia-desarrollo.md` (Sección 2) para permitir la integración transparente con JavaScript y asegurar atributos de accesibilidad (`aria-live`, `aria-busy`, `<label>` con `.sr-only`).

**Entregables**:
- `index.html` completo y validado semánticamente sin estilos inline ni datos estáticos quemados.

**Criterios de Aceptación**:
- [ ] Estructura con `<header>`, `<main>`, `<section>`, `<article>` y `<footer>`.
- [ ] Formulario con input de texto (`#search-input`) y botón de envío (`#btn-search`).
- [ ] Contenedor para resultados meteorológicos (`#weather-container`) con su mapa de IDs completo.
- [ ] Contenedor para historial de búsquedas (`#history-container`) con botón para vaciar (`#btn-clear-history`).
- [ ] Elementos para estados visuales: spinner (`#loading-spinner`) y error (`#error-card`).
- [ ] Meta tags completos para viewport responsive, SEO y Open Graph.
- [ ] Importación del script principal como módulo ES6 (`type="module"`).

---

### T-03 — Sistema de Diseño CSS, Tokens y Maquetación Responsive

| Campo | Valor |
|---|---|
| **Prioridad** | `priority: critical` |
| **Tipo** | `type: style` |
| **Dependencias** | T-02 |
| **Complejidad** | Media (1 a 2 días) |
| **Asignado a** | — |
| **Archivos afectados** | `css/styles.css` |

**Descripción y Contexto Técnico**:  
Desarrollar el sistema visual en `css/styles.css` aplicando **CSS Moderno** según lo documentado en `docs/diseno.md`: tokens personalizados en `:root`, espaciados y tipografías fluidas con `clamp()`, propiedades lógicas (`padding-inline`, `margin-inline`) y Media Queries con sintaxis de rango (`@media (width > ...em)`).

**Entregables**:
- Hoja de estilos `css/styles.css` con diseño Mobile First adaptativo a tablet y desktop.

**Criterios de Aceptación**:
- [ ] Variables centralizadas en `:root` (paleta, tipografía, radios, sombras, max-width).
- [ ] Reset CSS universal con `box-sizing: border-box`.
- [ ] Uso de `padding-inline: clamp(...)` en `.container`.
- [ ] Estilos de la tarjeta de clima (`.weather-card`), badges (`.badge-condition`) y métricas secundarias en grid.
- [ ] Estilos del spinner de carga (`.spinner`) y alertas de error (`.error-card`).
- [ ] Media Queries en `em` para Tablet (`width > 36em`) y Desktop (`width > 62em`).
- [ ] Micro-interacciones con transiciones suaves en hover y focus-within.

---

### T-04 — Modelo de Dominio POO: Clase `Clima`

| Campo | Valor |
|---|---|
| **Prioridad** | `priority: high` |
| **Tipo** | `type: feature` |
| **Dependencias** | T-01 |
| **Complejidad** | Baja (1 día) |
| **Asignado a** | — |
| **Archivos afectados** | `js/models/Clima.js` |

**Descripción y Contexto Técnico**:  
Implementar la clase `Clima` en `js/models/Clima.js` para encapsular el estado de los datos meteorológicos. La clase debe poseer un constructor que reciba las propiedades requeridas por el enunciado y proveer métodos utilitarios de dominio para formateo y presentación.

**Entregables**:
- Clase `Clima` exportada como módulo ES6 con documentación JSDoc.

**Criterios de Aceptación**:
- [ ] Constructor que inicialice: `ciudad`, `pais`, `temperatura`, `sensacionTermica`, `humedad`, `viento`, `condicion`, `icono`, `codigoWmo`, `fechaHora`.
- [ ] Método `obtenerUbicacionCompleta()` que retorne string formateado (ej. "Cajamarca, Perú").
- [ ] Método `obtenerTemperaturaFormateada(unidad)` con soporte para `°C` y `°F`.
- [ ] Método `obtenerSensacionFormateada(unidad)`.
- [ ] Método `esCalido()` que evalúe si la temperatura supera el umbral cálido (>= 24°C).
- [ ] Método `obtenerResumen()` con síntesis descriptiva.

---

### T-05 — Modelo de Historial POO: Clase `Historial`

| Campo | Valor |
|---|---|
| **Prioridad** | `priority: high` |
| **Tipo** | `type: feature` |
| **Dependencias** | T-01 |
| **Complejidad** | Media (1 día) |
| **Asignado a** | — |
| **Archivos afectados** | `js/models/Historial.js` |

**Descripción y Contexto Técnico**:  
Implementar la clase `Historial` en `js/models/Historial.js` para encapsular la gestión del arreglo de búsquedas. Debe garantizar inmutabilidad en la lectura, inserción al inicio (`unshift`), eliminación de duplicados insensibles a mayúsculas/minúsculas y control de tamaño máximo.

**Entregables**:
- Clase `Historial` exportada con métodos de gestión y preparación para almacenamiento local.

**Criterios de Aceptación**:
- [ ] Constructor que inicialice un arreglo interno privado/protegido (`this._ciudades`).
- [ ] Método `agregar(ciudad)` que inserte al inicio sin permitir duplicados (mueve al inicio si existía).
- [ ] Límite máximo de elementos configurable (por defecto 8).
- [ ] Método `eliminar(ciudad)` y `limpiar()`.
- [ ] Método `obtenerTodas()` que retorne una copia inmutable (`[...this._ciudades]`).
- [ ] Getter `total` para consultar la longitud actual de la colección.

---

### T-06 — Servicio Meteorológico Asíncrono: `WeatherService`

| Campo | Valor |
|---|---|
| **Prioridad** | `priority: critical` |
| **Tipo** | `type: feature` |
| **Dependencias** | T-04 |
| **Complejidad** | Alta (1 a 2 días) |
| **Asignado a** | — |
| **Archivos afectados** | `js/services/WeatherService.js` |

**Descripción y Contexto Técnico**:  
Implementar la clase `WeatherService` en `js/services/WeatherService.js` para aislar el consumo de la API Open-Meteo. La clase debe utilizar `fetch()`, Promesas y sintaxis `async/await`, gestionando la geocodificación de coordenadas, el pronóstico meteorológico actual, el mapeo de códigos numéricos WMO y el manejo de excepciones de red.

**Entregables**:
- Módulo `WeatherService.js` con integración a Open-Meteo y retorno de instancias de `Clima`.

**Criterios de Aceptación**:
- [ ] Método `buscarCoordenadas(ciudad)` consumiendo Geocoding API con validación de resultados.
- [ ] Lanza error descriptivo si la ciudad no existe.
- [ ] Método `obtenerPronostico(lat, lon)` consumiendo Forecast API.
- [ ] Tabla/diccionario de mapeo WMO con descripciones en español e iconografía.
- [ ] Método orquestador `consultarClima(ciudad)` que devuelva una instancia de `Clima`.
- [ ] Manejo explícito de excepciones con `try...catch` diferenciando offline de errores de API.

---

### T-07 — Capa de Renderizado del DOM: `DomRenderer`

| Campo | Valor |
|---|---|
| **Prioridad** | `priority: high` |
| **Tipo** | `type: feature` |
| **Dependencias** | T-02, T-03 |
| **Complejidad** | Media (1 día) |
| **Asignado a** | — |
| **Archivos afectados** | `js/ui/DomRenderer.js` |

**Descripción y Contexto Técnico**:  
Implementar la clase `DomRenderer` en `js/ui/DomRenderer.js` para concentrar de forma exclusiva la manipulación del DOM. Debe implementar métodos seguros (`createElement`, `textContent`, `classList`) evitando el uso de `innerHTML` para datos de usuario y gestionando estados visuales (loader, alertas de error, chips y toasts).

**Entregables**:
- Clase `DomRenderer` exportada con métodos modulares de actualización de interfaz.

**Criterios de Aceptación**:
- [ ] Cacheo de elementos en el constructor según mapa oficial de IDs.
- [ ] Método `mostrarCargando(visible)` que controle el spinner y `aria-busy`.
- [ ] Método `renderizarClima(clima, unidad)` que actualice la tarjeta con `textContent`.
- [ ] Método `renderizarHistorial(ciudades)` que construya dinámicamente los chips con `createElement`.
- [ ] Método `mostrarError(mensaje)` y `ocultarError()`.
- [ ] Método `mostrarFeedbackBusqueda(mensaje)` para advertencias en el input.
- [ ] Método `mostrarToast(mensaje, tipo, duracion)` para notificaciones efímeras.

---

### T-08 — Controlador Principal y Orquestación de Eventos

| Campo | Valor |
|---|---|
| **Prioridad** | `priority: critical` |
| **Tipo** | `type: integration` |
| **Dependencias** | T-05, T-06, T-07 |
| **Complejidad** | Alta (1 a 2 días) |
| **Asignado a** | — |
| **Archivos afectados** | `js/app.js` |

**Descripción y Contexto Técnico**:  
Implementar la clase `App` en `js/app.js` como orquestador del sistema. Se encarga de instanciar los servicios y modelos, enlazar los escuchadores de eventos (`submit` en formulario, pulsación de `Enter`, validación de campo vacío) y coordinar el flujo asíncrono con feedback visual en el DOM.

**Entregables**:
- Archivo `js/app.js` completamente funcional integrando todas las capas.

**Criterios de Aceptación**:
- [ ] Inicialización en `DOMContentLoaded`.
- [ ] Intercepción del evento `submit` en `#search-form` (manejando clic y tecla Enter con `e.preventDefault()`).
- [ ] Validación de campo vacío: previene la llamada HTTP y emite feedback visual.
- [ ] Flujo asíncrono ordenado: enciende loader, consulta API, renderiza tarjeta y actualiza historial.
- [ ] Bloque `finally` que garantiza apagar el loader pase lo que pase.
- [ ] Manejo de errores en `catch` delegando a `DomRenderer.mostrarError()`.

---

### T-09 — Interacción Dinámica con el Historial de Búsquedas

| Campo | Valor |
|---|---|
| **Prioridad** | `priority: high` |
| **Tipo** | `type: feature` |
| **Dependencias** | T-08 |
| **Complejidad** | Media (1 día) |
| **Asignado a** | — |
| **Archivos afectados** | `js/app.js`, `js/ui/DomRenderer.js` |

**Descripción y Contexto Técnico**:  
Implementar **delegación de eventos** en el contenedor del historial (`#history-list`) para que al hacer clic sobre cualquier chip de ciudad, se cargue su nombre en el input y se dispare automáticamente la consulta del clima sin recargar la página. Asimismo, habilitar la acción del botón "Limpiar historial".

**Entregables**:
- Re-consulta fluida desde el historial y vaciado de colección.

**Criterios de Aceptación**:
- [ ] Listener único en `#history-list` usando delegación de eventos (`e.target.closest('.history-chip')`).
- [ ] Al hacer clic en un chip, se rellena `#search-input` y se ejecuta `ejecutarBusqueda(ciudad)`.
- [ ] Clic en `#btn-clear-history` vacía el historial y actualiza la vista con el mensaje de lista vacía.
- [ ] Notificación toast que confirma el vaciado del historial.

---

### T-10 — Gestión Integral de Errores y Estados Visuales

| Campo | Valor |
|---|---|
| **Prioridad** | `priority: high` |
| **Tipo** | `type: feature` |
| **Dependencias** | T-08 |
| **Complejidad** | Media (1 día) |
| **Asignado a** | — |
| **Archivos afectados** | `js/services/WeatherService.js`, `js/ui/DomRenderer.js`, `js/app.js` |

**Descripción y Contexto Técnico**:  
Reforzar el control de errores en toda la aplicación para garantizar que el usuario siempre reciba retroalimentación comprensible ante fallos de conexión, modo offline (`navigator.onLine`) o ciudades inexistentes (error 404).

**Entregables**:
- Manejo robusto de errores con interfaz resiliente y accesible.

**Criterios de Aceptación**:
- [ ] Mensaje amigable cuando la ciudad no existe: *"No se encontraron resultados para la ciudad 'X'"*.
- [ ] Detección proactiva de desconexión: *"Sin conexión a internet. Verifica tu red"*.
- [ ] Al ocurrir un error, la tarjeta de clima anterior se oculta para no inducir a error.
- [ ] El botón de búsqueda se deshabilita temporalmente mientras dura la carga para evitar spam de peticiones.

---

### T-11 — Persistencia en `localStorage`

| Campo | Valor |
|---|---|
| **Prioridad** | `priority: medium` |
| **Tipo** | `type: feature` |
| **Dependencias** | T-05, T-09 |
| **Complejidad** | Baja (1 día) |
| **Asignado a** | — |
| **Archivos afectados** | `js/models/Historial.js` |

**Descripción y Contexto Técnico**:  
Implementar persistencia en `localStorage` dentro de la clase `Historial` mediante los métodos `guardarEnStorage()` y `cargarDeStorage()`, asegurando que las búsquedas persistan entre recargas de página (`F5`).

**Entregables**:
- Persistencia bidireccional segura en almacenamiento local.

**Criterios de Aceptación**:
- [ ] Al instanciar `Historial`, se recupera automáticamente el arreglo guardado en `localStorage`.
- [ ] Cada nueva búsqueda exitosa persiste el arreglo actualizado.
- [ ] Al vaciar el historial, se elimina la clave de `localStorage`.
- [ ] Control de excepciones con `try...catch` ante navegación privada o cuota excedida.

---

### T-12 — Mejoras Visuales y Extras de Valor

| Campo | Valor |
|---|---|
| **Prioridad** | `priority: low` |
| **Tipo** | `type: feature` |
| **Dependencias** | T-08 |
| **Complejidad** | Baja (1 día) |
| **Asignado a** | — |
| **Archivos afectados** | `index.html`, `css/styles.css`, `js/app.js` |

**Descripción y Contexto Técnico**:  
Incorporar características complementarias que eleven la experiencia de usuario: alternador dinámico de unidades (°C / °F) en la cabecera y diferenciación visual dinámica para climas cálidos frente a climas fríos.

**Entregables**:
- Selector de unidades funcional y micro-animaciones refinadas.

**Criterios de Aceptación**:
- [ ] Selector o botón para alternar entre Celsius y Fahrenheit recalculando los valores en pantalla.
- [ ] Modificador CSS dinámico en `.weather-card` según si la temperatura es cálida (>= 24°C) o fría (< 10°C).
- [ ] Animación de entrada suave (`@keyframes fadeIn`) al mostrar los resultados.

---

### T-13 — Actualización Final de Documentación y Guía de Sustentación

| Campo | Valor |
|---|---|
| **Prioridad** | `priority: medium` |
| **Tipo** | `type: doc` |
| **Dependencias** | T-01 a T-12 |
| **Complejidad** | Media (1 día) |
| **Asignado a** | — |
| **Archivos afectados** | `README.md`, `CHANGELOG.md` |

**Descripción y Contexto Técnico**:  
Finalizar la documentación del proyecto incorporando las capturas de pantalla de la aplicación terminada en distintas resoluciones, el enlace de demostración en vivo (GitHub Pages) y la sección exhaustiva con las respuestas preparadas para la defensa de la rúbrica (Sección 15).

**Entregables**:
- `README.md` final con evidencias visuales y preparación de sustentación.
- `CHANGELOG.md` actualizado con el release `[1.0.0]`.

**Criterios de Aceptación**:
- [ ] Capturas de pantalla reales en resoluciones desktop, tablet y móvil.
- [ ] Enlace a la demo en vivo.
- [ ] Sección completa de respuestas de sustentación para los 5 conceptos clave (Arreglos, DOM, Eventos, Promesas, POO).
- [ ] `CHANGELOG.md` documentando todas las características añadidas.
- [ ] Verificación general de enlaces y ortografía.

---

## Mapa de Dependencias

```
[ T-01: Inicialización & Docs Base ]
   ├──► [ T-02: HTML Semántico & IDs ] ──► [ T-03: CSS Moderno & Tokens ] ──┐
   ├──► [ T-04: Modelo Clima POO ] ────────► [ T-06: WeatherService ] ────┤
   └──► [ T-05: Modelo Historial POO ] ──┐                                  │
                                         ▼                                  ▼
                            [ T-07: DomRenderer ] ◄────────────────────────┘
                                         │
                                         ▼
                            [ T-08: Orquestación App ]
                                   │           │
                    ┌──────────────┘           └──────────────┐
                    ▼                                         ▼
         [ T-09: Interacción Historial ]              [ T-10: Control Errores ]
                    │                                         │
                    ▼                                         ▼
         [ T-11: Persistencia Storage ]               [ T-12: Extras °C / °F ]
                    │                                         │
                    └───────────────────┬─────────────────────┘
                                        ▼
                   [ T-13: Actualización Final & Sustentación ]
```

---

## Fases de Ejecución Sugeridas

| Fase | Tareas | Objetivo Principal |
|---|---|---|
| **Fase 1: Cimientos y Estructura** | `T-01`, `T-02`, `T-03` | Configuración base, documentación, HTML semántico con IDs y diseño responsive con CSS moderno. |
| **Fase 2: Modelado POO y API Core** | `T-04`, `T-05`, `T-06` | Clases de dominio `Clima` e `Historial`, y servicio asíncrono con Open-Meteo. |
| **Fase 3: Renderizado e Integración** | `T-07`, `T-08` | Manipulación segura del DOM y orquestador principal de eventos. |
| **Fase 4: Experiencia de Usuario y Resiliencia**| `T-09`, `T-10`, `T-11` | Re-consulta por chips, vaciado, persistencia en `localStorage` y manejo de errores. |
| **Fase 5: Pulido Final y Entrega** | `T-12`, `T-13` | Extras (°C/°F), capturas de pantalla, changelog y preparación de sustentación. |

---

## Registro de Asignaciones

| Tarea | Desarrollador | Estado | Fecha Límite | PR Vinculado |
|---|---|---|---|---|
| `T-01` | Wilmer (@wigsdev) | ✅ Done | 2026-09-23 | — |
| `T-02` | Por asignar | 🔲 Backlog | — | — |
| `T-03` | Por asignar | 🔲 Backlog | — | — |
| `T-04` | Por asignar | 🔲 Backlog | — | — |
| `T-05` | Por asignar | 🔲 Backlog | — | — |
| `T-06` | Por asignar | 🔲 Backlog | — | — |
| `T-07` | Por asignar | 🔲 Backlog | — | — |
| `T-08` | Por asignar | 🔲 Backlog | — | — |
| `T-09` | Por asignar | 🔲 Backlog | — | — |
| `T-10` | Por asignar | 🔲 Backlog | — | — |
| `T-11` | Por asignar | 🔲 Backlog | — | — |
| `T-12` | Por asignar | 🔲 Backlog | — | — |
| `T-13` | Por asignar | 🔲 Backlog | — | — |

---

## Resumen Cuantitativo

| Métrica | Total |
|---|---|
| **Total de Tareas** | 13 |
| **Tareas Críticas (`critical`)** | 4 (`T-01`, `T-02`, `T-03`, `T-06`, `T-08`) |
| **Tareas Altas (`high`)** | 5 (`T-04`, `T-05`, `T-07`, `T-09`, `T-10`) |
| **Tareas Medias (`medium`)** | 3 (`T-11`, `T-13`) |
| **Tareas Bajas (`low`)** | 1 (`T-12`) |
| **Esfuerzo Estimado** | 12 a 15 días laborales |
