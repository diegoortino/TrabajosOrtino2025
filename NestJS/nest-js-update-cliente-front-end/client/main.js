const API_URL = 'http://localhost:3000/cliente';

let btnConsulta = document.getElementById("getId");
btnConsulta.addEventListener("click",obtenerCliente);

let btnEliminar = document.getElementById("deleteId");
btnEliminar.addEventListener("click",eliminarCliente);

let btnCrear = document.getElementById("createBtn");
btnCrear.addEventListener("click",crearCliente);

let btnActualizar = document.getElementById("updateBtn");
btnActualizar.addEventListener("click",actualizarCliente);

async function obtenerCliente(){
    const id = document.getElementById("getIdinput").value;
    const respuesta = await fetch(API_URL + "/" + id);
    const data = await respuesta.json();
    document.getElementById("getResult").textContent = JSON.stringify(data,null,2);
}

async function eliminarCliente(){
    const id = document.getElementById("inputDeleteId").value;
    try{
        const respuesta = await fetch(API_URL + "/" + id,
            {method:'DELETE'});
            if(!respuesta.ok){
                throw new Error("no se pudo eliminar al cliente");
            }
            const data = await respuesta.json();
            document.getElementById("deleteResult").innerHTML = "Cliente eliminado";
    }catch(error){
        console.log(error.message + " no se pudo eliminar el cliente");
    };
}

async function crearCliente(){
    const cliente = {
        nombre: document.getElementById("nombre").value,
        apellido:document.getElementById("apellido").value,
        direccion:document.getElementById("direccion").value,
        activo:document.getElementById("activo").value
    }

    try{
        const respuesta = await fetch(API_URL,
            { method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(cliente),
        });
        if(!respuesta.ok){
            throw new Error("no se pudo crear el cliente");
        }else{
            document.getElementById("createResult").innerHTML = "Cliente Creado!!";
        }
        }
        catch(error){
             document.getElementById("createResult").innerHTML = "Cliente NO SE PUDO CREAR!! "+error.message;
        }
}

async function actualizarCliente() {
    const id = document.getElementById("updateId").value;

    const cliente = {
        nombre: document.getElementById("updateNombre").value,
        apellido: document.getElementById("updateApellido").value,
        direccion: document.getElementById("updateDireccion").value,
        activo: parseInt(document.getElementById("updateActivo").value)
    };

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        });

        if (!res.ok) throw new Error("No se pudo actualizar el cliente");

        document.getElementById("updateResult").innerText = "Cliente actualizado correctamente";
    } catch (err) {
        document.getElementById("updateResult").innerText = "Error: " + err.message;
    }
}