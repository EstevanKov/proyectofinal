'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'



import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useRouter } from 'next/navigation'





export default function Page() {
    const [producto, setproducto] = useState(null)
    const supabase = createClient()
    const router = useRouter()



    //estado para guardar el criterio de busqueda
    const [search, setSearch] = useState('');

    useEffect(() => {
        const getData = async () => {
            //verificar si tiene la sesion iniciada
            const{ data:{ session }} = await supabase.auth.getSession()

            //si no hay sesión
            if(!session) {
                //redireccionarlo al login
                router.push('/login')
            }
            //Pasar al estado los productos
            //por defal es un arreglo vacisooo
            const dataResult = await productList();
            //const { data } = await supabase.from('products').select()
            setProducts(dataResult.products|| []);
            if(dataResult.error){
                alert(dataResult.error.message);
            }
        }
        getData()
    }, [])

    const images = [
        {
            original: "https://laverdad.com.mx/wp-content/uploads/2020/10/20complejo.jpg",
            thumbnail: "https://laverdad.com.mx/wp-content/uploads/2020/10/20complejo.jpg",
        },
        {
          original: "https://cdn.milenio.com/uploads/media/2021/04/02/complejo-regional-seguridad-publica-ciudad.jpg",
          thumbnail: "https://cdn.milenio.com/uploads/media/2021/04/02/complejo-regional-seguridad-publica-ciudad.jpg",
        },
        {
          original: "https://www.sonora.gob.mx/images/2023/02/01/13_large.jpeg",
          thumbnail: "https://www.sonora.gob.mx/images/2023/02/01/13_large.jpeg",
        },
    ];







    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('producto').select()
            setproducto(data)
        }
        getData()
    }, [])

    //función buscar
    function handleSubmit(e) {
        //evitar enviar el formulario
        e.preventDefault();

        //ir a buscar
        const getData = async () => {
            const { data } = await supabase
                .from('producto')
                .select()
                .like('name', `%${search}%`);

            setproducto(data)
        }
        getData()
    }

    const handleDelete = async (id) => {
        const confirmation = window.confirm("¿Estás seguro de que quieres eliminar este colaborador?");
        if (confirmation) {
            try {
                // Elimina el producto con el ID proporcionado
                await supabase.from('producto').delete().eq('id', id);
                // Actualiza la lista de productos después de eliminar
                const updatedData = producto.filter(item => item.id !== id);
                setproducto(updatedData);
            } catch (error) {
                console.error('Error al eliminar el producto:', error.message);
            }
        }
    }

    const handleEdit = (id) => {
        // Construir la URL con el ID del producto
        const editUrl = `http://localhost:3000/products/edit/${id}`;
        // Redirigir al usuario a la URL de edición
        window.location.href = editUrl;
    }

    const handleVer = (id) => {
        const editUrl = `http://localhost:3000/products/${id}`;
        window.location.href = editUrl;
    }

    

    return (
        <div className='py-6'>
            

            <h1 className='font-bold text-center text-lg'>Empleados</h1>
            <form
                className='text-center mt-3'
                onSubmit={handleSubmit}>
                <input placeholder='Buscar'
                    className='border rounded px-2 text-black'
                    defaultValue={search}
                    onChange={(e) => {
                        setSearch(
                            e.target.value //el valor del input lo enviamos a search
                        );
                    }} />
                <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 ml-2 rounded">Buscar</button>
               
                <a href="http://localhost:3000/products/create" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 ml-2 rounded">
                    Agregar +
                </a>
           
            </form>

            <div style={{ overflowX: 'auto' }} className='py-6'>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#fff', color: '#000', textAlign: 'center' }}>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Sexo</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Edad</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cargo</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ver</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Editar</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {producto?.map((product) => (
                            <tr key={product.id} style={{ backgroundColor: '#000', color: '#fff', textAlign: 'center' }}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.id}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>{product.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.price}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.description}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.category}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {}
                                    <button onClick={() => handleVer(product.id)} id={`edit-${product.id}`} className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-2  rounded">Ver</button>
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {/* Botón de editar */}
                                    <button onClick={() => handleEdit(product.id)} id={`edit-${product.id}`} className="bg-gray-500 hover:bg-gray-700 text-white  py-2 px-2  rounded">Editar</button>
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {/* Botón de eliminar */}
                                    <button onClick={() => handleDelete(product.id)} id={`delete-${product.id}`} className="bg-red-500 hover:bg-red-700 text-white  py-2 px-2  rounded">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='max-w-lg mx-auto'><ImageGallery items={images} /></div>
        </div>
    );

}
