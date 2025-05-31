import React from "react";
import Link from "next/link";
import theLoai from "@/constants/theloai.json";
import { Film, Star, ArrowRight, Grid3X3 } from "lucide-react";

const TheLoaiPage = () => {
  const getCardColors = (index: number) => {
    const colors = [
      {
        bg: "bg-primary/5",
        border: "border-primary/20 hover:border-primary/40",
        icon: "bg-primary/10",
        iconHover: "group-hover:bg-primary/20",
        iconColor: "text-primary",
        text: "group-hover:text-primary",
      },
      {
        bg: "bg-secondary/5",
        border: "border-secondary/20 hover:border-secondary/40",
        icon: "bg-secondary/10",
        iconHover: "group-hover:bg-secondary/20",
        iconColor: "text-secondary",
        text: "group-hover:text-secondary",
      },
      {
        bg: "bg-accent/5",
        border: "border-accent/20 hover:border-accent/40",
        icon: "bg-accent/10",
        iconHover: "group-hover:bg-accent/20",
        iconColor: "text-accent",
        text: "group-hover:text-accent",
      },
      {
        bg: "bg-info/5",
        border: "border-info/20 hover:border-info/40",
        icon: "bg-info/10",
        iconHover: "group-hover:bg-info/20",
        iconColor: "text-info",
        text: "group-hover:text-info",
      },
      {
        bg: "bg-success/5",
        border: "border-success/20 hover:border-success/40",
        icon: "bg-success/10",
        iconHover: "group-hover:bg-success/20",
        iconColor: "text-success",
        text: "group-hover:text-success",
      },
      {
        bg: "bg-warning/5",
        border: "border-warning/20 hover:border-warning/40",
        icon: "bg-warning/10",
        iconHover: "group-hover:bg-warning/20",
        iconColor: "text-warning",
        text: "group-hover:text-warning",
      },
      {
        bg: "bg-error/5",
        border: "border-error/20 hover:border-error/40",
        icon: "bg-error/10",
        iconHover: "group-hover:bg-error/20",
        iconColor: "text-error",
        text: "group-hover:text-error",
      },
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen pt-20 bg-base-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Grid3X3 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-base-content">
              Thể loại phim
            </h1>
            <p className="text-base-content/70">
              Khám phá phim theo thể loại yêu thích của bạn
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats shadow mb-8">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Film className="w-8 h-8" />
            </div>
            <div className="stat-title">Tổng số thể loại</div>
            <div className="stat-value text-primary">{theLoai.length}</div>
            <div className="stat-desc">Đa dạng và phong phú</div>
          </div>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {theLoai.map((genre, index) => {
            const colors = getCardColors(index);
            return (
              <Link
                key={genre._id}
                href={`/the-loai/${genre.slug}`}
                className="group"
              >
                <div
                  className={`card shadow-md border-2 hover:shadow-xl transition-all duration-300 group-hover:scale-105 ${colors.bg} ${colors.border}`}
                >
                  <div className="card-body p-4">
                    {/* Genre Icon */}
                    <div className="flex items-center justify-center mb-3">
                      <div
                        className={`p-3 rounded-full transition-colors ${colors.icon} ${colors.iconHover}`}
                      >
                        <Star className={`w-6 h-6 ${colors.iconColor}`} />
                      </div>
                    </div>

                    {/* Genre Name */}
                    <h3
                      className={`text-center font-semibold text-base-content transition-colors ${colors.text}`}
                    >
                      {genre.name}
                    </h3>

                    {/* Arrow Icon */}
                    <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className={`w-4 h-4 ${colors.iconColor}`} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TheLoaiPage;
