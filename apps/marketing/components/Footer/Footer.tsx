import Socials from "../CommunitySection/Socials";

const navigation = {
  main: [
    { name: "HOME", href: "#" },
    { name: "FEATURES", href: "#" },
    { name: "ORGA", href: "#" },
    { name: "COMMUNITY", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a
                href={item.href}
                className="text-textTertiary hover:textTertiary"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <Socials className="gap-3" />
        </div>
        <p className="mt-8 text-center text-textTertiary">
          &copy; 2020 Workflow, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
