type FeaturePointProps = {
  icon: JSX.Element;
  headerLine0: string;
  headerLine1: string;
  bodyText: string;
};

export default function FeaturePoint({
  icon,
  headerLine0,
  headerLine1,
  bodyText,
}: FeaturePointProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="w-1/5">{icon}</div>
      <div className="flex flex-col text-4xl flex flex-row gap-3 mt-8">
        <h1 className="font-extralight"> {headerLine0} </h1>
        <h1 className="font-medium"> {headerLine1} </h1>
      </div>
      <p className="text-textSecondary font-light mt-8 w-full">{bodyText}</p>
      {/* <div className="w-4/5 md:w-1/2 mt-8">
            <Button
                className={"bg-textPrimary"} 
            >
                <h2 className="text-sm text-gradientStart">
                    VIEW WHITEPAPER
                </h2>
            </Button>
        </div> */}
    </div>
  );
}
