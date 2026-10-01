/**
 * Weather Dashboard — Renderizador de Interfaz (DomRenderer)
 * Tareas T-07 y T-10: toda la manipulación del DOM y los estados visuales.
 * No usa innerHTML: solo createElement, textContent y classList.
 */
export class DomRenderer {
  constructor() {
    const $ = (id) => document.getElementById(id);

    this.searchForm = $('search-form');
    this.searchInput = $('search-input');
    this.btnSearch = $('btn-search');
    this.searchFeedback = $('search-feedback');

    this.loadingSpinner = $('loading-spinner');
    this.errorCard = $('error-card');
    this.errorMessage = $('error-message');

    this.weatherContainer = $('weather-container');
    this.weatherCityName = $('weather-city-name');
    this.weatherBadge = $('weather-badge');
    this.weatherTemp = $('weather-temp');
    this.weatherUnit = $('weather-unit');
    this.weatherIcon = $('weather-icon');
    this.weatherCondition = $('weather-condition');
    this.weatherApparent = $('weather-apparent');
    this.weatherHumidity = $('weather-humidity');
    this.weatherWind = $('weather-wind');

    this.historyList = $('history-list');
    this.historyCount = $('history-count');
    this.historyEmpty = $('history-empty');
    this.btnClearHistory = $('btn-clear-history');
    this.headerActions = $('header-actions');
    this.toastContainer = $('toast-container');
  }

  mostrarCargando(visible) {
    this.loadingSpinner.classList.toggle('hidden', !visible);
    this.loadingSpinner.setAttribute('aria-busy', String(visible));
    this.btnSearch.disabled = visible;
    this.btnSearch.setAttribute('aria-disabled', String(visible));
  }

  mostrarError(mensaje) {
    this.weatherContainer.classList.add('hidden');
    this.errorMessage.textContent = mensaje;
    this.errorCard.classList.remove('hidden');
  }

  ocultarError() {
    this.errorCard.classList.add('hidden');
    this.errorMessage.textContent = '';
  }

  mostrarFeedbackBusqueda(mensaje) {
    this.searchFeedback.textContent = mensaje || '';
    this.searchFeedback.classList.toggle('hidden', !mensaje);
  }

  renderizarClima(clima, unidad = 'C') {
    this.ocultarError();

    this.weatherCityName.textContent = clima.obtenerUbicacionCompleta();
    this.weatherBadge.textContent = clima.condicion;
    this.weatherTemp.textContent = String(clima.obtenerTemperatura(unidad));
    this.weatherUnit.textContent = unidad === 'F' ? '°F' : '°C';
    this.weatherIcon.textContent = clima.icono;
    this.weatherCondition.textContent = clima.condicion;
    this.weatherApparent.textContent = clima.obtenerSensacionFormateada(unidad);
    this.weatherHumidity.textContent = `${clima.humedad} %`;
    this.weatherWind.textContent = `${clima.viento} km/h`;

    this.weatherContainer.classList.remove('hidden');
  }

  renderizarHistorial(ciudades) {
    this.historyCount.textContent = `(${ciudades.length})`;

    if (ciudades.length === 0) {
      this.historyList.replaceChildren(this.historyEmpty);
      return;
    }

    const chips = ciudades.map((ciudad) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'history-chip';
      boton.dataset.city = ciudad;

      const icono = document.createElement('span');
      icono.setAttribute('aria-hidden', 'true');
      icono.textContent = '📍';

      const nombre = document.createElement('span');
      nombre.textContent = ciudad;

      boton.append(icono, nombre);
      return boton;
    });

    this.historyList.replaceChildren(...chips);
  }

  renderizarSelectorUnidades(unidadActual, callback) {
    const contenedor = document.createElement('div');
    contenedor.className = 'unit-selector';

    ['C', 'F'].forEach((unidad) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = unidad === unidadActual ? 'unit-btn active' : 'unit-btn';
      boton.dataset.unit = unidad;
      boton.textContent = `°${unidad}`;
      boton.addEventListener('click', () => callback(unidad));
      contenedor.append(boton);
    });

    this.headerActions.replaceChildren(contenedor);
  }

  mostrarToast(mensaje, tipo = 'info', duracion = 3500) {
    const toast = document.createElement('div');
    toast.className = `toast toast--${tipo}`;
    toast.textContent = mensaje;
    this.toastContainer.append(toast);
    setTimeout(() => toast.remove(), duracion);
  }
}
