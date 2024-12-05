import { useEffect, useState } from "react";



function ListaAlumno({alumno}) {
    const [alumnos, setAlumno] = useState([]);

    const getAlumnos = async () => {
      const response = await fetch ('./alumnos.json');
      const data = await response.json();
      setAlumno(data.alumnos);
    }
    useEffect (() => {
      getAlumnos();
    },[]);

const pipe = (nombre)=>{
    return  alumnos.reduce(
        (promedio, currentValue, index) => currentValue.nombre === nombre?promedio:promedio +currentValue.promedio, 0);
    }

    
      return (
        <>
            <ul>
            {alumnos.map((alumno)=> (
                <li  key={alumno}>
              <ListaAlumno item={alumno}/>
              <button onClick={() => alert("Promedio" + pipe(alumno.nombre))}>Promedio</button>
              </li>
            ))}  
          </ul>
        </>
        
      )
    };
    

export default ListaAlumno;
