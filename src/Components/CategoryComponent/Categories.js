import React from 'react';
import { Grid, Slide, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Form, Field } from 'react-final-form';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import Spacer from 'react-add-space';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useStyles } from './styles';
import { ShowCategories } from './ShowCategories';
import { ScrollTop } from '../ScrollTop';
import eduLogoCategories from '../../Images/eduLogoCategories.svg';
import { withRouter } from 'react-router-dom';
const firestore = firebase.firestore();

const Categories = (props) => {
  const classes = useStyles();
  const categoriesRef = firestore.collection('categories');

  const queryCategories = categoriesRef
    .orderBy('createdAt')
    .limit(25);
  const [categories] = useCollectionData(queryCategories, {
    idField: 'id',
  });
  const [checked, setChecked] = React.useState(false);
  const onSubmit = async (values) => {
    // values.preventDefault();
    props.history.push('/home');
  };
  return (
    <>
      {' '}
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2>Navigate to a Topic of Your Interest</h2>
          </Grid>
        </Grid>
        <Spacer />
      </div>
      <div>
        {categories &&
          categories.map((cat) => (
            <>
              <ShowCategories key={cat.id} category={cat} />
            </>
          ))}
        <Form
          onSubmit={onSubmit}
          render={({
            handleSubmit,
            form,
            submitting,
            pristine,
            reset,
            value,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className={classes.buttonWrap}>
                <Button
                  type={'submit'}
                  classes={{
                    root: classes.buttonAddMore, // class name, e.g. `classes-nesting-root-x`
                    label: classes.buttonLabelAddMore, // class name, e.g. `classes-nesting-label-x`
                  }}
                >
                  Ask Question?
                </Button>
              </div>
            </form>
          )}
        />
      </div>
      <div className={classes.logo}>
        <img alt={''} src={eduLogoCategories} />
      </div>
      <ScrollTop />
    </>
  );
};

export default withRouter(Categories);
