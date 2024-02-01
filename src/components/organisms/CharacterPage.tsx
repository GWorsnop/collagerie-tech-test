"use client";
import { useState, useEffect } from "react";
import { ICharacter } from "@/types/types";
import { useParams } from "next/navigation";
import { getCharacterDataById } from "@/app/api/routes/getCharacterDataById";
import Image from "next/image";

export default function CharacterPage() {
  const [character, setCharacter] = useState<ICharacter | undefined>();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacterDataById({ id });
      setCharacter(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full">
        {character ? (
          <>
            <div className="relative flex flex-col items-center pt-24 text-white md:flex-row md:pl-10 md:pt-44">
              <div className="flex h-40 w-40 md:h-64 md:w-64">
                <Image
                  height="256"
                  width="256"
                  src={character.avatar}
                  alt={character.name}
                  className="rounded-full"
                ></Image>
              </div>
              <div className="pt-4 text-center md:pl-6">
                <ul>
                  <li className="flex w-full justify-start pb-3 md:pb-6">
                    <h2 className="text-3xl font-bold md:text-5xl">
                      {character.name}
                    </h2>
                  </li>
                  <li className="flex w-full justify-center gap-2 md:justify-start">
                    <p className="font-semibold">Status:</p>
                    <p>{character.status}</p>
                  </li>
                  <li className="flex w-full justify-center gap-2 md:justify-start">
                    <p className="font-semibold">Origin:</p>
                    <p>{character.origin.name}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:pl-4">
              <div className="pt-10 md:pt-20">
                <h3 className="pb-4 text-center text-3xl font-semibold md:pl-4 md:text-left">
                  Location Details:
                </h3>
                <ul className="flex flex-col gap-1 pl-4">
                  <li className="flex w-full justify-start gap-2">
                    <p className="font-semibold">Name:</p>
                    <p>{character.location.name}</p>
                  </li>
                  <li className="flex w-full justify-start gap-2">
                    <p className="font-semibold">Type:</p>
                    <p>{character.location.type}</p>
                  </li>
                  <li className="flex w-full justify-start gap-2">
                    <p className="font-semibold">Dimension:</p>
                    <p>{character.location.dimension}</p>
                  </li>
                  <li className="flex w-full justify-start gap-2">
                    <p className="font-semibold">No. of Residents:</p>
                    <p>{character.location.noOfResidents}</p>
                  </li>
                </ul>
              </div>
              <div className="py-10">
                <h3 className="pb-4 text-center text-3xl font-semibold md:pl-4 md:text-left">
                  Episodes ({character.episodes.length}):
                </h3>
                <ul className="flex flex-col gap-1 pl-4">
                  <li className="flex w-full justify-start gap-2">
                    <p className="font-semibold">First appearance:</p>
                    <p>{character.episodes[0].name}</p>
                    <p>{character.episodes[0].episode}</p>
                  </li>
                  <li className="flex w-full justify-start gap-2">
                    <p className="font-semibold">First appearance air date:</p>
                    <p>{character.episodes[0].airDate}</p>
                  </li>
                  <li className="flex w-full justify-start gap-2">
                    <p className="font-semibold">
                      First appearance character count:
                    </p>
                    <p>{character.episodes[0].noOfCharacters}</p>
                  </li>
                  <li className="flex w-full justify-start gap-2">
                    <p className="font-semibold">Last appearance:</p>
                    <p>
                      {character.episodes[character.episodes.length - 1].name}
                    </p>
                    <p>
                      {
                        character.episodes[character.episodes.length - 1]
                          .episode
                      }
                    </p>
                  </li>
                  <li className="flex w-full justify-start gap-2">
                    <p className="font-semibold">Last appearance air date:</p>
                    <p>
                      {
                        character.episodes[character.episodes.length - 1]
                          .airDate
                      }
                    </p>
                  </li>
                  <li className="flex w-full justify-start gap-2">
                    <p className="font-semibold">
                      Last appearance character count:
                    </p>
                    <p>
                      {
                        character.episodes[character.episodes.length - 1]
                          .noOfCharacters
                      }
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="relative w-screen pt-40 text-center">
            <h3 className="text-2xl font-semibold text-white">
              Character Page Loading ...
            </h3>
          </div>
        )}
      </div>
    </>
  );
}
