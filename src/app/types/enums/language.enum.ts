export const LanguageEnum = {
  EN: 'en',
  KM: 'km',
} as const;
export type LanguageEnum = (typeof LanguageEnum)[keyof typeof LanguageEnum];
