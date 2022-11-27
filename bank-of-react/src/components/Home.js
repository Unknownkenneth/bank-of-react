/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import  './styles.css';

class Home extends Component {
  render() {
    return (
      <div className='background'>
        <img className='picture'src="https://picsum.photos/200/200" alt="bank"/>
           
        <h1 className='title' >Bank of React</h1>
        <div style={{textAlign: 'center'}}>
            <Link className='link' to="./userProfile">User Profile</Link> 
            <Link className='link' to="./Login">Login </Link> 
            <Link className='link' to="./Debits">Debits </Link> 
            <Link className='link' to="./Credits">Credits </Link> 
          </div>
          <div className='balance'>
            <AccountBalance accountBalance={this.props.accountBalance}/>
         </div>
      </div> 
    );
  }
}

export default Home;