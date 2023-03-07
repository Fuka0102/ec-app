import React, { useEffect } from 'react';
import { ProductCard } from '../components/products';
import { getProducts } from '../reducks/products/selectors';
import { fetchProducts } from '../reducks/products/operations';
import { useDispatch, useSelector } from 'react-redux';

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector).list;

  const query = selector.router.location.search;
  const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : '';
  const category = /^\?category=/.test(query) ? query.split('?category=')[1] : '';

  useEffect(() => {
    dispatch(fetchProducts(gender, category));
  }, [query]);

  return (
    <section className='c-section-wrapin'>
      <div className='p-grid__row'>
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              images={product.images}
              price={product.price}
              name={product.name}
            />
          ))}
      </div>
    </section>
  );
};

export default ProductList;
