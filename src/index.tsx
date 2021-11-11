import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Normalize } from 'styled-normalize';

import App from './components/App';

render(
  <React.StrictMode>
    <ChakraProvider>
      <Normalize />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (module.hot) {
  module.hot.accept();
}
