import { gnReactComponent } from "../generate-react-component/template";
import { NextServerComponentOptions } from "./types";

export async function gnNextServerComponent(
  options: NextServerComponentOptions,
) {
  const finalContent = `"use server"\n`;

  const reactComponent = await gnReactComponent(options);

  return finalContent + reactComponent;
}
