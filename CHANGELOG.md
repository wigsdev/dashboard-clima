# Historial de Cambios (CHANGELOG)

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning 2.0.0](https://semver.org/lang/es/).

---

## [1.0.0] — 2026-10-01 (Versión Final — Proyecto Integrador G4)

### Añadido
- **Maquetación y Accesibilidad (T-02)**:
  - Estructura semántica HTML5 con roles WAI-ARIA, `aria-live="polite"` y landmarks accesibles.
  - Formulario de búsqueda accesible con soporte nativo de teclado (`Enter`).
- **Sistema de Estilos y Responsive Design (T-03, T-12)**:
  - Tokens semánticos CSS (:root) con paleta moderna, modo claro y sombras suaves.
  - Rejilla responsiva con CSS Grid y Flexbox adaptada para Desktop, Tablet y Mobile.
  - Modificadores contextuales de clima: `card--warm` (cálido) y `card--cold` (frío).
  - Microinteracciones, transiciones fluidas y estados visuales hover/active.
- **Modelos de Dominio POO (T-04, T-05)**:
  - Clase `Clima` con encapsulamiento, mapeo de códigos WMO, cálculo de Fahrenheit y formateo.
  - Clase `Historial` con almacenamiento en memoria, deduplicación normalizada y límite de 5 elementos.
- **Servicios Asíncronos (T-06)**:
  - `WeatherService` con consumo asíncrono no bloqueante vía Fetch API de Open-Meteo Geocoding y Forecast.
  - Manejo integral de errores de red, respuestas HTTP no satisfactorias y ciudades no encontradas.
- **Capa de Presentación y DOM (T-07)**:
  - `DomRenderer` desacoplado para renderizado seguro sin datos estáticos en HTML.
  - Creación dinámica de tarjetas principales, métricas secundarias y chips de historial.
- **Gestión de Errores y Experiencia de Usuario (T-08, T-10)**:
  - Indicadores de carga accesibles (`loading` skeleton con spinner).
  - Mensajes de error claros e informativos para búsquedas fallidas y entradas vacías.
  - Detección de conectividad en tiempo real (`online` / `offline`) con banner de aviso.
- **Persistencia Local (T-11)**:
  - Sincronización transparente de búsquedas recientes con `localStorage`.
  - Botón para limpiar historial completo y actualización reactiva de la interfaz.
- **Selector de Unidades (T-12)**:
  - Switch interactivo pill-toggle (°C / °F) con re-renderizado instantáneo de la temperatura y sensación térmica.
- **Documentación y Diapositivas Finales (T-13)**:
  - Actualización completa de `README.md` con enlace a GitHub Pages, capturas de pantalla y sustentación de los 5 pilares.
  - Presentación web interactiva `docs/diapositivas-presentacion.html` con 23 diapositivas y visor de código.
  - Guion formal en `docs/diapositivas-presentacion.md` para la sustentación del Grupo G4.
  - Registro de capturas en `docs/screenshots/` para resoluciones Desktop, Tablet y Móvil.

---

## [0.1.0] — 2026-09-23

### Añadido
- **Estructura Base**: Creación del árbol de directorios con arquitectura modular ES6 (`assets/`, `css/`, `js/models/`, `js/services/`, `js/ui/`, `docs/`, `scripts/`).
- **Gobernanza y Configuración**:
  - Archivo `.gitignore` con exclusión estándar de dependencias, ficheros de sistema y la carpeta `scripts/`.
  - Archivo `package.json` con metadatos del proyecto y scripts de ejecución.
  - Licencia oficial MIT en `LICENSE` a nombre de `wigsdev`.
  - Presentación inicial en `README.md`.
- **Suite Documental**:
  - `docs/guia-desarrollo.md`: Manual técnico con 17 secciones y mapa de IDs.
  - `docs/backlog.md`: Product Backlog estructurado con 13 tareas atómicas.
  - `docs/workflow.md`: Guía de Git Flow y Conventional Commits.
  - `docs/diseno.md`: Propuesta de diseño UI/UX y wireframes.
  - `docs/plan-implementacion.md`: Plan técnico y arquitectura.
- **Automatización**:
  - Script bash `scripts/crear-issues.sh` para la creación desatendida de GitHub Issues.
