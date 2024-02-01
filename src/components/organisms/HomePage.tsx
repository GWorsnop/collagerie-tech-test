"use client";
import { getAliveMortyData } from "@/app/api/routes/getAliveMortyData";
import { useState, useEffect } from "react";
import { ICharacterCore } from "@/types/types";
import Link from "next/link";

function HomePage() {
  const [characters, setCharacters] = useState<
    ICharacterCore[] | [] | undefined
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const data = await getAliveMortyData({ page: 1 });
      setCharacters(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="absolute top-64 flex w-screen text-center text-white">
        <h3 className="text-1xl font-semibold text-black">
          Home Page Loading ...
        </h3>
      </div>
    );
  } else
    return (
      <div className="relative flex flex-col items-center pt-24 md:pt-44">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5 lg:gap-10 xl:grid-cols-6">
          {characters &&
            characters.map((character: ICharacterCore) => {
              return (
                <div
                  key={character.id}
                  className="flex w-40 flex-col items-center text-center"
                >
                  <img
                    className="image rounded-lg"
                    width="160px"
                    src={character.avatar}
                    alt={character.name}
                  ></img>
                  <div className="flex w-40 flex-col text-xs">
                    <ul className="flex h-24 w-full flex-col justify-around py-2">
                      <li className="flex w-full justify-start gap-1">
                        <p className="font-semibold">Name:</p>
                        <p className="text-start">{character.name}</p>
                      </li>
                      <li className="flex w-full justify-start gap-1">
                        <p className="font-semibold">Gender:</p>
                        <p>{character.gender}</p>
                      </li>
                      <li className="flex w-full justify-start gap-1">
                        <p className="font-semibold">Species:</p>
                        <p>{character.species}</p>
                      </li>
                    </ul>
                    <Link
                      href={`/character/${character.id}`}
                      className="w-full"
                    >
                      <button className="h-8 w-full rounded-sm bg-yellow-300 text-sm hover:bg-yellow-400">
                        See more
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
}

export default HomePage;
