import {
  HomeIcon,
  LayoutTemplateIcon,
  Settings2Icon,
  Trash2Icon,
} from "lucide-react";

export const data = {
  user: {
    name: "connor",
    email: "qwerty12345@gmail.com",
    avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: LayoutTemplateIcon,
    },
    {
      title: "Trash",
      url: "/trash",
      icon: Trash2Icon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2Icon,
    },
  ],
};
