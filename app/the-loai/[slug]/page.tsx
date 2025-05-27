import MovieCardEnhanced from "@/components/MovieCardEnhanced";
import { getListMovieByType } from "@/service/KKPhimService";
import { TypeList } from "@/type/MovieListParams";
import React from "react";

interface PageProps {
  params: Promise<{
    slug: string;
    page: string;
  }>;
  searchParams?: Promise<{
    page: string;
  }>;
}

export const generateStaticParams = async () => {
  return [
    { slug: "phim-le" },
    { slug: "phim-bo" },
    { slug: "hoat-hinh" },
    { slug: "phim-vietsub" },
    { slug: "phim-thuyet-minh" },
    { slug: "phim-long-tieng" },
  ];
};

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const slug = (await params).slug as TypeList;

  const data = await getListMovieByType({
    page: +(await searchParams)?.page! || 1,
    type_list: slug,
    limit: 48,
  });
  return (
    <div className="min-h-screen pt-20">
      <div className="flex flex-row  flex-wrap gap-4 justify-center">
        {data?.data?.items.map((item) => {
          return (
            <MovieCardEnhanced variant="default" key={item._id} m={item} />
          );
        })}
      </div>
      <div>
        <div className="join">
          <button className="join-item btn">«</button>
          <button className="join-item btn">Page 22</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
