import MovieCardEnhanced from "@/components/MovieCard/MovieCardEnhanced";
import FilterButton from "@/components/MovieFilter/FilterButton";
import ListMovie from "@/components/Shared/ListMovie";
import { getListMovieByType } from "@/service/KKPhimService";
import { SortField, TypeList } from "@/type/MovieListParams";
import React, { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    country?: string;
    category?: string;
    year?: string;
    type_list?: TypeList | "tat-ca";
    sort_field?: string;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  let params = await searchParams;

  if (params.country === "tat-ca") {
    delete params.country;
  }
  if (params.category === "tat-ca") {
    delete params.category;
  }
  if (params.year === "tat-ca") {
    delete params.year;
  }
  if (params.type_list === "tat-ca") {
    params.type_list = "phim-le";
  }
  if (params.sort_field === "tat-ca") {
    delete params.sort_field;
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="my-4 px-6">
        <h1 className="text-3xl font-semibold my-4  ">Duyệt tìm</h1>
        <FilterButton />
      </div>
      <Suspense
        key={JSON.stringify(params) + JSON.stringify(searchParams)}
        fallback={
          <div className="flex justify-center items-center h-[50vh]">
            <div className="w-16 h-16 border-b-4 border-primary rounded-full animate-spin"></div>
          </div>
        }
      >
        <ListMovie
          promise={getListMovieByType({
            page: +(await searchParams)?.page! || 1,
            type_list: params.type_list as TypeList,
            country: params.country,
            category: params.category,
            year: Number(params.year),
            sort_field: params.sort_field as SortField,
            limit: 48,
          })}
        />
      </Suspense>
    </div>
  );
};

export default Page;
