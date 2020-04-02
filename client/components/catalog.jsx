import React, { useState, useEffect } from 'react';

function Catalog() {
  const [index, setIndex] = useState(1);
  useEffect(() => {
    const id = setInterval(() => {
      if (index <= 10) {
        setIndex(index + 1);
      } else {
        setIndex(index - 11 + 1);
      }
    }, 2800);
    return () => {
      clearInterval(id);
    };
  }, [index]);

  return (
    <div className="catalog-item">
      <div className="h-100 w-100 catalog-slide fade-in">
        <img src={`./images/catalog${index}.jpeg`} className="d-block w-100" />
      </div>
    </div>
  );
}

export default Catalog;
