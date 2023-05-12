import React from 'react';

const LeftArrow = ({ isLoading, page, setPage }) => (
    <button
        className="btn"
        onClick={() => {
            if (!isLoading && page > 1) {
                setPage((prevPage) => prevPage - 1);
            }
        }}
    >
        izquierda
    </button>
);

const RightArrow = () => (
    <button
        className="btn-primary"
    >
        derecha
    </button>
);

export { LeftArrow, RightArrow };
