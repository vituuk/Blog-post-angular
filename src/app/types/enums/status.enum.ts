export const StatusEnum = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
} as const;

export type StatusEnum = (typeof StatusEnum)[keyof typeof StatusEnum];
