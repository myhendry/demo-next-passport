import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import axios from "axios";

import "nprogress/nprogress.css"; //styles of nprogress
import "../styles/index.css";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_PROD_URL}`
    : `${process.env.NEXT_PUBLIC_DEV_URL}`;

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
