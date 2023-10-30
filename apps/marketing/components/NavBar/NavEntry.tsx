type NavEntryProps = {
  name: string;
  active: boolean;
};

export default function NavEntry({ name, active }: NavEntryProps) {
  return (
    <>
      <div className="ml-8 flex flex-row items-center">
        {active ? (
          <div className="w-0.5 h-4 mr-2 bg-primary rounded-full"></div>
        ) : null}
        <button key={name}> {name} </button>
      </div>
    </>
  );
}
