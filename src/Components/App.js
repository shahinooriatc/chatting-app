import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Home from './Home/Home';
import React, { Component } from 'react'
import { onAuthStateChanged, auth } from '../firebaseConfig'

export default class App extends Component {

  state = {
    loggedIn: false,
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    });
  }

  render() {
    return (

      <Router>
        {this.state.loggedIn ?
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
          </Routes>
          :
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        }

      </Router>
    )
  }
}
