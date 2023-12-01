import { toKebabCase, toStudlyCase } from "@mongez/reinforcements";

export const namesFactory = {
  qwikComponent(name: string) {
    return toStudlyCase(name);
  },
  qwikPath(name: string) {
    return toKebabCase(name);
  },
  qwikPagePath(name: string) {
    return name + "/index";
  },
  qwikPageComponent(name: string) {
    return toStudlyCase(
      name.replaceAll(/\(|\)|\[|\]|\./g, "").replaceAll("/", "_"),
    );
  },
};
