'use client'

import { useEffect, useState } from "react";
import { getproductoById, updateproducto } from "../../create/actions";

export default function Editproducto({ params }) {
    // Estado para el producto y para los campos del formulario
    const [producto, setProducto] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});

    // Al cargar la vista, manda a leer los datos del producto por ID
    useEffect(() => {
        const getData = async () => {
            const productoResult = await getproductoById(params.id);
            setProducto(productoResult.producto);
            if (productoResult.error) {
                alert(productoResult.error.message);
            } else {
                // Establecer los valores iniciales de los campos del formulario
                setName(productoResult.producto.name || '');
                setDescription(productoResult.producto.description || '');
                setPrice(productoResult.producto.price || '');
                setCategory(productoResult.producto.category || '');
            }
        };
        getData();
    }, [params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar los datos antes de enviarlos
        const validationErrors = {};
        if (!name.trim()) {
            validationErrors.name = 'El nombre es requerido';
        }
        if (!description.trim()) {
            validationErrors.description = 'La edad es requerida';
        }
        if (!price.trim()) {
            validationErrors.price = 'El sexo es requerido';
        }
        if (!category.trim()) {
            validationErrors.category = 'El cargo es requerido';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Actualizar el producto
        const updatedProducto = {
            id: producto.id,
            name,
            description,
            price,
            category
        };

        const updateResult = await updateproducto(updatedProducto);
        if (updateResult.error) {
            alert(updateResult.error.message);
        } else {
            alert('El colaboradpr se ha actualizado correctamente');
            // Actualizar el estado del producto para reflejar los cambios en la UI
            setProducto(updatedProducto);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {producto && (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-white">Nombre</label>
                            <input name="name" value={name} className="text-black border border-gray-500 rounded p-2"
                                onChange={(e) => setName(e.target.value)} />
                            {errors.name && <span className="text-red-500">{errors.name}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-white">Edad</label>
                            <input name="description" value={description} className="text-black border border-gray-500 rounded p-2"
                                onChange={(e) => setDescription(e.target.value)} />
                            {errors.description && <span className="text-red-500">{errors.description}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-white">Sexo</label>
                            <input name="price" value={price} className="text-black border border-gray-500 rounded p-2"
                                onChange={(e) => setPrice(e.target.value)} />
                            {errors.price && <span className="text-red-500">{errors.price}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-white">Cargo</label>
                            <input name="category" value={category} className="text-black border border-gray-500 rounded p-2"
                                onChange={(e) => setCategory(e.target.value)} />
                            {errors.category && <span className="text-red-500">{errors.category}</span>}
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 ml-2 rounded">Actualizar Colaborador</button>
                        <a href="http://localhost:3000/products" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 ml-2 rounded">
                            Regresar
                        </a>

                    </div>
                </form>
            )}
        </div>
    );
}
