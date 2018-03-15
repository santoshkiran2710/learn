import React from 'react';
import { StyleSheet} from 'react-native';
import { Container, Header, Left, Right,Title, Content, Card, CardItem, Body, Text, Footer, FooterTab, Button, Icon, Input, Item, Label } from 'native-base';


class Leave extends React.Component {
  constructor(props){
    super(props);
    //this.onSubmit.bind(this);

    this.state = {
      emailid:'',
      password:'',
      username:'',
      phone:'',
    }
  }
  componentDidMount(){

  }
  register(navigate){
    //console.log("1"+this.state.emailid+'---'+this.state.password);
    navigate('Home');
  }
  clearText = () => {
    this.setState({
        emailid:'',
        password:'',
        confirmpassword:'',
        username:'',
        phone:'',
    });

  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <Container style={styles.container}>
        <Header style={styles.fullscr}>
        <Left>
        <Button transparent onPress={() => navigate('Home')}>
          <Icon name="md-arrow-back" />
        </Button>
        </Left>
        <Body>
            <Title>
              Leave List
            </Title>
          </Body>
          <Right>
          <Button transparent onPress={() => navigate('Login')}>
            <Icon name="ios-log-out" />
          </Button>
          </Right>
        </Header>
        <Content style={styles.fullscr} padder>


        </Content>
        <Footer>
        <FooterTab>
            <Button vertical onPress={() => navigate('Leave')}>
              <Icon name="apps" />
              <Text>Leaves</Text>
            </Button>
            <Button vertical onPress={() => navigate('LeaveApply')}>
              <Icon name="ios-happy" />
              <Text>Apply Leave</Text>
            </Button>
            <Button vertical onPress={() => navigate('LeaveWTO')}>
              <Icon name="ios-happy" />
              <Text>Apply WTO</Text>
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
  center:{
    justifyContent: 'center',
  }
});

export default Leave;
