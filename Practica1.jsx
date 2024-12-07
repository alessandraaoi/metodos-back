import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Practica1() {
  const formularioPost =  useRef()

  const formularioPut = useRef()
  const [alumnos, setAlumnos] = useState([]);

  // --------------- GET -------------------------
  let getAlumnos = async () => {
    let options = {
      method: 'get'
    }

    let peticion = await fetch ('http://localhost:3000', options)
    let datos = await peticion.json()
    setAlumnos(datos)
  }

  useEffect(()=> {
    getAlumnos()
  }, [])


  // --------------- DELETE ----------------------
  // ---------- NECESITAMOS ID -------------------
  let deleteAlumno = async ( _id ) => { 
     // _id = parametro de la función deleteAlumno

    let options = {
      method: 'delete'
    }

    let peticion = await fetch (`http://localhost:3000/alumnos/id/${_id}`, options)
    let datos = await peticion.json()
    setAlumnos(datos)

    console.log(_id);
  }

  // ---------------- POST (AÑADIR) --------------

  // 1. Evito el evento por defecto del form (Enviar datos)
  let postAlumno = async (e) => {
    e.preventDefault()

    // 2. Recogo los datos desde los 'name' de los inputs del form
    const { nombre, edad } = formularioPost.current
    
    // 3. Recogo el valor de los datos introducidos en los inputs
    let nuevoAlumno = { nombre : nombre.value, edad: edad.value}
    console.log(nuevoAlumno);
    
    let options = {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      // Body en post y put porque enviamos la información a través de body
      // Convierto la información a JSON
      body: JSON.stringify(nuevoAlumno)
    }

    let peticion = await fetch ('http://localhost:3000/alumnos', options)
    let datos = await peticion.json()
    setAlumnos(datos)
    
  }

  // ------------  PUT (AÑADIR) -------------------

  // parte 1 
  const leerAlumno = (_id) => {

    console.log(formularioPut.current);
    
    // Recoger datos del form
    const {id, nombre, edad} = formularioPut.current

    // Buscar datos/propiedades de esta _id
    // Busco el Alumno
    const buscar = alumnos.find(alumno => alumno._id === _id)
    console.log(buscar);
    
    // Guardar datos (Object)
    let nuevo = {id: id.value, nombre: nombre.value, edad: edad.value}
    console.log(nuevo);

    id.value = buscar._id
    nombre.value = buscar.nombre
    edad.value = buscar.edad

  }

  // parte 2
  let putAlumno = async (e) => {
    e.preventDefault()

    // Recogo informacion del form
    // {... inputs...}
    const {id, nombre, edad} = formularioPut.current

    const nuevo = {_id: id.value, nombre: nombre.value, edad: edad.value}
  

    let options = {
      method: 'PUT',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(nuevo) }

     let peticion = await fetch ('http://localhost:3000/alumnos', options)
     let datos = await peticion.json()
     setAlumnos(datos) 
    

  }


  return (
    <div>
        <h1>Alumnos</h1>

    <ul>
      {alumnos.length == 0 && <li>No hay alumnos</li>}
      {alumnos.length != 0 && alumnos.map (alumno => 
        <li key = {alumno._id}>
          <span>{alumno.nombre}</span>
          <button onClick = { () => leerAlumno(alumno._id)} >Actualizar</button>

          {/* El botón recibe el parametro alumno._id cuando hago click */}
          <button onClick={ () => deleteAlumno(alumno._id)}>Eliminar</button>
          </li>
      
      )}
      
    </ul>

    <br></br><br></br>

    {/* ------------ FORM PARA AÑADIR ------- */}
    <form onSubmit={ postAlumno } ref={formularioPost}>
      <input type="text" name="nombre" placeholder='nombre'/>
      <input type="number" name="edad" placeholder='edad'/>
      <input type="submit" value='Añadir alumno' />
    </form>

    <br></br><br></br>
      
    {/* ------------ FORM PARA ACTUALIZAR ------- */}
    <form onSubmit = {putAlumno} ref={formularioPut}>
      <input type="text" name = 'id' placeholder='idInput' />
      <input type="text" name = 'nombre' placeholder='Nombre' />
      <input type="number" name = 'edad' placeholder='Edad' />
      <input type="submit" value = 'Actualizar Alumno' />
    </form>

    </div>
  )
}

export default Practica1
