import React from 'react';
import Image from 'next/image';

const Card = ({ breed }) => {
  if (!breed || typeof breed !== 'object') {
    return null;
  }

  const { id, url } = breed;

  return (
      <div key={id} className='flex borde flex-row items-center justify-center'>
        <Image src={url} alt='hola' width={350} height={350} className='imagen' />
      </div>
  );
};

export default Card;



{/* <p><strong>NOMBRE: </strong>{name}</p>
        <p><strong>TAMAÑO: </strong>{bred_for}</p>
        <p><strong>ORIGEN: </strong>{origin}</p>
        <p><strong>TEMPERAMENTO: </strong>{temperament}</p>
        <p><strong>VIDA PROMEDIO: </strong>{life_span}</p> */}