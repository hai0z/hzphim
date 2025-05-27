"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePlayer } from "@/hooks/useStores";

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
        <Link href="/" className="text-3xl ml-6 font-black">
          HZPhim
        </Link>
        <form onSubmit={handleSearch} className="form-control ml-6">
          <div className="join">
            <input
              type="text"
              placeholder="Tìm kiếm phim..."
              className="input input-bordered join-item input-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary join-item btn-sm">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Trang chủ</Link>
          </li>
          <li>
            <Link href="/phim-moi">Phim mới</Link>
          </li>
          <li>
            <details>
              <summary>Thể loại</summary>
              <ul className="p-2 bg-base-100 rounded-box">
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
            </details>
          </li>
          <li>
            <details>
              <summary>Quốc gia</summary>
              <ul className="p-2 bg-base-100 rounded-box">
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
            </details>
          </li>
          <li>
            <Link href="/the-loai/phim-bo">Phim bộ</Link>
          </li>
          <li>
            <Link href="/the-loai/phim-le">Phim lẻ</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default Header;
