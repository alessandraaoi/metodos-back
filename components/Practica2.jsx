import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function Practica2() {

const referencia = useRef() 

const referenciaPut = useRef()

const [alumnos, setAlumnos] = useState([])

    
// ---------------------- GET --------------------

    let getAlumnos = async () => {

        let options = {method: 'GET'}

        let peticion = await fetch ('http://localhost:3000', options)
        let datos = await peticion.json()
        setAlumnos(datos)
    }

// ---------------- DELETE ----------------------

    let deleteAlumno = async (_id) => {

        let options = {method: 'DELETE'}

        let peticion = await fetch (`http://localhost:3000/alumnos/id/${_id}`, options)
        let datos = await peticion.json()
        setAlumnos(datos)

        console.log('Se ha cerrado sesión correctamente');
        
    }

// -------------- POST - AÑADIR -----------------

    let postAlumno = async (e)=> {
        e.preventDefault()
        console.log('POST OK');
        
        // console.log(referencia.current.nombre.value);
        // console.log(referencia.current.edad.value);

        const {nombre, edad} = referencia.current;
        // // input
        // console.log(nombre.value);
        // console.log(edad.value);

        // creo un Objetc nuevo Alumno
        let nuevo = {nombre: nombre.value, edad: edad.value}
        // console.log(nuevo);
        
        let options = {
            method: 'POST', 
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
              "Access-Control-Allow-Origin": "*",
              "Content-Type":"application/json"},
            body: JSON.stringify(nuevo)
        }

        let peticion = await fetch ('http://localhost:3000/alumnos', options)
        let datos = await peticion.json()
        setAlumnos(datos)

        referencia.current.reset()
    }

    useEffect( () => {
        getAlumnos()
    }, [])

// ------------- PUT - ACTUALIZAR --------------

// ------------- parte 1 -----------------------

    const rellenarForm = (_id) => {
        console.log('_id:', _id);

        // 1. React tiene que buscar toda la informaciíon relacionada con _id (GET)
        const buscar = alumnos.find (alumno => alumno._id === _id)
        console.log(buscar);

        const {idInput, nombre, edad} = referenciaPut.current;

        idInput.value = buscar._id
        nombre.value = buscar.nombre
        edad.value = buscar.edad
    }

// ------------ parte 2 ------------------------  

    let putAlumno = async (e) => {
        e.preventDefault()

        // Recogo datos del Form
        const {idInput, nombre, edad} = referenciaPut.current

        // Guardo los datos del Form en un Object 
        const nuevo = {_id: idInput.value, nombre: nombre.value, edad: edad.value}
        console.log((nuevo));

        // ------ fetch

        let options = {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(nuevo)
        }

        let peticion = await fetch ('http://localhost:3000/alumnos', options)
        let datos = await peticion.json()
        setAlumnos(datos)
        
    }





  return (

    <div>

        <h2>Practica 2</h2>

        <ul>
            {alumnos._id == 0 && <li> No hay alumnos </li>}
            {alumnos._id != 0 && alumnos.map (alumno => 
                <li key={alumno._id}>
                    <span>{alumno.nombre}</span>
                    <br></br>
                    <button type="button" onClick = { () => rellenarForm(alumno._id)}> Editar </button>
                    <button type="button" onClick={ () => deleteAlumno(alumno._id)}> Cerrar sesión </button>
                </li>
            )}
        </ul>

        <br></br><br></br><br></br><br></br>

{/* FORM: POST - AÑADIR */}
        <form onSubmit={postAlumno} ref={referencia}>
            <input type="text" name='nombre' placeholder='Nombre'/>
            <br></br>
            <input type="number" name='edad' placeholder='Edad'/>
            <br></br>
            <input type="submit" value = 'Añadir'/>
        </form>

        <br></br><br></br>

{/* FORM: PUT - ACTUALIZAR */}
        <form onSubmit = {putAlumno} ref={referenciaPut}>
            <input type="text" name = 'idInput' placeholder = '_id' />
            <input type="text" name = 'nombre' placeholder = 'Nombre' />
            <input type="text" name = 'edad' placeholder = 'Edad' />
            <input type="submit" value = 'Actualizar' />

        </form>
      
    </div>
  )
}

export default Practica2
