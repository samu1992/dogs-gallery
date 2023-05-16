import React from 'react';
import Image from 'next/image';

const Card = ({ breed, onClick }) => {
  if (!breed || typeof breed !== 'object') {
    console.error('Invalid breed object:', breed);
    return null;
  }

  const { id, url} = breed;
  const handleClick = () => {
    if (onClick) {
      onClick(breed);
    }
  };

  return (
      <div key={id} className='flex flex-row items-center justify-center cursor-pointer' onClick={handleClick}>
        <Image priority src={url} alt='hola' width={200} height={200} id='hover'/>
      </div>
  );
};

export default Card;
