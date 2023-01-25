import React from "react";
import App from "next/app";
import { Inter } from "@next/font/google";

import { Type as MegaMenuType } from "../globals/MegaMenu";
import { Type as Logo } from "../globals/logo";
import Header from "../components/Layout/Header";

import "../css/style.scss";

type AppProps = {
  pageProps: object;
  Component: React.FC<{}>;
} & {
  megaMenu: MegaMenuType;
  logo: Logo;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const MyApp = (appProps: AppProps): React.ReactElement => {
  const { Component, pageProps, megaMenu, logo } = appProps;

  return (
    <main className={`${inter.variable} font-sans`}>
      <Header megaMenu={megaMenu} logo={logo} />
      <Component {...pageProps} />
    </main>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  const [megaMenu, logo] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/mega-menu`).then(
      (res) => res.json()
    ),
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/logo`).then(
      (res) => res.json()
    ),
  ]);

  return {
    ...appProps,
    megaMenu,
    logo,
  };
};

export default MyApp;
