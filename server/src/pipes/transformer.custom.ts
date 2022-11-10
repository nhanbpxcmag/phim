import { Transform } from 'class-transformer';
// import { isValid, parseISO } from 'date-fns';
// import { filedSort } from 'src/app/admin/userGhiChu/userGhiChu.admin.dto';
// import { transformSort } from 'src/utils/query';

// export function TransformerSort() {
//   return Transform(({ value }: { value: [] }) =>
//     transformSort(value, filedSort),
//   );
// }
export function TransformerArrayNumber() {
  return Transform(({ value }: { value: any[] }) => {
    if (typeof value === 'object' && value.length) {
      value.forEach(function (part, index) {
        value[index] = parseInt(part, 10);
      });
    }
    return value;
  });
}

// export function TransformerDate() {
//   return Transform(({ value }) => {
//     const time = parseISO(value, { additionalDigits: 0 });
//     if (isValid(time)) {
//       return time;
//     }
//     return false;
//   });
// }
