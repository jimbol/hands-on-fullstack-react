import '@aws-amplify/ui-react/styles.css';

import Amplify from 'aws-amplify';
import { Container } from '@mui/material';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'

import { AppRouter, Navigation } from './modules/router';
import { store } from './modules/bootup/store'
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          <Navigation />
          <AppRouter />
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
