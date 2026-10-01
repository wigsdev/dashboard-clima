/**
 * Weather Dashboard — Servicio Meteorológico (API Service)
 * Implementación completa en T-06
 */

import { Clima } from '../models/Clima.js';

export class WeatherService {
  async buscarCoordenadas(ciudad) {
    const nombre = typeof ciudad === 'string' ? ciudad.trim() : '';

    if (!nombre) {
      throw new Error('Por favor, ingresa el nombre de una ciudad.');
    }

    try {
      // 1. El mensajero (fetch) va a buscar la ciudad. Usamos await para esperarlo.
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nombre)}&count=1&language=es&format=json`;

      let respuesta;

      try {
        respuesta = await fetch(url);
      } catch (error) {
        throw new Error('Sin conexión a internet. Verifica tu red.');
      }

      // 2. Validamos si la comunicación con el servidor fue exitosa
      if (!respuesta.ok) {
        throw new Error('Error al conectar con el servicio de coordenadas');
      }

      // 3. Abrimos el paquete que trajo el mensajero y lo convertimos a un objeto JavaScript
      const datos = await respuesta.json();

      // 4. Control de ciudad no encontrada (Cumpliendo el Criterio de Aceptación)
      if (!datos.results || datos.results.length === 0) {
        throw new Error(`No se encontró la ciudad: "${nombre}". Verifica la ortografía.`);
      }

      // 5. Extraemos el primer resultado de la lista
      const ubicacion = datos.results[0];

      // Retornamos solo lo que nos importa
      return {
        lat: ubicacion.latitude,
        lon: ubicacion.longitude,
        nombre: ubicacion.name,
        pais: ubicacion.country,
      };
    } catch (error) {
      // Si algo falla, el catch atrapa el error para que la página no se congele
      console.error('Error en buscarCoordenadas:', error);
      throw error; // Lanzamos el error hacia arriba para que el Jefe de operaciones se entere
    }
  }

  async obtenerClima(lat, lon) {
    try {
      // 1. Armamos la dirección exacta con las coordenadas y los datos específicos que pide tu tarea
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;

      // 2. Despachamos al mensajero y ponemos el freno de mano (await)
      const respuesta = await fetch(url);

      // 3. Revisamos si el servidor del clima nos atendió bien
      if (!respuesta.ok) {
        throw new Error('Error al obtener los datos meteorológicos');
      }

      // 4. Abrimos el paquete (usando el método .json()) y esperamos a que se convierta
      const datos = await respuesta.json();

      // 5. Extraemos el bloque del clima actual (es una propiedad que Open-Meteo llama 'current')
      const climaActual = datos.current;

      // 6. ¡AQUÍ USAMOS EL MODELO! Traducimos el código WMO a condición e ícono oficial
      const infoWmo = Clima.mapearWMO(climaActual.weather_code);

      // 7. Empacamos solo lo que nos sirve en un objeto limpio y lo retornamos
      return {
        temperatura: climaActual.temperature_2m,
        sensacionTermica: climaActual.apparent_temperature,
        humedad: climaActual.relative_humidity_2m,
        viento: climaActual.wind_speed_10m,
        condicion: infoWmo.condicion,
        icono: infoWmo.icono,
        codigoWmo: climaActual.weather_code,
      };
    } catch (error) {
      console.error('Error en obtenerClima:', error);
      throw error;
    }
  }

  async consultarClima(ciudad) {
    try {
      // 1. El jefe le ordena al primer método que busque las coordenadas y lo espera (await)
      const ubicacion = await this.buscarCoordenadas(ciudad);

      // 2. Con las coordenadas en mano, el jefe le ordena al segundo método traer el clima y lo espera
      const datosClima = await this.obtenerClima(ubicacion.lat, ubicacion.lon);

      // 3. El jefe junta la información de ambos métodos y crea una instancia oficial de tu clase Clima
      return new Clima({
        ciudad: ubicacion.nombre,
        pais: ubicacion.pais,
        temperatura: datosClima.temperatura,
        sensacionTermica: datosClima.sensacionTermica,
        humedad: datosClima.humedad,
        viento: datosClima.viento,
        condicion: datosClima.condicion,
        icono: datosClima.icono,
        codigoWmo: datosClima.codigoWmo,
      });
    } catch (error) {
      // Si cualquiera de los dos métodos falla (ej. la ciudad no existe), el error sube hasta aquí
      console.error('Error en consultarClima:', error);
      throw error; // Se lanza por última vez para que app.js lo muestre en la pantalla
    }
  }
}
