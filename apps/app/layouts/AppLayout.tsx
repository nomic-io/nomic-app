import { ErrorModal } from "../components/ErrorModal";
import { LeftBar } from "../components/LeftBar/LeftBar";
import { TestnetIndicator } from "../components/TestnetIndicator";

export interface Props {
  children?: React.ReactNode;
}

export const AppLayout = ({ children }: Props) => {
  return (
    <div className="font-display bg-background text-textPrimary flex flex-row w-screen h-full">
      <LeftBar />
      <div
        style={{
          marginRight: "1.5rem",
          marginLeft: "19rem",
        }}
        className="py-6 w-full h-auto inline-block"
      >
        <ErrorModal />
        {process.env.NEXT_PUBLIC_APP_ENV === "testnet" ? (
          <TestnetIndicator />
        ) : null}
        {children}
      </div>
    </div>
  );
};
