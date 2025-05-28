"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePlayer } from "@/hooks/useStores";
import theLoai from "@/constants/theloai.json";
import quocGia from "@/constants/quocgia.json";
import { ChevronDown } from "lucide-react";
import MovieSearch from "./SearchInput";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const { theaterMode } = usePlayer();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div
      className={`navbar fixed top-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-base-100" : "bg-transparent"
      } ${theaterMode && "invisible"}`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
          >
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
            <li>
              <Link href="/phim-moi">Phim mới</Link>
            </li>
            <li>
              <a>Thể loại</a>
              <ul className="p-2">
                <li>
                  <Link href="/the-loai/hanh-dong">Hành động</Link>
                </li>
                <li>
                  <Link href="/the-loai/tinh-cam">Tình cảm</Link>
                </li>
                <li>
                  <Link href="/the-loai/hai-huoc">Hài hước</Link>
                </li>
              </ul>
            </li>
            <li>
              <a>Quốc gia</a>
              <ul className="p-2">
                <li>
                  <Link href="/the-loai/hanh-dong">Hành động</Link>
                </li>
                <li>
                  <Link href="/the-loai/tinh-cam">Tình cảm</Link>
                </li>
                <li>
                  <Link href="/the-loai/hai-huoc">Hài hước</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/phim-bo">Phim bộ</Link>
            </li>
            <li>
              <Link href="/phim-le">Phim lẻ</Link>
            </li>
          </ul>
        </div>
        <Link
          href="/"
          className="md:text-2xl lg:text-3xl text-lg ml-6 font-black"
        >
          HZPhim
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Trang chủ</Link>
          </li>
          <li>
            <Link href="/phim-moi">Phim mới</Link>
          </li>
          <li>
            <button
              popoverTarget="popover-1"
              style={{ anchorName: "--anchor-1" } as React.CSSProperties}
            >
              Thể loại <ChevronDown size={18} />
            </button>

            <ul
              className="dropdown w-96 rounded-box bg-base-100 opacity-95 mt-2 backdrop-blur-sm shadow-sm grid grid-cols-3 dropdown-bottom p-4  "
              popover="auto"
              id="popover-1"
              style={{ positionAnchor: "--anchor-1" } as React.CSSProperties}
            >
              {theLoai
                .filter((item) => item.slug != "tat-ca")
                .map((item) => {
                  return (
                    <li
                      key={item._id}
                      onClick={() => {
                        document.getElementById("popover-1")?.hidePopover();
                      }}
                    >
                      <Link href={`/the-loai/${item.slug}`}>{item.name}</Link>
                    </li>
                  );
                })}
            </ul>
          </li>
          <li>
            <button
              popoverTarget="popover-2"
              style={{ anchorName: "--anchor-2" } as React.CSSProperties}
            >
              Quốc gia <ChevronDown size={18} />
            </button>

            <ul
              className="dropdown w-96 rounded-box bg-base-100 opacity-95 mt-2 backdrop-blur-sm shadow-sm grid grid-cols-3 dropdown-bottom p-4 "
              popover="auto"
              id="popover-2"
              style={{ positionAnchor: "--anchor-2" } as React.CSSProperties}
            >
              {quocGia
                .filter((item) => item.slug != "tat-ca")
                .map((item) => {
                  return (
                    <li
                      key={item._id}
                      onClick={() => {
                        document.getElementById("popover-2")?.hidePopover();
                      }}
                    >
                      <Link href={`/quoc-gia/${item.slug}`}>{item.name}</Link>
                    </li>
                  );
                })}
            </ul>
          </li>
          <li>
            <Link href="/phim-bo">Phim bộ</Link>
          </li>
          <li>
            <Link href="/phim-le">Phim lẻ</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end ">
        <MovieSearch />
      </div>
    </div>
  );
};

export default Header;
