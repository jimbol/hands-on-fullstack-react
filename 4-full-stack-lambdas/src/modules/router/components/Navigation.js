import { Auth } from 'aws-amplify';
import { Typography, Toolbar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as auth from '../../auth';

const { userActions } = auth;

const getUser = ({ user }) => user;

export const Navigation = () => {
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const signOut = async () => {
    await Auth.signOut();
    dispatch(userActions.signOut());
    navigate('/');
  };

  return (
    <Toolbar style={{ justifyContent: 'space-between' }}>
      <Typography
        variant="h4"
        color="primary"
        style={{
          textShadow: '1px 1px black, 2px 2px #fff',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/')}
      >
        <i>The Nerd Blog</i>
      </Typography>
      <div>
        {user ? (
          <Button
            onClick={() => signOut()}
          >Sign out</Button>
        ) : (
          <Button
            onClick={() => navigate('/auth')}
          >Sign In/Sign Up</Button>
        )}
        &nbsp;
        <Button
          onClick={() => navigate('/')}
          variant="contained"
        >Posts</Button>
        {user ? (
          <>
            &nbsp;
            <Button
              onClick={() => navigate('/create-post')}
              variant="contained"
            >Create Post</Button>
          </>
        ) : null}
      </div>
    </Toolbar>
  );
}
