import MovieCardEnhanced from "@/components/MovieCard/MovieCardEnhanced";
import { Item, Pagination } from "@/type/ListMovieRespone";
import React from "react";
import PaginationComponent from "./Pagination";

interface IProps {
  promise: Promise<{
    data: {
      items: Item[];
      params: {
        pagination: Pagination;
      };
    };
  }>;
}

const ListMovie = async ({ promise }: IProps) => {
  const data = await promise;
  const pagination = data?.data?.params?.pagination;
  return (
    <div className="pb-20">
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {data?.data?.items.map((item) => {
            return (
              <MovieCardEnhanced variant="compact" key={item._id} m={item} />
            );
          })}
        </div>
      </div>
      <div className="w-full flex justify-center mt-8">
        <PaginationComponent
          total={pagination?.totalPages}
          initialPage={pagination?.currentPage}
        />
      </div>
    </div>
  );
};

export default ListMovie;
