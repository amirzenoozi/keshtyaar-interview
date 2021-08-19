import 'regenerator-runtime/runtime';
import App from './app';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { store } from './redux/store';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { create } from 'jss';
import { jssPreset, StylesProvider } from '@material-ui/core/styles';
import rtl from 'jss-rtl';

Sentry.init({
  dsn: 'https://2a908a0bd40b44b385eb3c122979aff8@sentry.mhsh.dev/9',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

// Configure JSS
const jss = create({ plugins: [ ...jssPreset().plugins, rtl() ] });

ReactDOM.render(
    <Provider store={store}>
      <StylesProvider jss={jss}>
        <App />
      </StylesProvider>
    </Provider>,
    document.getElementById('root')
);
