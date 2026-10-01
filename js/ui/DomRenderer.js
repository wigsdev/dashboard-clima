/**
 * Weather Dashboard — Renderizador de Interfaz (DomRenderer)
 * Tarea T-07: Centraliza toda la manipulación del DOM, estados visuales y eventos de interfaz.
 */
export class DomRenderer {
  constructor() {
    // 1. Formulario y Búsqueda
    this.searchForm = document.getElementById('search-form');
    this.searchInput = document.getElementById('search-input');
    this.btnSearch = document.getElementById('btn-search');
    this.searchFeedback = document.getElementById('search-feedback');
    // 2. Estados de Carga y Error
    this.loadingSpinner = document.getElementById('loading-spinner');
    this.errorCard = document.getElementById('error-card');
    this.errorMessage = document.getElementById('error-message');
    // 3. Tarjeta del Clima y Métricas
    this.weatherContainer = document.getElementById('weather-container');
    this.weatherCard = document.getElementById('weather-card');
    this.weatherCityName = document.getElementById('weather-city-name');
    this.weatherBadge = document.getElementById('weather-badge');
    this.weatherTemp = document.getElementById('weather-temp');
    this.weatherUnit = document.getElementById('weather-unit');
    this.weatherIcon = document.getElementById('weather-icon');
    this.weatherCondition = document.getElementById('weather-condition');
    this.weatherApparent = document.getElementById('weather-apparent');
    this.weatherHumidity = document.getElementById('weather-humidity');
    this.weatherWind = document.getElementById('weather-wind');
    // 4. Historial de Búsquedas
    this.historyContainer = document.getElementById('history-container');
    this.historyList = document.getElementById('history-list');
    this.historyCount = document.getElementById('history-count');
    this.historyEmpty = document.getElementById('history-empty');
    this.btnClearHistory = document.getElementById('btn-clear-history');
    // 5. Cabecera y Notificaciones
    this.headerActions = document.getElementById('header-actions');
    this.toastContainer = document.getElementById('toast-container');
  }

  // Muestra u oculta el spinner de carga y desactiva controles para evitar spam
  mostrarCargando(visible) {
    if (!this.loadingSpinner) return;
    if (this.btnSearch) this.btnSearch.disabled = visible;
    if (this.searchInput) this.searchInput.disabled = visible;
    if (visible) {
      this.loadingSpinner.classList.remove('hidden');
      this.loadingSpinner.setAttribute('aria-busy', 'true');
      this.ocultarError();
      if (this.weatherContainer) this.weatherContainer.classList.add('hidden');
    } else {
      this.loadingSpinner.classList.add('hidden');
      this.loadingSpinner.setAttribute('aria-busy', 'false');
    }
  }
  // Muestra u oculta la advertencia inline bajo el input si el campo está vacío
  mostrarFeedbackBusqueda(mensaje) {
    if (!this.searchFeedback) return;
    if (mensaje) {
      this.searchFeedback.textContent = mensaje;
      this.searchFeedback.classList.remove('hidden');
    } else {
      this.searchFeedback.textContent = '';
      this.searchFeedback.classList.add('hidden');
    }
  }

  // Muestra la tarjeta de error con el mensaje correspondiente y oculta el clima previo
  mostrarError(mensaje) {
    if (!this.errorCard || !this.errorMessage) return;
    this.errorMessage.textContent = mensaje || 'Ocurrió un error al consultar el clima.';
    this.errorCard.classList.remove('hidden');
    if (this.weatherContainer) {
      this.weatherContainer.classList.add('hidden');
    }
    this.mostrarCargando(false);
  }
  // Oculta la tarjeta de error y limpia el mensaje
  ocultarError() {
    if (!this.errorCard) return;
    this.errorCard.classList.add('hidden');
    if (this.errorMessage) {
      this.errorMessage.textContent = '';
    }
  }

  // Actualiza todos los elementos de la tarjeta con los datos del objeto Clima
  renderizarClima(clima, unidad = 'C') {
    if (!clima || !this.weatherContainer) return;
    const simbolo = unidad === 'F' ? '°F' : '°C';
    // 1. Datos principales
    if (this.weatherCityName) {
      this.weatherCityName.textContent = clima.obtenerUbicacionCompleta();
    }
    if (this.weatherBadge) {
      this.weatherBadge.textContent = clima.condicion;
    }
    if (this.weatherTemp) {
      this.weatherTemp.textContent = clima.obtenerTemperatura(unidad);
    }
    if (this.weatherUnit) {
      this.weatherUnit.textContent = simbolo;
    }
    if (this.weatherCondition) {
      this.weatherCondition.textContent = clima.condicion;
    }
    // 2. Métricas secundarias
    if (this.weatherApparent) {
      this.weatherApparent.textContent = clima.obtenerSensacionFormateada(unidad);
    }
    if (this.weatherHumidity) {
      this.weatherHumidity.textContent = `${clima.humedad} %`;
    }
    if (this.weatherWind) {
      this.weatherWind.textContent = `${clima.viento} km/h`;
    }
    // 3. Renderizar imagen SVG de forma segura con createElement y replaceChildren
    if (this.weatherIcon) {
      const img = document.createElement('img');
      img.src = clima.icono;
      img.alt = clima.condicion;
      this.weatherIcon.replaceChildren(img);
    }
    // 4. Modificadores visuales dinámicos según temperatura
    if (this.weatherCard) {
      this.weatherCard.classList.remove('weather-card--warm', 'weather-card--cold');
      if (clima.esCalido ? clima.esCalido() : clima.temperatura >= 24) {
        this.weatherCard.classList.add('weather-card--warm');
      } else if (clima.temperatura < 10) {
        this.weatherCard.classList.add('weather-card--cold');
      }
    }
    // 5. Visibilidad de estados
    this.weatherContainer.classList.remove('hidden');
    this.ocultarError();
    this.mostrarCargando(false);
  }

  // Construye dinámicamente los chips del historial con createElement y replaceChildren
  renderizarHistorial(ciudades = []) {
    if (!this.historyList || !this.historyCount) return;

    this.historyCount.textContent = `(${ciudades.length})`;

    if (ciudades.length === 0) {
      if (this.historyEmpty) {
        this.historyEmpty.classList.remove('hidden');
        this.historyList.replaceChildren(this.historyEmpty);
      } else {
        this.historyList.replaceChildren();
      }
      return;
    }

    if (this.historyEmpty) {
      this.historyEmpty.classList.add('hidden');
    }

    const chips = ciudades.map((ciudad) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'history-chip';
      chip.dataset.city = ciudad;
      chip.textContent = `📍 ${ciudad}`;
      return chip;
    });

    this.historyList.replaceChildren(...chips);
  }

  // Renderiza el selector de unidades (°C / °F) en la cabecera
  renderizarSelectorUnidades(unidadActual, callback) {
    if (!this.headerActions) return;

    const contenedor = document.createElement('div');
    contenedor.className = 'unit-selector';

    ['C', 'F'].forEach((unidad) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = unidad === unidadActual ? 'unit-btn active' : 'unit-btn';
      boton.dataset.unit = unidad;
      boton.textContent = `°${unidad}`;
      boton.addEventListener('click', () => {
        if (typeof callback === 'function') {
          callback(unidad);
        }
      });
      contenedor.append(boton);
    });

    this.headerActions.replaceChildren(contenedor);
  }

  // Muestra una notificación temporal flotante con auto-remoción
  mostrarToast(mensaje, tipo = 'info', duracion = 3000) {
    if (!this.toastContainer || !mensaje) return;

    const toast = document.createElement('div');
    toast.className = `toast toast--${tipo}`;
    toast.textContent = mensaje;

    this.toastContainer.append(toast);

    setTimeout(() => {
      toast.remove();
    }, duracion);
  }
}
