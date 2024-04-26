"use server"

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers'



export async function createproducto(producto){
    //validar los datos
    /*
    Si hay errores retornarlos
    return{
        success: false,
        message: Ingresa los datos correctamente,
        errors: errorList,
    }
    */
    //mandar a guardar los datos en la BD
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
    .from('producto')
    .insert([
    producto
    ])
    .select()

    //retornar respuesta del resultado de la acción
    if(error){
        return{
            success: false,
            message: `Ocurrió un error al guardar al colaborador. ${error.message}`,
            errors:null,
        }
    }
    return{
        success: true,
        message: `El colaborador se ha guardado`,
        errors:null,
    }
}

export async function getproductoById(id){
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {data, error} = await supabase
    .from('producto')
    .select()
    .eq("id", id)
    .single();

    return{
        producto:data,
        error,
    };
}

export async function updateproducto(producto){
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {data, error} = await supabase
        .from('producto')
        .update({
            ...producto
        })
        .eq('id', producto.id) 
        .single();

    return {
        producto: data,
        error
    };
}

import React from 'react';

const CardCarousel = ({ images }) => {
  return (
    <div className="flex items-center justify-center">
      {images.map((image, index) => (
        <div key={index} className="max-w-sm mx-2">
          <img src={image.original} alt={`carousel-${index}`} className="w-full h-48 object-cover rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default CardCarousel;



/*"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function createproducto(producto){
    //validar los datos
    /*
    Si hay errores retornarlos
    return{
        success: false,
        message: `Ingresa los datos correctamente`,
        errors: errorList,
    }
    
    //mandar a guardar los datos en la BD
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
    .from('producto')
    .insert([
    producto
    ])
    .select()

    //retornar respuesta del resultado de la acción
    if(error){
        return{
            success: false,
            message: `Ocurrió un error al guardar el producto. ${error.message}`,
            errors:null,
        }
    }
    return{
        success: true,
        message: `el productoo se ha guardado`,
        errors:null,
    }
}
*/