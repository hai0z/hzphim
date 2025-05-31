import MovieCardEnhanced from "@/components/MovieCard/MovieCardEnhanced";
import FilterButton from "@/components/MovieFilter/FilterButton";
import ListMovie from "@/components/Shared/ListMovie";
import { getListMovieByType } from "@/service/KKPhimService";
import { TypeList } from "@/type/MovieListParams";
import React, { Suspense } from "react";

interface PageProps {
  params: Promise<{
    type_list: string;
  }>;
  searchParams?: Promise<{
    page: string;
  }>;
}

export const generateStaticParams = async () => {
  return [
    { type_list: "phim-le" },
    { type_list: "phim-bo" },
    { type_list: "hoat-hinh" },
    { type_list: "phim-vietsub" },
    { type_list: "phim-thuyet-minh" },
    { type_list: "phim-long-tieng" },
  ];
};

const categoryMap: Record<TypeList, string> = {
  "phim-le": "Phim lẻ",
  "phim-bo": "Phim bộ",
  "hoat-hinh": "Phim hoạt hình",
  "phim-vietsub": "Phim việt sub",
  "phim-thuyet-minh": "Phim thuyết minh",
  "phim-long-tieng": "Phim lồng tiếng",
  "tv-shows": "TV Shows",
};

export async function generateMetadata({ params }: PageProps) {
  const type_list = (await params).type_list as TypeList;
  return {
    title: `${categoryMap[type_list]}`,
  };
}

export const dynamicParams = false;

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const type_list = (await params).type_list as TypeList;

  return (
    <div className="min-h-screen pt-20">
      <div className="my-4 md:px-6 px-2">
        <h1 className="text-3xl font-semibold my-4  ">
          {categoryMap[type_list] as string}
        </h1>
        <FilterButton />
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[50vh]">
            <div className="w-16 h-16 border-b-4 border-primary rounded-full animate-spin"></div>
          </div>
        }
        key={JSON.stringify(searchParams)}
      >
        <ListMovie
          promise={getListMovieByType({
            page: +(await searchParams)?.page! || 1,
            type_list: type_list,
            limit: 32,
          })}
        />
      </Suspense>
    </div>
  );
};

export default Page;
