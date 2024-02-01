import Image from "next/image";

export default function HomeHeader() {
  return (
    <div className="absolute flex h-32 w-full flex-col object-contain md:h-64">
      <Image
        className="w-full"
        src="/images/homeBackground.jpeg"
        alt="Background"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute flex h-fit w-full flex-col pt-10 text-center md:pt-20">
        <h1 className="text-2xl font-bold text-white md:text-4xl">
          Rick and Morty
        </h1>
      </div>
    </div>
  );
}
