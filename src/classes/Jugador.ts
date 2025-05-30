export class Jugador {
  id!: number;
  nombre: string;
  apellido: string;
  puesto: string;
  nacimiento: string;
  nacimientoSinFormatear: string;
  edad: number;
  lugarNacimiento: string;
  altura: string;
  peso: string;
  nacionalidad: string;
  imagen: string;
  datos: {};
  imagen_version: number;

  constructor(
    nombre: string,
    apellido: string,
    puesto: string,
    nacimiento: string,
    lugarNacimiento: string,
    altura: string,
    peso: string,
    nacionalidad: string,
    imagen: string,
    datos: {}
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.puesto = puesto;
    this.nacimiento = nacimiento;
    this.nacimientoSinFormatear = nacimiento;
    this.edad = this.CalcularEdad();
    this.lugarNacimiento = lugarNacimiento;
    this.altura = altura;
    this.peso = peso;
    this.nacionalidad = nacionalidad;
    this.imagen = imagen;
    this.datos = datos;
    this.imagen_version = Date.now();
  }

  CalcularEdad() {
    const hoy = new Date();
    const fechaNacimiento = new Date(this.nacimiento);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    this.formatearFecha();
    return edad;
  }

  formatearFecha() {
    const [año, mes, dia] = this.nacimiento.split("-").map(Number);
    const fecha = new Date(año, mes - 1, dia);
    const opciones: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formateado = fecha.toLocaleDateString("es-ES", opciones);
    this.nacimiento = formateado.charAt(0).toUpperCase() + formateado.slice(1);
  }

  toJson() {
    return {
      nombre: this.nombre,
      apellido: this.apellido,
      puesto: this.puesto,
      nacimiento: this.nacimiento,
      nacimientoSinFormatear: this.nacimientoSinFormatear,
      edad: this.edad,
      lugarNacimiento: this.lugarNacimiento,
      altura: this.altura,
      peso: this.peso,
      nacionalidad: this.nacionalidad,
      imagen: this.imagen,
      datos: this.datos,
      imagen_version: this.imagen_version,
    };
  }
}
