import React, { useContext } from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';
import CardFooter from '../../components/Card/CardFooter';
import CardIcon from '../../components/Card/CardIcon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PayOrderContext from '../../contexts/payOrderContext';
import { SyncLoader } from 'react-spinners';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import styles from './styles';

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

function PayOrder(props) {
  const classes = useStyles();
  const { payOrderData } = useContext(PayOrderContext);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <GridContainer style={styles.container}>
      <Typography variant="h5" className={classes.title}>
        Pay Order
      </Typography>
      <div style={styles.card}>
        {!payOrderData.app ? (
          <div style={styles.loader}>
            <SyncLoader size={15} color={"#5e0070"} loading={true} />
          </div>
        ) : (
            <div>
              <GridContainer style={styles.gridContainer}>
                <GridItem xs={12} sm={4} md={4} style={styles.item}>
                  <Card>
                    <CardHeader color="warning" stats icon>
                      <CardIcon color={'success'}>
                        <AttachMoneyIcon />
                      </CardIcon>
                      <h2 style={styles.title}>Make the payment</h2>
                    </CardHeader>
                    <CardBody>
                      <p style={styles.paragraph}>
                        Total {formatter.format(payOrderData.total)}
                      </p>
                      <a style={styles.link} href={payOrderData.url}>
                        Click here
                      </a>
                    </CardBody>
                    <CardFooter stats>
                      <div style={styles.footer}>
                        <div style={styles.date}>
                          Due date : {new Date(payOrderData.dueDate).toISOString().slice(0, 10)}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          )
        }
      </div>
    </GridContainer>
  )
};

export default PayOrder;