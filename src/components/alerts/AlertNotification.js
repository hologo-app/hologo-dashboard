import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useGlobal } from 'context/GlobalContext';

const AlertNotification = ({ message, severity , autoHideDuration = 3000 }) => {
  const [open, setOpen] = useState(false);
  const {
    setShowError,
    setShowSuccess,
    setShowLoginSuccess
  } = useGlobal();

  useEffect(() => {
    setOpen(true);

  }, []); 

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    let timer;
    if (!open) {
      timer = setTimeout(() => {
        setShowError(false);
        setShowSuccess(false);
        setShowLoginSuccess(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [open, setShowError, setShowSuccess, setShowLoginSuccess]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={Slide}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
export default AlertNotification;
