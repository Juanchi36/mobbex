import axios from 'axios';
import configJson from '../config.json';

export const getOrdersList = async () => {
  const url = configJson.envData[configJson.env].url + 'orders';
  await axios.get(url).then(result => {console.log(result)
    if (result.status === 200){
      return result.data;
    } 
    return [];
  });
}

