import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configJson from '../../config.json';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';
import CardFooter from '../../components/Card/CardFooter';
import CardIcon from '../../components/Card/CardIcon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { SyncLoader } from 'react-spinners';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
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

function Payments() {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let payments;
    const url = configJson.envData[configJson.env].url + 'hook-listener';
    await axios.get(url).then(result => {
      payments = result.data;
    });
    setPayments(payments);
  }
  const classes = useStyles();
  const [payments, setPayments] = useState([]);

  const getIcon = (payment) => {
    switch (payment.data.payment.status.code) {
      case 0:
        return (
          <Tooltip title={'New'}>
            <Avatar style={styles.newAvatar} variant={'rounded'}>
              <FiberNewIcon />
            </Avatar>
          </Tooltip>
        );
      case 1:
        return (
          <Tooltip title={'Pending'}>
            <Avatar style={styles.pendingAvatar} variant={'rounded'}>
              <ReportProblemOutlinedIcon />
            </Avatar>
          </Tooltip>
        );
      case 200:
        return (
          <Tooltip title={'Paid'}>
            <Avatar style={styles.paidAvatar} variant={'rounded'}>
              <CheckCircleOutlineOutlinedIcon />
            </Avatar>
          </Tooltip>
        );
      default:
        break;
    }
  }
  return (
    <GridContainer style={{ width: '100%' }}>
      <Typography variant="h5" className={classes.title}>
        My payments
      </Typography>
      <div style={{ textAlign: 'center', marginTop: 20, width: '100%' }}>
        {!payments[0] ? (
          <div style={{ margin: 50 }}>
            <SyncLoader size={15} color={'#5e0070'} loading={true} />
          </div>
        ) : (
            <div>
              <GridContainer style={styles.container}>
                <GridItem xs={12} sm={4} md={4} style={{ marginBottom: 100 }}>
                  <Card>
                    <CardHeader color='warning' stats icon>
                      <CardIcon color={'primary'}>
                        <AccountBalanceIcon />
                      </CardIcon>
                      <h2 style={styles.title}>Payments state</h2>
                    </CardHeader>
                    <CardBody>
                      <div style={styles.cardBody}>
                        <GridContainer margin={1}>
                          <List className={classes.root}>
                            {payments.map((payment, index) => {
                              return (
                                <ListItem key={index}>
                                  <ListItemAvatar>
                                    {getIcon(payment)}
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={new Date(payment.timeStamp).toISOString().slice(0, 10)}
                                    secondary={`Total $ ${payment.data.payment.total}`}
                                    style={{ marginTop: 5, color: '#3c4858' }}
                                  />
                                </ListItem>
                              )
                            })
                            }
                          </List>
                        </GridContainer>
                      </div>
                    </CardBody>
                    <CardFooter stats>
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

export default Payments;