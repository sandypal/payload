import { GlobalConfig } from "payload/types";
import link, { Type as LinkType } from "../fields/link";

export type Type = {
  image: {
    url: string;
    alt: string;
  };
};

const Logo: GlobalConfig = {
  slug: "logo",
  label: "Logo",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "url",
      label: "Logo URL",
      type: "array",
      required: true,
      fields: [link],
    },
  ],
};

export default Logo;
