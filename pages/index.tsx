import Feed from "@/components/Feed";
import Preferences from "@/components/Preferences";
import Head from "next/head";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

type Preferences = {
  sources: string[];
  tickers: string[];
};

type Data = {
  articlesData: {
    meta: {
      found: number;
      limit: number;
    };
    data: [];
  };
  apiUrl: string;
  page: {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  };
  checkboxes: {
    checkboxes: {
      checkbox1: boolean;
      checkbox2: boolean;
      checkbox3: boolean;
      checkbox4: boolean;
      checkbox5: boolean;
    };
    setCheckboxes: React.Dispatch<
      React.SetStateAction<{
        checkbox1: boolean;
        checkbox2: boolean;
        checkbox3: boolean;
        checkbox4: boolean;
        checkbox5: boolean;
      }>
    >;
  };
  preferences: {
    preferences: Preferences;
    setPreferences: React.Dispatch<React.SetStateAction<Preferences>>;
  };
  ticker: {
    ticker: string;
    setTicker: React.Dispatch<React.SetStateAction<string>>;
  };
  refetch: () => void;
  isLoading: boolean;
};

export const DataContext = createContext<Data | undefined>(undefined);

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [preferences, setPreferences] = useState<Preferences>({
    sources: [],
    tickers: [],
  });

  const [ticker, setTicker] = useState<string>("");

  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
  });

  const token = process.env.NEXT_PUBLIC_MARKETAUX_ACCESS_TOKEN;

  const apiUrl = `https://api.marketaux.com/v1/news/all?symbols=${preferences.tickers.join(
    ","
  )}&api_token=${token}&limit=3&language=en&entity_types=equity&countries=us&filter_entities=true&domains=${preferences.sources.join(
    ","
  )}&page=${currentPage}`;

  const getArticles = async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <>
      <DataContext.Provider
        value={{
          articlesData: data,
          apiUrl: apiUrl,
          page: { currentPage: currentPage, setCurrentPage: setCurrentPage },
          checkboxes: { checkboxes: checkboxes, setCheckboxes: setCheckboxes },
          preferences: {
            preferences: preferences,
            setPreferences: setPreferences,
          },
          ticker: { ticker: ticker, setTicker: setTicker },
          refetch: refetch,
          isLoading: isLoading,
        }}
      >
        <div className="grid grid-cols-5 h-auto">
          <div className="col-span-1">
            <Preferences />
          </div>
          <div className="col-span-4">
            <Feed />
          </div>
        </div>
      </DataContext.Provider>
    </>
  );
}
