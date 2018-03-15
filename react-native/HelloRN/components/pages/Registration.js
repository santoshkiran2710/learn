import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Container, Header, Left, Right,Title,
        Content, Card, CardItem, Body, Text,
        Footer, FooterTab, Button, Icon, Input, Item, Label } from 'native-base';
import {validate} from './Validation';

class Registration extends React.Component {
  constructor(props){
    super(props);
    //this.onSubmit.bind(this);

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
      username:'',
      _errUsername:'',
      _errUsermsg:'',
      phone:'',
      _errPhone:'',
      _errPhoneMsg:'',
    }
  }
  componentDidMount(){

  }
  register(navigate){
    //console.log("1"+this.state.emailid+'---'+this.state.password);
    var e = validate('email',this.state.emailid);
    this.setState({_errEmail:e[0],_errEmailMsg:e[1]});
    var p = validate('password',this.state.password);
    this.setState({_errPwd:p[0],_errPwdMsg:p[1]});
    var cp = validate('password',this.state.confirmpassword);
    this.setState({_errCP:cp[0], _errCPMsg:cp[1]});
    var u = validate('string', this.state.username);
    this.setState({_errUsername:u[0], _errUsermsg:u[1]});
    var ph = validate('phone', this.state.phone);
    this.setState({_errPhone:ph[0],_errPhoneMsg:ph[1]});

    if(!e[0] && !p[0] && !cp[0] && !u[0] && !ph[0]){
      navigate('Login');
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
      username:'',
      _errUsername:'',
      _errUsermsg:'',
      phone:'',
      _errPhone:'',
      _errPhoneMsg:'',
    });

  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <Container style={styles.container}>
        <Header style={styles.fullscr}>
        <Left>
        <Button transparent onPress={() => navigate('Login')}>
          <Icon name="md-arrow-back" />
        </Button>
        </Left>
        <Body>
            <Title>
              Register
            </Title>
          </Body>
        </Header>
        <Content style={styles.fullscr} padder>
          <Card>
            <CardItem>
              <Text>Registration</Text>
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

                <Item floatingLabel>
                  <Label>Name</Label>
                  <Icon active name='ios-person' />
                  <Input value={this.state.username}
                    onChangeText={(value) => {
                      this.setState({username: value});
                      let v = validate('string',value);
                      this.setState({_errUsername:v[0],_errUsernameMsg:v[1]});
                    }
                  }/>
                </Item>
                <Item>
                {this.state._errUsername===true ?
                  <View ><Text style={styles.error}>{this.state._errUsernameMsg}</Text></View> : <View></View>
                }
                </Item>

                <Item floatingLabel>
                  <Label>Phone</Label>
                  <Icon active name='ios-keypad' />
                  <Input value={this.state.phone}
                    onChangeText={(value) => {
                      this.setState({phone: value});
                      let v = validate('phone',value);
                      this.setState({_errPhone:v[0],_errPhoneMsg:v[1]});
                    }
                  }/>
                </Item>
                <Item>
                {this.state._errPhone===true ?
                  <View ><Text style={styles.error}>{this.state._errPhoneMsg}</Text></View> : <View></View>
                }
                </Item>

              </Body>
            </CardItem>
            <CardItem style={styles.center}>
            <Item>
            <Button iconLeft rounded onPress={() => this.register(navigate)} style={{width:140, justifyContent: 'center'}}>
              <Icon active name='ios-contact' />
              <Text>Register</Text>
            </Button>
            <Label style={{width:10}} />
            <Button iconLeft rounded onPress={() => this.clearText()} style={{width:140, justifyContent: 'center'}}>
              <Icon active name='ios-close' />
              <Text>Clear</Text>
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
  fullscr:{
    marginTop: 50,
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

export default Registration;
