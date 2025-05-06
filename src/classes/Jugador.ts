export class Jugador {
  nombre: string;
  apellido: string;
  puesto: string;
  numero: number;
  nacimiento: string;
  edad: number; //hacer que se calcule automaticamente
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
    return 0;
  }
}
