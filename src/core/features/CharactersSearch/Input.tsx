import { Autocomplete, TextField } from "@mui/material";
import { CharactersSearchResultList } from "./ResultList";
import { useCharacterSearch } from "./Context";

export function CharactersSearchInput() {
  const { characters, query, onSearch, isFetching } = useCharacterSearch();

  return (
    <Autocomplete
      disablePortal
      options={characters}
      getOptionLabel={(character) => character.name}
      ListboxComponent={CharactersSearchResultList}
      inputValue={query}
      onInputChange={onSearch}
      disableClearable
      freeSolo
      loading={isFetching}
      renderOption={(props, character) => [props, character]}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Search..."
          variant="outlined"
          disabled={isFetching}
          sx={{ width: 300 }}
        />
      )}
    />
  );
}
