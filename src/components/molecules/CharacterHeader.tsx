import Image from "next/image";
import Link from "next/link";

export default function CharacterHeader() {
  return (
    <>
      <div className="absolute flex h-96 w-full flex-col object-contain">
        <Image
          src="/images/characterBackground.jpeg"
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute top-4 z-10 flex w-full flex-col text-center text-white md:left-10 md:text-left">
        <h1 className="pb-4 text-2xl font-bold md:text-4xl">Rick and Morty</h1>
        <Link href={"/"}> &lt; Back to character listing</Link>
      </div>
    </>
  );
}
