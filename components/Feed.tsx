import React, { useContext, useState } from "react";
import NewsCard from "./NewsCard";
import Link from "next/link";
import { Pagination } from "@mui/material";
import { DataContext } from "@/pages";

type Props = {};

function Feed({}: Props) {
  const data = useContext(DataContext);

  let numberOfPages: number = 0;

  if (data) {
    numberOfPages = Math.floor(
      data?.articlesData?.meta?.found / data?.articlesData?.meta?.limit
    );
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    data?.page.setCurrentPage(page);
    // You can perform any other actions like fetching data for the new page here
  };

  return (
    <div className="flex flex-col justify-between items-center h-full">
      {data ? (
        <>
          <div className="flex gap-6">
            {data &&
              data.articlesData?.data?.map(
                (
                  article: {
                    title: string;
                    image_url: string;
                    description: string;
                    url: string;
                  },
                  idx: number
                ) => (
                  <Link key={idx} href={article.url}>
                    <NewsCard
                      title={article.title}
                      img={article.image_url}
                      description={article.description}
                    />
                  </Link>
                )
              )}
          </div>
          <Pagination
            page={data.page.currentPage}
            count={numberOfPages}
            onChange={handlePageChange}
            sx={{
              ".MuiPaginationItem-root": { color: "var(--text-color)" },
            }}
          />
        </>
      ) : (
        "Choose your article preferences"
      )}
    </div>
  );
}

export default Feed;
