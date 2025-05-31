"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePlayer } from "@/hooks/useStores";
import theLoai from "@/constants/theloai.json";
import quocGia from "@/constants/quocgia.json";
import { ChevronDown, Heart, History, Settings, User } from "lucide-react";
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
        isScrolled
          ? "bg-base-100 opacity-95 backdrop-blur-lg"
          : "bg-transparent"
      } ${theaterMode && "invisible"} `}
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
        <div className="w-full ml-4">
          <MovieSearch />
        </div>
      </div>

      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal ml-4">
          <li>
            <Link href="/">Trang chủ</Link>
          </li>
          <li>
            <Link href="/phim-le">Phim lẻ</Link>
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
            <Link href="/hoat-hinh">Phim hoạt hình</Link>
          </li>
          <li>
            <Link href="/phim-bo">Phim bộ</Link>
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
        </ul>
      </div>

      <div className="navbar-end">
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Yêu thích */}
          <Link
            href="/favorites"
            className="btn btn-ghost btn-circle tooltip tooltip-bottom"
            data-tip="Yêu thích"
          >
            <Heart className="w-5 h-5" />
          </Link>

          {/* Lịch sử xem */}
          <Link
            href="/history"
            className="btn btn-ghost btn-circle tooltip tooltip-bottom"
            data-tip="Lịch sử xem"
          >
            <History className="w-5 h-5" />
          </Link>

          {/* User Avatar */}
          <button
            className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
            popoverTarget="popover-user"
            style={{ anchorName: "--anchor-user" } as React.CSSProperties}
          >
            <User className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            className="btn btn-ghost btn-circle"
            popoverTarget="popover-mobile-menu"
            style={
              { anchorName: "--anchor-mobile-menu" } as React.CSSProperties
            }
          >
            <User className="w-6 h-6" />
          </button>
        </div>

        {/* User Dropdown */}
        <ul
          className="dropdown menu w-56 rounded-box bg-base-100 shadow-xl border border-base-300 dropdown-end p-2"
          popover="auto"
          id="popover-user"
          style={{ positionAnchor: "--anchor-user" } as React.CSSProperties}
        >
          <li className="menu-title">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Tài khoản
            </span>
          </li>
          <li>
            <Link href="/profile" className="flex items-center gap-3">
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-6 rounded-full">
                  <span className="text-xs">U</span>
                </div>
              </div>
              Hồ sơ cá nhân
            </Link>
          </li>
          <li>
            <Link href="/favorites" className="flex items-center gap-3">
              <Heart className="w-4 h-4" />
              Danh sách yêu thích
            </Link>
          </li>
          <li>
            <Link href="/history" className="flex items-center gap-3">
              <History className="w-4 h-4" />
              Lịch sử xem
            </Link>
          </li>
          <li>
            <Link href="/settings" className="flex items-center gap-3">
              <Settings className="w-4 h-4" />
              Cài đặt
            </Link>
          </li>
          <div className="divider my-1"></div>
          <li>
            <a className="text-error flex items-center gap-3">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Đăng xuất
            </a>
          </li>
        </ul>

        {/* Mobile Menu Dropdown */}
        <ul
          className="dropdown menu w-64 rounded-box bg-base-100 shadow-xl border border-base-300 dropdown-end p-2 lg:hidden"
          popover="auto"
          id="popover-mobile-menu"
          style={
            { positionAnchor: "--anchor-mobile-menu" } as React.CSSProperties
          }
        >
          <li className="menu-title">
            <span>Menu</span>
          </li>
          <li>
            <Link href="/favorites" className="flex items-center gap-3">
              <Heart className="w-4 h-4" />
              Yêu thích
            </Link>
          </li>
          <li>
            <Link href="/history" className="flex items-center gap-3">
              <History className="w-4 h-4" />
              Lịch sử xem
            </Link>
          </li>
          <li>
            <a className="flex items-center gap-3">
              <Settings className="w-4 h-4" />
              Cài đặt
            </a>
          </li>
          <div className="divider my-1"></div>
          <li>
            <Link href="/profile" className="flex items-center gap-3">
              <User className="w-4 h-4" />
              Tài khoản
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
