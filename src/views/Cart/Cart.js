import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configJson from '../../config.json';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';
import CardFooter from '../../components/Card/CardFooter';
import CardIcon from '../../components/Card/CardIcon';
import Typography from '@material-ui/core/Typography';
import ComputerIcon from '@material-ui/icons/Computer';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { SyncLoader } from 'react-spinners';
import ProgressButton from '../../components/Button/ProgressButton';
// import AwesomeButtonProgress from 'react-awesome-button/src/components/AwesomeButtonProgress';
// import ProgressButton from 'react-progress-button'
// import '../../../node_modules/react-progress-button/react-progress-button.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'black',
    textAlign: 'center',
  },
  toolBar: {
    background: '#5e0070',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: 'none',
  },
  appBar: {
    boxShadow: 'none',
  },
}));

function Cart(props) {
  useEffect(() => {
    getData();
  }, []);

  const classes = useStyles();

  const getData = async () => {
    let url;
    let order;
    let products;
    let productsTemp = [];
    url = configJson.envData[configJson.env].url + 'orders/5f1359e5e68ad255f0b8f9eb';
    await axios.get(url).then(result => {
      order = result.data;
    });
    setOrders(order);
    url = configJson.envData[configJson.env].url + 'products';
    await axios.get(url).then(result => {
      products = result.data;
    });
    products.map(product => {
      order.products.map(orderProduct => {
        if (product._id === orderProduct) {
          productsTemp.push(product);
        }
        return true;
      })
      return true;
    })
    setProducts(productsTemp);
  }

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  // const [buttonState, setButtonState] = useState('');

  const setIcon = (type) => {
    switch (type) {
      case 'laptop':
        return [<ComputerIcon />, 'primary'];
      case 'phone':
        return [<PhoneIphoneIcon />, 'rose'];
      default:
        return [<ComputerIcon />, 'rose'];
    }
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const getTotal = () => {
    let amount = 0;
    products.map(product => {
      amount += product.price
      return true;
    })
    return formatter.format(amount);
  };
  const getTotalPlain = () => {
    let amount = 0;
    products.map(product => {
      amount += product.price
      return true;
    })
    return amount;
  };

  const getItems = () => {
    let items = [];
    products.map(product => {
      items.push({
        quantity: 1,
        description: product.description,
        total: product.price
      })
    })
    return items;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Typography variant="h5" className={classes.title}>
              Products
            </Typography>
          </div>
          {!products[0] ? (
            <div style={{ margin: 50 }}>
              <SyncLoader size={15} color={"#5e0070"} loading={true} />
            </div>
          ) : (
              <GridContainer>
                {products.map((product, key) => {
                  return (
                    <GridItem xs={12} sm={6} md={6} key={key}>
                      <Card>
                        <CardHeader color="warning" stats icon>
                          <CardIcon color={setIcon(product.type)[1]}>
                            {setIcon(product.type)[0]}
                          </CardIcon>
                          <h2 style={{ fontSize: 24, color: "#999", margin: 0, paddingTop: 10 }}>{product.brand}</h2>
                          {/* <p style={{ color: "#3C4858", marginTop: 0 }}>
                            {product.brand}
                          </p> */}
                        </CardHeader>
                        <CardBody>
                          <p style={{ color: "#3C4858", marginTop: 0 }}>
                            {product.description}
                          </p>
                        </CardBody>
                        <CardFooter stats>
                          <div style={{ color: "#000  ", display: "inline-flex", fontSize: 16, lineHeight: "22px", width: '100%', justifyContent: 'flex-end' }}>
                            {/* <AttachMoneyIcon /> */}
                            <div style={{ marginLeft: 10 }}>
                              {formatter.format(product.price)}
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                  )
                })}
              </GridContainer>
            )}
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Typography variant="h5" className={classes.title}>
              Payment
            </Typography>
          </div>
          {!products[0] ? (
            <div style={{ margin: 50 }}>
              <SyncLoader size={15} color={"#5e0070"} loading={true} />
            </div>
          ) : (
              <GridContainer style={{ justifyContent: 'center' }}>
                <GridItem xs={12} sm={10} md={10}>
                  <Card>
                    <CardHeader color="warning" stats icon>
                      <CardIcon color="success">
                        <AttachMoneyIcon />
                      </CardIcon>
                      <h2 style={{ fontSize: 24, color: "#999", margin: 0, paddingTop: 10 }}>Total {getTotal()}</h2>
                    </CardHeader>
                    <CardBody>

                      {products.map((product, key) => {
                        return (
                          <div key={key}>
                            <div style={{ display: 'inline-flex', width: '70%', justifyContent: 'space-between' }}>
                              <p style={{ color: "#3C4858", marginTop: 0 }}>
                                {product.title}
                              </p>
                              <p style={{ color: "#3C4858", marginTop: 0 }}>
                                {formatter.format(product.price)}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </CardBody>
                    <CardFooter stats>
                      <GridContainer style={{ width: '100%' }}>
                        <GridItem xs={12} sm={6} md={6}>
                          <ProgressButton
                            type={'pay-order'}
                            data={{
                              total: getTotalPlain(),
                              description: 'Pay order for user@user.com',
                              email: 'user@user.com',
                              phone: '55555555',
                              reference: '5f1359e5e68ad255f0b8f9eb',
                              due: { day: 18, month: 8, year: 20 },
                              secondDue: { day: 30, month: 8, year: 20 },
                              return_url: 'localhost:3000',
                              webhook: 'localhost:3000/my-payments',
                              items: getItems()
                            }}
                            setPayOrder={props.setPayOrder}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <ProgressButton
                            type={'checkout'}
                            data={{
                              total: getTotalPlain(),
                              description: 'Pay order for user@user.com',
                              email: 'user@user.com',
                              phone: '55555555',
                              reference: '5f1359e5e68ad255f0b8f9eb',
                              due: { day: 18, month: 8, year: 20 },
                              secondDue: { day: 30, month: 8, year: 20 },
                              return_url: 'localhost:3000',
                              webhook: 'localhost:3000/my-payments',
                            }}
                            setPayOrder={props.setPayOrder}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
            )}
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default Cart;
