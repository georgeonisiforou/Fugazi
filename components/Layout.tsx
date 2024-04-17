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
      <Navbar />
      <Ticker />
      <main className="p-8">{children}</main>
    </>
  );
}
