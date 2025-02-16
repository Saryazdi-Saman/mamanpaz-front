'use client';

import clsx from 'clsx';
import { PlusIcon } from 'lucide-react';
import { useProduct } from './product-context';
import { useActionState } from 'react';
import { addToCartAction } from '@/lib/actions/guest';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        'hover:opacity-90': true
      })}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart() {
  const { selectedPlan } = useProduct();
  const [message, formAction] = useActionState(addToCartAction, null)
  const addPlanAction = formAction.bind(null, selectedPlan?.id)

  return (
    <form
      action={addPlanAction}
    >
      <SubmitButton
        availableForSale={true}
        selectedVariantId={selectedPlan?.id}
      />
      <p aria-live="polite" className="" role="status">
        {message}
      </p>
    </form>
  );
}