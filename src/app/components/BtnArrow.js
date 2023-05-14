import React from 'react';


const handleScrollLeft = () => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.scrollBy({
                left: -scrollElement.clientWidth,
                behavior: 'smooth',
            });
        }
    };

export default handleScrollLeft;