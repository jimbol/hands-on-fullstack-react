import {
  Routes,
  Route,
} from "react-router-dom";
import * as pages from '../../pages';
import { Post } from '../../posts';

const {
  HomePage,
  CreatePost,
  UpdatePost,
} = pages;

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:postId" element={<Post />} />
      <Route path="/update-post/:postId" element={<UpdatePost />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
};
