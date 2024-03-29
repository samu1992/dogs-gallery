/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/Card';
import BreedsDetail from '../components/BreedsDetail';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const API_URL = 'https://api.thedogapi.com/v1/breeds';
const API_KEY = 'live_zi0p6LbN3h9LSP6hGsJ8TbMvFvTXbGYBsj3B2J8nVPTg3NVkz8UEdi2HKudxUuXU'; // Tu clave API aquí
const LIMIT = 10;

const Api = () => {
    const [breeds, setBreeds] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBreed, setSelectedBreed] = useState(null);
    const scrollRef = useRef(null);

    const fetchData = async (pageNumber) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}?page=${pageNumber}&limit=${LIMIT}`, {
                headers: {
                    'x-api-key': API_KEY,
                },
            });
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
                if (scrollElement.scrollLeft + scrollElement.clientWidth >= scrollElement.scrollWidth - 1 && !isLoading) {
                    setPage((prevPage) => prevPage + 1);
                }
            }
        };

        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isLoading]);

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
        setSelectedBreed(breed);
    };

    useEffect(() => {
        if (breeds.length > 0) {
            setSelectedBreed(breeds[0]);
        }
    }, [breeds]);

    return (
        <section className="flex flex-col justify-center items-center gap-10 w-full p-8 relative h-full">
            {selectedBreed && <BreedsDetail {...selectedBreed} />}
            <div className="scroll flex overflow-hidden w-full items-center" ref={scrollRef}>
                <div className='flex absolute left-0 z-20 p-2 rounded-full text-white text-shadow'>
                    <AiOutlineLeft className='text-5xl cursor-pointer' onClick={handleScrollLeft}/>
                </div>
                <div className="flex relative gap-6 p-4 h-full justify-between items-center flex-row">
                    {breeds &&
                        breeds.map(({ id, name, bred_for, origin, temperament, life_span, image }, index) => (
                            <Card
                                breed={{ id, name, bred_for, origin, temperament, life_span, url: image?.url || '' }}
                                key={`${id}-${index}`}
                                onClick={() => handleSelectBreed({ id, name, bred_for, origin, temperament, life_span, url: image?.url || '' })}
                            />
                        ))}
                        {isLoading && <p>Cargando...</p>}
                </div>
                <div className='flex absolute right-0 z-20  p-2 rounded-full text-white text-shadow'>
                    <AiOutlineRight className='text-5xl cursor-pointer' onClick={handleScrollRight}/>
                </div>
            </div>
        </section>
    );
};

export default Api;