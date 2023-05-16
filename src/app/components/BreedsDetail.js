import React from 'react';
import Image from 'next/image';

const BreedsDetail = (breed) => {
  const { id, name, bred_for, origin, temperament, life_span, url: image } = breed;

  return (
    <section className='flex p-2 flex-row justify-center items-center gap-4 w-4/5'>
      <div>
        <Image src={image} alt='hola' width={600} height={450} className='imagen-2 rounded-xl' />
      </div>
      <div className='detalles flex p-4 flex-col justify-start items-start gap-4 h-full rounded-xl w-1/2 text-slate-700'>
        <h3 className='text-2xl font-semibold'>{name}</h3>
        <p className='text-xl'>{bred_for}</p>
        <p className='text-xl'>{origin}</p>
        <p className='w-1/2 text-xl'>{temperament}</p>
        <p className='text-xl'>{life_span}</p>
      </div>
    </section>
  );
};

export default BreedsDetail;