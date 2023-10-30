import OrgaSmall from "./OrgaSmall";
import OrgaLarge from "./OrgaLarge";

export default function Orga() {
  return (
    <>
      <div className="md:hidden">
        <OrgaSmall />
      </div>
      <div className="hidden md:flex">
        <OrgaLarge />
      </div>
    </>
  );
}
