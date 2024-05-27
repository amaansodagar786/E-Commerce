import React, { useState } from 'react';

const Practice = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', price: 20 },
    { id: 2, name: 'Product B', price: 15 },
    { id: 3, name: 'Product C', price: 25 },
    // ... other products
  ]);

  // Sorting functions
  const sortByPriceAsc = () => {
    const sortedProductsAsc = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProductsAsc);
  };

  const sortByPriceDesc = () => {
    const sortedProductsDesc = [...products].sort((a, b) => b.price - a.price);
    setProducts(sortedProductsDesc);
  };

  return (
    <div>
      <button onClick={sortByPriceAsc}>Sort by Price (Asc)</button>
      <button onClick={sortByPriceDesc}>Sort by Price (Desc)</button>

      {/* Render your sorted products */}
      {products.map((product) => (
        <div key={product.id}>
         {product.price}
        </div>
      ))}
    </div>
  );
};

export default Practice;