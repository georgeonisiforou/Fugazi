import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Head from "next/head";
import Ticker from "./Ticker";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@200,500,300,600,400,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <Ticker />
      <main className="p-8">{children}</main>
    </>
  );
}
