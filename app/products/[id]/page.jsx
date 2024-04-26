"use client"
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { getproductoById } from "../create/actions";


import "react-image-gallery/styles/css/image-gallery.css";

export default function productoPage({ params }) {

  const [producto, setproducto] = useState(null);

  useEffect(()=>{
    const getData = async () => {
        const productoResult = await getproductoById(params.id);
        setproducto(productoResult.producto);
        if (productoResult.error) {
            alert(productoResult.error.message);
        } 
    };
    getData();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-8 justify-center items-center" >
      <p className="text-lg font-semibold mb-4  text-black">Información del Colaborador</p>
      <b className="block mb-2  text-black">Nombre: {producto?.name}</b>
      <b className="block mb-2  text-black">Sexo: {producto?.price}</b>
      <b className="block mb-2  text-black">Edad: {producto?.description}</b>
      <b className="block mb-2  text-black">Cargo: {producto?.category}</b>
      
      {producto ? (
        <ImageGallery items={producto.gallery} />
      ) : null}
   
 
                       
                        <a href="http://localhost:3000/products" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 ml-2 rounded mt-6  justify-center ">
                            Regresar
                        </a>
   
   
   
    </div>




  );
}
