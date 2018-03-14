import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

//scss created 
import './assets/css/defaultmin.css';
import './App.css';

import Header from './components/header';

import Home from './components/pages/home';
import Product from './components/pages/products';
import Login from './components/pages/login';
import Graphs from './components/pages/graphs';
import Grid from './components/pages/grid';

import Footer from './components/footer';

class App extends Component {
  componentWillMount(){
    //console.log("===In App Mount==");
  }
  render() {
    return (
    	<Router>
	      <div>
	       
	       <Header />
	       <div className="App">
	       	<Route exact path='/' component={Home}/>
	       	<Route exact path='/Product' component={Product} />
	       	<Route exact path='/Login' component={Login} />
	       	<Route exact path='/Graphs' component={Graphs} />
	       	<Route exact path='/Grid' component={Grid} />
	       	</div>
	       <Footer />
	      </div>
	      
      </Router>
    );
  }
}

export default App;
