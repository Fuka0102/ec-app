import React, { useCallback, useEffect, useState } from 'react';
import { TextInput, PrimaryButton, SelectBox } from '../components/UIkit';
import { useDispatch } from 'react-redux';
import { saveProduct } from '../reducks/products/operations';
import { db } from '../firebase';
import { ImageArea, SetSizeArea } from '../components/products/';

const ProductEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split('product/edit')[1];

  if (id !== '') {
    id = id.split('/')[1];
  }

  const [name, setName] = useState(''),
    [description, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [categories, setCategories] = useState([]),
    [gender, setGender] = useState(''),
    [images, setImages] = useState([]),
    [price, setPrice] = useState(''),
    [sizes, setSizes] = useState([]);

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  const genders = [
    { id: 'all', name: '全て' },
    { id: 'male', name: 'メンズ' },
    { id: 'female', name: 'レディース' },
  ];

  useEffect(() => {
    if (id !== '') {
      db.collection('products')
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setImages(data.images);
          setName(data.name);
          setDescription(data.description);
          setCategory(data.category);
          setGender(data.gender);
          setPrice(data.price);
          setSizes(data.sizes);
        });
    }
  }, [id]);

  useEffect(() => {
    db.collection('categories')
      .orderBy('order', 'asc')
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
          });
        });
        setCategories(list);
      });
  }, []);

  return (
    <section>
      <h2 className='u-text__headline u-text-center'>書品の登録と編集</h2>
      <div className='c-section-container'>
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={'商品名'}
          multiline={false}
          required={true}
          onChange={inputName}
          minRows={1}
          value={name}
          type={'text'}
        />
        <TextInput
          fullWidth={true}
          label={'商品説明'}
          multiline={true}
          required={true}
          onChange={inputDescription}
          minRows={5}
          value={description}
          type={'text'}
        />
        <SelectBox label={'カテゴリー'} options={categories} required={true} select={setCategory} value={category} />
        <SelectBox label={'性別'} options={genders} required={true} select={setGender} value={gender} />
        <TextInput
          fullWidth={true}
          label={'価格'}
          multiline={false}
          required={true}
          onChange={inputPrice}
          minRows={1}
          value={price}
          type={'number'}
        />
        <div className='module-spacer--medium' />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className='module-spacer--medium' />
        <div className='center'>
          <PrimaryButton
            label={'商品情報を保存'}
            onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, sizes, images))}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
