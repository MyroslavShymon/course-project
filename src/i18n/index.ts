import { Locales } from "./locales";

import en from "./en.json";
import ua from "./ua.json";

export const messages = {
  [Locales.EN]: en,
  [Locales.UA]: ua,
};

export const defaultLocale = Locales.UA;
