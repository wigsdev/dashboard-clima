/**
 * Weather Dashboard — Entrada Principal (App)
 * Tarea T-08: Orquesta los eventos del usuario, las peticiones a la API y la actualización del DOM.
 */

import { WeatherService } from './services/WeatherService.js';
import { Historial } from './models/Historial.js';
import { DomRenderer } from './ui/DomRenderer.js';

export class App {
  constructor() {
    this.weatherService = new WeatherService();
    this.historial = new Historial();
    this.ui = new DomRenderer();

    this.climaActual = null;
    this.unidad = localStorage.getItem('weather_dashboard_unit') || 'C';
  }

  // 1. Inicializa la aplicación y registra los eventos
  iniciar() {
    this.configurarEventos();
    this.cargarEstadoInicial();
  }

  // 2. Cargar el historial guardado y el selector de unidades
  cargarEstadoInicial() {
    const ciudades = this.historial.obtenerTodas();
    this.ui.renderizarHistorial(ciudades);
    this.ui.renderizarSelectorUnidades(this.unidad, (nuevaUnidad) => {
      this.cambiarUnidad(nuevaUnidad);
    });
  }

  // 3. Registra los escuchadores de eventos del usuario
  configurarEventos() {
    // 3.1 Envío del formulario de búsqueda (botón o techa Enter)
    if (this.ui.searchForm) {
      this.ui.searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = this.ui.searchInput ? this.ui.searchInput.value : '';
        this.buscar(texto);
      });
    }

    // 3.2 Limpiar mensaje de advertencia mientras el usuario escribe
    if (this.ui.searchInput) {
      this.ui.searchInput.addEventListener('input', () => {
        this.ui.mostrarFeedbackBusqueda('');
      });
    }

    // 3.3 Delegación de eventos en los chips del historial
    if (this.ui.historyList) {
      this.ui.historyList.addEventListener('click', (e) => {
        const botonChip = e.target.closest('.history-chip');
        if (!botonChip) {
          return;
        }

        const ciudad = botonChip.dataset.city;
        if (ciudad) {
          if (this.ui.searchInput) {
            this.ui.searchInput.value = ciudad;
          }
          this.buscar(ciudad);
        }
      });
    }

    // 3.4 Botón para vaciar todo el historial
    if (this.ui.btnClearHistory) {
      this.ui.btnClearHistory.addEventListener('click', () => {
        if (this.historial.total === 0) {
          return;
        }

        this.historial.limpiar();
        this.ui.renderizarHistorial(this.historial.obtenerTodas());
        this.ui.mostrarToast('Historial vaciado.', 'info');
      });
    }
  }

  // 4. Realiza la búsqueda asíncrona de clima de una ciudad
  async buscar(nombreCiudad) {
    const ciudad = (nombreCiudad || '').trim();

    // Validación preventiva: no consultar si el campo está vacío
    if (!ciudad) {
      this.ui.mostrarFeedbackBusqueda('Por favor, ingrese el nombre de una ciudad.');
      if (this.ui.searchInput) this.ui.searchInput.focus();
      return;
    }

    this.ui.mostrarFeedbackBusqueda('');

    try {
      // Activar indicador visual de carga
      this.ui.mostrarCargando(true);

      // Petición asíncrona al servicio metereológico
      const datosclima = await this.weatherService.consultarClima(ciudad);
      this.climaActual = datosclima;

      // Renderizar datos del clima en la tarjeta
      this.ui.renderizarClima(datosclima, this.unidad);

      // Guardar ciudad en el historial y actualizar la lista en pantalla
      this.historial.agregar(datosclima.ciudad);
      this.ui.renderizarHistorial(this.historial.obtenerTodas());

      // Notificación toast de éxito
      this.ui.mostrarToast(
        `clima cargado para ${datosclima.obtenerUbicacionCompleta()}`,
        'success'
      );
    } catch (error) {
      // Manejo centralizado de errores visuales (404 o conexión)
      this.ui.mostrarError(error.message);
    } finally {
      // Garantizar que el spinner se apague siempre
      this.ui.mostrarCargando(false);
    }
  }

  // 5. Conmuta la unidad de medida
  cambiarUnidad(nuevaUnidad) {
    if (this.unidad === nuevaUnidad) {
      return;
    }

    this.unidad = nuevaUnidad;
    localStorage.setItem('weather_dashboard_unit', nuevaUnidad);

    this.ui.renderizarSelectorUnidades(this.unidad, (u) => {
      this.cambiarUnidad(u);
    });

    // Si ya hay un clima cargado, refrescar la temperatura en pantalla
    if (this.climaActual) {
      this.ui.renderizarClima(this.climaActual, this.unidad);
    }
  }
}

// Punto de entrada: inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Weather Dashboard inicializado.');
    const app = new App();
    app.iniciar();
  });
}
