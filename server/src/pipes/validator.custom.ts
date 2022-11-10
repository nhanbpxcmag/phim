import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { isDate } from 'date-fns';

export function IsDateCustom(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsDateCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Giá trị ngày không hợp lệ (định dạng: yyyy-mm-dd)',
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isDate(value);
        },
      },
    });
  };
}

export function IsArrayNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsArrayNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Giá trị array phải là number',
        ...validationOptions,
      },
      validator: {
        validate(value: [], args: ValidationArguments) {
          let check = true;
          if (typeof value !== 'object') {
            return false;
          }
          value.map((value) => {
            if (typeof value !== 'number') {
              check = false;
            }
          });
          for (let index = 0; index < value.length; index++) {
            const v = value[index];
            if (typeof v !== 'number' || isNaN(v)) {
              check = false;
              break;
            }
          }
          return check;
        },
      },
    });
  };
}
