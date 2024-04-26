'use client'
//implementar vista con el formulario para registrar producto
//name, price, description, category
import { useState } from 'react'
import { createproducto } from "./actions"

export default function Createproducto() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});

    function saveproducto(form) {
        form.preventDefault();

        let errorList = {};

        if (!name) {
            errorList.name = "El Nombre es obligatorio"
        }
        if (!price) {
            errorList.price = "La edad es obligatoria"
        }
        if (!description) {
            errorList.description = "El sexo es obligatorio";
        } else if (!description.match("^[0-9]+$")) {
            errorList.description = "La edad debe ser un número"
        }
        if (!category) {
            errorList.category = "El cargo es obligatorio"
        }

        if (Object.keys(errorList).length > 0) {
              console.error("Ocurrió un error");
              console.error("Fecha y Hora del Error: "+ new Date());
              console.error("FOLIO: 3312");
              console.error("mensaje = \"Falló la creación de un nuevo registro\";");
              console.error("Error en:", errorList);
            setErrors(errorList);
            return;
        }

        createproducto({
            name,
            description,
            price,
            category,
        })
        .then((result) => {
            console.log(result);
            alert(result.message);
        })
        .catch((error) => {
            console.log(error);
            alert(error.message);
        });
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="flex flex-col gap-4" onSubmit={saveproducto}>
                {/* Primera fila */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col">
                        <label className="text-white">Nombre</label>
                        <input name="name" placeholder="Nombre del colaborador" className="text-black border border-gray-500 rounded p-2"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setErrors({
                                    ...errors,
                                    name: '',
                                });
                            }} />
                        <p className='text-red-500'>{errors.name}</p>
                    </div>
                    <div className="flex flex-col">
                        <label>Edad</label>
                        <input name="description" placeholder="Edad del colaborador " className="text-black border border-gray-500 rounded p-2"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setErrors({
                                    ...errors,
                                    description: '',
                                })
                            }} />
                        <p className='text-red-500'>{errors.description}</p>
                    </div>
                    <div className="flex flex-col">
                        <label>Sexo</label>
                        <input name="price" placeholder="Sexo del colaborador" className="text-black border border-gray-500 rounded p-2"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                                setErrors({
                                    ...errors,
                                    price: '',
                                })
                            }} />
                        <p className='text-red-500'>{errors.price}</p>
                    </div>
                    <div className="flex flex-col">
                        <label>Cargo</label>
                        <input name="category" placeholder="Cargo del colaborador" className="text-black border border-gray-500 rounded p-2"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setErrors({
                                    ...errors,
                                    category: '',
                                })
                            }} />
                        <p className='text-red-500'>{errors.category}</p>
                    </div>
                </div>
                {/* Segunda fila */}
                <div className="flex justify-center items-center mt-4">
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded">Registrar Colaborador</button>
                    <a href="http://localhost:3000/products" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 ml-4 rounded">
                        Regresar
                    </a>
                </div>
            </form>
        </div>
    )
}