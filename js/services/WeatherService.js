/**
 * Weather Dashboard — Servicio Meteorológico (API Service)
 * Tareas T-06 y T-10: consumo de Open-Meteo con gestión diferenciada de errores.
 */
import { Clima } from '../models/Clima.js';

const URL_GEOCODING = 'https://geocoding-api.open-meteo.com/v1/search';
const URL_FORECAST = 'https://api.open-meteo.com/v1/forecast';
const TIMEOUT_MS = 10000;

export const MENSAJES = Object.freeze({
  OFFLINE: 'Sin conexión a internet. Verifica tu red',
  TIMEOUT: 'La consulta tardó demasiado en responder. Inténtalo de nuevo en unos segundos',
  API: 'El servicio meteorológico no está disponible en este momento. Inténtalo más tarde',
  DESCONOCIDO: 'Ocurrió un error inesperado. Inténtalo nuevamente',
  noEncontrada: (ciudad) => `No se encontraron resultados para la ciudad '${ciudad}'`,
});

export class WeatherError extends Error {
  constructor(tipo, mensaje) {
    super(mensaje);
    this.name = 'WeatherError';
    this.tipo = tipo;
  }
}

const WMO = Object.freeze({
  0: { condicion: 'Cielo despejado', icono: '☀️' },
  1: { condicion: 'Mayormente despejado', icono: '🌤️' },
  2: { condicion: 'Parcialmente nublado', icono: '⛅' },
  3: { condicion: 'Nublado', icono: '☁️' },
  45: { condicion: 'Niebla', icono: '🌫️' },
  48: { condicion: 'Niebla con escarcha', icono: '🌫️' },
  51: { condicion: 'Llovizna ligera', icono: '🌧️' },
  53: { condicion: 'Llovizna moderada', icono: '🌧️' },
  55: { condicion: 'Llovizna densa', icono: '🌧️' },
  61: { condicion: 'Lluvia ligera', icono: '🌧️' },
  63: { condicion: 'Lluvia moderada', icono: '🌧️' },
  65: { condicion: 'Lluvia intensa', icono: '⛈️' },
  71: { condicion: 'Nieve ligera', icono: '❄️' },
  73: { condicion: 'Nieve moderada', icono: '❄️' },
  75: { condicion: 'Nieve fuerte', icono: '❄️' },
  80: { condicion: 'Chubascos ligeros', icono: '🌦️' },
  81: { condicion: 'Chubascos moderados', icono: '🌦️' },
  82: { condicion: 'Chubascos violentos', icono: '⛈️' },
  95: { condicion: 'Tormenta eléctrica', icono: '⛈️' },
  96: { condicion: 'Tormenta con granizo', icono: '⛈️' },
  99: { condicion: 'Tormenta con granizo fuerte', icono: '⛈️' },
});

const WMO_DESCONOCIDO = Object.freeze({ condicion: 'Condición no disponible', icono: '🌡️' });

export class WeatherService {
  /** @returns {boolean} false solo si el navegador reporta que no hay red. */
  estaOnline() {
    return typeof navigator === 'undefined' || navigator.onLine !== false;
  }

  obtenerCondicionWmo(codigo) {
    return WMO[codigo] ?? WMO_DESCONOCIDO;
  }

  async _obtenerJson(url) {
    if (!this.estaOnline()) {
      throw new WeatherError('OFFLINE', MENSAJES.OFFLINE);
    }

    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_MS);

    try {
      const respuesta = await fetch(url, { signal: controlador.signal });
      if (!respuesta.ok) {
        throw new WeatherError('API', MENSAJES.API);
      }
      return await respuesta.json();
    } catch (error) {
      if (error instanceof WeatherError) throw error;
      if (error.name === 'AbortError') {
        throw new WeatherError('TIMEOUT', MENSAJES.TIMEOUT);
      }
      if (error instanceof TypeError) {
        throw new WeatherError('OFFLINE', MENSAJES.OFFLINE);
      }
      // JSON inválido u otro fallo de la respuesta
      throw new WeatherError('API', MENSAJES.API);
    } finally {
      clearTimeout(temporizador);
    }
  }

  async buscarCoordenadas(ciudad) {
    const url = `${URL_GEOCODING}?name=${encodeURIComponent(ciudad)}&count=1&language=es&format=json`;
    const datos = await this._obtenerJson(url);

    if (!Array.isArray(datos.results) || datos.results.length === 0) {
      throw new WeatherError('NOT_FOUND', MENSAJES.noEncontrada(ciudad));
    }

    const lugar = datos.results[0];
    return {
      nombre: lugar.name,
      pais: lugar.country ?? '',
      latitud: lugar.latitude,
      longitud: lugar.longitude,
    };
  }

  async obtenerPronostico(lat, lon) {
    const campos = [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
      'wind_speed_10m',
    ].join(',');
    const url = `${URL_FORECAST}?latitude=${lat}&longitude=${lon}&current=${campos}&timezone=auto`;
    const datos = await this._obtenerJson(url);

    if (!datos.current) {
      throw new WeatherError('API', MENSAJES.API);
    }
    return datos.current;
  }

  async consultarClima(ciudad) {
    const lugar = await this.buscarCoordenadas(ciudad);
    const actual = await this.obtenerPronostico(lugar.latitud, lugar.longitud);
    const { condicion, icono } = this.obtenerCondicionWmo(actual.weather_code);

    return new Clima({
      ciudad: lugar.nombre,
      pais: lugar.pais,
      temperatura: actual.temperature_2m,
      sensacionTermica: actual.apparent_temperature,
      humedad: actual.relative_humidity_2m,
      viento: actual.wind_speed_10m,
      condicion,
      icono,
      codigoWmo: actual.weather_code,
      fechaHora: new Date(),
    });
  }
}
