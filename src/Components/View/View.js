import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../Store/PostContext';
import './View.css';
import { FirebaseContext } from '../../Store/FirebaseContext';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (postDetails) {
      console.log(postDetails);
      const { userId } = postDetails;
      firebase
        .firestore()
        .collection('users')
        .where('id', '==', userId)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            setUserDetails(doc.data());
          });
        });
    }
  }, [firebase, postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails?.username}</p> {/* Use optional chaining to access userDetails */}
            <p>{userDetails?.phone}</p> {/* Use optional chaining to access userDetails */}
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
