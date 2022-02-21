import Head from "next/head";
import type { NextPage, GetServerSideProps } from "next";
import type { Character } from "integrations/rickmortyapi/types";
import { getCharacter } from "integrations/rickmortyapi/character";
import { Grid } from "@mui/material";
import { CharacterProfileProvider } from "core/features/CharacterProfile/Context";
import { CharacterProfileBio } from "core/features/CharacterProfile/Bio";
import { CharacterEpisodesList } from "core/features/CharacterProfile/EpisodesList";

export interface CharacterPageProps {
  character: Character;
}

const CharacterPage: NextPage<CharacterPageProps> = (props) => {
  const { character } = props;

  return (
    <CharacterProfileProvider character={character}>
      <Head>
        <title>{character.name} | Rick and Morty</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CharacterProfileBio />
        </Grid>
        <Grid item xs={8}>
          <CharacterEpisodesList />
        </Grid>
      </Grid>
    </CharacterProfileProvider>
  );
};

export const getServerSideProps: GetServerSideProps<CharacterPageProps> = async (ctx) => {
  const characterId = parseInt(ctx.params?.id as string);

  if (Number.isNaN(characterId))
    return {
      notFound: true,
    };

  const character = await getCharacter(characterId);

  if (!character)
    return {
      notFound: true,
    };

  return {
    props: {
      character,
    },
  };
};

export default CharacterPage;
