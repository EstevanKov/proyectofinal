'use client'
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useRouter } from 'next/navigation';
import { getproductoById } from "../create/actions";
import ReactModal from 'react-modal';
import Slider from '../../../components/slider/Slider';


export default function Page() {
    const [productos, setProductos] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedProducto, setSelectedProducto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('producto').select();
            setProductos(data);
        }
        getData();
    }, []);

    const images = [
        {
            original: "https://laverdad.com.mx/wp-content/uploads/2020/10/20complejo.jpg",
            thumbnail: "https://laverdad.com.mx/wp-content/uploads/2020/10/20complejo.jpg",
            originalAlt:"Imagen 1",
            thumbnailAlt: "Imagen 1"
        },
        {
            original: "https://cdn.milenio.com/uploads/media/2021/04/02/complejo-regional-seguridad-publica-ciudad.jpg",
            thumbnail: "https://cdn.milenio.com/uploads/media/2021/04/02/complejo-regional-seguridad-publica-ciudad.jpg",
            originalAlt:"Imagen 2",
            thumbnailAlt: "Imagen 2"
        },
        {
            original: "https://www.sonora.gob.mx/images/2023/02/01/13_large.jpeg",
            thumbnail: "https://www.sonora.gob.mx/images/2023/02/01/13_large.jpeg",
            originalAlt:"Imagen 3",
            thumbnailAlt: "Imagen 3"
        },
    ];


    const productCard = (product) => (
        <div key={product.id} className="text-black w-[300px] h-[250] bg-slate-200 p-2 border rounded-lg" >
            <h2 className="font-bold text-lg text-black">{product.name}</h2>
            <p className="text-gray-700">Sexo: {product.price}</p>
            <p className="text-gray-700">Edad: {product.description}</p>
            <p className="text-gray-700">Cargo: {product.category}</p>
            <div className="flex justify-end mt-4">
                <button onClick={() => handleVer(product.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Ver</button>
                <button onClick={() => handleEdit(product.id)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">Editar</button>
                <button onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
            </div>
        </div>
    );

    const handleDetailsClick = async (productoId) => {
        try {
            const productoDetails = await getproductoById(productoId);
            setSelectedProducto(productoDetails.producto);
            setIsModalOpen(true);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleDelete = async (id) => {
        const confirmation = window.confirm("¿Estás seguro de que quieres eliminar este colaborador?");
        if (confirmation) {
            try {
                await supabase.from('producto').delete().eq('id', id);
                const updatedData = productos.filter(item => item.id !== id);
                setProductos(updatedData);
            } catch (error) {
                console.error('Error al eliminar el producto:', error.message);
            }
        }
    }

    const handleEdit = (id) => {
        const editUrl = `http://localhost:3000/products/edit/${id}`;
        window.location.href = editUrl;
    }

    const handleVer = (id) => {
        handleDetailsClick(id); // Llama a la función para abrir el modal
    }

    return (
        <div className='py-6 w-9/12'>
            <h1 className='font-bold text-center text-lg'>Empleados</h1>
            <form className='text-center mt-3' onSubmit={(e) => { e.preventDefault(); }}>
                <input placeholder='Buscar' className='border rounded px-2 text-black' defaultValue={search} onChange={(e) => setSearch(e.target.value)} />
                <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 ml-2 rounded">Buscar</button>
                <a href="http://localhost:3000/products/create" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 ml-2 rounded">
                    Agregar +
                </a>
            </form>
            <br />

            <div>
                <h1 className="text-xl font-bold mb-8">Slider de tarjetas</h1>
                <Slider
                    height={250}
                    cardWidth={300}
                    items={productos.map((product) => productCard(product))}
                    className="my-2 mx-2"
                />
            </div>

            <div>
                <h1 className="text-xl font-bold mb-8">Slider de tarjetas</h1>
                <Slider
                    height={250}
                    cardWidth={300}
                    items={productos.map((product) => productCard(product))}
                    className="my-2 mx-2"
                />
            </div>
            
            <div>
                <h1 className="text-xl font-bold mb-8">Slider de tarjetas</h1>
                <Slider
                    height={250}
                    cardWidth={300}
                    items={productos.map((product) => productCard(product))}
                    className="my-2 mx-2"
                />
            </div>
            <br />
            <div className='max-w-lg mx-auto'><ImageGallery items={images} /></div>



        </div>
    );
}


