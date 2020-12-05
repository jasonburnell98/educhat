import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Container,
  InputAdornment,
  Paper,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import Spacer from 'react-add-space';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useStyles } from './styles';
const firestore = firebase.firestore();

export const AddNewTopic = (props) => {
  const categoriesRef = firestore.collection('categories');

  const auth = firebase.auth();
  const [categoryValue, setCategoryValue] = useState('');
  const selectCategory = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await categoriesRef.add({
      text: categoryValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    // console.log(queryCategories);
    setCategoryValue('');
  };

  const classes = useStyles();
  const options = majors.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.root}>
          <div className={classes.wrapper}>
            <Paper elevation={4} className={classes.paper}>
              <div className={classes.logo}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography>
                      What would you like to learn?
                    </Typography>
                    <Grid item xs={12}></Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      id="grouped-demo"
                      options={options.sort(
                        (a, b) =>
                          -b.firstLetter.localeCompare(a.firstLetter),
                      )}
                      groupBy={(option) => option.firstLetter}
                      getOptionLabel={(option) => option.title}
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="With categories"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <form onSubmit={selectCategory}>
                      <TextField
                        fullWidth
                        value={categoryValue}
                        onChange={(e) =>
                          setCategoryValue(e.target.value)
                        }
                        label={'Topic Discussion'}
                        variant={'outlined'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {' '}
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Spacer />
                      <Grid item xs={12}>
                        <Button
                          variant={'contained'}
                          color={'primary'}
                          type="submit"
                          disabled={!categoryValue}
                        >
                          Submit
                        </Button>
                      </Grid>
                      {/* <Grid item xs={4}>
            <div>
              <Button
                variant={'contained'}
                color={'primary'}
                type="submit"
                disabled={!messageValue}
              >
                <ChatIcon />
              </Button>
            </div>
          </Grid> */}
                    </form>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </div>
        </div>
      </Container>
    </>
  );
};

const majors = [
  { title: 'Accounting' },
  { title: 'Actuarial Science' },
  { title: 'Advertising' },
  { title: 'African Studies' },
  { title: 'Agricultural Economics' },
  { title: 'Africana Studies' },
  { title: 'Agriculture and Natural Resources' },
  { title: 'Ancient Greek and Roman Studies' },
  { title: 'Animal Biosciences' },
  { title: 'Animal Science' },
  { title: 'Anthropology' },
  { title: 'Anthropology Education' },
  { title: 'Applied Mathematics' },
  { title: 'Applied Molecular Biology and Biotechnology' },
  { title: 'Art' },
  { title: 'Art Conservation' },
  { title: 'Art History' },
  { title: 'Asian Studies' },
  { title: 'Associate in Arts Program' },
  { title: 'Astronomy' },
  { title: 'Biochemistry' },
  { title: 'Biological Sciences' },
  { title: 'Biological Sciences Education' },
  { title: 'Biomedical Engineering' },
  { title: 'Business Analytics' },
  { title: 'Business Undeclared' },
  { title: 'Chemical Engineering' },
  { title: 'Chemistry' },
  { title: 'Chemistry Education' },
  { title: 'Chinese Studies' },
  { title: 'Civil Engineering' },
  { title: 'Communication' },
  { title: 'Comparative Literature' },
  { title: 'Computer Engineering' },
  { title: 'Computer Science' },
  { title: 'Construction Engineering and Management' },
  { title: 'Criminal Justice' },
  {
    title:
      'Early Childhood Education/Early Childhood Special Education',
  },
  { title: 'Earth Science Education' },
  { title: 'Economics' },
  { title: 'Economics Education' },
  { title: 'Electrical Engineering' },
  { title: 'Elementary Teacher Education' },
  { title: 'Energy and Environmental Policy' },
  { title: 'Engineering Undeclared' },
  { title: 'English' },
  { title: 'English Education' },
  { title: 'Entrepreneurship' },
  { title: 'Environmental Engineering' },
  { title: 'Environmental Science' },
  { title: 'Environmental Studies' },
  { title: 'Environmental and Resource Economics' },
  { title: 'European Studies' },
  { title: 'Exercise Science' },
  { title: 'Fashion Design & Product Innovation' },
  { title: 'Fashion Merchandising & Management' },
  { title: 'Finance' },
  { title: 'Financial Planning and Wealth Management' },
  { title: 'Fine Arts' },
  { title: 'Food Science' },
  { title: 'Food and Agribusiness Marketing and Management' },
  { title: 'French Education' },
  { title: 'French Studies' },
  { title: 'French and Political Science' },

  { title: 'GIScience and Environmental Data Analytics' },
  { title: 'Geography' },
  { title: 'Geography Education' },
  { title: 'Geological Sciences' },
  { title: 'German Education' },
  { title: 'German Studies' },
  { title: 'German and Political Science' },
  { title: 'Global Enterprise Management' },
  { title: 'Global Studies' },
  { title: 'Health Behavior Science' },
  { title: 'History' },
  { title: 'History Education' },
  { title: 'Hospitality Business Management' },
  { title: 'Hospitality Industry Management' },
  { title: 'Human Physiology' },
  { title: 'Human Relations Administration' },
  { title: 'Human Services' },
  { title: 'Information Systems' },
  { title: 'Insect Ecology and Conservation' },
  { title: 'International Business Studies' },
  { title: 'International Relations' },
  { title: 'Italian Education' },
  { title: 'Italian Studies' },
  { title: 'Japanese Studies' },

  { title: 'Landscape Architecture' },
  { title: 'Latin American and Iberian Studies' },
  { title: 'Latin Education' },
  { title: 'Linguistics' },

  { title: 'Management' },
  { title: 'Management Information Systems' },
  { title: 'Marine Science' },
  { title: 'Marketing' },
  { title: 'Materials Science and Engineering' },
  { title: 'Mathematics' },
  { title: 'Mathematics Education' },
  { title: 'Mathematics and Economics' },
  { title: 'Mechanical Engineering' },
  { title: 'Medical Diagnostics' },
  { title: 'Medical Diagnostics-Pre Physician Assistant' },
  { title: 'Medical Laboratory Science' },
  { title: 'Meteorology and Climatology' },
  { title: 'Music' },
  { title: 'Music - Applied' },
  { title: 'Music Composition' },
  { title: 'Music Education' },
  { title: 'Music History and Literature' },
  { title: 'Music Management' },
  { title: 'Music Theory' },
  { title: 'Neuroscience' },
  { title: 'Nursing' },
  { title: 'Nutrition' },

  { title: 'Nutrition and Dietetics' },
  { title: 'Nutrition and Medical Sciences' },
  { title: 'Occupational Therapy' },
  { title: 'Operations Management' },
  { title: 'Organizational and Community Leadership' },

  { title: 'Pharmaceutical Sciences' },
  { title: 'Philosophy' },
  { title: 'Physics' },
  { title: 'Physics Education' },
  { title: 'Plant Science' },
  { title: 'Political Science' },
  { title: 'Political Science Education' },
  { title: 'Pre-Veterinary Medicine' },
  { title: 'Psychology' },
  { title: 'Psychology Education' },
  { title: 'Public Policy' },
  { title: 'Quantitative Biology' },
  { title: 'Russian Studies' },
  { title: 'Sociology' },
  { title: 'Sociology Education' },
  { title: 'Spanish Education' },
  { title: 'Spanish Studies' },
  { title: 'Spanish and Political Science' },

  { title: 'Sport Management' },
  { title: 'Sports Health' },
  { title: 'Statistics' },
  { title: 'Sustainable Food Systems' },
  { title: 'Three Foreign Languages' },
  { title: 'University Studies' },
  { title: 'Visual Communications' },
  { title: 'Wildlife Ecology and Conservation' },
  { title: 'Women and Gender Studies' },
];
