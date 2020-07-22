import React, { useState } from 'react';
import Cart from '../views/Cart/Cart';
import AppBar from '../components/AppBar/AppBar';
import PayOrder from '../views/PayOrder/PayOrder';
import PayOrderContext from '../contexts/payOrderContext';
import Payments from '../views/Payments/Payments';

function App() {
  const [payOrder, setPayOrder] = useState(false);
  const [payments, setPayments] = useState(false);
  const [payOrderData, setPayOrderData] = useState({});
  return (
    <PayOrderContext.Provider value={{ payOrderData, setPayOrderData }}>
      <div style={{ backgroundColor: '#eeeeee' }}>
        <AppBar />
        {!payOrder ? (
          <Cart setPayOrder={setPayOrder} />
        ) : (!payments ? (
          <PayOrder setPayments={setPayments}/>
        ) : (
          <Payments />
        )
            
          )}
      </div>
    </PayOrderContext.Provider>
  )
};

export default App;
