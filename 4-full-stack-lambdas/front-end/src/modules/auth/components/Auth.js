import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useDispatch } from 'react-redux';

import * as slices from '../slice';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useEffect } from 'react';

const { userActions } = slices;

export const Auth = withAuthenticator(({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      const { username } = user;

      dispatch(userActions.signIn({
        username,
      }));
      navigate('/');
    }
  });

  return (
    <Typography>Authenticated</Typography>
  );
});
