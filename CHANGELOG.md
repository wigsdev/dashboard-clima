# Historial de Cambios (CHANGELOG)

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning 2.0.0](https://semver.org/lang/es/).

---

## [Unreleased] — v1.0.0 (MVP Funcional)

### En desarrollo / Próximos pasos
- Maquetación semántica HTML5 e infraestructura de IDs oficiales (T-02).
- Sistema de estilos CSS moderno, tokens semánticos y rejilla responsiva (T-03).
- Modelado de dominio POO con las clases `Clima` e `Historial` (T-04, T-05).
- Integración asíncrona con la API de Open-Meteo mediante async/await (T-06).
- Manipulación segura del DOM y orquestación de eventos (T-07 a T-11).
- Selector de unidades (°C / °F) y entrega final del MVP con capturas reales (T-12, T-13).

---

## [0.1.0] — 2026-09-23

### Añadido
- **Estructura Base**: Creación del árbol de directorios con arquitectura modular ES6 (`assets/`, `css/`, `js/models/`, `js/services/`, `js/ui/`, `docs/`, `scripts/`).
- **Gobernanza y Configuración**:
  - Archivo `.gitignore` con exclusión estándar de dependencias, ficheros de sistema y la carpeta `scripts/`.
  - Archivo `package.json` con metadatos del proyecto y scripts de ejecución.
  - Licencia oficial MIT en `LICENSE` a nombre de `wigsdev`.
  - Presentación completa y profesional en `README.md` con badges oficiales y guía de instalación.
- **Suite Documental de Estándar Profesional**:
  - `docs/guia-desarrollo.md`: Manual técnico con 17 secciones, mapa completo de IDs, clases CSS, esquema visual ASCII, tabla WMO y respuestas preparadas para la sustentación.
  - `docs/backlog.md`: Product Backlog estructurado con 13 tareas atómicas, mapa de dependencias, fases de ejecución y resumen cuantitativo.
  - `docs/workflow.md`: Guía de Git Flow simplificado, especificación de Conventional Commits con ejemplos correctos/incorrectos, plantilla obligatoria de Pull Request y Code Review Checklist.
  - `docs/diseno.md`: Propuesta de diseño UI/UX con CSS moderno (`clamp()`, sintaxis de rango `@media (width > ...em)`) y wireframes en ASCII para desktop, tablet y móvil.
  - `docs/plan-implementacion.md`: Propuesta técnica y de arquitectura integral.
- **Automatización**:
  - Script bash `scripts/crear-issues.sh` para la creación desatendida de labels y de las 13 GitHub Issues del proyecto con GitHub CLI (`gh`).
