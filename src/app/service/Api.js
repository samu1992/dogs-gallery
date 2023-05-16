/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/Card';
import BreedsDetail from '../components/BreedsDetail';
import { AiOutlineLeft } from 'react-icons/ai';

const API_URL = 'https://api.thedogapi.com/v1/breeds';
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
            const response = await fetch(`${API_URL}?page=${pageNumber}&limit=${LIMIT}`);
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
        <section className="flex flex-col justify-between items-center h-screen w-11/12 p-10 relative borde">
            {selectedBreed && <BreedsDetail {...selectedBreed} />}
            <div className="scroll borde flex overflow-hidden w-full z-10 items-center p-2" ref={scrollRef}>
                <div className='flex absolute left-0 z-20 ml-10 p-2 rounded-full text-white text-shadow'>
                    <AiOutlineLeft className='text-5xl cursor-pointer' onClick={handleScrollLeft}/>
                </div>
                <div className="flex relative gap-6 z-10">
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
                <div className='btn-primary borde'>
                    <button className='' onClick={handleScrollRight}>adelante</button>
                </div>
            </div>
        </section>
    );
};

export default Api;