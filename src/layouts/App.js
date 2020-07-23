import React, { useState } from 'react';
import Cart from '../views/Cart/Cart';
import AppBar from '../components/AppBar/AppBar';
import PayOrder from '../views/PayOrder/PayOrder';
import PayOrderContext from '../contexts/payOrderContext';
import CheckoutContext from '../contexts/checkoutContext';
import Payments from '../views/Payments/Payments';

function App() {
  const [payOrder, setPayOrder] = useState(false);
  const [payments, setPayments] = useState(false);
  const [payOrderData, setPayOrderData] = useState({});
  const [checkoutData, setCheckoutData] = useState({});
  return (
    <PayOrderContext.Provider value={{ payOrderData, setPayOrderData }}>
      <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
        <div style={{ backgroundColor: '#eeeeee' }}>
          <AppBar setPayments={setPayments} />
          {!payOrder && payments ? (
            <Payments />
          ) : (
              !payOrder ? (
                <Cart setPayOrder={setPayOrder} />
              ) : (!payments ? (
                <PayOrder setPayments={setPayments} />
              ) : (
                  <Payments />
                )
                )
            )}
        </div>
      </CheckoutContext.Provider>
    </PayOrderContext.Provider>
  )
};

export default App;
