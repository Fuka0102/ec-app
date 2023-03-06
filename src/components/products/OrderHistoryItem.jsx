import React from 'react';
import Divider from '@material-ui/core/Divider';
import { TextDetail } from '../UIkit';
import { OrderedProducts } from './index';

export const dateToString = (dt) => {
  return dt.getFullYear() + '-' + ('00' + (dt.getMonth() + 1)).slice(-2) + '-' + ('00' + dt.getDate()).slice(-2);
};

export const datetimeToString = (dt) => {
  return (
    dt.getFullYear() +
    '-' +
    ('00' + (dt.getMonth() + 1)).slice(-2) +
    '-' +
    ('00' + dt.getDate()).slice(-2) +
    ' ' +
    ('00' + dt.getHours()).slice(-2) +
    ':' +
    ('00' + dt.getMinutes()).slice(-2) +
    ':' +
    ('00' + dt.getSeconds()).slice(-2)
  );
};

const OrderHistoryItem = (props) => {
  const orderedDatetime = datetimeToString(props.order.updated_at.toDate());
  const shippingDate = dateToString(props.order.shipping_date.toDate());
  const totalPrice = '¥' + props.order.amount.toLocaleString();
  const products = props.order.products;

  return (
    <div>
      <div className='module-spacer--small' />
      <TextDetail label={'注文ID'} value={props.order.id} />
      <TextDetail label={'注文日時'} value={orderedDatetime} />
      <TextDetail label={'発送予定日'} value={shippingDate} />
      <TextDetail label={'注文金額'} value={totalPrice} />
      {Object.keys(products).length > 0 && <OrderedProducts products={products} />}
      <div className='module-spacer--extra-extra-small' />
      <Divider />
    </div>
  );
};

export default OrderHistoryItem;
