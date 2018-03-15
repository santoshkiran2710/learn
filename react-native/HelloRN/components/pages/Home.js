import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Header, Left, Right, Title, Content, Card, CardItem, Body, Thumbnail, Text, Footer, FooterTab, Button, Icon, Input, Item } from 'native-base';
import {List, ListItem} from 'native-base';
import logo from '../assets/img/logo.jpg';
import water from '../assets/img/water.jpg';

class Home extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log("Home component mounted");
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Header style={styles.fullscr}>
        <Left>

        </Left>
        <Body>
            <Title>
              Home
            </Title>
        </Body>
        <Right>
        <Button transparent onPress={() => navigate('Login')}>
          <Icon name="ios-log-out" />
        </Button>
        </Right>
        </Header>
        <Content style={styles.fullscr} padder>
        <Card style={{flex: 0}}>
                    <CardItem>
                      <Left>
                        <Thumbnail source={logo} />
                        <Body>
                          <Text>Portal</Text>
                          <Text note>One stop for Leaves</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Image source={water} style={{height: 200, width: '100%', flex: 1}}/>
                        <Text>
                          Life''s true gift lies in your freedom to design it beautifully. With each rise of the sun, you get to chase the opportunity to fill your days with meaning—to live your life the way you choose.
                        </Text>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Button transparent textStyle={{color: '#87838B'}}>
                          <Icon name="logo-github" />
                          <Text>2k stars</Text>
                        </Button>
                      </Left>
                    </CardItem>
                  </Card>
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


export default Home;
