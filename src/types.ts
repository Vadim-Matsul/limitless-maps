import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type DetailedProps<
  Props = Record<string, any>,
  Element = HTMLDivElement
> = Props & DetailedHTMLProps<
  HTMLAttributes<Element>,
  Element
>
