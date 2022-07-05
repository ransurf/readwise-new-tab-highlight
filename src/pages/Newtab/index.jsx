import React from 'react';
import { render } from 'react-dom';

import Newtab from './Newtab';
import Background from '../../components/Background';
import { ThemeProvider } from '../../components/ThemeContext';
import './index.css';
import '../../assets/styles/tailwind.css';

render(
  <ThemeProvider>
    <Background>
      <Newtab />
    </Background>
  </ThemeProvider>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
