import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class ErrorStore {
  showError = false;
  setShowError = (showError: boolean) => {
    this.showError = showError;
  };
  errorMessage = "";
  setErrorMessage = (errorMessage: string) => {
    this.errorMessage = errorMessage;
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export const ErrorContext = createContext(new ErrorStore());
