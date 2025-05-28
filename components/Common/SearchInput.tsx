import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Item, Pagination } from "@/type/ListMovieRespone";
import Image from "next/image";
import Link from "next/link";

interface SearchResponse {
  data: {
    items: Item[];
    pagination: Pagination;
  };
}

const MovieSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const fetchMovies = async (keyword: string) => {
    if (!keyword.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://phimapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(
          keyword
        )}&page=1&limit=5`
      );
      const data: SearchResponse = await response.json();
      setResults(data.data.items || []);
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setResults([]);
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (movie: Item) => {
    setSearchTerm(movie.name);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div
        className={classNames("dropdown w-full", {
          "dropdown-open": isOpen && results.length > 0,
        })}
        ref={dropdownRef}
      >
        <label className="input input-bordered flex items-center gap-2">
          <svg
            className="h-5 w-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            type="search"
            className="grow"
            placeholder="Tìm kiếm phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => results.length > 0 && setIsOpen(true)}
          />
        </label>
        {loading && (
          <div className="dropdown-content bg-base-200 rounded-box mt-2 w-full overflow-auto shadow-lg z-10">
            <div className="flex justify-center items-center h-24">
              <div className="w-12 h-12 border-b-4 border-primary rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        {isOpen && results.length > 0 && (
          <div className="dropdown-content bg-base-200 rounded-box mt-2 w-full overflow-auto shadow-lg z-10">
            {loading && (
              <div className="flex justify-center items-center h-24">
                <div className="w-12 h-12 border-b-4 border-primary rounded-full animate-spin"></div>
              </div>
            )}
            <ul className="menu menu-compact w-full">
              {results.map((movie) => (
                <li
                  key={movie._id}
                  className="border-b border-b-base-content/10 py-2"
                  onClick={() => handleSelect(movie)}
                >
                  <Link
                    href={`/movie/${movie.slug}`}
                    className="flex items-center gap-3 w-full text-left"
                  >
                    <Image
                      width={48}
                      height={48}
                      src={`https://phimimg.com/${movie.poster_url}`}
                      alt={movie.name}
                      priority
                      className="w-12 object-cover rounded"
                    />
                    <div>
                      <span className="font-medium line-clamp-1">
                        {movie.name}
                      </span>
                      <span className="text-sm opacity-70 line-clamp-1">
                        {movie.origin_name}
                      </span>
                      <span className="text-xs opacity-50">
                        {movie.year} • {movie.country?.[0]?.name} • {movie.time}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
