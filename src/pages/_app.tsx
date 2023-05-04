import React from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "@/libs/store/store";
import fonts from "@/libs/constants/fonts";

export default function App({ Component, ...props }) {
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <GoogleAnalytics trackPageViews />
      <div className={`${fonts.primary.variable} ${fonts.secondary.variable} font-primary`}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
