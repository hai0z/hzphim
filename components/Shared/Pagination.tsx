"use client";
import React from "react"; // Import React for type checking
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
interface IPaginationProps {
  total: number;
  initialPage: number;
}

export default function PaginationComponent({
  total,
  initialPage,
}: IPaginationProps) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(initialPage);

  const searchParams = useSearchParams();

  const pathname = usePathname();

  const queryParams = new URLSearchParams();

  searchParams.forEach((value, key) => {
    if (key !== "page") {
      queryParams.append(key, value);
    }
  });
  console.log(searchParams);
  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = Number(e.target.value);
    if (newPage < 1) {
      setCurrentPage(1);
    } else if (newPage > total) {
      setCurrentPage(total);
    } else {
      setCurrentPage(newPage);
    }
  };
  return (
    <div className="join">
      <Link
        className="join-item btn btn-lg"
        href={`${pathname}?${queryParams.toString()}${
          queryParams.toString() ? "&" : ""
        }page=${initialPage >= 2 ? initialPage - 1 : 1}`}
      >
        «
      </Link>
      <button className="join-item btn btn-lg">
        <input
          onChange={handlePageChange}
          type="number"
          min={1}
          max={total}
          value={currentPage}
          className="w-12 text-center border"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(
                `${pathname}?${queryParams.toString()}${
                  queryParams.toString() ? "&" : ""
                }page=${currentPage}`
              );
            }
          }}
        />
        / {total}
      </button>
      <Link
        className="join-item btn btn-lg"
        href={`${pathname}?${queryParams.toString()}${
          queryParams.toString() ? "&" : ""
        }page=${initialPage < total ? initialPage + 1 : total}`}
      >
        »
      </Link>
    </div>
  );
}
