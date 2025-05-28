import FilterButton from "@/components/MovieFilter/FilterButton";
import { getListMovieByCountry } from "@/service/KKPhimService";
import { TypeList } from "@/type/MovieListParams";
import React, { Suspense } from "react";
import ListMovie from "@/components/Shared/ListMovie";

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
    { slug: "tat-ca" },
    { slug: "viet-nam" },
    { slug: "trung-quoc" },
    { slug: "thai-lan" },
    { slug: "hong-kong" },
    { slug: "phap" },
    { slug: "duc" },
    { slug: "ha-lan" },
    { slug: "mexico" },
    { slug: "thuy-dien" },
    { slug: "philippines" },
    { slug: "dan-mach" },
    { slug: "thuy-si" },
    { slug: "ukraina" },
    { slug: "han-quoc" },
    { slug: "au-my" },
    { slug: "an-do" },
    { slug: "canada" },
    { slug: "tay-ban-nha" },
    { slug: "indonesia" },
    { slug: "ba-lan" },
    { slug: "malaysia" },
    { slug: "bo-dao-nha" },
    { slug: "uae" },
    { slug: "chau-phi" },
    { slug: "a-rap-xe-ut" },
    { slug: "nhat-ban" },
    { slug: "dai-loan" },
    { slug: "anh" },
    { slug: "quoc-gia-khac" },
    { slug: "tho-nhi-ky" },
    { slug: "nga" },
    { slug: "uc" },
    { slug: "brazil" },
    { slug: "y" },
    { slug: "na-uy" },
  ];
};
const countryMap: Record<string, string> = {
  "tat-ca": "Tất cả",
  "viet-nam": "Việt Nam",
  "trung-quoc": "Trung Quốc",
  "thai-lan": "Thái Lan",
  "hong-kong": "Hồng Kông",
  phap: "Pháp",
  duc: "Đức",
  "ha-lan": "Hà Lan",
  mexico: "Mexico",
  "thuy-dien": "Thụy Điển",
  philippines: "Philippines",
  "dan-mach": "Đan Mạch",
  "thuy-si": "Thụy Sĩ",
  ukraina: "Ukraina",
  "han-quoc": "Hàn Quốc",
  "au-my": "Âu Mỹ",
  "an-do": "Ấn Độ",
  canada: "Canada",
  "tay-ban-nha": "Tây Ban Nha",
  indonesia: "Indonesia",
  "ba-lan": "Ba Lan",
  malaysia: "Malaysia",
  "bo-dao-nha": "Bồ Đào Nha",
  uae: "UAE",
  "chau-phi": "Châu Phi",
  "a-rap-xe-ut": "Ả Rập Xê Út",
  "nhat-ban": "Nhật Bản",
  "dai-loan": "Đài Loan",
  anh: "Anh",
  "quoc-gia-khac": "Quốc Gia Khác",
  "tho-nhi-ky": "Thổ Nhĩ Kỳ",
  nga: "Nga",
  uc: "Úc",
  brazil: "Brazil",
  y: "Ý",
  "na-uy": "Na Uy",
};

export async function generateMetadata({ params }: PageProps) {
  const slug = (await params).slug as TypeList;
  return {
    title: `Phim ${countryMap[slug]}`,
  };
}

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const slug = (await params).slug as TypeList;

  return (
    <div className="min-h-screen pt-20">
      <div className="my-4 px-6">
        <h1 className="text-3xl font-semibold my-4  ">
          {countryMap[slug] as string}
        </h1>
        <FilterButton />
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[50vh]">
            <div className="w-16 h-16 border-b-4 border-primary rounded-full animate-spin"></div>
          </div>
        }
        key={slug}
      >
        <ListMovie
          promise={getListMovieByCountry({
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
