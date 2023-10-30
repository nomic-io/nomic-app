import { makeAutoObservable } from "mobx";
import { createContext } from "react";

type FilterCallback = (item) => boolean;

class SearchFilter {
  searchCallBack: FilterCallback = (item) => {
    return true;
  };
  filterCallBack: FilterCallback = (item) => {
    return true;
  };

  constructor() {
    makeAutoObservable(this);
  }

  apply<T>(list: T[]) {
    return list
      .filter((item) => {
        return this.searchCallBack(item);
      })
      .filter((item) => {
        return this.filterCallBack(item);
      });
  }
}

export const SearchFilterContext = createContext(new SearchFilter());
