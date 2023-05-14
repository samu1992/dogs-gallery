/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/Card';
import BreedsDetail from '../components/BreedsDetail';


const API_URL = 'https://api.thedogapi.com/v1/breeds';
const LIMIT = 5;

const Api = () => {
    const [breeds, setBreeds] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBreed, setSelectedBreed] = useState(null); 
    const scrollRef = useRef(null);

    const fetchData = async (page) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}?page=${page}&limit=${LIMIT}`);
            const data = await response.json();
            setBreeds((prevBreeds) => [...prevBreeds, ...data]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollElement = scrollRef.current;
            if (scrollElement) {
                const { scrollLeft, clientWidth, scrollWidth } = scrollElement;
                if (scrollLeft + clientWidth >= scrollWidth && !isLoading) {
                    setPage((prevPage) => prevPage + 1);
                    fetchData(page + 1);
                }
            }
        };

        if (scrollRef.current) {
            scrollRef.current.addEventListener('scroll', handleScroll);
            return () => scrollRef.current.removeEventListener('scroll', handleScroll);
        }
    }, [isLoading, page]);

    const handleScrollLeft = () => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.scrollBy({
                left: -scrollElement.clientWidth,
                behavior: 'smooth',
            });
        }
    };

    const handleScrollRight = () => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.scrollBy({
                left: scrollElement.clientWidth,
                behavior: 'smooth',
            });
        }
    };

    const handleSelectBreed = (breed) => {
        if (breed.id !== selectedBreed?.id) {
            setSelectedBreed(breed);
        }
    };

    return (
        <section className="borde">
            <div className="scroll" ref={scrollRef}>
                <button className='btn' onClick={handleScrollLeft}>atras</button>
                <div className="carousel">
                    {breeds &&
                        breeds.map(({ id, name, bred_for, origin, temperament, life_span, image }, index) => (
                            <Card
                                breed={{ id, name, bred_for, origin, temperament, life_span, url: image?.url || '' }}
                                key={`${id}-${index}`}
                                onClick={() => handleSelectBreed({ id, name, bred_for, origin, temperament, life_span, url: image?.url || '' })}
                            />
                        ))}
                </div>
                <button className='btn-primary' onClick={handleScrollRight}>adelante</button>
            </div>
            {isLoading && <p>Cargando...</p>}
            {selectedBreed && <BreedsDetail {...selectedBreed} />}
        </section>
    );
};

export default Api;
