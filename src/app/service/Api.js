"use client"
import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/Card';
import { LeftArrow, RightArrow } from '../components/BtnArrow';

const API_URL = 'https://api.thedogapi.com/v1/breeds';
const LIMIT = 5;

const Api = () => {
    const [breeds, setBreeds] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
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
        fetchData();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
            if (scrollLeft + clientWidth >= scrollWidth && !isLoading) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
            return () => scrollElement.removeEventListener('scroll', handleScroll);
        }
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
    

    return (
        <section className="borde">
            <div className="scroll" ref={scrollRef}>
            <LeftArrow isLoading={isLoading} page={page} setPage={setPage} onClick={handleScrollLeft}/>
                <div className="carousel">
                    {breeds &&
                        breeds.map(({ id, name, bred_for, origin, temperament, life_span, image }, index) => (
                            <Card
                                breed={{ id, name, bred_for, origin, temperament, life_span, url: image?.url || '' }}
                                key={`${id}-${index}`}
                            />
                        ))}
                </div>
                <RightArrow onClick={handleScrollRight}/>
            </div>
            {isLoading && <p>Cargando...</p>}
        </section>
    );
};

export default Api;





/* */