import { Typography, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router";

export const Navigation = () => {
  const navigate = useNavigate();
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
        <Button
          onClick={() => navigate('/')}
          variant="contained"
        >Posts</Button>
        &nbsp;
        <Button
          onClick={() => navigate('/create-post')}
          variant="contained"
        >Create Post</Button>
      </div>
    </Toolbar>
  );
}
