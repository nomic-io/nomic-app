import { classJoin } from "@nomic-ui/utils";

type ButtonProps = {
  className?: string;
  onClick?: (() => void) | (() => Promise<void>);
  children?: (JSX.Element | string)[] | (JSX.Element | string);
  disabled?: boolean;
  center?: boolean;
  overrideTextSize?: boolean;
};

export const Button = ({
  className = "",
  onClick,
  children,
  disabled = false,
  center = true,
  overrideTextSize = false,
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={classJoin(
        className,
        center ? "inline-flex justify-center items-center" : "",
        "rounded-md shadow-sm px-4 py-2",
        overrideTextSize ? "" : "text-sm md:text-md"
      )}
      onClick={async () => {
        onClick ? await onClick() : Promise.resolve();
      }}
    >
      {children}
    </button>
  );
};
