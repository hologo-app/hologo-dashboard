// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://hologo.world" target="_blank" underline="hover">
      hologo@world
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://hologo.world/" target="_blank" underline="hover">
      &copy; hologo.world
    </Typography>
  </Stack>
);

export default AuthFooter;
