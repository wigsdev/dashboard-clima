export class Historial {
    constructor(limite = 8) { // Si el limite no me da ningun valor numerico usamos el 8 como valor por defecto
        this._ciudades = [];
        this._limite = limite;
        // Nombre de la llave que usaremos más adelante para guardar los datos en la memoria del navegador (localStorage)
        this.storageKey = 'weather_dashboard_history';
        // carga los datos antes de empezar
        this.cargarDeStorage();
    }

    cargarDeStorage() {
        // Se esta guardando con el get los lugares que fueron vistados
        const datosGuardados = localStorage.getItem(this.storageKey);
        if (datosGuardados) {
            // y acá el texto lo vuelvo un arrglo
            this._ciudades = JSON.parse(datosGuardados);
        }
    }

    guardarEnStorage() {
        // JSON.stringify transforma el arreglo a texto para poder guardarlo
        localStorage.setItem(this.storageKey, JSON.stringify(this._ciudades));
    }

    agregar(ciudad) {
        // Validación de seguridad para que no agreguen cadenas vacías (Punto 1)
        if (!ciudad || ciudad.trim() === "") return;

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
        this._ciudades = this._ciudades.filter(
            (item) => item.toLowerCase() !== ciudad.toLowerCase()
        );
        // Guardamos 
        this.guardarEnStorage();
    }

    limpiar() {
        this._ciudades = [];
        // Borra el historial 
        localStorage.removeItem(this.storageKey);
    }

    obtenerTodas() {
        return [...this._ciudades];
    }

    get total() {
        return this._ciudades.length;
    }
}


