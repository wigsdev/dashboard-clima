/**
 * Weather Dashboard — Entrada Principal (App)
 * Tarea T-08 y T-10: Orquesta los eventos del usuario, estados de red, peticiones a la API y actualización del DOM.
 */

import { WeatherService } from './services/WeatherService.js';
import { Historial } from './models/Historial.js';
import { DomRenderer } from './ui/DomRenderer.js';

const MENSAJE_OFFLINE = 'Sin conexión a internet. Verifica tu red.';

export class App {
  constructor() {
    this.weatherService = new WeatherService();
    this.historial = new Historial();
    this.ui = new DomRenderer();

    this.climaActual = null;
    this.cargando = false; // T-10: Evita spam de peticiones simultáneas
    this.unidad = localStorage.getItem('weather_dashboard_unit') || 'C';
  }

  // 1. Inicializa la aplicación y registra los eventos
  iniciar() {
    this.configurarEventos();
    this.configurarEventosDeRed();
    this.cargarEstadoInicial();
  }

  // 2. Cargar el historial guardado y el selector de unidades
  cargarEstadoInicial() {
    const ciudades = this.historial.obtenerTodas();
    this.ui.renderizarHistorial(ciudades);
    this.ui.renderizarSelectorUnidades(this.unidad, (nuevaUnidad) => {
      this.cambiarUnidad(nuevaUnidad);
    });

    const ciudadInicial = ciudades.length > 0 ? ciudades[0] : 'Lima';
    this.buscar(ciudadInicial);
  }

  // 3. Registra los escuchadores de eventos del usuario
  configurarEventos() {
    // 3.1 Envío del formulario de búsqueda (botón o tecla Enter)
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
        if (!botonChip) return;

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
        if (this.historial.total === 0) return;

        this.historial.limpiar();
        this.ui.renderizarHistorial(this.historial.obtenerTodas());
        this.ui.mostrarToast('Historial vaciado.', 'info');
      });
    }
  }

  // 3.5 T-10: Avisos en vivo cuando el navegador pierde o recupera la conexión
  configurarEventosDeRed() {
    window.addEventListener('offline', () => {
      this.ui.mostrarToast(MENSAJE_OFFLINE, 'warning');
    });
    window.addEventListener('online', () => {
      this.ui.mostrarToast('Conexión restablecida.', 'success');
    });
  }

  // 4. Realiza la búsqueda asíncrona de clima de una ciudad (con control robusto T-10)
  async buscar(nombreCiudad) {
    const ciudad = (nombreCiudad || '').trim();

    // 4.1 Validación preventiva: no consultar si el campo está vacío
    if (!ciudad) {
      this.ui.mostrarFeedbackBusqueda('Por favor, ingresa el nombre de una ciudad.');
      if (this.ui.searchInput) this.ui.searchInput.focus();
      return;
    }

    // 4.2 T-10: Evita spam de peticiones si ya hay una en curso
    if (this.cargando) return;

    this.ui.mostrarFeedbackBusqueda('');
    this.ui.ocultarError();

    // 4.3 T-10: Detección proactiva de desconexión sin hacer petición HTTP
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      this.climaActual = null;
      this.ui.mostrarError(MENSAJE_OFFLINE);
      return;
    }

    this.cargando = true;

    try {
      // Activar indicador visual de carga (bloquea botón e input)
      this.ui.mostrarCargando(true);

      // Petición asíncrona al servicio meteorológico
      const datosClima = await this.weatherService.consultarClima(ciudad);
      this.climaActual = datosClima;

      // Renderizar datos del clima en la tarjeta
      this.ui.renderizarClima(datosClima, this.unidad);

      // Guardar ciudad en el historial y actualizar la lista en pantalla
      this.historial.agregar(datosClima.ciudad);
      this.ui.renderizarHistorial(this.historial.obtenerTodas());

      // Notificación toast de éxito
      this.ui.mostrarToast(
        `Clima cargado para ${datosClima.obtenerUbicacionCompleta()}`,
        'success'
      );
    } catch (error) {
      // T-10: Oculta la tarjeta previa y muestra el error amigable
      this.climaActual = null;
      this.ui.mostrarError(error.message || 'Ocurrió un error inesperado. Inténtalo nuevamente.');
    } finally {
      // T-10: Garantiza que el spinner se apague y el botón se reactive siempre
      this.cargando = false;
      this.ui.mostrarCargando(false);
    }
  }

  // 5. Conmuta la unidad de medida (°C / °F)
  cambiarUnidad(nuevaUnidad) {
    if (this.unidad === nuevaUnidad) return;

    this.unidad = nuevaUnidad;
    localStorage.setItem('weather_dashboard_unit', nuevaUnidad);

    this.ui.renderizarSelectorUnidades(this.unidad, (u) => {
      this.cambiarUnidad(u);
    });

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
