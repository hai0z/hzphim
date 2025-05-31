import FilterButton from "@/components/MovieFilter/FilterButton";
import ListMovie from "@/components/Shared/ListMovie";
import { getListMovieByCategory } from "@/service/KKPhimService";
import { TypeList } from "@/type/MovieListParams";
import React, { Suspense } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    page: string;
  }>;
}

export const generateStaticParams = async () => {
  return [
    { slug: "hanh-dong" },
    { slug: "mien-tay" },
    { slug: "tre-em" },
    { slug: "lich-su" },
    { slug: "co-trang" },
    { slug: "chien-tranh" },
    { slug: "vien-tuong" },
    { slug: "kinh-di" },
    { slug: "tai-lieu" },
    { slug: "bi-an" },
    { slug: "phim-18" },
    { slug: "tinh-cam" },
    { slug: "tam-ly" },
    { slug: "the-thao" },
    { slug: "phieu-luu" },
    { slug: "am-nhac" },
    { slug: "gia-dinh" },
    { slug: "hoc-duong" },
    { slug: "hai-huoc" },
    { slug: "hinh-su" },
    { slug: "vo-thuat" },
    { slug: "khoa-hoc" },
    { slug: "than-thoai" },
    { slug: "chinh-kich" },
    { slug: "kinh-dien" },
  ];
};

const categoryMap: Record<string, string> = {
  "hanh-dong": "Hành Động",
  "mien-tay": "Miền Tây",
  "tre-em": "Trẻ Em",
  "lich-su": "Lịch Sử",
  "co-trang": "Cổ Trang",
  "chien-tranh": "Chiến Tranh",
  "vien-tuong": "Viễn Tưởng",
  "kinh-di": "Kinh Dị",
  "tai-lieu": "Tài Liệu",
  "bi-an": "Bí Ẩn",
  "phim-18": "Phim 18+",
  "tinh-cam": "Tình Cảm",
  "tam-ly": "Tâm Lý",
  "the-thao": "Thể Thao",
  "phieu-luu": "Phiêu Lưu",
  "am-nhac": "Âm Nhạc",
  "gia-dinh": "Gia Đình",
  "hoc-duong": "Học Đường",
  "hai-huoc": "Hài Hước",
  "hinh-su": "Hình Sự",
  "vo-thuat": "Võ Thuật",
  "khoa-hoc": "Khoa Học",
  "than-thoai": "Thần Thoại",
  "chinh-kich": "Chính Kịch",
  "kinh-dien": "Kinh Điển",
};

export async function generateMetadata({ params }: PageProps) {
  const slug = (await params).slug as TypeList;
  return {
    title: `Phim ${categoryMap[slug]}`,
  };
}
export const dynamicParams = false;

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const slug = (await params).slug as TypeList;

  return (
    <div className="min-h-screen pt-20">
      <div className="my-4 px-6">
        <h1 className="text-3xl font-semibold my-4">
          {categoryMap[slug] as string}
        </h1>
        <FilterButton />
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[50vh]">
            <div className="w-16 h-16 border-b-4 border-primary rounded-full animate-spin"></div>
          </div>
        }
        key={JSON.stringify(searchParams)}
      >
        <ListMovie
          promise={getListMovieByCategory({
            page: +(await searchParams)?.page! || 1,
            type_list: slug,
            limit: 32,
          })}
        />
      </Suspense>
    </div>
  );
};

export default Page;
