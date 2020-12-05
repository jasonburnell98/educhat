import React from 'react';
import { Grid } from '@material-ui/core';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import Spacer from 'react-add-space';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useStyles } from './styles';
import { ShowCategories } from './ShowCategories';
import { ScrollTop } from '../ScrollTop';
import eduLogo from '../../Images/eduLogo.svg';
const firestore = firebase.firestore();

export const Categories = (props) => {
  const classes = useStyles();
  const categoriesRef = firestore.collection('categories');

  const queryCategories = categoriesRef
    .orderBy('createdAt')
    .limit(25);
  const [categories] = useCollectionData(queryCategories, {
    idField: 'id',
  });
  console.log(queryCategories);

  // dummy.current.scrollIntoView({ behavior: 'smooth' });
  return (
    <>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2>Welcome to the Chat Rooms</h2>
          </Grid>
        </Grid>
      </div>

      <div>
        {categories &&
          categories.map((cat) => (
            <ShowCategories key={cat.id} category={cat} />
          ))}
      </div>
      <Spacer />
      <div className={classes.logo}>
        <img alt={''} src={eduLogo} />
      </div>
      <ScrollTop />
    </>
  );
};
