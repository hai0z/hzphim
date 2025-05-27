import { Episode } from "@/type/MovieDetailRespone";
import { Play } from "lucide-react";
import Link from "next/link";
import React from "react";

interface IProps {
  episodes: Episode[];
  slug: string;
  ver?: string | number;
  ep?: string | number;
}

const ListEpisodes: React.FC<IProps> = ({ episodes, slug, ver, ep }) => {
  return (
    <div>
      {episodes.map((episode, index) => (
        <div key={index} className="flex flex-col mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">{episode.server_name}</span>
          </div>
          <div className="lg:flex lg:flex-wrap lg:flex-row gap-4 py-4 grid grid-cols-3 md:grid-cols-6">
            {episode.server_data.map((link, i) => (
              <Link
                key={link.slug}
                className={`btn btn-sm md:btn-md w-28 ${
                  +ver! === index && +ep! === i + 1
                    ? "btn-primary"
                    : "btn-neutral"
                }`}
                href={`/watch/${slug}?ver=${index}&ep=${i + 1}`}
              >
                <Play />
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListEpisodes;
