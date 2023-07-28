
import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from "react-router-dom";
import { FirebaseContext,AuthContext } from '../../Store/FirebaseContext';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const history= useHistory();

  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const date= new Date()

  const handleImageChange = (e) => {
   
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!name || !category || !price || !image) {
      alert('Please fill all fields and select an image.');
      return;
    }
    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          console.log('File uploaded successfully', url);
          // Perform further actions with the image URL
          firebase.firestore().collection('products').add({
            name,category,price,url,userId:user.uid,
            createAt:date.toDateString()
          })
          history.push('/')
        });
      });
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
          />
          <br />

          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ''}
          />
          <br />
          <input type="file" onChange={handleImageChange} />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
