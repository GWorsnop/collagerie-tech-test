import { ICharacter, IEpisode, ILocation } from "@/types/types";

const url = "https://rickandmortyapi.com/graphql";

const query = `
query getCharacterData($id: Int){
    characters (filter: { id: $id }) {
      results {
        id
        name
        status
        species
        gender
        image
        location {
          id
          name
          type
          residents {
            id
          }
          dimension
        }
        episode {
          id
          name
          air_date
          characters {
            id
          }
          episode
        }
      }
    }
  }
`;

export const getCharacterDataById = async ({ id }: { id: number }) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: { id },
      }),
    });

    const { data } = await response.json();

    const characterData = data.characters.results.map((character) => {
      const episodeInfo: IEpisode = character.episode.map((episode) => {
        return {
          id: episode.id,
          name: episode.name,
          airDate: episode.air_date,
          noOfCharacters: episode.characters.length,
          episode: episode.episode,
        };
      });

      const locationInfo: ILocation = {
        id: character.location.id,
        name: character.location.name,
        type: character.location.type,
        noOfResidents: character.location.residents.length,
        dimension: character.location.dimension,
      };

      return {
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        gender: character.gender,
        avatar: character.image,
        episodes: episodeInfo,
        location: locationInfo,
      };
    });

    return characterData as ICharacter;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};