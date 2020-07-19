import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configJson from '../../config.json';

function Home() {
  useEffect(() => {
    getOrdersList();
  }, []);
  
  const [orders, setOrders] = useState([]);console.log(orders)

  const getOrdersList = async () => {
    let list;
    const url = configJson.envData[configJson.env].url + 'orders';
    await axios.get(url).then(result => {
      list = result.data; 
    });
    setOrders(list);
  }

  return (
    <div>
      {orders ? (
        orders.map(or => {
          return (
            <p>{or.state}</p>
          )
        })
      ):null}
    </div>
  );
}

export default Home;
