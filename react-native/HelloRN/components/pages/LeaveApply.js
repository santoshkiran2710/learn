import React from 'react';
import { TouchableOpacity, StyleSheet} from 'react-native';
import { Container, Header, Left, Right,Title,
        Form, Content, Card, CardItem, Body, Text,
        Footer, FooterTab, Button, Icon, Input,
        Item, Label, Picker } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';

var moment = require('moment');
class LeaveApply extends React.Component {
  constructor(props){
    super(props);
    //this.onSubmit.bind(this);

    this.state = {
      leavetype:'',
      fromdate:'',
      todate:'',
      comments:'',
      phone:'',
      personalemail:'',
      approvalmanager:'',
      isFromShow: false,
      isToShow:false,
    }
  }
  componentDidMount(){

  }

  clearText = () => {
    this.setState({
        leavetype:'',
        fromdate:'',
        todate:'',
        comments:'',
        phone:'',
        personalemail:'',
        approvalmanager:'',
        isFromShow: false,
        isToShow:false,
    });

  }
  onLeaveTypeChange(value: string) {
    this.setState({
      leavetype: value
    });
  }
  _showFromPicker = () => this.setState({ isFromShow: true });
  _hideFromPicker = () => this.setState({ isFromShow: false });
  _fromDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.state.fromdate = moment(date).format('DD-MM-YYYY')+'';
    this._hideFromPicker();
  };
  _showToPicker = () => this.setState({ isToShow: true });
  _hideToPicker = () => this.setState({ isToShow: false });
  _toDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.state.todate = moment(date).format('DD-MM-YYYY')+'';
    this._hideToPicker();
  };

  applyLeave(navigate){
    navigate('Home');
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
              Apply Leave
            </Title>
          </Body>
          <Right>
          <Button transparent onPress={() => navigate('Login')}>
            <Icon name="ios-log-out" />
          </Button>
          </Right>
        </Header>
        <Content style={{width: '100%', marginTop:0}}>
          <Form>

            <Picker
              mode="dropdown"
              placeholder="Leave Type"
              selectedValue={this.state.leavetype}
              onValueChange={this.onLeaveTypeChange.bind(this)}
              >
              <Item label="Compensatory Off" value="key0" />
              <Item label="Earned Leave" value="key1" />
              <Item label="Leave without pay" value="key2" />
              <Item label="Medical Leave" value="key3" />
              <Item label="Optional Leave" value="key4" />
              <Item label="Paternity Leave" value="key5" />
            </Picker>

            <Item floatingLabel last>
              <Label>from date</Label>
              <Input value={this.state.fromdate} />
            </Item>
            <Item>
            <Button transparent info onPress={this._showFromPicker}><Text>Pick FromDate</Text></Button>
            <DateTimePicker
              isVisible={this.state.isFromShow}
              onConfirm={this._fromDatePicked}
              onCancel={this._hideFromPicker}
              />
            </Item>


            <Item floatingLabel last>
              <Label>to date</Label>
              <Input value={this.state.todate} />
            </Item>
            <Item>
            <Button transparent info onPress={this._showToPicker}><Text>Pick ToDate</Text></Button>
            <DateTimePicker
              isVisible={this.state.isToShow}
              onConfirm={this._toDatePicked}
              onCancel={this._hideToPicker}
              />
            </Item>

            <Item floatingLabel last>
              <Label>Comments</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Phone</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Personal Email</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Approval Manager</Label>
              <Input />
            </Item>
            <Item style={{paddingTop: 20, paddingBottom: 20}}>
            <Button iconLeft rounded onPress={() => this.applyLeave(navigate)} style={{width:150, justifyContent: 'center'}}>
              <Icon active name='md-create' />
              <Text>Apply Leave</Text>
            </Button>
            <Label style={{width:20}} />
            <Button iconLeft rounded onPress={() => this.clearText()} style={{width:150, justifyContent: 'center'}}>
              <Icon active name='ios-close' />
              <Text>Cancel</Text>
            </Button>
            </Item>
          </Form>



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

export default LeaveApply;
