import { useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext";
import { Button } from "@nomic-ui/components";
import { classJoin } from "@nomic-ui/utils";

type LoadableButtonProps = {
  className?: string;
  disabled?: boolean;
  activeText: string;
  loadingText?: string;
  isLoading?: boolean;
  isActive?: boolean;
  setIsLoading?: (isLoading: boolean) => void;
  colorClass: string;
  inactiveColorClass?: string;
  hoverColorClass?: string;
  onClick?: () => Promise<void>;
};

export const LoadableButton = ({
  className = "",
  disabled = false,
  activeText,
  loadingText,
  isLoading,
  isActive = true,
  setIsLoading,
  colorClass,
  inactiveColorClass,
  hoverColorClass,
  onClick,
}: LoadableButtonProps) => {
  const error = useContext(ErrorContext);

  return (
    <Button
      className={classJoin(
        isLoading ? "animate-bounce" : "",
        inactiveColorClass && !isActive ? inactiveColorClass : colorClass,
        hoverColorClass && isActive ? hoverColorClass : "",
        isActive ? "transform hover:-translate-y-0.5 hover: shadow-lg" : "",
        "font-medium text-white",
        className
      )}
      disabled={disabled}
      onClick={async () => {
        if (isLoading) return;
        if (!isActive) return;
        setIsLoading && setIsLoading(true);
        try {
          await onClick();
        } catch (e) {
          error.setErrorMessage(e.message);
          error.setShowError(true);
        }
        setIsLoading && setIsLoading(false);
      }}
    >
      {!isLoading ? activeText : loadingText}
    </Button>
  );
};
