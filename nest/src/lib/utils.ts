import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

const strToArr = (str: string) => str.split(',').map((item) => item.trim());

export const toArray = (value: string | string[]) => {
  if (typeof value === 'string') {
    return strToArr(value);
  }
  const result: string[] = [];
  value.forEach((item) => {
    if (typeof item === 'string') {
      result.push(...strToArr(item));
    } else {
      result.push(item);
    }
  });
  return result;
};

export enum ALLOWED_TYPES {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
}

interface RootArray {
  value: string;
  type: ALLOWED_TYPES;
}

/**
 *
 * @param value mảng hoặc chuỗi thô từ query
 * @param rootArray mảng {value: string, type: ALLOWED_TYPES} được phép
 * @returns mảng chuỗi các phần tử được phép sort hoặc filter
 */
export const filterArray = (
  value: string | string[],
  rootArray: RootArray[],
) => {
  const arr = toArray(value);
  return arr.filter((item) =>
    rootArray.some((root) => root.value === replaceChars(item)),
  );
};

const allowedChars = ['-', '>', '<', '!'];
const replaceChars = (str: string) => {
  let result = str;
  allowedChars.forEach((char) => {
    result = result.replace(char, '');
  });
  return result;
};

export class ParamIdDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  id: number;
}
/**
 *
 * @param value mảng sort: ['field', '-field']
 * @returns format lại mảng sort thành sort: {field: 'ASC' | 'DESC'}
 */
export const toSort = (value: string[]) => {
  const sort: Record<string, 'ASC' | 'DESC'> = {};
  value.forEach((item) => {
    const field = replaceChars(item);
    const order = item.includes('-') ? 'DESC' : 'ASC';
    sort[field] = order;
  });
  return sort;
};

export const toWhere = (
  querys: Record<string, ALLOWED_TYPES>,
  rootArray: RootArray[],
) => {
  const where: Record<string, any> = {};
  return querys;
};
