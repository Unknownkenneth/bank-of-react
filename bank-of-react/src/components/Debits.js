/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/

import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';


class Debits extends Component {
    render() {
       let debits = this.props.debits;
       return (
          <div className='background'>
            <h1 className='title'>Debits</h1>
             <div className='history'>
                 {debits.map(debit => (
                  <div key={debit.id}>
                      <li>{debit.amount} {debit.description} {debit.date.slice(0, 10)}</li>
                   </div>  ))}
             <div className='balance'><AccountBalance accountBalance={this.props.accountBalance}/></div>
                    
                    <form onSubmit={this.props.addDebit}>
                        <p>
                            <label id="description"> Description: </label>
                            <input type="text" name="description"/>
                            <label id="amount"> Amount: </label>
                            <input type="number" name="amount"/>
                            <button type="submit"> Submit</button>
                        </p>
                    </form>
                    <div className='link'>
                    <Link to="/"> Home </Link>
                    <Link to="/Login"> Login </Link>
                    <Link to="/UserProfile"> User Profile </Link>
                    <Link to="/Credits"> Credits </Link>
                    </div>


                </div>
            </div>

        );
    }
}

export default Debits;