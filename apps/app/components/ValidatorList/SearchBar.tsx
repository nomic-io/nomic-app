import { Validator } from "../../models/validator";
import { useContext } from "react";
import { SearchFilterContext } from "../../contexts/SearchFilterContext";

export const SearchBar = () => {
  const searchFilter = useContext(SearchFilterContext);

  return (
    <input
      type="text"
      className="bg-black"
      onChange={(e) => {
        searchFilter.searchCallBack = (validator: Validator) => {
          return validator.info.moniker.includes(e.target.value);
        };
      }}
    />
  );
};
