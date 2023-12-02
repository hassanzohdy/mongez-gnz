import { ltrim, toKebabCase, toStudlyCase } from "@mongez/reinforcements";

export const namesFactory = {
  qwikComponent(name: string) {
    return toStudlyCase(name);
  },
  qwikPath(name: string) {
    return toKebabCase(name);
  },
  qwikPageComponent(name: string) {
    return toStudlyCase(
      name.replaceAll(/\(|\)|\[|\]|\./g, "").replaceAll("/", "_"),
    );
  },
  qwikPagePath(name: string) {
    return ltrim(name, "/");
  },
};
