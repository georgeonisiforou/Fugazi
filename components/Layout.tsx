import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Head from "next/head";
import Ticker from "./Ticker";
import useWindowSize from "@/utils/useWindowSize";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const { dimensions } = useWindowSize();

  return (
    <>
      <Navbar />
      {dimensions.width > 768 && <Ticker />}
      <main className="p-8">{children}</main>
    </>
  );
}
