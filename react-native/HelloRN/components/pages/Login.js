import React from 'react';
import { View, StyleSheet, Image,TouchableWithoutFeedback} from 'react-native';
import { Container, Header, Title, Content, Card,
  CardItem, Body, Text, Footer, FooterTab,
  Button, Icon, Input, Item, Label, Thumbnail } from 'native-base';
import login from '../assets/img/login.png';
import {validate} from './Validation';
var DismissKeyboard = require('dismissKeyboard');
//var HashMap = require('hashmap');

class Login extends React.Component {
  constructor(props){
    super(props);
    //this.onSubmit.bind(this);
    //this.validateForm = this.validateForm.bind(this);

    this.state = {
      emailid:'',
      _errEmail:'',
      _errEmailMsg:'',

      password:'',
      _errPwd:'',
      _errPwdMsg:'',

      confirmpassword:'',
      _errCP:'',
      _errCPMsg:'',
      forgotMode:false,
    }
  }
  componentDidMount(){
    //patch required for first time binding
    //this.validateForm();
  }





  onSubmit(navigate){
    var e = validate('email',this.state.emailid);
    this.setState({_errEmail:e[0],_errEmailMsg:e[1]});
    var p = validate('password',this.state.password);
    this.setState({_errPwd:p[0],_errPwdMsg:p[1]});

    if(!e[0] && !p[0]){
      navigate('Home');
    }

  }

  loginExtra(navigate,purpose){
    if(purpose==='register'){
      navigate('Registration');
    }
    if(purpose==='forgot'){
      this.setState({forgotMode:true});
    }
  }

  clearText = () => {
    this.setState({
      emailid:'',
      _errEmail:'',
      _errEmailMsg:'',

      password:'',
      _errPwd:'',
      _errPwdMsg:'',

      confirmpassword:'',
      _errCP:'',
      _errCPMsg:'',
      forgotMode:false,

    });
  }

  updatePassword = () =>{
    //console.log('===='+this.state.password+'---'+this.state.confirmpassword);
    var e = validate('email',this.state.emailid);
    this.setState({_errEmail:e[0],_errEmailMsg:e[1]});
    var p = validate('password',this.state.password);
    this.setState({_errPwd:p[0],_errPwdMsg:p[1]});
    var cp = validate('password',this.state.confirmpassword, this.state.password);
    this.setState({_errCP:cp[0],_errCPMsg:cp[1]});

    if(!e[0] && !p[0] && !cp[0]){
      this.setState({forgotMode:false});
    }
  }


  render() {
    const {navigate} = this.props.navigation;

    return (
      <TouchableWithoutFeedback
                onPress={DismissKeyboard}>
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Body>
              <Title>
                Welcome to Portal
              </Title>
          </Body>
        </Header>
        <Content style={styles.content}>
        <Card>
            <CardItem style={{justifyContent:'center'}}>
              <Thumbnail source={login} style={{height:100,width:100}}/>
            </CardItem>
            <CardItem>
              <Body>
                <Item floatingLabel>
                  <Label>Email</Label>
                  <Icon active name='ios-contact' />
                  <Input value={this.state.emailid}
                  onChangeText={(value) => {
                    this.setState({emailid: value});
                    let v = validate('email',value);
                    this.setState({_errEmail:v[0],_errEmailMsg:v[1]});
                  }
                }/>
                </Item>
                <Item>
                {this.state._errEmail===true ?
                <View ><Text style={styles.error}>{this.state._errEmailMsg}</Text></View> : <View></View>
                }
                </Item>
                <Item floatingLabel>
                  <Label>Password</Label>
                  <Icon active name='lock' />
                  <Input value={this.state.password}
                    onChangeText={(value) => {
                      this.setState({password: value});
                      let v = validate('password',value);
                      this.setState({_errPwd:v[0],_errPwdMsg:v[1]});
                    }
                  }/>
                </Item>
                <Item>
                {this.state._errPwd===true ?
                <View ><Text style={styles.error}>{this.state._errPwdMsg}</Text></View> : <View></View>
                }
                </Item>

                {this.state.forgotMode ?
                  <View style={styles.fullscreen}>
                    <Item floatingLabel>
                      <Label>Confirm Password</Label>
                      <Icon active name='lock' />
                      <Input value={this.state.confirmpassword}
                        onChangeText={(value) => {
                          this.setState({confirmpassword: value});
                          let v = validate('password',value, this.state.password);
                          this.setState({_errCP:v[0],_errCPMsg:v[1]});
                        }
                      }/>
                    </Item>
                    <Item>
                    {this.state._errCP===true ?
                      <View ><Text style={styles.error}>{this.state._errCPMsg}</Text></View> : <View></View>
                    }
                    </Item>
                    </View>
                    :
                    <View></View>
                  }
              </Body>
            </CardItem>
            <CardItem style={styles.center}>

            {!this.state.forgotMode ?
              <View style={styles.fullscreen}>
                <Item>
                <Button iconLeft rounded onPress={() => this.onSubmit(navigate)} style={{width:150, justifyContent: 'center'}}>
                  <Icon active name='ios-log-in' />
                  <Text>Sign in</Text>
                </Button>
                <Label style={{width:10}} />
                <Button iconLeft rounded onPress={() => this.clearText()} style={{width:150, justifyContent: 'center'}}>
                  <Icon active name='ios-close' />
                  <Text>Cancel</Text>
                </Button>
                </Item>
              </View>
              :
              <View style={styles.fullscreen}>
              <Item>
                <Button iconLeft rounded onPress={() => this.updatePassword()} style={{width:150, justifyContent: 'center'}}>
                  <Icon active name='lock' />
                  <Text>Set Password</Text>
                </Button>
                </Item>
              </View>
            }

            </CardItem>

            <CardItem style={styles.center}>
              <Item>
                <Button transparent info onPress={() => this.loginExtra(navigate,'register')}>
                  <Text>Register</Text>
                </Button>
                <Button transparent info onPress={() => this.loginExtra(navigate,'forgot')}>
                  <Text>Forgot password</Text>
                </Button>
              </Item>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Powered by Santosh @2018</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    top: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    marginTop: 30,
    width: '100%',
    //backgroundColor: 'black',
  },
  content:{
    marginTop: 0,
    width: '100%',
  },
  fullscreen:{
    width: '100%',
  },
  error:{
    width: '100%',
    color: 'red',
  },
  center:{
    justifyContent: 'center',
  }
});

export default Login;
