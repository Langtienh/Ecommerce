export enum UserFieldSort {
  ID = 'id',
  NAME = 'name',
  EMAIL = 'email',
  PHONE = 'phone',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}

export interface SortField {
  [key: string]: 'ASC' | 'DESC'
}
