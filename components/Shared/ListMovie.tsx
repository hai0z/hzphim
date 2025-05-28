import MovieCardEnhanced from "@/components/MovieCard/MovieCardEnhanced";
import { Item } from "@/type/ListMovieRespone";
import React from "react";

interface IProps {
  promise: Promise<{
    data: {
      items: Item[];
    };
  }>;
}

const ListMovie = async ({ promise }: IProps) => {
  const data = await promise;
  return (
    <div className="flex flex-row  flex-wrap gap-4 justify-center">
      {data?.data?.items.map((item) => {
        return <MovieCardEnhanced variant="compact" key={item._id} m={item} />;
      })}
    </div>
  );
};

export default ListMovie;
