import NavEntry from "./NavEntry";

const navigation = [
  {
    name: "HOME",
    path: "#",
    active: true,
  },
  {
    name: "BLOG",
    path: "#",
    active: false,
  },
];

export default function PageNav() {
  return (
    <div className="flex flex-row align-middle font-regular text-md">
      {navigation.map((item, i) => (
        <div key={i} className="ml-8 flex flex-row">
          <NavEntry name={item.name} active={item.active} />
        </div>
      ))}
    </div>
  );
}
