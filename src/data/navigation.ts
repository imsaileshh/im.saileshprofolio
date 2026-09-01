import { 
  Home, User, Code2, Folder, BriefcaseBusiness, Layers 
} from 'lucide-react';

export const navigation = [
  {
    label: "Home",
    href: "/",
    icon: Home
  },
  {
    label: "Works",
    href: "/projects",
    icon: Folder
  },
  {
    label: "Personal Projects",
    href: "/personal-projects",
    icon: Code2
  },
  {
    label: "About",
    href: "/about",
    icon: User
  },
  {
    label: "Stack",
    href: "/stack",
    icon: Layers
  },
  {
    label: "Experience",
    href: "/experience",
    icon: BriefcaseBusiness
  }
];
