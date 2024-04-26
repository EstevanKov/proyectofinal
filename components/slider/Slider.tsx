import React from 'react';
import Card from './Card';





interface SliderProps {
  items: any[]; // Puedes especificar el tipo de los elementos dentro de items, por ejemplo, string[], number[], o cualquier tipo específico
  height: number;
  cardWidth: number;
  className?: string; // className es opcional, por lo que se usa `?`
}

// Define el componente Slider utilizando la interfaz SliderProps
export default function Slider({
  items,
  height,
  cardWidth,
  className,
}: SliderProps) {
  function itemCard(item: any, index: number): any {
    throw new Error('Function not implemented.');
  }

  return (
    <div className={`slider ${className}`} style={{ height }}>
      {items.map((item, index) => (
        <div key={index} style={{ width: cardWidth }}>
          { <div
    
    className={`overflow-x-auto relative h-[250px] ${className}`}
         style={{height: `${height}px`}}>
        { items?.map((item, index) => itemCard(item, index))}
    </div>}
          {item}
        </div>
      ))}
    </div>
  );
}







