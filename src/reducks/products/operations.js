import { db, FirebaseTimestamp } from '../../firebase/index';
import { push } from 'connected-react-router';

const productsRef = db.collection('products');

export const saveProduct = (name, desciption, category, price, gender) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      category: category,
      desciption: desciption,
      gender: gender,
      name: name,
      price: parseInt(price, 10),
      upvated_at: timestamp,
    };

    const ref = productsRef.doc();
    const id = ref.id;
    data.id = id;
    data.created_at = timestamp;

    return productsRef
      .doc(id)
      .set(data)
      .then(() => {
        dispatch(push('/'));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};