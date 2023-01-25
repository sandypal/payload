/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Block } from "payload/types";
import { Type as Page } from "../../collections/Page";
import RichText from "../../components/RichText";

export type Button =
  | {
      type: "page";
      label: string;
      page: Page;
    }
  | {
      type: "custom";
      label: string;
      url: string;
      newTab: boolean;
    };

export type Type = {
  blockType: "macro";
  blockName?: string;
  content: unknown;
  buttons: Button[];
  image: {
    url: string;
    alt: string;
  };
};

type Data = Record<string, unknown>;

const customURLCondition = (_: Data, siblings: Data): boolean =>
  siblings.type === "custom";

export const Macro: Block = {
  slug: "macro",
  labels: {
    singular: "Macro",
    plural: "Macros",
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
      name: "content",
      type: "richText",
    },
    {
      name: "buttons",
      type: "array",
      label: "Buttons",
      minRows: 1,
      maxRows: 2,
      labels: {
        singular: "Button",
        plural: "Buttons",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              label: "Button Label",
              type: "text",
              required: true,
              admin: {
                width: "50%",
              },
            },
            {
              name: "type",
              label: "Button Type",
              required: true,
              type: "radio",
              defaultValue: "page",
              options: [
                {
                  label: "Page",
                  value: "page",
                },
                {
                  label: "Custom URL",
                  value: "custom",
                },
              ],
              admin: {
                width: "50%",
                layout: "horizontal",
              },
            },
          ],
        },
        {
          name: "page",
          label: "Page to link to",
          type: "relationship",
          relationTo: "pages",
          required: true,
          admin: {
            condition: (_: Data, siblings: Data): boolean =>
              siblings.type === "page",
          },
        },
        {
          name: "url",
          label: "Button URL",
          type: "text",
          required: true,
          admin: {
            condition: customURLCondition,
          },
        },
        {
          name: "newTab",
          type: "checkbox",
          label: "Open in new tab",
          required: true,
          admin: {
            condition: customURLCondition,
          },
        },
      ],
    },
  ],
};

export const Component: React.FC<Type> = (props) => {
  const { content, buttons, image, blockName } = props;

  console.log(props);

  return (
    <div className={`bg-[#DCEAF5] ${blockName?.toLowerCase()}`}>
      <div className="grid grid-cols-2 container mx-auto items-center">
        <div className="">
          <RichText content={content} className="" />
          {buttons && (
            <ul className="">
              {buttons.map((button, i) => (
                <li key={i}>
                  {button.type === "page" && (
                    <Link
                      className="bg-[#F58A07] border border-transparent text-white px-8 py-3 block mt-5 w-max rounded-full transition-all duration-300 hover:bg-transparent hover:border-[#F58A07] hover:text-[#F58A07] font-medium"
                      href="[...slug]"
                      as={`/${button.page.slug}`}
                    >
                      {button.label}
                    </Link>
                  )}
                  {button.type === "custom" && (
                    <Link
                      className=""
                      href={button.url}
                      target={button.newTab ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      {button.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        {image && (
          <div className="">
            <Image
              src={image?.url}
              alt={image?.alt}
              width={934}
              height={645}
              priority={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};
