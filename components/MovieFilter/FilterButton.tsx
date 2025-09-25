"use client";
import React, { useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown } from "lucide-react";
import quocGia from "@/constants/quocgia.json";
import theLoai from "@/constants/theloai.json";
import { FiFilter } from "react-icons/fi";

const TypeList = [
  { id: "phim-le", slug: "phim-le", name: "Phim Lẻ" },
  { id: "phim-bo", slug: "phim-bo", name: "Phim Bộ" },
  { id: "tv-shows", slug: "tv-shows", name: "TV Shows" },
  { id: "hoat-hinh", slug: "hoat-hinh", name: "Hoạt Hình" },
  { id: "phim-vietsub", slug: "phim-vietsub", name: "Phim Vietsub" },
  {
    id: "phim-thuyet-minh",
    slug: "phim-thuyet-minh",
    name: "Phim Thuyết Minh",
  },
  { id: "phim-long-tieng", slug: "phim-long-tieng", name: "Phim Lồng Tiếng" },
];

const SortFieldList = [
  { id: "modified.time", slug: "modified.time", name: "Mới nhất" },
  { id: "_id", slug: "_id", name: "Mới cập nhật" },
  { id: "year", slug: "year", name: "Năm phát hành" },
];

const YearList = [
  { id: "all", slug: "tat-ca", name: "Tất cả" },
  { id: "2025", slug: "2025", name: "2025" },
  { id: "2024", slug: "2024", name: "2024" },
  { id: "2023", slug: "2023", name: "2023" },
  { id: "2022", slug: "2022", name: "2022" },
  { id: "2021", slug: "2021", name: "2021" },
  { id: "2020", slug: "2020", name: "2020" },
  { id: "2019", slug: "2019", name: "2019" },
  { id: "2018", slug: "2018", name: "2018" },
  { id: "2017", slug: "2017", name: "2017" },
  { id: "2016", slug: "2016", name: "2016" },
  { id: "2015", slug: "2015", name: "2015" },
  { id: "2014", slug: "2014", name: "2014" },
  { id: "2013", slug: "2013", name: "2013" },
  { id: "2012", slug: "2012", name: "2012" },
  { id: "2011", slug: "2011", name: "2011" },
  { id: "2010", slug: "2010", name: "2010" },
];

interface FilterState {
  country: string;
  type_list: string;
  category: string;
  sort_field: string;
  year: string;
}

const FilterButton = () => {
  const searchParams = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    country: searchParams.get("country") || "tat-ca",
    type_list: searchParams.get("type_list") || "phim-le",
    category: searchParams.get("category") || "tat-ca",
    sort_field: searchParams.get("sort_field") || "modified.time",
    year: searchParams.get("year") || "tat-ca",
  });

  const updateURL = (newFilters: FilterState) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    const queryString = params.toString();
    const newURL = queryString ? `?${queryString}` : window.location.pathname;
    setShowFilter(false);

    if (searchParams.get("keyword")) {
      redirect(`/search?keyword=${searchParams.get("keyword")}&${queryString}`);
    }
    redirect(`/filter${newURL}`);
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: activeFilters[filterType] === value ? "" : value,
    };
    setActiveFilters(newFilters);
  };

  const applyFilters = () => {
    updateURL(activeFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(Boolean).length;
  };

  const FilterSection = ({
    title,
    items,
    filterKey,
    idKey = "_id",
  }: {
    title: string;
    items: any[];
    filterKey: keyof FilterState;
    idKey?: string;
  }) => (
    <div className="space-y-2">
      <h4 className="font-medium text-base-content/80 text-xs uppercase tracking-wide">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const itemId = item[idKey] || item.id;
          const isActive = activeFilters[filterKey] === item.slug;
          return (
            <button
              key={itemId}
              onClick={() => handleFilterChange(filterKey, item.slug)}
              className={`btn btn-sm transition-all duration-200 ${
                isActive ? "btn-primary" : "btn-outline hover:btn-primary"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      className={`w-full  rounded-lg ${
        showFilter && "bg-base-200"
      } transition-all duration-300`}
    >
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4 p-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowFilter(!showFilter)}
          className={`btn btn-sm btn-outline gap-2 transition-all duration-300 ${
            showFilter ? "btn-primary" : ""
          }`}
        >
          <FiFilter className="w-3 h-3" />
          <span>Bộ lọc</span>

          <ChevronDown
            className={`w-3 h-3 transition-transform duration-200 ${
              showFilter ? "rotate-180" : ""
            }`}
          />
        </motion.button>
      </div>

      {/* Filter Content */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="card bg-base-200 shadow-lg border border-base-300">
              <div className="card-body p-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Filter className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Bộ lọc phim</h3>
                  </div>
                </div>

                {/* Filter Sections - Compact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {!searchParams.get("keyword") && (
                    <FilterSection
                      title="Loại phim"
                      items={TypeList}
                      filterKey="type_list"
                      idKey="slug"
                    />
                  )}

                  <FilterSection
                    title="Thể loại"
                    items={theLoai}
                    filterKey="category"
                  />

                  <FilterSection
                    title="Quốc gia"
                    items={quocGia}
                    filterKey="country"
                  />

                  <FilterSection
                    title="Sắp xếp"
                    items={SortFieldList}
                    filterKey="sort_field"
                    idKey="slug"
                  />

                  <FilterSection
                    title="Năm"
                    items={YearList}
                    filterKey="year"
                    idKey="slug"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-x-4 mt-6 pt-4 border-t border-base-300">
                  <button
                    onClick={applyFilters}
                    className="btn btn-primary btn-sm gap-1"
                    disabled={getActiveFilterCount() === 0}
                  >
                    <Filter className="w-3 h-3" />
                    Lọc kết quả
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowFilter(false)}
                      className="btn btn-outline btn-sm gap-1"
                    >
                      Đóng bộ lọc
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterButton;
