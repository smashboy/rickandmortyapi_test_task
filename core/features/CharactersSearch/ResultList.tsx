import { forwardRef, useMemo } from "react";
import { Virtuoso } from "react-virtuoso";
import type { Components } from "react-virtuoso";
import { Box, List } from "@mui/material";
import { VirtualListItem } from "core/components/VirtualListItem";
import type { Character } from "rickmortyapi/dist/interfaces";
import { CharacterListItem } from "../CharactersList/ListItem";
import { useCharacterSearch } from "./Context";
import { LoadingAnimation } from "core/components/LoadingAnimation";

// eslint-disable-next-line react/display-name
export const CharactersSearchResultList = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>((props, ref) => {
  const { fetchNext, isFetchingNextPage } = useCharacterSearch();

  const { children, ...otherProps } = props;

  const itemData: React.ReactChild[] = [];
  (children as React.ReactChild[]).forEach(
    (item: React.ReactChild & { children?: React.ReactChild[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  );

  const Components: Components = useMemo(
    () => ({
      // eslint-disable-next-line react/display-name
      List: forwardRef(({ style, children }, listRef) => (
        <List style={{ padding: 0, ...style, margin: 0 }} component="div" ref={listRef}>
          {children}
        </List>
      )),
      item: VirtualListItem,
      Footer: () =>
        isFetchingNextPage ? (
          <LoadingAnimation
            containerStyles={{ height: "auto", paddingY: 2 }}
            propgressProps={{ color: "inherit", size: 20 }}
          />
        ) : null,
    }),
    [isFetchingNextPage]
  );

  return (
    <Box ref={ref} sx={{ height: 300 }} {...otherProps}>
      <Virtuoso
        // @ts-ignore
        data={itemData}
        components={Components}
        endReached={fetchNext}
        overscan={10}
        itemContent={(_, [props, character]: [any, Character]) => (
          <CharacterListItem key={character.id} character={character} autoCompleteProps={props} />
        )}
      />
    </Box>
  );
});
