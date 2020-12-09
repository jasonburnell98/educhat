import React, { useState } from 'react';
import {
  Button,
  Grid,
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  MenuItem,
  Slide,
} from '@material-ui/core';
import { TextField, Select } from 'mui-rff';
import firebase from 'firebase/app';

import 'firebase/analytics';
import CircularProgress from '@material-ui/core/CircularProgress';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';
import Spacer from 'react-add-space';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Form } from 'react-final-form';
import { majors } from './Helpers/majors';
import eduLogoCategories from '../Images/eduLogoCategories.svg';
import { withRouter } from 'react-router-dom';
import { useStyles } from './styles';
import { DropzoneArea } from 'material-ui-dropzone';
import FileUploader from 'react-firebase-file-uploader';
import ProfilePage from './ProfilePage';
const firestore = firebase.firestore();

const AddNewTopic = (props) => {
  const categoriesRef = firestore.collection('categories');
  const [checked, setChecked] = React.useState(false);

  const auth = firebase.auth();
  const [categoryValue, setCategoryValue] = useState('');
  const [majorValue, setMajorValue] = useState('');
  // const [userName, setUserName] = useState('');
  // const [avatar, setAvatar] = useState('');
  // const [isUploading, setIsuploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState('');

  var storage = firebase.storage();

  // console.log(spaceRef);

  const [image2, setImage2] = useState(null);
  const [url, setUrl] = useState('');

  const handleChanger = (e) => {
    if (e.target.files[0]) {
      setImage2(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage
      .ref(`images/${image2.name}`)
      .put(image2);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(image2.name)
          .getDownloadURL()
          .then((url) => {
            // console.log(url);
            setUrl(url);
          });
      },
    );
  };
  console.log('image: ', image2);
  // const [image, setImage] = useState(null);
  const onSubmit = async (values) => {
    // values.preventDefault();
    props.history.push('/categories');
    const { uid, photoURL } = auth.currentUser;
    await categoriesRef.add({
      text: values.text,
      title: values.title,
      major: values.major,
      files: url,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    handleUpload();
    setCategoryValue(values.text);
    setMajorValue(values.major);
  };

  const required = (value) => (value ? undefined : 'Required');

  const classes = useStyles();
  const [files, setFiles] = React.useState([]);
  const handleChange = (files) => {
    setFiles({ files: files });
  };
  const handleUploadSuccess = (filename) => {
    // setAvatar(filename),
    // progress(100),
    // isUploading(false),
    firebase
      .storage()
      .ref('image')
      .child(filename)
      .getDownloadURL()
      .then((url) => setAvatarUrl(url));
  };
  const formFields = [
    {
      size: 12,
      field: (
        <Select
          name="major"
          label="Major"
          formControlProps={{ variant: 'outlined' }}
          required={true}
        >
          {' '}
          {majors.map((category) => (
            <MenuItem key={category.title} value={category.title}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          label="Topic"
          name="title"
          fullWidth
          margin="none"
          required={true}
          variant={'outlined'}
        />
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          label="Problem"
          name="text"
          fullWidth
          margin="none"
          required={true}
          variant={'outlined'}
        />
      ),
    },
    {
      size: 12,
      field: (
        // <FileUploader
        //   name={'files'}
        //   accept={['image/*', 'video/*', 'application/*']}
        //   // randomizeFilename
        //   storageRef={firebase.storage().ref('images')}
        //   // onUploadStart={handleUploadStart}
        //   // onUploadError={handleUplaodError}
        //   // onUploadSuccess={handleUploadSuccess}
        // />
        // <ProfilePage />
        <>
          <Accordion>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Add Image
            </AccordionSummary>
            <AccordionDetails>
              {' '}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <input type="file" onChange={handleChanger} />
                </Grid>
                {/* <button onClick={handleUpload}>Upload</button> */}
                <Grid item xs={12}>
                  <Button
                    color={'secondary'}
                    disabled={!image2}
                    onClick={handleUpload}
                  >
                    Add Image
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </>
      ),
    },
  ];

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline /> <h2>Welcome to EduChat!</h2>
        <div className={classes.root}>
          <div className={classes.wrapper}>
            <Slide
              direction="up"
              in={!checked}
              mountOnEnter
              unmountOnExit
            >
              <Paper elevation={4} className={classes.paper}>
                <div className={classes.logo}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant={'subtitle1'}>
                        What would you like to learn?
                      </Typography>
                      <Spacer />

                      <Grid item xs={12}>
                        <Form
                          onSubmit={onSubmit}
                          validate={required}
                          render={({
                            handleSubmit,
                            form,
                            submitting,
                            pristine,
                            reset,
                            values,
                          }) => (
                            <form onSubmit={handleSubmit}>
                              <div style={{ padding: 16 }}>
                                <Grid
                                  container
                                  alignItems="flex-start"
                                  spacing={3}
                                >
                                  {formFields.map((item, idx) => (
                                    <Grid
                                      item
                                      xs={item.size}
                                      key={idx}
                                    >
                                      {item.field}
                                    </Grid>
                                  ))}
                                  <Grid item xs>
                                    <Button
                                      type="button"
                                      variant="contained"
                                      onClick={form.reset}
                                      disabled={
                                        submitting || pristine
                                      }
                                    >
                                      Reset
                                    </Button>
                                    <Spacer />
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      type="submit"
                                      disabled={
                                        submitting || pristine
                                      }
                                    >
                                      Submit
                                    </Button>
                                  </Grid>
                                </Grid>
                              </div>
                            </form>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Slide>
          </div>
        </div>
      </Container>
      <Spacer />
      <img alt={''} src={eduLogoCategories} />
    </>
  );
};

export default withRouter(AddNewTopic);
