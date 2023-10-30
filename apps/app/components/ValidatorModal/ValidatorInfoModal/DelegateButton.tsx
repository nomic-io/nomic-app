import { updateUrlQueryParams } from "@nomic-ui/utils";
import { Button } from "@nomic-ui/components";
import { useRouter } from "next/router";

export const DelegateButton = () => {
  const router = useRouter();

  return (
    <span>
      <Button
        className="inline-flex justify-center bg-gradientStart text-textPrimary font-medium transform hover:-translate-y-0.5"
        onClick={() => {
          updateUrlQueryParams(router, {
            key: "modal",
            value: "delegation",
          });
        }}
      >
        Delegate
      </Button>
    </span>
  );
};
