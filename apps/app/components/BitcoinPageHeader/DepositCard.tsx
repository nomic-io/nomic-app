import { classJoin, updateUrlQueryParams } from "@nomic-ui/utils";
import { Button, Card } from "@nomic-ui/components";
import { useRouter } from "next/router";

type DepositCardProps = {
  className?: string;
};

export const DepositCard = ({ className = "" }: DepositCardProps) => {
  const router = useRouter();

  return (
    <Card
      className={classJoin(
        "flex flex-col justify-between leading-none gap-4",
        className
      )}
    >
      <div className="flex flex-col gap-1 justify-center">
        <h3 className="uppercase text-transparent text-sm font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
          Current Deposit Fee
        </h3>
        <h1 className="text-3xl text-textPrimary font-semibold">{"20%"}</h1>
      </div>
      <Button
        className="font-semibold text-textPrimary bg-gradientStart hover:shadow-lg transform hover:-translate-y-0.5 text-center w-full"
        onClick={() => {
          updateUrlQueryParams(router, {
            key: "deposit",
            value: "address",
          });
        }}
      >
        Deposit
      </Button>
    </Card>
  );
};
