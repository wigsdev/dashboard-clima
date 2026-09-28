
export class Historial {
	constructor(limite = 8) { // Si el limite no me da ningun valor numerico usamos el 8 como valor por defecto
		this._ciudades=[]
		this._limite= limite
	}
	agregarCiudad(lugar){
		// Eliminamos los espacios en blanco del lugar
		const lugarLimpio = lugar.trim()
		// Eliminamos los que son repetidos dentro de los 8 
		this._ciudades = this._ciudades.filter(
     	(item) => item.toLowerCase() !== ciudadLimpia.toLowerCase()
    	);
		// Lo insertamos en primer item como si fuera una pila
		this._ciudades.unshift(lugarLimpio)
		// Controlamos que el cuadro siempre tenga 8 
		if(this._ciudades.length > this._limite){
			this._ciudades.pop()
		}
	}
	borrarCiudad(lugar){
		// aplicamos de manera directa el metodo 
		this._ciudades=this._ciudades.filter(
		(item)=>item.toLowerCase() !== lugar.toLowerCase()
    	)
	}
	limpiarCuidades() {
	// se borra el historial
    this._ciudades = [];
   }
   obtenerCuidades(){
	return[...this._ciudades] // se pone entre corchetes para no darle el arreglo original ya si poner modificarlo a pesar que este en privado
   }
   // ponermos la función para que solo se vea con la palabra reservada get y así no sea manipulado
   get total() {
    return this._ciudades.length;
  }

}


