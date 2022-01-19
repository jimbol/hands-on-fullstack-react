import {
  Routes,
  Route,
} from "react-router-dom";
import * as pages from '../../pages';
import { Post, CreatePost, EditPost } from '../../posts';

const {
  Home,
} = pages;

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:postId" element={<Post />} />
      <Route path="/update-post/:postId" element={<EditPost />} />
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
