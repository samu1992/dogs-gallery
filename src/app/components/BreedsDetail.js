import React from 'react'

const BreedsDetail = (breed) => {
  const { id, name, bred_for, origin, temperament, life_span, url: image } = breed;

  return (
    <div>
      <h1>razas</h1>
      <h1>Detail {id}</h1>
      <h1>Detail {name}</h1>
      <h1>Detail {bred_for}</h1>
    </div>
  );
};

export default BreedsDetail;