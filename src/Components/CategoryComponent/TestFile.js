import React, { useEffect, useState } from 'react';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import firebase from 'firebase/app';
import { Button, TextField, InputAdornment } from '@material-ui/core';

export const TestFile = () => {
  var db = firebase.firestore();
  var fieldValue = firebase.firestore.FieldValue;

  var batch = db.batch();

  var userDocRef = db.collection('categories').doc('hasRoom');
  //   var customerId = 'CUST_1234';
  const [messageValue, setmessageValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');

  const add = () => {
    // Set the value of the document in the subcollection
    var visitReportRef = userDocRef.collection(messageValue).doc();
    batch.set(visitReportRef, {
      text: messageValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      //....
    });

    // Update the parent document
    batch.update(userDocRef, {
      customerCollectionIds: fieldValue.arrayUnion(messageValue),
    });

    // Commit the batch
    batch.commit().then(function () {
      // ...
    });
  };

  // Add a new document in collection "cities"
  const create = () => {
    db.collection('categories')
      .doc('hasRoom')
      .set({
        name: 'BYE',
        state: 'CA',
        country: 'USA',
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };

  //   const [cats, setCats] = useState([]);
  //   const [selectedCat, setSelectedCat] = useState();
  //   const [msg, setMsg] = useState([]);
  //   const [error, setError] = useState();

  //   const selectCat = (cat) => {
  //     setSelectedCat(cat);
  //     database
  //       .collection('categories')
  //       .doc('hasRoom')
  //       .collection('messages')
  //       .get()
  //       .then((response) => {
  //         const fetchedMsgs = [];
  //         response.forEach((document) => {
  //           const fetchedMsg = {
  //             uid: document.id,
  //             ...document.data(),
  //           };
  //           fetchedMsgs.push(fetchedMsg);
  //         });
  //         setMsg(fetchedMsgs);
  //       })
  //       .catch((error) => {
  //         setError(error);
  //       });
  //   };

  //   const timestampToString = (timestamp) => {
  //     return Date(timestamp).toString();
  //   };
  //   useEffect(() => {
  //     database
  //       .collection('categories')
  //       .get()
  //       .then((response) => {
  //         const fetchedMsgs = [];
  //         response.forEach((document) => {
  //           const fetchedMsg = {
  //             uid: document.id,
  //             ...document.data(),
  //           };
  //           fetchedMsgs.push(fetchedMsg);
  //         });
  //         setMsg(fetchedMsgs);
  //       })
  //       .catch((error) => {
  //         setError(error);
  //       });
  //   }, []);
  return (
    // <>
    //   <div>working</div>
    //   <div>
    //     {/* {error ? <p>oops return error</p> : null} */}
    //     <div>
    //       {cats &&
    //         cats.map((cat) => (
    //           <div key={cat.id} onClick={() => selectCat(cat)}>
    //             <p>{cat}</p>
    //           </div>
    //         ))}
    //     </div>
    //     {selectedCat ? (
    //       <div>
    //         {msg &&
    //           msg.map((cat) => (
    //             <div key={cat.id} onClick={() => selectCat(cat)}>
    //               <p>{msg}</p>
    //             </div>
    //           ))}
    //       </div>
    //     ) : null}
    //   </div>
    // </>
    <>
      {' '}
      {/* <button onClick={() => create()}>hi</button> */}
      <TextField
        fullWidth
        value={messageValue}
        onChange={(e) => setmessageValue(e.target.value)}
        label={'Enter text here'}
        variant={'outlined'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {' '}
              <Button
                variant={'contained'}
                color={'primary'}
                type="submit"
                disabled={!messageValue}
                onClick={() => add()}
              >
                send
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
