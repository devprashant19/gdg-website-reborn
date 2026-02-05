interface INavLinks {
  text: string;
  to: string;
}

const navlinks: INavLinks[] = [
  { text: "Home", to: "/" },
  { text: "Events", to: "/events" },
  { text: "Team", to: "/team" },
  { text: "Projects", to: "/projects" },
  { text: "Contact Us", to: "/contact" },
];

export const LINKS_GROUP_ONE_COUNT = 5;

export default navlinks;
