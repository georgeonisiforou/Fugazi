import React from "react";

type Props = {};

type Ticker = {
  name: string;
  price: number;
  pAndL: string;
};

const Ticker = (props: Props) => {
  const tickers: Ticker[] = [
    { name: "AAPL", price: 181.16, pAndL: "-1.36 (-0.75%)" },
    { name: "TSLA", price: 199.4, pAndL: "+7.43 (+3.87%)" },
    { name: "NFLX", price: 587.65, pAndL: "+4.09 (+0.70%)" },
    { name: "GOOG", price: 138.75, pAndL: "-6.54 (-4.50%)" },
    { name: "NVDA", price: 790.92, pAndL: "+2.75 (+0.35%)" },
    { name: "MSFT", price: 407.54, pAndL: "-2.80 (-0.68%)" },
    { name: "META", price: 487.05, pAndL: "+5.31 (+1.10%)" },
    { name: "KO", price: 60.34, pAndL: "-0.37 (-0.61%)" },
  ];

  return (
    <div className=" py-2 border-y-2 overflow-hidden select-none flex my-2 gap-[20px] ticker">
      <ul className="flex justify-between gap-[20px] items-center min-w-full animate-scroll">
        {tickers.map((ticker, idx) => {
          return (
            <li
              key={idx}
              className={`${
                ticker.pAndL.substring(0, 1) === "+"
                  ? "before:content-['⬆'] before:text-green-500 before:text-xl before:mx-1"
                  : "before:content-['⬇'] before:text-red-500 before:text-xl before:mx-1"
              }`}
            >
              <span className="font-bold">{ticker.name}</span>
              <span className="font-bold mx-1">{ticker.price}</span>
              <span
                className={`${
                  ticker.pAndL.substring(0, 1) === "+"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {ticker.pAndL}
              </span>
            </li>
          );
        })}
      </ul>
      <ul className="flex justify-between gap-[20px] items-center min-w-full animate-scroll">
        {tickers.map((ticker, idx) => {
          return (
            <li
              key={idx}
              className={`${
                ticker.pAndL.substring(0, 1) === "+"
                  ? "before:content-['⬆'] before:text-green-500 before:text-xl "
                  : "before:content-['⬇'] before:text-red-500 before:text-xl "
              }`}
            >
              <span className="font-bold">{ticker.name}</span>
              <span className="font-bold mx-1">{ticker.price}</span>
              <span
                className={`${
                  ticker.pAndL.substring(0, 1) === "+"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {ticker.pAndL}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Ticker;
