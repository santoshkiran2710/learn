import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import AppCache from '../AppCache';

class Header extends Component {
  constructor(props){
    super(props);
  }

  logout(){
    AppCache.auth = false;
    this.props.history.push("/");
  }

  render() {
    //console.log("===In Header render=="+AppCache.auth);
    let authLink = null;
    let authUser = null;
    let authUserLID = null;
    if(AppCache.auth){
      authLink = <li><Link to="/Login" onClick={this.logout}>Logout</Link></li>;
      authUser = <li>Welcome {AppCache.email}</li>;
      authUserLID = <li>LID {AppCache.lid}</li>;
    }else{
      authLink = <li><Link to="/Login">Sign up</Link></li>;
      authUser = <li>Welcome Guest!</li>;
    }
    return (
      <header className="header">
      	<div className="logo">
      		<img className="logoimg" alt={"Logo"} src={require('../images/SNLogo2.gif')}/>
      	</div>

      	<nav>
          <ul>
          {authUser}
          {authUserLID}
          <li>
          <UncontrolledDropdown>
            <DropdownToggle caret>
              Presentation
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Portal Menu</DropdownItem>
              <DropdownItem><Link to="/">Home</Link></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><Link to="/Graphs">Graphs</Link></DropdownItem>
              <DropdownItem><Link to="/Product">About</Link></DropdownItem>
              <DropdownItem>{authLink}</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
         </li>
          <li><Link to="/Grid">Grid</Link></li>
          </ul>
      		{/*<ul>
      			<li><Link to="/">Home</Link></li>
      			<li><Link to="/Product">Products</Link></li>
            {authLink}
            
      		</ul>*/}
      	</nav>
      </header>
    );
  }
}

export default Header;