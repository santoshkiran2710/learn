import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from 'reactstrap';

import '../../assets/css/defaultmin.css';
/*import {validation} from '../../utils/validation';*/
import {validate} from '../../utils/validation';
import Loader from 'react-loader';

import AppCache from '../../AppCache';
const util = require('util');
//var http=require('http');
//var axios = require('axios');

class Login extends Component {
    constructor(props){
      super(props);
      this.state = {
        email:null,
        emailError: false,
        emailErrorMsg:'',
        pwd:null,
        pwdError: false,
        pwdErrorMsg:'',
        loginError: false,
        loginErrorMsg: '',
        isLoaded:true,
        render: false,
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.submitForm = this.submitForm.bind(this);
    }



    handleInputChange(event) {
      const target = event.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name = target.name;
      if(name==='email'){
          this.setState({email:value});
          let v = validate('email', value);
          this.setState({emailError: !v[0], emailErrorMsg: v[1]})
      }
      if(name==='password'){
          this.setState({pwd:value});
          let v = validate('password', value);
          this.setState({pwdError: !v[0], pwdErrorMsg: v[1]})
      }
      this.setState({loginErrorMsg:''});
    }

    submitForm(){
      this.setState({isLoaded:false});

console.log("===1===");
  let email = this.state.email;
  let pwd = this.state.pwd;
  this.setState({render: true});
  AppCache.email = email;
  AppCache.password = pwd;
  console.log("email:"+email+",pwd:"+pwd);
  AppCache.lid = "682963892739721903721093";
  AppCache.auth = true;
  this.setState({isLoaded:true});
        this.props.history.push("/auth");

    }

  render() {
    return (
      <div className="container">
        <h5 style={{textAlign:'center'}}>
        Sign up
        </h5>

        <form>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" className="form-control"
          name="email"
          /*onChange={(emailInput) => {
                this.setState({email:emailInput})
                let v = validate('email', emailInput);
                this.setState({emailError: !v[0], emailErrorMsg: v[1]})
              }
          }*/
          onChange={this.handleInputChange}
          />
          <label className="errorMessage">{this.state.emailErrorMsg}</label>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control"
            name="password"
            onChange={this.handleInputChange}
          />
          <label className="errorMessage">{this.state.pwdErrorMsg}</label>
        </div>
        <Loader loaded={this.state.isLoaded} />
          <Button color="danger" className="btnLogin"
          onClick={this.submitForm}
          >Submit</Button>

        </form>
        <label className="errorMessage" style={{paddingTop:50}}>{this.state.loginErrorMsg}</label>
      </div>
    );
  }
}

export default Login;
