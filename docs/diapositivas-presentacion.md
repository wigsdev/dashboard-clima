# 📊 Presentación de Diapositivas — Weather Dashboard (Grupo G4)

> **Documento Oficial de Presentación del Proyecto Integrador**  
> **Asignatura:** Desarrollo Web — Proyecto Integrador G4  
> **Tecnologías:** HTML5 · CSS3 · JavaScript Vanilla (Sin Librerías ni Frameworks) · POO · Fetch API  
> **Referencia Académica:** [docs/Proyecto.md](Proyecto.md) (Enunciado, Requisitos Funcionales y Rúbrica Oficial)

---

<!-- slide -->
# 🌤️ Diapositiva 1: Portada del Proyecto
> 📋 **Requisito Oficial:** Sección 1 (Enunciado del Proyecto) & Sección 15 (Presentación del Proyecto)

## Weather Dashboard — Consulta Meteorológica en Tiempo Real
**Presentación del Proyecto Integrador — Grupo G4**

### 👥 Integrantes del Grupo G4:
- **HUAMÁN AYALA**, MIRIAM HORTENCIA
- **FLORES ENCARNACIÓN**, JAVIER
- **GULCOCHÍA SÁNCHEZ**, WILMER
- **DÁVILA SÁNCHEZ**, VÍCTOR DANIEL
- **CHILE ANDRADE**, MARCO ANTONIO

- **Repositorio:** `wigsdev/dashboard-clima` (Branch: `main`)
- **Demo en Producción:** [https://wigsdev.github.io/dashboard-clima/](https://wigsdev.github.io/dashboard-clima/)
- **API Externa:** Open-Meteo Geocoding & Weather Forecast API

---

<!-- slide -->
# 🎯 Diapositiva 2: Propósito, Problemática y Solución Desarrollada
> 📋 **Requisito Oficial:** Sección 1 (Enunciado) & Sección 2 (Requisitos Funcionales)

## 📋 Problemática y Necesidad
- **Consulta en Tiempo Real:** Necesidad de acceder a información climática certera y actualizada de cualquier ciudad del mundo.
- **Objetivo Central:** Desarrollar una Single Page Application (SPA) interactiva utilizando exclusivamente **JavaScript Vanilla** (cero frameworks o librerías externas).
- **Consumo Asíncrono:** Conectar con una API meteorológica externa para extraer datos de temperatura, humedad, viento y condiciones meteorológicas.
- **Persistencia de Búsquedas:** Conservar un historial de ciudades consultadas sin requerir bases de datos externas.

## 💡 Solución Desarrollada
- **SPA Fluida:** Actualizaciones reactivas del DOM en tiempo real sin recargar la página.
- **Mobile First Real:** Adaptabilidad ergonómica desde smartphones hasta monitores de escritorio con CSS moderno.
- **Arquitectura en 5 Capas:** Desacoplamiento limpio entre Modelos, Servicios, Vista (UI) y Controlador Orquestador.

---

<!-- slide -->
# 🏗️ Diapositiva 3: Maquetación HTML5 Semántica y Accesible (`index.html`)
> 📋 **Requisito Oficial:** Sección 13 (HTML Semántico) & Sección 6 (Datos No Escritos en HTML)

## 💡 Estructura Semántica y Accesibilidad
- **Etiquetas Estándar:** Uso de `<header>`, `<main>`, `<section>`, `<form>` y `<footer>` para máxima accesibilidad y SEO.
- **Datos No Quemados:** El HTML se carga completamente limpio de datos estáticos; todo se inyecta dinámicamente mediante JavaScript.
- **Estados Iniciales Ocultos:** Contenedores de carga (`#loading-spinner`), error (`#error-card`) y clima (`#weather-container`) con la clase utilitaria `.hidden`.
- **Accesibilidad WAI-ARIA:** Atributos `aria-live="polite"` para alertas de voz y soporte nativo de teclado.

```html
<!-- ESTRUCTURA PRINCIPAL DEL DASHBOARD -->
<header class="header">
  <div class="header-container container">
    <a href="#" class="logo"><span>🌤️</span> Weather Dashboard</a>
    <div id="unit-toggle" class="unit-toggle"> <!-- Switch °C / °F --> </div>
  </div>
</header>

<main class="main container">
  <!-- 1. Buscador accesible -->
  <section class="search-section">
    <form id="search-form" class="search-form">
      <input id="search-input" type="search" placeholder="Introduce una ciudad...">
      <button id="btn-search" type="submit">Buscar</button>
    </form>
    <div id="search-feedback" class="search-feedback hidden"></div>
  </section>

  <!-- 2. Estados Visuales Dinámicos -->
  <div id="loading-spinner" class="loading-spinner hidden" aria-busy="true">...</div>
  <div id="error-card" class="error-card hidden" role="alert">...</div>
  <section id="weather-container" class="weather-container hidden">...</section>
  <section id="history-section" class="history-section">...</section>
</main>
```

---

<!-- slide -->
# 🎨 Diapositiva 4: Sistema de Diseño CSS y Mobile First (`css/styles.css`)
> 📋 **Requisito Oficial:** Sección 13 (CSS Responsive en Móvil y Escritorio)

## 💡 Metodología de Diseño
- **Variables Centralizadas (`:root`):** Sistema de tokens semánticos (paleta azul cielo, grises neutros y acentos cálidos).
- **Tipografía y Espaciado Fluido (`clamp()`):** Escalado armónico proporcional al viewport (`vw`) sin saltos bruscos.
- **Filosofía Mobile First:** Estilos base diseñados para dispositivos móviles; las reglas `@media` expanden el layout progresivamente hacia tablets y escritorios.
- **Media Queries Co-localizadas:** Cada componente agrupa sus propias media queries para máxima mantenibilidad.

```css
/* Tokens semánticos en :root */
:root {
  --color-primary: #0284c7;
  --color-primary-dark: #0369a1;
  --color-warm: #f97316;
  --color-cold: #38bdf8;
  --bg-body: #f0f9ff;
  --bg-card: #ffffff;
  --font-main: 'Plus Jakarta Sans', system-ui, sans-serif;
  --shadow-card: 0 4px 20px -2px rgba(2, 132, 199, 0.08);
}

/* Espaciado responsivo fluido */
.container {
  width: min(100% - 2rem, 42rem);
  margin-inline: auto;
}

/* Expansión progresiva para pantallas grandes */
@media (min-width: 640px) {
  .metrics-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

<!-- slide -->
# 🏛️ Diapositiva 5: Arquitectura Modular y Programación Orientada a Objetos
> 📋 **Requisito Oficial:** Sección 9 (POO) & Sección 14 (Estructura Modular Sugerida)

## 💡 Separación Limpia de Responsabilidades (5 Capas Modulares)
- **Modelos (`js/models/`):** Representan el dominio del negocio y encapsulan sus reglas (`Clima.js`, `Historial.js`).
- **Servicios (`js/services/`):** Gestionan el consumo de la API externa y peticiones HTTP (`WeatherService.js`).
- **Vista (`js/ui/`):** Centraliza la manipulación del DOM y renderizado visual (`DomRenderer.js`).
- **Controlador (`js/app.js`):** Orquesta los eventos del usuario, conecta los modelos y coordina la experiencia.

```
js/
├── models/
│   ├── Clima.js           → Modelo de entidad climática y mapeo WMO (POO)
│   └── Historial.js       → Gestión del arreglo de ciudades y localStorage
├── services/
│   └── WeatherService.js  → Consumo asíncrono de la API Open-Meteo (async/await)
├── ui/
│   └── DomRenderer.js     → Manipulación y renderizado seguro del DOM
└── app.js                 → Controlador principal y orquestación de eventos
```

---

<!-- slide -->
# 🌤️ Diapositiva 6: Clase Modelo `Clima` — Constructor y Encapsulamiento
> 📋 **Requisito Oficial:** Sección 9 (POO: Clases, Constructor, Propiedades, `this`) & Sección 3 (Datos de la API)  
> 📁 **Archivo:** `js/models/Clima.js`

## 💡 ¿Por qué una Clase `Clima`?
- **Encapsulamiento:** Evita manipular datos dispersos o dependientes del formato crudo del proveedor externo.
- **Constructor:** Normaliza tipos, aplica redondeo con `Math.round()` y almacena las propiedades obligatorias (ciudad, país, temperatura, sensación térmica, humedad, viento, condición e ícono).

```javascript
// js/models/Clima.js: Clase de Dominio
export class Clima {
  constructor({
    ciudad,
    pais,
    temperatura,
    sensacionTermica,
    humedad,
    viento,
    codigoWmo,
    esDia = 1
  }) {
    this.ciudad = ciudad;
    this.pais = pais;
    this.temperatura = Math.round(temperatura);
    this.sensacionTermica = Math.round(sensacionTermica);
    this.humedad = humedad;
    this.viento = Math.round(viento);
    this.codigoWmo = codigoWmo;
    this.esDia = esDia;

    // Obtener condición e ícono a través del mapeo oficial WMO
    const infoWmo = Clima.mapearWMO(codigoWmo, esDia);
    this.condicion = infoWmo.descripcion;
    this.icono = infoWmo.icono;
  }
}
```

---

<!-- slide -->
# 🌡️ Diapositiva 7: Métodos de Dominio y Conversión de Unidades
> 📋 **Requisito Oficial:** Sección 9 (Métodos de Instancia) & Sección 12 (Conversión Celsius/Fahrenheit)  
> 📁 **Archivo:** `js/models/Clima.js`

## 💡 Lógica de Negocio Encapsulada
- **`toFahrenheit()`:** Realiza la conversión matemática directa: $\text{°F} = \left(\text{°C} \times \frac{9}{5}\right) + 32$.
- **`obtenerUbicacionCompleta()`:** Devuelve la representación legible `"Ciudad, País"`.
- **`esCalido()`:** Evalúa si la temperatura es $\ge 24\text{ °C}$ para aplicar modificadores visuales en el DOM.

```javascript
// js/models/Clima.js: Métodos de Instancia
obtenerUbicacionCompleta() {
  return `${this.ciudad}, ${this.pais}`;
}

toFahrenheit(temperaturaCelsius) {
  return Math.round((temperaturaCelsius * 9 / 5) + 32);
}

obtenerTemperatura(unidad = 'C') {
  return unidad === 'F' ? this.toFahrenheit(this.temperatura) : this.temperatura;
}

obtenerSensacion(unidad = 'C') {
  return unidad === 'F' ? this.toFahrenheit(this.sensacionTermica) : this.sensacionTermica;
}

esCalido() {
  return this.temperatura >= 24;
}
```

---

<!-- slide -->
# 🗺️ Diapositiva 8: Mapeo WMO y Normalización de Códigos Meteorológicos
> 📋 **Requisito Oficial:** Sección 3 (Condición Meteorológica e Ícono) & Sección 9 (Métodos Estáticos)  
> 📁 **Archivo:** `js/models/Clima.js`

## 💡 Desacoplamiento del Proveedor de Datos
- **Códigos Internacionales OMM/WMO:** La API devuelve enteros (0 = Despejado, 61 = Lluvia ligera, 95 = Tormenta).
- **Método Estático `Clima.mapearWMO(codigo, esDia)`:** Traduce cualquier código numérico a descripción en español y ruta del ícono SVG correspondiente.

```javascript
// js/models/Clima.js: Método Estático
static mapearWMO(codigo, esDia = true) {
  const iconoDespejado = esDia
    ? 'assets/icons/weather/clear-day.svg'
    : 'assets/icons/weather/clear-night.svg';
  const iconoParcial = esDia
    ? 'assets/icons/weather/partly-cloudy.svg'
    : 'assets/icons/weather/partly-cloudy-night.svg';

  const mapa = {
    0: { condicion: 'Cielo despejado', icono: iconoDespejado },
    1: { condicion: 'Mayormente despejado', icono: iconoDespejado },
    2: { condicion: 'Parcialmente nublado', icono: iconoParcial },
    3: { condicion: 'Nublado', icono: 'assets/icons/weather/cloudy.svg' },
    61: { condicion: 'Lluvia ligera', icono: 'assets/icons/weather/rain.svg' },
    95: { condicion: 'Tormenta eléctrica', icono: 'assets/icons/weather/thunderstorm.svg' }
  };
  return mapa[codigo] || { condicion: 'Condición variable', icono: iconoParcial };
}
```

---

<!-- slide -->
# 📋 Diapositiva 9: Gestión del Historial de Búsquedas con Arreglos
> 📋 **Requisito Oficial:** Sección 8 (Historial con Arreglos) & Sección 1 (Arreglos) & Sección 15.2 (Sustentación de Arreglos)  
> 📁 **Archivo:** `js/models/Historial.js`

## 💡 ¿Por qué se utilizó un Arreglo (`Array`)?
- **Colección Indexada:** Estructura secuencial idónea para mantener el orden cronológico de las búsquedas recientes.
- **Acceso Directo:** Permite iterar ordenadamente, limitar su longitud y evaluar pertenencia de elementos.
- **Encapsulamiento:** La propiedad interna `this._ciudades` almacena los nombres limpios.

```javascript
// js/models/Historial.js: Clase de Gestión de Arreglos
export class Historial {
  constructor(limite = 5, storageKey = 'weather_dashboard_history') {
    this.limite = limite;
    this.storageKey = storageKey;
    this._ciudades = [];
    this.cargarDeStorage();
  }

  obtenerTodas() {
    // Retorna una copia inmutable del arreglo interno
    return [...this._ciudades];
  }

  get total() {
    return this._ciudades.length;
  }
}
```

---

<!-- slide -->
# 🔄 Diapositiva 10: Operaciones Inmutables y Deduplicación
> 📋 **Requisito Oficial:** Sección 8 (Sin Duplicados, Límite Estricto de Búsquedas)  
> 📁 **Archivo:** `js/models/Historial.js`

## 💡 Manipulación Segura del Arreglo
- **`filter()`:** Elimina coincidencias previas normalizando a minúsculas (`toLowerCase()`) para garantizar **cero duplicados**.
- **`unshift()`:** Inserta la nueva ciudad al inicio del arreglo (comportamiento FIFO de elemento más reciente).
- **`slice(0, 5)`:** Trunca estrictamente el arreglo al límite configurado (5 elementos).

```javascript
// js/models/Historial.js: Inserción y Deduplicación
agregar(ciudad) {
  const nombreLimpio = (ciudad || '').trim();
  if (!nombreLimpio) return;

  // 1. Filtrar duplicados previos (insensible a mayúsculas)
  this._ciudades = this._ciudades.filter(
    (c) => c.toLowerCase() !== nombreLimpio.toLowerCase()
  );

  // 2. Insertar al inicio de la lista
  this._ciudades.unshift(nombreLimpio);

  // 3. Respetar límite estricto de elementos
  if (this._ciudades.length > this.limite) {
    this._ciudades = this._ciudades.slice(0, this.limite);
  }

  this.guardarEnStorage();
}
```

---

<!-- slide -->
# 💾 Diapositiva 11: Persistencia Local con `localStorage` y Limpieza
> 📋 **Requisito Oficial:** Sección 8 (Opción para Limpiar Historial) & Sección 12 (Persistencia con `localStorage`)  
> 📁 **Archivo:** `js/models/Historial.js`

## 💡 Persistencia entre Sesiones y Limpieza
- **`JSON.stringify()`:** Serializa el arreglo de JavaScript a cadena de texto para guardarlo en `localStorage`.
- **`JSON.parse()`:** Reconstituye el arreglo al iniciar la aplicación, protegido con `try / catch` ante datos corruptos.
- **`limpiar()`:** Vacía el arreglo en memoria y remueve la clave del almacenamiento web.

```javascript
// js/models/Historial.js: Persistencia y Vaciado
guardarEnStorage() {
  try {
    localStorage.setItem(this.storageKey, JSON.stringify(this._ciudades));
  } catch (e) {
    console.warn('No se pudo guardar el historial en localStorage:', e);
  }
}

cargarDeStorage() {
  try {
    const raw = localStorage.getItem(this.storageKey);
    this._ciudades = raw ? JSON.parse(raw) : [];
  } catch (e) {
    this._ciudades = [];
  }
}

limpiar() {
  this._ciudades = [];
  localStorage.removeItem(this.storageKey);
}
```

---

<!-- slide -->
# 🌐 Diapositiva 12: Fundamentos de Promesas y Peticiones Asíncronas
> 📋 **Requisito Oficial:** Sección 4 (Uso de Promesas y `fetch`) & Sección 15.5 (Sustentación de Promesas)  
> 📁 **Archivo:** `js/services/WeatherService.js`

## 💡 ¿Qué es una Promesa y cómo interviene?
- **Concepto:** Objeto que representa el resultado eventual de una operación asíncrona de red que puede tardar un tiempo indeterminado.
- **Estados:** `Pending` (pendiente) ➔ `Fulfilled` (resuelta exitosamente) o `Rejected` (rechazada por error).
- **`fetch()`:** Función nativa del navegador que despacha peticiones HTTP y devuelve una Promesa con la respuesta.

```javascript
// Concepto de Promesa nativa con fetch():
fetch('https://geocoding-api.open-meteo.com/v1/search?name=Lima')
  .then((respuesta) => {
    if (!respuesta.ok) throw new Error('Error en el servidor');
    return respuesta.json(); // Segunda promesa de parseo
  })
  .then((datos) => console.log('Datos recibidos:', datos))
  .catch((error) => console.error('Error capturado:', error))
  .finally(() => console.log('Operación concluida'));
```

---

<!-- slide -->
# ⚡ Diapositiva 13: Flujo Asíncrono Secuencial con `async / await`
> 📋 **Requisito Oficial:** Sección 5 (Uso de `async/await`) & Sección 15.6 (Sustentación de async/await)  
> 📁 **Archivo:** `js/services/WeatherService.js`

## 💡 Beneficios de `async / await`
- **`async`:** Transforma la función para que retorne siempre una Promesa.
- **`await`:** Pausa la ejecución secuencial de la función hasta resolver la promesa, **sin congelar el hilo principal (`Event Loop`)**.
- **Legibilidad:** Elimina el anidamiento excesivo (*callback hell*) permitiendo manejar errores con bloques estándar `try / catch`.

```javascript
// js/services/WeatherService.js: Método Asíncrono
export class WeatherService {
  async consultarClima(nombreCiudad) {
    // 1. await espera la respuesta de geocodificación
    const resGeo = await fetch(urlGeocoding);
    if (!resGeo.ok) throw new Error('Error al conectar con el servicio de geocodificación.');
    const dataGeo = await resGeo.json();

    // 2. await espera la respuesta del pronóstico
    const resClima = await fetch(urlForecast);
    if (!resClima.ok) throw new Error('Error al obtener datos meteorológicos.');
    const dataClima = await resClima.json();

    // Retorna una instancia normalizada de Clima
    return new Clima({ ... });
  }
}
```

---

<!-- slide -->
# 🎯 Diapositiva 14: Pipeline Geocoding ➔ Pronóstico y Resiliencia
> 📋 **Requisito Oficial:** Sección 3 (API Open-Meteo) & Sección 10 (Manejo de Errores)  
> 📁 **Archivo:** `js/services/WeatherService.js`

## 💡 Coordinación en Dos Fases
- **Fase 1 — Geocodificación:** Convierte `"Cajamarca"` en `{ latitude: -7.16, longitude: -78.51, country: "Perú" }`.
- **Validación de Resultados Vacíos:** Si `!dataGeo.results || dataGeo.results.length === 0`, lanza un error descriptivo: *"No se encontró la ciudad"*.
- **Fase 2 — Consulta Meteorológica:** Extrae temperatura, humedad, viento y código WMO actual.

```javascript
// js/services/WeatherService.js: Pipeline Completo
const urlGeo = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nombreCiudad)}&count=1&language=es`;
const resGeo = await fetch(urlGeo);
const dataGeo = await resGeo.json();

if (!dataGeo.results || dataGeo.results.length === 0) {
  throw new Error(`No se encontró la ciudad "${nombreCiudad}". Verifica la ortografía.`);
}

const loc = dataGeo.results[0];
const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day`;
const resClima = await fetch(urlClima);
const dataClima = await resClima.json();

return new Clima({
  ciudad: loc.name,
  pais: loc.country || '',
  temperatura: dataClima.current.temperature_2m,
  sensacionTermica: dataClima.current.apparent_temperature,
  humedad: dataClima.current.relative_humidity_2m,
  viento: dataClima.current.wind_speed_10m,
  codigoWmo: dataClima.current.weather_code,
  esDia: dataClima.current.is_day
});
```

---

<!-- slide -->
# 🖼️ Diapositiva 15: Caché de Nodos del DOM y Rendimiento
> 📋 **Requisito Oficial:** Sección 6 (Manipulación del DOM) & Sección 15.3 (Sustentación de DOM)  
> 📁 **Archivo:** `js/ui/DomRenderer.js`

## 💡 Optimización en el Acceso al DOM
- **Caché en Constructor:** Las referencias a elementos HTML se consultan una sola vez al instanciar `DomRenderer`.
- **Rendimiento:** Evita llamadas repetitivas e innecesarias a `document.getElementById()`, reduciendo el costo computacional de repintado (*reflow/repaint*).

```javascript
// js/ui/DomRenderer.js: Constructor con Caché de Elementos
export class DomRenderer {
  constructor() {
    this.searchForm = document.getElementById('search-form');
    this.searchInput = document.getElementById('search-input');
    this.btnSearch = document.getElementById('btn-search');
    this.searchFeedback = document.getElementById('search-feedback');

    this.loadingSpinner = document.getElementById('loading-spinner');
    this.errorCard = document.getElementById('error-card');
    this.errorMessage = document.getElementById('error-message');

    this.weatherContainer = document.getElementById('weather-container');
    this.weatherCard = document.getElementById('weather-card');
    this.weatherCityName = document.getElementById('weather-city-name');
    this.weatherTemp = document.getElementById('weather-temp');
    this.weatherUnit = document.getElementById('weather-unit');
    this.weatherBadge = document.getElementById('weather-badge');

    this.historyList = document.getElementById('history-list');
    this.historyCount = document.getElementById('history-count');
    this.btnClearHistory = document.getElementById('btn-clear-history');
  }
}
```

---

<!-- slide -->
# 🌤️ Diapositiva 16: Renderizado Dinámico de la Tarjeta del Clima
> 📋 **Requisito Oficial:** Sección 6 (Manipulación del DOM) & Sección 3 (Sin Datos Manuales en HTML)  
> 📁 **Archivo:** `js/ui/DomRenderer.js`

## 💡 Inyección Dinámica y Sanitización
- **`textContent`:** Asigna textos planos previniendo vulnerabilidades XSS (Cross-Site Scripting).
- **Modificadores Térmicos Contextuales:** Añade `.card--warm` si $\ge 24\text{ °C}$ o `.card--cold` si $< 10\text{ °C}$.
- **Reemplazo Instantáneo:** Cuando el usuario consulta otra ciudad, los datos previos son reemplazados limpiamente.

```javascript
// js/ui/DomRenderer.js: Renderizado del Clima
renderizarClima(clima, unidad = 'C') {
  this.weatherCityName.textContent = clima.obtenerUbicacionCompleta();
  this.weatherBadge.textContent = clima.condicion;
  this.weatherTemp.textContent = clima.obtenerTemperatura(unidad);
  this.weatherUnit.textContent = `°${unidad}`;
  this.weatherFeelsLike.textContent = `${clima.obtenerSensacion(unidad)}°${unidad}`;
  this.weatherHumidity.textContent = `${clima.humedad}%`;
  this.weatherWind.textContent = `${clima.viento} km/h`;
  this.weatherIcon.src = clima.icono;
  this.weatherIcon.alt = clima.condicion;

  // Clases dinámicas contextuales
  this.weatherCard.classList.remove('card--warm', 'card--cold');
  if (clima.esCalido()) {
    this.weatherCard.classList.add('card--warm');
  } else if (clima.temperatura < 10) {
    this.weatherCard.classList.add('card--cold');
  }

  this.weatherContainer.classList.remove('hidden');
}
```

---

<!-- slide -->
# ⏳ Diapositiva 17: Indicador de Carga y Tarjeta de Error
> 📋 **Requisito Oficial:** Sección 10 (Manejo de Errores) & Sección 11 (Indicador de Carga)  
> 📁 **Archivo:** `js/ui/DomRenderer.js`

## 💡 Estados Visuales Asíncronos
- **Indicador de Carga (`mostrarCargando`):** Muestra el spinner animado, oculta errores previos y desactiva el botón para evitar peticiones concurrentes.
- **Tarjeta de Error (`mostrarError`):** Inyecta el mensaje de fallo en `#error-card`, con soporte para ciudad no encontrada, red o entradas inválidas.

```javascript
// js/ui/DomRenderer.js: Estados de Carga y Error
mostrarCargando(visible) {
  if (!this.loadingSpinner) return;
  this.loadingSpinner.classList.toggle('hidden', !visible);
  if (this.btnSearch) this.btnSearch.disabled = visible;
  if (this.searchInput) this.searchInput.disabled = visible;

  if (visible) {
    this.ocultarError();
    if (this.weatherContainer) this.weatherContainer.classList.add('hidden');
  }
}

mostrarError(mensaje) {
  if (!this.errorCard || !this.errorMessage) return;
  this.errorMessage.textContent = mensaje;
  this.errorCard.classList.remove('hidden');
  if (this.weatherContainer) this.weatherContainer.classList.add('hidden');
}
```

---

<!-- slide -->
# 🏷️ Diapositiva 18: Renderizado Dinámico del Historial y Estado Vacío
> 📋 **Requisito Oficial:** Sección 6 (DOM) & Sección 8 (Historial en el DOM)  
> 📁 **Archivo:** `js/ui/DomRenderer.js`

## 💡 Creación Dinámica de Nodos
- **Iteración:** Recorre el arreglo de ciudades y construye botones interactivos (*chips*) con el atributo `data-city`.
- **Estado Vacío:** Si el historial no contiene elementos, inyecta un mensaje informativo indicando que no hay búsquedas recientes.

```javascript
// js/ui/DomRenderer.js: Renderizado del Historial
renderizarHistorial(ciudades = []) {
  if (!this.historyList) return;
  this.historyList.innerHTML = '';

  if (ciudades.length === 0) {
    this.historyList.innerHTML = '<p class="history-empty">No hay búsquedas recientes</p>';
    if (this.historyCount) this.historyCount.textContent = '(0)';
    if (this.btnClearHistory) this.btnClearHistory.disabled = true;
    return;
  }

  if (this.historyCount) this.historyCount.textContent = `(${ciudades.length})`;
  if (this.btnClearHistory) this.btnClearHistory.disabled = false;

  ciudades.forEach((ciudad) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'history-chip';
    chip.dataset.city = ciudad;
    chip.innerHTML = `<span>📍</span> <span>${ciudad}</span>`;
    this.historyList.appendChild(chip);
  });
}
```

---

<!-- slide -->
# 🚀 Diapositiva 19: Punto de Entrada y Ciclo de Vida (`DOMContentLoaded`)
> 📋 **Requisito Oficial:** Sección 13 (Requisitos Técnicos) & Sección 14 (app.js como Integrador)  
> 📁 **Archivo:** `js/app.js`

## 💡 Arranque Seguro de la Aplicación
- **Evento `DOMContentLoaded`:** Garantiza que el árbol de nodos del DOM esté completamente analizado antes de ejecutar scripts.
- **Patrón Controlador:** Instancia la clase orquestadora `new App()` e inicializa eventos, persistencia de unidad y renderizado inicial del historial.

```javascript
// js/app.js: Punto de Entrada Principal
export class App {
  constructor() {
    this.weatherService = new WeatherService();
    this.historial = new Historial(5);
    this.ui = new DomRenderer();
    this.unidad = localStorage.getItem('weather_unit') || 'C';
    this.climaActual = null;
  }

  iniciar() {
    this.configurarEventos();
    this.configurarEventosDeRed();
    this.cargarEstadoInicial();
  }
}

// Arranque seguro en el navegador
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.iniciar();
});
```

---

<!-- slide -->
# 🔍 Diapositiva 20: Eventos del Buscador (`submit`, `Enter`, Validación)
> 📋 **Requisito Oficial:** Sección 2.A (Buscador: Botón, Enter, Campo Vacío) & Sección 7 (Manejo de Eventos)  
> 📁 **Archivo:** `js/app.js`

## 💡 Intercepción de Eventos y Validación Preventiva
- **Evento `submit`:** Asignado al formulario `#search-form`, captura tanto el clic en el botón como la pulsación de la tecla **Enter**.
- **`evento.preventDefault()`:** Anula el comportamiento por defecto de recargar la página.
- **Validación Local:** Si el input está vacío, muestra aviso sin disparar peticiones HTTP innecesarias.

```javascript
// js/app.js: Eventos del Formulario y Validación
if (this.ui.searchForm) {
  this.ui.searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita recarga del navegador
    const ciudad = this.ui.searchInput ? this.ui.searchInput.value : '';
    this.buscar(ciudad);
  });
}

async buscar(ciudadTexto) {
  const ciudad = (ciudadTexto || '').trim();

  // Validación de campo vacío según Sección 2.A
  if (!ciudad) {
    this.ui.mostrarFeedback('⚠️ Introduce una ciudad para realizar la búsqueda.');
    if (this.ui.searchInput) this.ui.searchInput.focus();
    return;
  }

  this.ui.ocultarFeedback();
  await this.ejecutarConsulta(ciudad);
}
```

---

<!-- slide -->
# 🖱️ Diapositiva 21: Delegación de Eventos en Historial y Toggle de Unidades
> 📋 **Requisito Oficial:** Sección 7 (Evento 3: Historial) & Sección 12 (Toggle °C/°F)  
> 📁 **Archivo:** `js/app.js`

## 💡 Delegación de Eventos con `.closest()`
- **¿Por qué Delegación?:** Un único listener en `#history-list` escucha los clics de cualquier chip dinámico presente o futuro.
- **Toggle de Unidades:** Alterna entre °C y °F recalculando los datos en pantalla al vuelo sin volver a llamar a la API.

```javascript
// js/app.js: Delegación de Eventos en Historial
if (this.ui.historyList) {
  this.ui.historyList.addEventListener('click', (e) => {
    const chip = e.target.closest('.history-chip');
    if (!chip) return;

    const ciudad = chip.dataset.city;
    if (ciudad) {
      if (this.ui.searchInput) this.ui.searchInput.value = ciudad;
      this.buscar(ciudad); // Re-consulta inmediata
    }
  });
}

// js/app.js: Alternador de Unidades
cambiarUnidad(nuevaUnidad) {
  if (this.unidad === nuevaUnidad) return;
  this.unidad = nuevaUnidad;
  localStorage.setItem('weather_unit', nuevaUnidad);

  if (this.climaActual) {
    // Re-renderizado instantáneo sin consumo de API
    this.ui.renderizarClima(this.climaActual, this.unidad);
  }
}
```

---

<!-- slide -->
# 🛡️ Diapositiva 22: Orquestación Global y Flujo `try / catch / finally`
> 📋 **Requisito Oficial:** Sección 10 (Manejo de Errores) & Sección 11 (Indicador de Carga) & Sección 15.6  
> 📁 **Archivo:** `js/app.js`

## 💡 Integración de Todas las Capas del Sistema
- **`try`:** Despacha la consulta asíncrona, renderiza el clima, almacena en historial y refresca la vista.
- **`catch`:** Captura excepciones (ciudad inexistente o caída de red) y delega el mensaje de error visual.
- **`finally`:** Garantiza incondicionalmente el apagado del indicador de carga (`loading`).

```javascript
// js/app.js: Orquestación Asíncrona Robusta
async ejecutarConsulta(nombreCiudad) {
  try {
    this.ui.mostrarCargando(true);

    // 1. Invocar Servicio Asíncrono
    const clima = await this.weatherService.consultarClima(nombreCiudad);
    this.climaActual = clima;

    // 2. Renderizar Clima en el DOM
    this.ui.renderizarClima(clima, this.unidad);

    // 3. Actualizar Historial y Persistencia
    this.historial.agregar(clima.ciudad);
    this.ui.renderizarHistorial(this.historial.obtenerTodas());

  } catch (error) {
    this.ui.mostrarError(error.message);
  } finally {
    // Apagado garantizado del spinner
    this.ui.mostrarCargando(false);
  }
}
```

---

<!-- slide -->
# 🚀 Diapositiva 23: Demostración en Vivo y Sustentación Final
> 📋 **Requisito Oficial:** Sección 15 (Pauta de Demostración del Proyecto) & [Documento de Sustentación](file:///home/wigsdev/GitHub/dashboard-clima/docs/sustentacion-seccion-15.md)

## 🧪 Guion de Pruebas de la Demostración en Vivo
1. **Búsqueda exitosa:** Consultar *"Cajamarca"* o *"Madrid"* y observar el spinner asíncrono, la tarjeta reactiva y el ícono meteorológico SVG.
2. **Toggle de unidades:** Alternar entre °C y °F recalculando los datos numéricos en pantalla al instante sin recargar la página ni llamar a la API.
3. **Delegación de eventos:** Clic sobre un chip del historial para relanzar la consulta con un solo clic.
4. **Resiliencia y validación:** Probar búsqueda vacía (mensaje preventivo) y búsqueda de ciudad inexistente (*"Xyz123"*).
5. **Persistencia local:** Recargar con **F5** comprobando que se conservan el historial de búsquedas y la unidad preferida en `localStorage`.

## 🌐 Aplicación en Producción
🔗 **Enlace Oficial:** [https://wigsdev.github.io/dashboard-clima/](https://wigsdev.github.io/dashboard-clima/)

```
┌──────────────────────────────────────────────────────────────┐
│  🌤️  Weather Dashboard — Consulta en Tiempo Real            │
│  Despliegue activo en GitHub Pages                           │
│  URL: https://wigsdev.github.io/dashboard-clima/             │
└──────────────────────────────────────────────────────────────┘
```

---

### 🎉 ¡Muchas Gracias por su Atención!
**Espacio abierto para preguntas del docente y revisión del código fuente**  
*(Respuestas detalladas a las preguntas teóricas: [`docs/sustentacion-seccion-15.md`](file:///home/wigsdev/GitHub/dashboard-clima/docs/sustentacion-seccion-15.md))*

