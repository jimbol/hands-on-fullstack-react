import { Auth } from 'aws-amplify';
import {
  Routes,
  Route,
} from "react-router-dom";
import * as pages from '../../pages';
import { Post, CreatePost, EditPost } from '../../posts';
import * as auth from '../../auth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const { Auth: AuthPage, userActions } = auth;
const {
  Home,
} = pages;

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      if (!user) return;
      const { username } = user;
      dispatch(userActions.signIn({
        username,
      }));
    }

    checkUser();
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:postId" element={<Post />} />
      <Route path="/update-post/:postId" element={<EditPost />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/auth" element={<AuthPage />} />
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
