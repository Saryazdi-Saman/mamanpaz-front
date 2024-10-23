// types/svg.d.ts
// declare module '*.svg' {
//   import type { FC, SVGProps } from 'react';

//   export const ReactComponent: FC<SVGProps<SVGSVGElement>>;

//   // Also allow importing as URL
//   const content: string;
//   export default content;
// }

declare module '*.svg' {
  import type { FC, SVGProps } from 'react';
  const component: FC<SVGProps<SVGSVGElement>>;
  export default component;
}