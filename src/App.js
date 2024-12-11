import React, { useState, useEffect } from 'react';
import './App.css';  // Asegúrate de tener un archivo de estilos

function App() {
  const [alumnos, setAlumnos] = useState([]);  // Alumnos cargados desde el JSON
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);  // Alumno seleccionado para ver los detalles
  const [terminoBusqueda, setTerminoBusqueda] = useState('');  // Término de búsqueda para filtrar alumnos
  const [criterioOrdenacion, setCriterioOrdenacion] = useState('nombre');  // Criterio de ordenación (por nombre o promedio)

  // Efecto que se ejecuta cuando el componente se monta para cargar los datos de los alumnos
  useEffect(() => {
    fetch('./alumnos.json')  // Cargar el archivo JSON con los datos de los alumnos
      .then((respuesta) => respuesta.json())  // Convertir la respuesta en formato JSON
      .then((datos) => setAlumnos(datos.alumnos));  // Almacenar los datos de los alumnos en el estado
  }, []);

  // Función que calcula el promedio general de un alumno
  const calcularPromedio = (asignaturas) => {
    let sumaPromedios = 0;
    let totalAsignaturas = 0;

    // Calcular el promedio de cada asignatura y sumarlo
    if (asignaturas["Acceso a datos"]) {
      sumaPromedios += asignaturas["Acceso a datos"].promedio;
      totalAsignaturas++;
    }
    if (asignaturas["Programación"]) {
      sumaPromedios += asignaturas["Programación"].promedio;
      totalAsignaturas++;
    }
    if (asignaturas["Desarrollo de Interfaces"]) {
      sumaPromedios += asignaturas["Desarrollo de Interfaces"].promedio;
      totalAsignaturas++;
    }

    // Calcular y devolver el promedio general
    return totalAsignaturas > 0 ? (sumaPromedios / totalAsignaturas).toFixed(2) : 0;
  };

  // Filtrar los alumnos que coinciden con el término de búsqueda
  const alumnosFiltrados = alumnos.filter((alumno) =>
    alumno.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())  // Comparar los nombres de los alumnos con el término de búsqueda
  );

  // Ordenar los alumnos según el criterio de ordenación seleccionado
  const alumnosOrdenados = [...alumnosFiltrados].sort((a, b) => {
    if (criterioOrdenacion === 'nombre') {
      return a.nombre.localeCompare(b.nombre);  // Ordenar por nombre
    }
    const promedioA = calcularPromedio(a.asignaturas);  // Calcular el promedio general del alumno A
    const promedioB = calcularPromedio(b.asignaturas);  // Calcular el promedio general del alumno B
    return promedioA - promedioB;  // Ordenar por promedio
  });

  // Manejar la selección/deselección de un alumno
  const toggleAlumnoSeleccionado = (alumno) => {
    // Si el alumno ya está seleccionado, lo deseleccionamos (cerramos su detalle)
    if (alumnoSeleccionado === alumno) {
      setAlumnoSeleccionado(null);
    } else {
      setAlumnoSeleccionado(alumno);
    }
  };

  return (
    <div className="App">
      <h1>Listado de Alumnos</h1>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar alumno"
        value={terminoBusqueda}
        onChange={(e) => setTerminoBusqueda(e.target.value)}  // Actualizar el término de búsqueda cuando se cambia el input
      />

      {/* Botones para ordenar */}
      <button onClick={() => setCriterioOrdenacion('nombre')}>Ordenar por Nombre</button>
      <button onClick={() => setCriterioOrdenacion('promedio')}>Ordenar por Promedio</button>

      {/* Lista de alumnos */}
      <ul>
        {alumnosOrdenados.map((alumno) => (
          <li key={alumno.nombre} onClick={() => toggleAlumnoSeleccionado(alumno)}>
            {alumno.nombre}
          </li>
        ))}
      </ul>

      {/* Detalles del alumno seleccionado */}
      {alumnoSeleccionado && (
        <div>
          <h2>{alumnoSeleccionado.nombre}</h2>
          <h3>Notas</h3>
          {/* Mostrar las notas de cada asignatura directamente */}
          <ul>
            <li>
              <strong>Acceso a datos:</strong> {alumnoSeleccionado.asignaturas["Acceso a datos"].promedio}
            </li>
            <li>
              <strong>Programación:</strong> {alumnoSeleccionado.asignaturas["Programación"].promedio}
            </li>
            <li>
              <strong>Desarrollo de Interfaces:</strong> {alumnoSeleccionado.asignaturas["Desarrollo de Interfaces"].promedio}
            </li>
          </ul>
          <p>Promedio General: {calcularPromedio(alumnoSeleccionado.asignaturas)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
