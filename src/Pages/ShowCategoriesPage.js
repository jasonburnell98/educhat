import React, { useRef, useState } from 'react';

import { ShowCategories } from '../Components/CategoryComponent/ShowCategories';

import { useStyles } from './styles';

export const CategoryPage = (props) => {
  const classes = useStyles();

  return (
    <>
      <ShowCategories />
    </>
  );
};
