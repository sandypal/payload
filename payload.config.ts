import { buildConfig } from "payload/config";
import dotenv from "dotenv";
import Page from "./collections/Page";
import Media from "./collections/Media";
import MegaMenu from "./globals/MegaMenu";
import Logo from "./globals/logo";
import path from "path";

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [Page, Media],
  globals: [MegaMenu, Logo],
  admin: {
    css: path.resolve(__dirname, "./css/style.scss"),
  },
});
