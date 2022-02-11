import { Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export const Posts = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h2">Posts</Typography>
      <Grid container spacing={2}>
        {
          posts.map((post) => {
            return (
              <Grid
                item
                xs={4}
                key={post.id}
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/post/${post.id}`)
                }
              >
                <Card style={{ padding: 12, flexDirection: 'column', display: 'flex' }}>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="p">{post.body.substring(0, 100)}...</Typography>
                </Card>
              </Grid>
            );
          })
        }
      </Grid>
    </div>
  );
}
