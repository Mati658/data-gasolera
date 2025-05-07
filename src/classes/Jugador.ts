export class Jugador {
  id!: number;
  nombre: string;
  apellido: string;
  puesto: string;
  numero: number;
  nacimiento: string;
  edad: number;
  lugarNacimiento: string;
  altura: string;
  peso: string;
  nacionalidad: string;
  imagen: string;

  constructor(
    nombre: string,
    apellido: string,
    puesto: string,
    numero: number,
    nacimiento: string,
    lugarNacimiento: string,
    altura: string,
    peso: string,
    nacionalidad: string,
    imagen: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.puesto = puesto;
    this.numero = numero;
    this.nacimiento = nacimiento;
    this.edad = this.CalcularEdad();
    this.lugarNacimiento = lugarNacimiento;
    this.altura = altura;
    this.peso = peso;
    this.nacionalidad = nacionalidad;
    this.imagen = imagen;
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
      numero: this.numero,
      nacimiento: this.nacimiento,
      edad: this.edad,
      lugarNacimiento: this.lugarNacimiento,
      altura: this.altura,
      peso: this.peso,
      nacionalidad: this.nacionalidad,
      imagen: this.imagen,
    };
  }
}
