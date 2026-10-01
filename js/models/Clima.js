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
}
