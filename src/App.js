// https://www.prokerala.com/news/finance/amortization-calculator.php
import { useState } from 'react';
import './App.css';
function App() {
  let [amount, setamount] = useState('200000');
  let [year, setyear] = useState('20');
  let [rate, setrate] = useState('8');
  let [intpm, setintpm] = useState('0.00000');
  let [pa, setpa] = useState(0);
  let [duration, setduration] = useState(0);
  let [pm, setpm] = useState(0);
  let [emi, setemi] = useState(0);
  let [total, settotal] = useState(0);
  let [yetotal, setyetotal] = useState(0);
  let [array, setarray] = useState([])

  const claculate = () => {
    let arr = [];
    let date = new Date();
    let gmo = date.getMonth();
    let gye = date.getFullYear();
    setamount(Number(amount))
    setyear(Number(year))
    setrate(Number(rate))
    let ra = rate / 12 / 100
    let tempemi = ((amount * ra * Math.pow((1 + ra), (year * 12))) / (Math.pow((1 + ra), (year * 12)) - 1)).toFixed(2);
    setpa((rate * 63) / 100);
    setpm(((rate * 63) / 100) / 12);
    setduration(year * 12)
    let tempamount = ((tempemi * 20 * 12 - amount).toFixed(2));
    let tempyetotal = (tempamount / year).toFixed(2);
    setemi(tempemi);
    settotal(tempamount);
    setyetotal(tempyetotal);
    let start = amount;
    let mon = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], count = gmo;
    for (let i = 1; i <= (year * 12); i++) {
      let int = (start * ra).toFixed(2);
      let principal = (tempemi - int).toFixed(2);
      let close = Number((start - principal).toFixed(2));
      if (i === (year * 12)) {
        close = 0;
      }
      if (count === 12) {
        count = 0;
        gye++;
      }
      arr.push([i, (mon[count] + ',' + gye), start, int, principal, tempemi, close])
      start = close;
      count++;
    }
    setarray(arr);
  }
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>Amount</td>
            <td><input type="text" value={amount} onChange={(e) => { setamount(e.target.value) }} /></td>
          </tr>
          <tr>
            <td>Year</td>
            <td><input type="text" value={year} onChange={(e) => { setyear(e.target.value) }} /></td>
          </tr>
          <tr>
            <td>Rate</td>
            <td><input type="text" value={rate} onChange={(e) => { setrate(e.target.value) }} /></td>
          </tr>
          <tr>
            <td></td>
            <td><input type="button" value="Click hear..." onClick={(e) => {
              claculate()
              // console.log(emi)
            }} /></td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>Payment Duration</td>
            <td><input type="text" value={duration} readOnly /></td>
          </tr>
          <tr>
            <td>Calculated Monthly EMI</td>
            <td><input type="text" value={emi} readOnly /></td>
          </tr>
          <tr>
            <td>Flat Interest Rate PA</td>
            <td><input type="text" value={pa} readOnly /></td>
          </tr>
          <tr>
            <td>Flat Interest Rate PM</td>
            <td><input type="text" value={pm} readOnly /></td>
          </tr>
          <tr>
            <td>Total Interest Amount</td>
            <td><input type="text" value={total} readOnly /></td>
          </tr>
          <tr>
            <td>Yearly Interest Amount</td>
            <td><input type="text" value={yetotal} readOnly /></td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>Number</td>
            <td>Starting Balance</td>
            <td>Interest Paid</td>
            <td>Principle Paid</td>
            <td>EMI</td>
            <td>Ending Balance</td>
          </tr>
          {
            array.map((e, ind) => {
              return (
                <tr key={ind}>
                  {
                    e.map((e2, ind2) => {
                      return (<td key={ind2}>{e2}</td>)
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  );
}

export default App;