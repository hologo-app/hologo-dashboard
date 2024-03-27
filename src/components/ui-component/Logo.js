// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';

 *
 */
import logo from 'assets/images/hologo.png';
// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
   
  
     
      <img src={logo} alt="Berry" width="50px" />
     
    
   
  );
};

export default Logo;
