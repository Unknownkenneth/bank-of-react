/*==================================================
src/components/Credits.js
 to round amount use  this website to help https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript 
The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, {Component} from 'react'
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
class  Credits extends Component{
  render(){
     let credits = this.props.credits;
  return(
    <div>
      <h1> Credits</h1>
    
    <div>
      <table>
        <tr>
          <th> Description  </th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
        {credits.map((val, key) => {
          return(
            <tr key={key}>
             <td>{val.description}</td>
             <td>{val.amount}</td>
              <td>{val.date.slice(0,10)}</td>
            </tr>
          )

        }

        
        
        
        
        )}

      </table>
    </div>
    <AccountBalance accountBalance={this.props.accountBalance}/>
    <form onSubmit={this.props.addCredit}>
      <label>
      Description:
      <input type="text" name='description'/>
      </label>
        <label>
          Amount:
          <input type="number" name='amount'/>
          <button type="submit">Submit</button>
        </label>


    </form>
</div>

  )
  }
}
//const Credits = (props) => {
 // return (
 //   <div>
 //     <h1>Credits</h1>
 //////     <br/>
 //     <Link to="/">Return to Home</Link>
 //   </div>
 /// )
//}

export default Credits;