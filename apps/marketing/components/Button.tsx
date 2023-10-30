import { classJoin } from "@nomic-ui/utils";

type ButtonProps = {
  className?: string;
  onClick?: () => Promise<void>;
  children?: JSX.Element | string;
};

export const Button = ({
  className = "",
  onClick = async () => {
    return;
  },
  children,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classJoin(
        className,
        "inline-flex justify-center",
        "rounded-md shadow-sm px-4 py-2 m-1 w-full",
        "sm:text-sm",
        "md:text-sm"
      )}
      onClick={async () => {
        await onClick();
      }}
    >
      {children}
    </button>
  );
};
