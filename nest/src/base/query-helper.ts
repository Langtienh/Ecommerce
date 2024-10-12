import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import {
  And,
  Brackets,
  In,
  LessThan,
  MoreThan,
  Not,
  ObjectLiteral,
} from 'typeorm';
export class ParamIdDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  id: number;
}

export class QueryHelper {
  /**
   * @param string
   * @description Chuyển chuỗi thành mảng bởi dấu phẩy
   * @returns string[]
   */
  static strToArr(str: string) {
    if (!str) return [];
    return str.split(',').map((item) => item.trim());
  }

  /**
   * @param value
   * @returns string[]
   * @description Chuyển giá trị thành mảng
   */
  static toArray(value: any): any[] {
    if (!Array.isArray(value)) return this.strToArr(value);
    const result: string[] = [];
    value.forEach((item) => {
      if (typeof item === 'string') {
        result.push(...this.strToArr(item));
      } else {
        result.push(item);
      }
    });
    return result;
  }

  /**
   * @param value
   * @returns number[]
   * @description Chuyển giá trị thành mảng số
   */
  static toNumberArray(value: any): number[] {
    return this.toArray(value).map((v: any) => +v);
  }

  static toOrder(value: any, fields: string[]): Record<string, 'ASC' | 'DESC'> {
    const result: Record<string, 'ASC' | 'DESC'> = {};
    const arr = this.toArray(value);
    arr.forEach((item) => {
      const char = item.charAt(0);
      const field = item.slice(1);
      if (char === '-') {
        if (fields.includes(field)) {
          result[field] = 'DESC';
        }
      } else {
        if (fields.includes(item)) {
          result[item] = 'ASC';
        }
      }
    });
    return result;
  }

  /**
   *
   * @param value
   * @param fields
   * @returns ObjectLiteral | Brackets | ObjectLiteral[]
   */
  static toFilter(
    value: { readonly [key: string]: any },
    fields: string[],
  ): string | ObjectLiteral | Brackets | ObjectLiteral[] {
    const result: ObjectLiteral = {};
    Object.keys(value).forEach((key) => {
      const arrValue = this.toArray(value[key]);
      // item.charAt(0) = '!' | '>' | '<'
      const notEqual = arrValue
        .filter((item) => item.charAt(0) === '!')
        .map((item) => item.slice(1));
      const greaterThan = arrValue
        .filter((item) => item.charAt(0) === '>')
        .map((item) => item.slice(1));
      const lessThan = arrValue
        .filter((item) => item.charAt(0) === '<')
        .map((item) => item.slice(1));
      const equal = arrValue.filter(
        (item) =>
          !notEqual.includes(item.slice(1)) &&
          !greaterThan.includes(item.slice(1)) &&
          !lessThan.includes(item.slice(1)),
      );
      // loại bỏ các trường không tồn tại trong fields
      if (fields.includes(key)) {
        const conditions = [];

        // nếu có giá trị thì thêm điều kiện
        if (equal.length) {
          conditions.push(In(equal));
        }
        if (notEqual.length) {
          conditions.push(Not(In(notEqual)));
        }
        if (greaterThan.length) {
          conditions.push(MoreThan(greaterThan[0]));
        }
        if (lessThan.length) {
          conditions.push(LessThan(lessThan[0]));
        }

        if (conditions.length) {
          result[key] = And(...conditions);
        }
      }
    });
    return result;
  }
}
