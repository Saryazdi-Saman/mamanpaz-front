'use client'
import clsx from 'clsx';
import { useProduct } from './product-context';
import { ProductWithPricing } from '@/types/types';

const Price = ({
  className,
  currencyCode = 'CAD',
  currencyCodeClassName,
  product
}: {
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
  product: ProductWithPricing
} & React.ComponentProps<'p'>) => {
  const { variants } = product;
  const { state } = useProduct()

  const variant = variants.find((variant) =>
    variant.options.every(
      (option) => option.value === state[option.option?.title.toLowerCase() ?? ""]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  return (
    <p suppressHydrationWarning={true} className={className}>
      {`${new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol'
      }).format(parseFloat(variant?.calculated_price.calculated_amount?.toString() ?? "0"))}`}
      <span className={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span>
    </p>
  )
}
export default Price;