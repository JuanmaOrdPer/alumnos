
function ListaAsignaturas({item}) {
    
      return (
        <div>
          <ul>
            {item.map((asignatura, index)=> (
              <li key={index}>
                {asignatura.nombre}: {asignatura.nota}
              </li>
            ))}
          </ul>
        </div>
      )
    };
    

export default ListaAsignaturas;