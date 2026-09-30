import { Clima } from '../models/Clima.js';

export class WeatherService {
  constructor() {
    this.wmoCodes = {
      0: { descripcion: 'Despejado', icono: 'assets/icons/weather/clear.svg' },
      1: {
        descripcion: 'Mayormente despejado',
        icono: 'assets/icons/weather/partly-cloudy.svg',
      },
      2: {
        descripcion: 'Parcialmente nublado',
        icono: 'assets/icons/weather/partly-cloudy.svg',
      },
      3: { descripcion: 'Nublado', icono: 'assets/icons/weather/cloudy.svg' },
      45: { descripcion: 'Niebla', icono: 'assets/icons/weather/fog.svg' },
      48: {
        descripcion: 'Niebla escarchada',
        icono: 'assets/icons/weather/fog.svg',
      },
      51: {
        descripcion: 'Llovizna ligera',
        icono: 'assets/icons/weather/drizzle.svg',
      },
      53: {
        descripcion: 'Llovizna moderada',
        icono: 'assets/icons/weather/drizzle.svg',
      },
      55: {
        descripcion: 'Llovizna densa',
        icono: 'assets/icons/weather/drizzle.svg',
      },
      61: {
        descripcion: 'Lluvia ligera',
        icono: 'assets/icons/weather/rain.svg',
      },
      63: {
        descripcion: 'Lluvia moderada',
        icono: 'assets/icons/weather/rain.svg',
      },
      65: {
        descripcion: 'Lluvia fuerte',
        icono: 'assets/icons/weather/rain.svg',
      },
      71: {
        descripcion: 'Nieve ligera',
        icono: 'assets/icons/weather/snow.svg',
      },
      73: {
        descripcion: 'Nieve moderada',
        icono: 'assets/icons/weather/snow.svg',
      },
      75: {
        descripcion: 'Nieve fuerte',
        icono: 'assets/icons/weather/snow.svg',
      },
      80: {
        descripcion: 'Chubascos ligeros',
        icono: 'assets/icons/weather/showers.svg',
      },
      81: {
        descripcion: 'Chubascos moderados',
        icono: 'assets/icons/weather/showers.svg',
      },
      82: {
        descripcion: 'Chubascos violentos',
        icono: 'assets/icons/weather/showers.svg',
      },
      95: {
        descripcion: 'Tormenta',
        icono: 'assets/icons/weather/thunderstorm.svg',
      },
      96: {
        descripcion: 'Tormenta con granizo ligero',
        icono: 'assets/icons/weather/thunderstorm.svg',
      },
      99: {
        descripcion: 'Tormenta con granizo fuerte',
        icono: 'assets/icons/weather/thunderstorm.svg',
      },
    };
  }

  async buscarCoordenadas(ciudad) {
    try {
      // 1. El mensajero (fetch) va a buscar la ciudad. Usamos await para esperarlo.
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${ciudad}&count=1&language=es`;
      const respuesta = await fetch(url);

      // 2. Validamos si la comunicación con el servidor fue exitosa
      if (!respuesta.ok) {
        throw new Error('Error al conectar con el servicio de coordenadas');
      }

      // 3. Abrimos el paquete que trajo el mensajero y lo convertimos a un objeto JavaScript
      const datos = await respuesta.json();

      // 4. Control de ciudad no encontrada (Cumpliendo el Criterio de Aceptación)
      if (!datos.results || datos.results.length === 0) {
        throw new Error(`No se encontró la ciudad: ${ciudad}`);
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
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

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

      // 6. ¡AQUÍ USAMOS EL DICCIONARIO! Traducimos el código WMO a texto e ícono
      // Si la API nos manda un código raro que no pusimos, le ponemos un valor por defecto (||)
      const traduccionClima = this.wmoCodes[climaActual.weather_code] || {
        descripcion: 'Desconocido',
        icono: 'assets/icons/weather/clear.svg',
      };

      // 7. Empacamos solo lo que nos sirve en un objeto limpio y lo retornamos
      return {
        temperatura: climaActual.temperature_2m,
        humedad: climaActual.relative_humidity_2m,
        viento: climaActual.wind_speed_10m,
        descripcion: traduccionClima.descripcion,
        icono: traduccionClima.icono,
      };
    } catch (error) {
      console.error('Error en obtenerClima:', error);
      throw error;
    }
  }

  async consultarCiudad(ciudad) {
    try {
      // 1. El jefe le ordena al primer método que busque las coordenadas y lo espera (await)
      const ubicacion = await this.buscarCoordenadas(ciudad);

      // 2. Con las coordenadas en mano, el jefe le ordena al segundo método traer el clima y lo espera
      const datosClima = await this.obtenerClima(ubicacion.lat, ubicacion.lon);

      // 3. El jefe junta la información de ambos métodos y crea una instancia oficial de tu clase Clima
      return new Clima(
        ubicacion.nombre,
        ubicacion.pais,
        datosClima.temperatura,
        datosClima.humedad,
        datosClima.viento,
        datosClima.descripcion,
        datosClima.icono
      );
    } catch (error) {
      // Si cualquiera de los dos métodos falla (ej. la ciudad no existe), el error sube hasta aquí
      console.error('Error en consultarCiudad:', error);
      throw error; // Se lanza por última vez para que app.js lo muestre en la pantalla
    }
  }
}
