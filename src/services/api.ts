export const fetchDatos = async () => {
  const res = await fetch("");
  if (!res.ok) {
    throw new Error("Error al obtener los datos");
  }
  return await res.json();
};
