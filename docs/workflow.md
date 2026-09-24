# Weather Dashboard — Workflow & Convenciones del Proyecto

Guía oficial de estándares técnicos, flujo de trabajo con Git, convenciones de commits y criterios de calidad para el desarrollo del proyecto **Weather Dashboard**.

---

## 1. Roles del Equipo (Grupo 4)

| Rol | Integrante | GitHub | Responsabilidades |
|---|---|---|---|
| **Team Leader / Maintainer** | Wilmer | [@wigsdev](https://github.com/wigsdev) | Asigna tareas, revisa y aprueba Pull Requests, protege `main`, resuelve conflictos e integra el código a producción. |
| **Developer** | Víctor Daniel Dávila Sánchez | [@danieldaviladev](https://github.com/danieldaviladev) | Implementa tareas asignadas en su branch individual, crea PRs y atiende code reviews. |
| **Developer** | Javier Flores Encarnación | [@JavierFloresenc](https://github.com/JavierFloresenc) | Implementa tareas asignadas en su branch individual, crea PRs y atiende code reviews. |
| **Developer** | Marco Chile | [@marcochile](https://github.com/marcochile) | Implementa tareas asignadas en su branch individual, crea PRs y atiende code reviews. |
| **Developer** | Miriam H. | [@Miriamhha](https://github.com/Miriamhha) | Implementa tareas asignadas en su branch individual, crea PRs y atiende code reviews. |

---

## 2. Branching Strategy (GitHub Flow Simplificado)

El repositorio utiliza un modelo estricto basado en ramas cortas (*feature branches*) integradas a la rama principal mediante Pull Requests y *Squash Merges*.

```
main ───────────────────────────────────────────────────────────► (Producción / Estable)
        \                                     /
         \─── feature/T-04-clase-clima ──────/ (Squash merge)
```

### Reglas
1. **`main` está protegida**: Ningún commit se realiza directamente sobre `main`.
2. **Una rama por tarea**: Cada tarea del backlog (`T-01`, `T-02`, etc.) se desarrolla en una rama independiente creada desde `main` actualizado.
3. **Vida corta**: La rama se elimina inmediatamente después de hacer el merge del Pull Request.

### Nomenclatura de Branches

| Tipo de Tarea | Patrón | Ejemplo |
|---|---|---|
| Nueva Funcionalidad | `feature/T-XX-nombre-corto` | `feature/T-04-clase-clima` |
| Estructura / Layout | `structure/T-XX-nombre-corto` | `structure/T-02-maquetacion-html` |
| Estilos / CSS | `style/T-XX-nombre-corto` | `style/T-03-tokens-css` |
| Integración | `integration/T-XX-nombre-corto` | `integration/T-08-controlador-eventos` |
| Corrección de Bug | `fix/T-XX-descripcion` | `fix/T-10-error-red-offline` |
| Documentación | `docs/T-XX-descripcion` | `docs/T-01-ecosistema-docs` |

---

## 3. Conventional Commits

Cada commit debe ser atómico y describir con precisión el cambio introducido siguiendo la especificación [Conventional Commits v1.0.0](https://www.conventionalcommits.org/):

```
<tipo>(<alcance>): <descripción concisa en imperativo y minúsculas>

[cuerpo opcional detallando el porqué del cambio]

[referencia a issues, ej: Closes #4]
```

### Tipos Permitidos
- `feat`: Nueva funcionalidad para el usuario.
- `fix`: Corrección de un fallo o error en lógica/estilos.
- `docs`: Modificaciones exclusivas en documentación (`README.md`, `docs/*`).
- `style`: Ajustes estéticos, CSS, formato o espaciado sin alterar lógica.
- `refactor`: Refactorización de código sin añadir funcionalidades ni corregir bugs.
- `chore`: Tareas de mantenimiento, configuración o dependencias (`package.json`, `.gitignore`).

### Alcance (Scope)
Indica el módulo o archivo afectado: `(models)`, `(services)`, `(ui)`, `(app)`, `(css)`, `(html)`, `(docs)`.

### Reglas de Commits
- **Atómicos**: Un commit debe representar una sola unidad lógica de cambio.
- **En imperativo**: "implementar clase Clima", no "implementado" ni "implementando".
- **Sin punto final** en la primera línea.

### Ejemplos Correctos
```bash
feat(models): implementar clase Clima con métodos de formateo (T-04)
feat(services): integrar consumo de API Open-Meteo con async/await (T-06)
style(css): aplicar tokens en :root y padding-inline fluido (T-03)
fix(ui): ocultar tarjeta de clima previa al ocurrir un error 404 (T-10)
docs(backlog): actualizar dependencias y estimaciones de tareas (T-01)
```

### Ejemplos Incorrectos (A evitar)
- ❌ `cambios varios` *(Sin tipo, sin alcance y descripción vaga)*
- ❌ `feat: arreglar css y agregar logica de api y corregir bugs` *(Commit gigante no atómico)*
- ❌ `Fix typo.` *(En inglés con punto final y sin alcance)*
- ❌ `WIP` *(Commits basura en ramas de trabajo)*

---

## 4. Pull Request Convention

### ¿Qué es un Pull Request (PR)?
Es la solicitud formal para incorporar los cambios de una rama hacia `main`. Permite revisión de código, verificación de estándares y validación de criterios de aceptación antes de la integración.

### Paso a Paso para Crear un PR
1. Asegurarse de tener `main` al día: `git checkout main && git pull origin main`.
2. Actualizar tu rama con `main` si hubo cambios.
3. Subir tu rama: `git push -u origin feature/T-XX-nombre`.
4. Abrir el PR en GitHub (vía web o con `gh pr create`).

### Título del PR
```
[T-XX] Breve descripción del objetivo de la tarea
```
*Ejemplo:* `[T-04] Implementar modelo de dominio POO Clase Clima`

### Plantilla Obligatoria de PR

```markdown
## Tarea

Closes #<!-- número del issue -->

## Descripción

<!-- Breve explicación de qué se implementó y decisiones tomadas -->

## Cambios realizados

- <!-- Cambio 1 -->
- <!-- Cambio 2 -->
- <!-- Cambio 3 -->

## Criterios de aceptación cumplidos

- [ ] <!-- Criterio 1 -->
- [ ] <!-- Criterio 2 -->
- [ ] <!-- Criterio 3 -->

## Capturas de pantalla (si aplica)

| Desktop | Mobile |
|---------|--------|
|         |        |

## Checklist del autor

- [ ] Mi código sigue las convenciones del proyecto
- [ ] He verificado que funciona en el navegador sin errores en consola
- [ ] Los commits siguen Conventional Commits
- [ ] No hay código comentado ni `console.log` de debug
- [ ] El branch está actualizado con `main`
```

---

## 5. Code Review Checklist

Al revisar un PR, el Team Leader verifica:

### 1. Funcionalidad
- ¿Cumple al 100% los criterios de aceptación del backlog?
- ¿Maneja casos límite (campo vacío, offline, ciudad inexistente)?

### 2. Calidad de Código
- ¿Aplica POO con responsabilidades únicas?
- ¿Usa `const` y `let` adecuadamente (cero `var`)?
- ¿Evita inyecciones de código usando `textContent` y `createElement`?

### 3. Estilo y CSS
- ¿Respeta las variables centralizadas en `:root`?
- ¿Usa sintaxis de rango para media queries (`@media (width > ...em)`)?
- ¿No rompe la adaptabilidad responsive?

### 4. Git
- ¿Los commits son atómicos y descriptivos?
- ¿La rama tiene un nombre conforme al estándar?

---

## 6. Definition of Done (DoD)

Una tarea está **Done (Terminada)** únicamente cuando:
1. Criterios de aceptación cumplidos al 100%.
2. Cero errores en consola de DevTools.
3. Funcionalidad probada en móvil (`< 36em`) y desktop (`> 62em`).
4. PR creado con la plantilla obligatoria completa.
5. Commits cumplen Conventional Commits.
6. Code review aprobado por el Team Leader.
7. Merge realizado mediante **Squash and Merge** hacia `main`.
8. Rama remota eliminada y GitHub Issue cerrada.

---

## 7. Flujo Completo de una Tarea (Paso a Paso con Comandos)

```bash
# 1. Posicionarse en main y actualizar
git checkout main
git pull origin main

# 2. Crear y cambiar a la rama de la tarea
git checkout -b feature/T-04-clase-clima

# 3. Desarrollar la funcionalidad y verificar en navegador...

# 4. Verificar estado y preparar commit atómico
git status
git add js/models/Clima.js
git commit -m "feat(models): implementar clase Clima con métodos de formateo (T-04)"

# 5. Subir la rama a GitHub
git push -u origin feature/T-04-clase-clima

# 6. Crear el Pull Request usando GitHub CLI o desde la web
gh pr create --title "[T-04] Implementar modelo de dominio POO Clase Clima" --body-file .github/PULL_REQUEST_TEMPLATE.md

# 7. Tras la aprobación y merge por el Team Leader:
git checkout main
git pull origin main
git branch -d feature/T-04-clase-clima
```

---

## 8. Configuración del Repositorio

- **Rama `main` protegida**: Requiere PR obligatorio y revisión aprobada.
- **Merge Strategy**: **Squash and Merge** exclusivo. Esto consolida todos los commits de la rama en un único commit limpio y semántico en el historial de `main`.

---

## 9. Resolución de Conflictos

Si al intentar mergear surgen conflictos con `main`:
```bash
# En tu rama de trabajo
git fetch origin
git merge origin/main

# Resolver manualmente los conflictos en el editor
# Verificar que todo funcione
git add <archivos-resueltos>
git commit -m "chore(merge): resolver conflictos con main"
git push origin <tu-rama>
```

---

## 10. Estructura del Proyecto

```
dashboard-clima/
│
├── index.html                  # HTML5 semántico
├── css/styles.css              # Tokens, reset y responsive
├── js/
│   ├── models/                 # Clases de dominio (Clima.js, Historial.js)
│   ├── services/               # Consumo de APIs (WeatherService.js)
│   ├── ui/                     # Renderizado dinámico (DomRenderer.js)
│   └── app.js                  # Orquestador y eventos
├── docs/                       # Documentación técnica y gestión
├── scripts/                    # Scripts utilitarios (en .gitignore)
├── assets/                     # Recursos gráficos
├── package.json                # Metadatos del proyecto
└── README.md                   # Presentación del proyecto
```

---

## 11. Política de Reasignación y Bloqueos

- Si un desarrollador encuentra un impedimento técnico o no puede cumplir con el deadline, debe comunicarlo de inmediato en el issue correspondiente de GitHub.
- El Team Leader podrá reasignar la tarea o brindar asistencia para desbloquear el camino crítico.

---

## 12. Comunicación

- **Canal Oficial**: Issues y Pull Requests de GitHub. Toda decisión técnica queda documentada formalmente en el hilo del ticket.
- **Dudas de arquitectura**: Consultar primero [docs/guia-desarrollo.md](guia-desarrollo.md) y [docs/diseno.md](diseno.md) antes de proponer cambios estructurales.
