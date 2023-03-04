import React from 'react';
import { Switch, Route } from 'react-router';
import { SignIn, Home, SignUp, Reset, ProductEdit } from './templates';
import Auth from './Auth';
import ProductList from './templates/ProductList';
import ProductDetail from './templates/ProductDetail';

const Router = () => {
  return (
    <Switch>
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signin/reset' component={Reset} />
      <Auth>
        <Route exact path='(/)?' component={ProductList} />
        <Route exact path='/product/:id' component={ProductDetail} />
        <Route path='/product/edit(/:id)?' component={ProductEdit} />
      </Auth>
    </Switch>
  );
};

export default Router;
