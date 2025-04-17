import Link from "next/link";
import Image from "next/image";

interface ScalingImageLinkProps {
  slug: string;
  thumbnail: string;
  name: string;
  isSubmitted: boolean;
}

const ScalingImageLink: React.FC<ScalingImageLinkProps> = ({
  slug,
  thumbnail,
  name,
  isSubmitted,
}) => {
  // Check if thumbnail is empty or null
  const hasValidImage = thumbnail && thumbnail.trim() !== "";

  return (
    <Link
      href={slug}
      className="group relative aspect-square overflow-hidden rounded-lg shadow-lg"
    >
      {hasValidImage ? (
        <div className="absolute inset-0 transform transition-transform duration-300 group-hover:scale-110">
          <Image src={thumbnail} alt={name} fill className="object-cover" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No image available</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      {isSubmitted && (
        <div className="absolute top-0 p-4">
          <span className="text-sm text-white bg-green-600 px-2 py-1 rounded-full">
            Dikerjakan
          </span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className={`text-white mt-2 text-lg leading-[20px] font-bold`}>
          {name}
        </p>
      </div>
    </Link>
  );
};

export default ScalingImageLink;
