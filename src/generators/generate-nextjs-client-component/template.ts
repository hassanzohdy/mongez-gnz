import { gnReactComponent } from "../generate-react-component/template";
import { NextClientComponentOptions } from "./types";

export async function gnNextClientComponent(
  options: NextClientComponentOptions,
) {
  const finalContent = `"use client"\n`;

  const reactComponent = await gnReactComponent(options);

  return finalContent + reactComponent;
}
