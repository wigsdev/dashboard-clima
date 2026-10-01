/**
 * Weather Dashboard — Modelo Clima (POO)
 * Tarea T-04: encapsula el estado de los datos meteorológicos de una ciudad
 * y ofrece métodos de dominio para formateo y presentación.
 */

const UMBRAL_CALIDO_C = 24;

const UNIDADES = Object.freeze({ C: 'C', F: 'F' });

function normalizarUnidad(unidad) {
  const limpia = String(unidad ?? 'C')
    .replace('°', '')
    .trim()
    .toUpperCase();
  return limpia === UNIDADES.F ? UNIDADES.F : UNIDADES.C;
}

function celsiusAFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

export class Clima {
  constructor({
    ciudad,
    pais,
    temperatura,
    sensacionTermica,
    humedad,
    viento,
    condicion,
    icono,
    codigoWmo = 0,
    fechaHora = new Date(),
  } = {}) {
    this.ciudad = ciudad;
    this.pais = pais;
    this.temperatura = Math.round(temperatura);
    this.sensacionTermica = Math.round(sensacionTermica);
    this.humedad = Math.round(humedad);
    this.viento = Math.round(viento);
    this.condicion = condicion;
    this.icono = icono;
    this.codigoWmo = codigoWmo;
    this.fechaHora = fechaHora;
  }

  obtenerUbicacionCompleta() {
    return this.pais ? `${this.ciudad}, ${this.pais}` : `${this.ciudad}`;
  }

  obtenerTemperatura(unidad = 'C') {
    return normalizarUnidad(unidad) === UNIDADES.F
      ? celsiusAFahrenheit(this.temperatura)
      : this.temperatura;
  }

  obtenerSensacion(unidad = 'C') {
    return normalizarUnidad(unidad) === UNIDADES.F
      ? celsiusAFahrenheit(this.sensacionTermica)
      : this.sensacionTermica;
  }

  obtenerTemperaturaFormateada(unidad = 'C') {
    return `${this.obtenerTemperatura(unidad)}°${normalizarUnidad(unidad)}`;
  }

  obtenerSensacionFormateada(unidad = 'C') {
    return `${this.obtenerSensacion(unidad)}°${normalizarUnidad(unidad)}`;
  }

  esCalido() {
    return this.temperatura >= UMBRAL_CALIDO_C;
  }

  obtenerResumen(unidad = 'C') {
    const ambiente = this.esCalido() ? 'Ambiente cálido.' : 'Ambiente fresco.';
    return (
      `${this.obtenerUbicacionCompleta()}: ${this.condicion}, ` +
      `${this.obtenerTemperaturaFormateada(unidad)} ` +
      `(sensación ${this.obtenerSensacionFormateada(unidad)}). ` +
      `Humedad ${this.humedad} % y viento de ${this.viento} km/h. ${ambiente}`
    );
  }

  // Mapea el código numérico de la API a su descripción en español e icono SVG
  static mapearWMO(codigo) {
    const mapa = {
      0: { condicion: 'Cielo despejado', icono: 'assets/icons/weather/clear-day.svg' },
      1: { condicion: 'Mayormente despejado', icono: 'assets/icons/weather/clear-day.svg' },
      2: { condicion: 'Parcialmente nublado', icono: 'assets/icons/weather/partly-cloudy.svg' },
      3: { condicion: 'Nublado', icono: 'assets/icons/weather/cloudy.svg' },
      45: { condicion: 'Niebla', icono: 'assets/icons/weather/fog.svg' },
      48: { condicion: 'Niebla con escarcha', icono: 'assets/icons/weather/fog.svg' },
      51: { condicion: 'Llovizna ligera', icono: 'assets/icons/weather/drizzle.svg' },
      53: { condicion: 'Llovizna moderada', icono: 'assets/icons/weather/drizzle.svg' },
      55: { condicion: 'Llovizna densa', icono: 'assets/icons/weather/drizzle.svg' },
      61: { condicion: 'Lluvia ligera', icono: 'assets/icons/weather/rain.svg' },
      63: { condicion: 'Lluvia moderada', icono: 'assets/icons/weather/rain.svg' },
      65: { condicion: 'Lluvia fuerte', icono: 'assets/icons/weather/rain.svg' },
      71: { condicion: 'Nieve ligera', icono: 'assets/icons/weather/snow.svg' },
      73: { condicion: 'Nieve moderada', icono: 'assets/icons/weather/snow.svg' },
      75: { condicion: 'Nieve intensa', icono: 'assets/icons/weather/snow.svg' },
      77: { condicion: 'Granos de nieve', icono: 'assets/icons/weather/snow.svg' },
      80: { condicion: 'Chubascos ligeros', icono: 'assets/icons/weather/showers.svg' },
      81: { condicion: 'Chubascos moderados', icono: 'assets/icons/weather/showers.svg' },
      82: { condicion: 'Chubascos violentos', icono: 'assets/icons/weather/showers.svg' },
      95: { condicion: 'Tormenta eléctrica', icono: 'assets/icons/weather/thunderstorm.svg' },
      96: { condicion: 'Tormenta con granizo', icono: 'assets/icons/weather/thunderstorm.svg' },
      99: { condicion: 'Tormenta fuerte con granizo', icono: 'assets/icons/weather/thunderstorm.svg' },
    };

    return (
      mapa[codigo] || {
        condicion: 'Condición variable',
        icono: 'assets/icons/weather/partly-cloudy.svg',
      }
    );
  }
}

