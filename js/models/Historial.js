export class Historial {
  constructor(limite = 5) {
    // Si el limite no me da ningun valor numerico usamos el 5 como valor por defecto
    this._ciudades = [];
    this._limite = limite;
    // Nombre de la llave que usaremos más adelante para guardar los datos en la memoria del navegador (localStorage)
    this.storageKey = 'weather_dashboard_history';
    // carga los datos antes de empezar
    this.cargarDeStorage();
  }

  cargarDeStorage() {
    try {
      // Se esta guardando con el get los lugares que fueron vistados
      const datosGuardados = localStorage.getItem(this.storageKey);
      if (datosGuardados) {
        const ciudades = JSON.parse(datosGuardados);
        if (Array.isArray(ciudades)) {
          this._ciudades = ciudades.slice(0, this._limite);
        }
      }
    } catch (error) {
      this._ciudades = [];
      console.error('No se pudo Cargar el historial: ', error);
    }
  }

  guardarEnStorage() {
    try {
      // JSON.stringify transforma el arreglo a texto para poder guardarlo
      localStorage.setItem(this.storageKey, JSON.stringify(this._ciudades));
    } catch (error) {
      console.error('No se pudo guardar el historial: ', error);
    }
  }

  agregar(ciudad) {
    // Validación de seguridad para que no agreguen cadenas vacías (Punto 1)
    if (!ciudad || ciudad.trim() === '') return;

    const ciudadLimpia = ciudad.trim();

    // Eliminar si ya existe
    this._ciudades = this._ciudades.filter(
      (item) => item.toLowerCase() !== ciudadLimpia.toLowerCase()
    );

    // Agregar al inicio
    this._ciudades.unshift(ciudadLimpia);

    // Controlar el límite
    if (this._ciudades.length > this._limite) {
      this._ciudades.pop();
    }

    // Guardar los cambios en el navegador
    this.guardarEnStorage();
  }

  eliminar(ciudad) {
    // aplicamos de manera directa el metodo
    this._ciudades = this._ciudades.filter((item) => item.toLowerCase() !== ciudad.toLowerCase());
    // Guardamos
    this.guardarEnStorage();
  }

  limpiar() {
    this._ciudades = [];
    try {
      // Borra el historial
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('No se pudo eliminar el historial: ', error);
    }
  }

  obtenerTodas() {
    return [...this._ciudades];
  }

  get total() {
    return this._ciudades.length;
  }
}
