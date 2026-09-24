# Weather Dashboard — Propuesta de Arquitectura y Plan de Trabajo

Documento de arquitectura técnica, diseño y gestión de proyecto elaborado desde los roles de **Arquitecto de Software**, **Tech Lead** y **Project Manager**, alineado a los requerimientos de [Docs/Proyecto.md](Proyecto.md) y los estándares de calidad del repositorio de referencia ([gestor-biblioteca-digital](https://github.com/wigsdev/gestor-biblioteca-digital)).

---

## 1. Decisiones Técnicas y Arquitectura

### 1.1 API Meteorológica: Open-Meteo
- **Zero-Config (Sin API Key obligatoria)**: No requiere tokens ni registros, evitando fallos por vencimiento de cuota o claves durante la sustentación en vivo.
- **Endpoints a utilizar**:
  - *Geocoding API*: `https://geocoding-api.open-meteo.com/v1/search?name={ciudad}&count=1&language=es&format=json` (obtiene latitud, longitud, nombre oficial y país).
  - *Forecast API*: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`.
- **Compatibilidad 100% con la Rúbrica**: Cumple con ciudad, país, temperatura actual, sensación térmica, humedad, velocidad del viento, código de condición meteorológica WMO e iconografía.

### 1.2 Estructura del Proyecto (ES6 Modules)

```
dashboard-clima/
│
├── index.html                  # HTML5 semántico con mapa de IDs formal
│
├── css/
│   └── styles.css              # Variables en :root, reset, layout responsive, estados
│
├── js/
│   ├── models/
│   │   ├── Clima.js            # Modelo POO: Encapsula datos meteorológicos y formateo
│   │   └── Historial.js        # Modelo POO: Encapsula arreglo de ciudades, duplicados y persistencia
│   │
│   ├── services/
│   │   └── WeatherService.js   # Consumo asíncrono con fetch, Promesas y async/await
│   │
│   ├── ui/
│   │   └── DomRenderer.js      # Métodos de manipulación del DOM, loaders, toasts y errores
│   │
│   └── app.js                  # Orquestador principal, eventos e integración general
│
├── docs/                       # Sistema de documentación idéntico a gestor-biblioteca-digital
│   ├── plan-implementacion.md  # Este documento de arquitectura y plan de trabajo
│   ├── guia-desarrollo.md      # Convenciones técnicas, mapa de IDs y clases, guía de defensa
│   ├── backlog.md              # Backlog detallado con tareas (T-01 a T-13)
│   └── workflow.md             # Guía de Git Flow, Conventional Commits y DoD
│
├── scripts/                    # Utilidades de automatización (en .gitignore)
│   └── crear-issues.sh         # Script para crear los GitHub Issues automáticamente vía GitHub CLI
│
├── assets/                     # Iconos y recursos visuales
├── package.json                # Metadatos del proyecto y scripts
├── .gitignore                  # Reglas de exclusión de Git
├── LICENSE                     # Licencia MIT
└── README.md                   # Presentación profesional, badges, capturas y guía de defensa
```

---

## 2. Plan de Trabajo y Backlog con Orden Lógico Estricto

| Tarea | Título | Tipo | Prioridad | Dependencias | Descripción Breve |
|---|---|---|---|---|---|
| **T-01** | Inicialización del Entorno, Estructura Base y Documentación | `structure` | `priority: critical` | Ninguna | Creación de `.gitignore`, `package.json`, `LICENSE`, `README.md` base, ecosistema en `docs/` (`workflow.md`, `guia-desarrollo.md`, `backlog.md`, `plan-implementacion.md`), estructura base de carpetas/archivos y script `scripts/crear-issues.sh`. |
| **T-02** | Maquetación Semántica HTML5 e Infraestructura de IDs | `structure` | `priority: critical` | T-01 | Creación de `index.html` con `<header>`, `<main>`, `<section>`, `<form>`, mapa de IDs para JS y meta tags SEO/Open Graph. |
| **T-03** | Sistema de Diseño CSS, Tokens y Maquetación Responsive | `style` | `priority: critical` | T-02 | Variables en `:root`, reset, layout mobile-first, cards climáticas, badges de estado y diseño adaptativo tablet/desktop. |
| **T-04** | Modelo de Dominio POO: Clase `Clima` | `feature` | `priority: high` | T-01 | Implementación de `js/models/Clima.js` con constructor, propiedades de datos meteorológicos y métodos de formateo/utilidades. |
| **T-05** | Modelo de Historial POO: Clase `Historial` | `feature` | `priority: high` | T-01 | Implementación de `js/models/Historial.js` con arreglo interno, prevención de duplicados, operaciones LIFO, inmutabilidad y métodos de limpieza. |
| **T-06** | Servicio Meteorológico Asíncrono: `WeatherService` | `feature` | `priority: critical` | T-04 | Implementación de `js/services/WeatherService.js` con `fetch()`, Promesas, `async/await`, geocodificación, mapeo WMO y manejo de errores con `try...catch`. |
| **T-07** | Capa de Renderizado del DOM: `DomRenderer` | `feature` | `priority: high` | T-02, T-03 | Implementación de `js/ui/DomRenderer.js` para manipular dinámicamente el DOM (creación de cards, loader indicador de carga, mensajes y toasts). |
| **T-08** | Controlador Principal y Orquestación de Eventos | `integration` | `priority: critical` | T-05, T-06, T-07 | Implementación de `js/app.js` integrando formulario, evento `submit`, tecla `Enter`, validación de campo vacío y renderizado de resultados. |
| **T-09** | Interacción Dinámica con el Historial de Búsquedas | `feature` | `priority: high` | T-08 | Delegación de eventos en las etiquetas/botones del historial para re-consultar ciudades al hacer clic y botón de vaciado. |
| **T-10** | Gestión Integral de Errores y Estados Visuales | `feature` | `priority: high` | T-08 | Retroalimentación clara para ciudad no encontrada (404), fallas de conexión a internet (offline) y estados de carga visibles. |
| **T-11** | Persistencia en `localStorage` | `feature` | `priority: medium` | T-05, T-09 | Persistencia del historial entre recargas de página con sincronización al agregar o limpiar. |
| **T-12** | Mejoras Visuales y Extras de Valor | `feature` | `priority: low` | T-08 | Selector alternador de unidades (°C / °F), micro-animaciones y fondos/badges dinámicos según el estado del clima. |
| **T-13** | Actualización Final de Documentación y Guía de Sustentación | `doc` | `priority: medium` | T-01 a T-12 | Actualización del `README.md` con capturas de pantalla de la app terminada, demo y sección de respuestas preparadas para la evaluación. |

---

## 3. Automatización Inicial: `scripts/crear-issues.sh`

Este script utilitario se ubica en `scripts/crear-issues.sh` y se ejecuta una única vez antes de empezar el desarrollo:
- Crea los labels oficiales de GitHub (`priority: critical`, `type: feature`, `status: in-progress`, etc.).
- Crea las 13 issues correspondientes a las tareas **T-01** hasta **T-13** a través del comando `gh issue create`.
- Añade automáticamente a cada issue su descripción, criterios de aceptación (*Definition of Done*) y dependencias.

---

## 4. Preparación para la Defensa del Proyecto (Sección 15 de la Rúbrica)

El código y la guía de desarrollo documentarán expresamente:
1. **Arreglos**: Demostrar el uso del array en `Historial`, explicando métodos inmutables (`map`, `filter`, `includes`, `unshift`).
2. **Manipulación del DOM**: Demostrar `document.createElement`, `textContent`, `classList`, `replaceChildren` en `DomRenderer`.
3. **Eventos**: Justificar el uso de `submit`, `click` y delegación de eventos en listas dinámicas.
4. **Promesas y async/await**: Explicar la diferencia entre operaciones síncronas y asíncronas, el funcionamiento de la cola de microtareas y la estructura `try...catch...finally`.
5. **POO**: Explicar la encapsulación en `Clima` e `Historial`, el rol del `constructor`, `this` y la separación de responsabilidades.
