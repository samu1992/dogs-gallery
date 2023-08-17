import React from 'react';
import Image from 'next/image';

const BreedsDetail = (breed) => {
  const { id, name, bred_for, origin, temperament, life_span, url: image } = breed;

  return (
    <section className='flex p-2 flex-rom justify-center items-center w-full mr-4'>
      <div key={id}>
        <Image src={image} alt='img' width={400} height={320} className='imagen-2 rounded-l-2xl' />
      </div>
      <div className='detalles flex p-4 flex-col justify-start h-80 w-80 items-start gap-4 rounded-r-2xl text-white'>
        <h3 className='text-2xl font-semibold'>{name}</h3>
        <p className='text-sm'>{bred_for}</p>
        <p className='text-sm'>{origin}</p>
        <p className='w-1/2 text-sm'>{temperament}</p>
        <p className='text-sm'>{life_span}</p>
      </div>
    </section>
  );
};

export default BreedsDetail;