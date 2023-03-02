import { db, FirebaseTimestamp } from '../../firebase/index';
import { push } from 'connected-react-router';
import { deleteProductAction, fetchProductsAction } from './actions';

const productsRef = db.collection('products');

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter((product) => product.id !== id);
        dispatch(deleteProductAction(nextProducts));
      });
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    let productList = [];
    productsRef.get().then((snapshots) => {
      snapshots.forEach((snapshot) => {
        const product = snapshot.data();
        productList.push(product);
      });
      dispatch(fetchProductsAction(productList));
    });
  };
};

export const saveProduct = (id, name, description, category, price, gender, images) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      category: category,
      description: description,
      gender: gender,
      images: images,
      name: name,
      price: parseInt(price, 10),
    };

    if (id === '') {
      const ref = productsRef.doc();
      data.created_at = timestamp;
      id = ref.id;
      data.id = id;
    }

    return productsRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push('/'));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
