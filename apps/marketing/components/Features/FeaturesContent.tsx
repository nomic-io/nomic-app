import TimelineLarge from "./TimelineLarge";
import Timeline from "./Timeline";

export default function FeaturesContent() {
  return (
    <div className="flex flex-col justify-center gap-24">
      <div className="flex flex-col justify-center gap-4">
        <h2 className="text-sm text-textPrimary text-center">INTRODUCING</h2>
        <span className="text-4xl flex flex-col gap-3 items-center justify-center">
          <h1 className="font-extralight"> {"Fully-backed" + " "} </h1>
          <h1 className="font-medium"> IBC Bitcoin </h1>
        </span>
        <div className="w-4/5 text-center">
          <p className="text-textSecondary font-light"></p>
        </div>
      </div>
      <div className="hidden md:flex">
        <TimelineLarge />
      </div>
      <div className="md:hidden ml-6">
        <Timeline />
      </div>
    </div>
  );
}
