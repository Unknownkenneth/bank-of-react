import React, {Component} from 'react';
// import { render } from '@testing-library/react';
//import AccountBalance from './components/AccountBalance';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';
import axios from "axios"
import './App.css'
import AccountBalance from './components/AccountBalance';
//import './components/styles.css'




class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 0,
      currentUser:{
        userName: 'joe_shmo',
        memberSince: '07/23/96'
      },
      debits: [],
      credits:[],
      fetchedInitialData: false,
    }
  }    

  balance=()=>
  {
    return this.state.accountBalance;
  }
  async componentDidMount()
  {
    let debits = this.state.debits;
    let credits = this.state.credits;
    if (!this.state.fetchedInitialData) {
      debits = (await axios.get("https://johnnylaicode.github.io/api/debits.json")).data;
      credits = (await axios.get("https://johnnylaicode.github.io/api/credits.json")).data;
      this.setState({ fetchedInitialData: true });
    }

    let creditSum=0;
    let debitSum=0;
    debits.forEach((debit)=>{
      debitSum+=debit.amount
    })
    credits.forEach((credit)=>{
      creditSum+=credit.amount
    })
    let accountBalance = (creditSum - debitSum).toFixed(2);
    this.setState({debits,credits,accountBalance});
  }

  refreshBalance = () => {
    this.setState(state => {
      const credits = state.credits;
      const debits = state.debits;

      const creditsTotal = credits.reduce((a, b) => a + b.amount, 0);
      const debitsTotal = debits.reduce((a, b) => a + b.amount, 0);
      return {accountBalance: (creditsTotal - debitsTotal).toFixed(2)};
    })
  }
  
  addCredit = (exist) => {
    exist.preventDefault();
    this.setState({ credits: this.state.credits.concat([{
      id: crypto.randomUUID(),
      amount: parseFloat(exist.target.elements.amount.value),
      description: exist.target.elements.description.value,
      date: new Date().toISOString(),
    }]) });
    this.refreshBalance();
  }

  addDebit = (exist) => {
    exist.preventDefault();
    this.setState({ debits: this.state.debits.concat([{
      id: crypto.randomUUID(),
      amount: parseFloat(exist.target.elements.amount.value),
      description: exist.target.elements.description.value,
      date: new Date().toISOString(),
    }]) });
    this.refreshBalance();
  }

  mockLogIn = (logInInfo) => {
      const newUser = {...this.state.currentUser}
      newUser.userName = logInInfo.userName
      this.setState({currentUser: newUser})
  }
     render() {

      const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
      const UserProfileComponent = () => (
          <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
      
      );
      const LogInComponent = () => (<Login user={this.state.currentUser} mockLogIn={this.mockLogIn} />);
      const DebitsComponent = () => (<Debits addDebit={this.addDebit} debits={this.state.debits} accountBalance={this.state.accountBalance}/>);
      const CreditsComponent = () => (<Credits addCredit={this.addCredit} credits={this.state.credits} accountBalance={this.state.accountBalance}/>);

    return (
        <Router basename="/bank-of-react">
        {/* // <Router> */}
          <div>
          <Switch>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path ="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debits" render={DebitsComponent}/>
            <Route exact path="/credits" render={CreditsComponent}/>
          </Switch>
          </div>
        </Router>
    );
  }

}

export default App;