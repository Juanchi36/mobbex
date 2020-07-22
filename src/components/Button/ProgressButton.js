import React, { useState, useContext } from 'react';
import { AwesomeButtonProgress } from 'react-awesome-button';
import axios from 'axios';
import configJson from '../../config.json';
import 'react-awesome-button/dist/styles.css';
import PayOrderContext from '../../contexts/payOrderContext';

function ProgressButton(props) {
  const [error, setError] = useState(false);
  const [payOrderText, setPayOrderText] = useState('Pay Order');
  const [checkoutText, setcheckoutText] = useState('Instant Pay');

  const { setPayOrderData } = useContext(PayOrderContext);

  const doSomethingThenCall = async (element, next) => {
    let url = configJson.envData[configJson.env].url + 'payOrderGenerate';
    await axios.post(url, props.data).then(result => {
      if (result.data.result) {
        props.setPayOrder(true);
        setPayOrderData(result.data.data)
      } else {
        setError(true);
      }
    })
    if (element.dataset.status === 'Error') {
      setPayOrderText('Try Again');
      setcheckoutText('Try Again');
    }
    next();
  }

  return (
    <div style={{ margin: '10px 0', textAlign: 'center' }}>
      <AwesomeButtonProgress
        type={!error ? 'primary' : 'primary'}
        resultLabel={!error ? 'Done' : 'Error'}
        loadingLabel='Waiting'
        onPress={doSomethingThenCall}
      >
        {props.type === 'pay-order' ? payOrderText : checkoutText}
      </AwesomeButtonProgress>
    </div>
  );
}

export default ProgressButton;
