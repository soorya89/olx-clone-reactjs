import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { useHistory } from 'react-router-dom';

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    if (!username || !email || !phone || !password) {
      alert('Please fill all fields and select an image.');
      return;
    }
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user
          .updateProfile({ displayName: username })
          .then(() => {
            firebase.firestore().collection('users').add({
              id: result.user.uid,
              username,
              phone
            })
              .then(() => {
                history.push('/login');
              });
          });
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            placeholder=""
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            value={email}
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder=""
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            id="phone"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            placeholder=""
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="****"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}