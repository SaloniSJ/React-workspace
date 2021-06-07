import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Check from '@material-ui/icons/Check';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FireplaceIcon from '@material-ui/icons/Fireplace';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import * as OrderServiceAPI from '../../../services/order/OrderServiceAPI';

import {toast} from 'react-toastify'
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 136deg, rgb(33,113,242) 0%, rgb(87,64,233) 50%, rgb(135,35,138) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 136deg, rgb(33,113,242) 0%, rgb(87,64,233) 50%, rgb(135,35,138) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(33,113,242) 0%, rgb(87,64,233) 50%, rgb(135,35,138) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(33,113,242) 0%, rgb(87,64,233) 50%, rgb(135,35,138) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <FastfoodIcon />,
    2: <FireplaceIcon />,
    3: <VideoLabelIcon />,
    4: <AssignmentTurnedInIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['ORDER PLACED', 'PREPARING ORDER', 'ORDER IS READY', 'ORDER HANDED OVER'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'ORDER PLACED';
    case 1:
      return 'PREPARING ORDER';
    case 2:
      return 'ORDER IS READY';
    case 3:
      return 'ORDER HANDED OVER';
  }
}
export const CustomStepper = (props) => {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [orderId, setOrderId] = React.useState('');
  const steps = getSteps();

  const handleNext = (order_status) => {
    toast.info('Please wait we are changing your order status.')
    console.log("Order Status==>",order_status, props);
    const payload = { order_status: order_status, order_id: props.order.order_id }
    OrderServiceAPI.updateOrderStatus(payload).then(response => {
      if (response.data.status) {
        console.log(response)
        const payload = {
          order_id: props.order.order_id,
          page: 0,
          size: 5
        }
        OrderServiceAPI.fetchOrderDetailsByOrderId(payload).then(response => {
          if (response.data.status) {
            console.log(response)
            toast.success('Order Status Changed Successfully.')
            const payload = {
              order_id: props.order.order_id,
              page: 0,
              size: 5
          }
            props.fetchOrderDetailsByOrderId(payload);
            if (response.data.data.order_status === 'ORDER PLACED') setActiveStep(0)
            if (response.data.data.order_status === 'PREPARING ORDER') setActiveStep(1)
            if (response.data.data.order_status === 'ORDER IS READY') setActiveStep(2)
            if (response.data.data.order_status === 'ORDER HANDED OVER') setActiveStep(3)
          }
        })
      }
    })

    //setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    console.log(props)
    setOrderId(props.order.order_id)
    const payload = {
      order_id: props.order.order_id,
      page: 0,
      size: 5
    }
    OrderServiceAPI.fetchOrderDetailsByOrderId(payload).then(response => {
      if (response.data.status) {
        console.log(response)

        if (response.data.data.order_status === 'ORDER PLACED') setActiveStep(0)
        if (response.data.data.order_status === 'PREPARING ORDER') setActiveStep(1)
        if (response.data.data.order_status === 'ORDER IS READY') setActiveStep(2)
        if (response.data.data.order_status === 'ORDER HANDED OVER') setActiveStep(3)
      }
    })
  }, [])

  
  return (
    <Fragment>
      <div className={classes.root}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel onClick={() => handleNext(label)} StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

      </div>
    </Fragment>
  )

}

export default CustomStepper;
