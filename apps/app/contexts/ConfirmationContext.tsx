import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class Confirmation {
  agreed = false;
  confirmed = false;

  constructor() {
    makeAutoObservable(this);
  }
}

export const ConfirmationContext = createContext(new Confirmation());
