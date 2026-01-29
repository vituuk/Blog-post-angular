export const LocalStorageEnum = {
  Token: '_t',
  RefreshToken: '_rt',
  ForceChangePassword: '_fcp',
  UserId: '_uid',
  menuExtended: '_mned',
  menuExtendedItem: 'mneid',
  user_role: '_ur',
  userPermissions: '_up',
  org_permissions: '_orgp',
  lang: 'lang',
  GeneralLedger: '_gl',
  AccountReceivable: '_ar',
  Session_date: '_sd',
} as const;
export type LocalStorageEnum = typeof LocalStorageEnum[keyof typeof LocalStorageEnum];
