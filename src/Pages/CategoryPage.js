import React, { useRef, useState } from 'react';

import { Categories } from '../Components/CategoryComponent/Categories';

import { useStyles } from './styles';

export const CategoryPage = (props) => {
  const classes = useStyles();

  return (
    <>
      <Categories />
    </>
  );
};
