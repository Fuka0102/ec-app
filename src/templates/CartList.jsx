import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import { getProductsInCart } from '../reducks/users/selectors';
import { CartListItem } from '../components/products';
import { PrimaryButton, GreyButton } from '../components/UIkit/';
import { push } from 'connected-react-router';

const CartList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push('order/confirm'));
  }, []);

  const backToOrder = useCallback(() => {
    dispatch(push('/'));
  }, []);

  return (
    <section className='c-section-wrapin'>
      <h2 className='u-text__headline'>ショッピングカート</h2>
      <List>
        {productsInCart.length > 0 &&
          productsInCart.map((product) => <CartListItem product={product} key={product.cartId} />)}
      </List>
      <div className='module-spacer--medium'>
        <div className='p-grid__column'>
          <PrimaryButton labeL={'レジへ進む'} onClick={goToOrder} />
          <div className='module-spacer--extra-extra-small' />
          <GreyButton labeL={'ショッピングを続ける'} onClick={backToOrder} />
        </div>
      </div>
    </section>
  );
};

export default CartList;
