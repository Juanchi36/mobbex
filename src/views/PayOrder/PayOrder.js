import React, { useContext } from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';
import CardFooter from '../../components/Card/CardFooter';
import CardIcon from '../../components/Card/CardIcon';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import PayOrderContext from '../../contexts/payOrderContext';
import { SyncLoader } from 'react-spinners';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Button from '@material-ui/core/Button';

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
    marginTop: 30,
    marginBottom: 20,
    width: '100%'
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

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[700]),
    backgroundColor: purple[700],
    '&:hover': {
      backgroundColor: purple[900],
    },
  },
}))(Button);

function PayOrder(props) {
  const classes = useStyles();
  const { payOrderData } = useContext(PayOrderContext); console.log(payOrderData)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <GridContainer style={{ width: '100%' }}>
      <Typography variant="h5" className={classes.title}>
        PAY ORDER
      </Typography>
      <div style={{ textAlign: 'center', marginTop: 20, width: '100%' }}>
        {!payOrderData.app ? (
          <div style={{ margin: 50 }}>
            <SyncLoader size={15} color={"#5e0070"} loading={true} />
          </div>
        ) : (
            <div>
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <Card>
                    <CardHeader color="warning" stats icon>
                      <CardIcon color={'success'}>
                        <AttachMoneyIcon />
                      </CardIcon>
                      <h2 style={{ fontSize: 24, color: "#999", margin: 0, paddingTop: 10 }}>Total Amount</h2>
                    </CardHeader>
                    <CardBody>
                      <p style={{ color: "#3C4858", marginTop: 0, fontSize: 20, marginBottom: 0 }}>
                        {formatter.format(payOrderData.total)}
                      </p>
                    </CardBody>
                    <CardFooter stats>
                      <div style={{ color: "#000  ", display: "inline-flex", fontSize: 16, lineHeight: "22px", width: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ marginLeft: 10 }}>
                          {/* {formatter.format(product.price)} */}
                        Due date : {new Date(payOrderData.dueDate).toISOString().slice(0, 10)}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                  <Card>
                    <CardHeader color="warning" stats icon>
                      <CardIcon color={'info'}>
                        <AccountBalanceIcon />
                      </CardIcon>
                      <h2 style={{ fontSize: 24, color: "#999", margin: 0, paddingTop: 10 }}>Make the payment</h2>
                    </CardHeader>
                    <CardBody>
                      <a style={{ color: "#3C4858", marginTop: 0, fontSize: 20 }} href={payOrderData.url}>
                        {payOrderData.url}
                      </a>
                    </CardBody>
                    <CardFooter stats>
                      <div style={{ color: "#000  ", display: "inline-flex", fontSize: 16, lineHeight: "22px", width: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ marginLeft: 10 }}>
                          {/* {formatter.format(product.price)} */}
                          {payOrderData.email}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
              <ColorButton
                variant="contained"
                size="large"
                style={{
                  width: '98%',
                  height: 60,
                  marginBottom: 100
                }}
                onClick={() => props.setPayments(true)}
              >
                SEE MY PAYMENTS
              </ColorButton>
            </div>
          )
        }
      </div>
    </GridContainer>
  )
};

export default PayOrder;