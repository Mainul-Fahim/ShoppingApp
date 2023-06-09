import "../styles/globals.css";
import React, { Fragment, useEffect } from "react";
import type { AppProps } from "next/app";
import Layout from "../components/Layouts/Layout";
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import setAuthToken from "../utils/setAuthToken";
import { LOGOUT } from '../actions/types';

const MyApp = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {
    // check for token in LS when app first runs
    if(typeof window !== "undefined"){
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
