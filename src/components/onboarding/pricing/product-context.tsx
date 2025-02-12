'use client';

import { ProductWithPricing, VariantsWithPrice } from '@/types/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useMemo, useOptimistic } from 'react';

type ProductState = {
    [key: string]: string;
}
type ProductContextType = {
    state: ProductState;
    updateOption: (name: string, value: string) => ProductState;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({
    children,
    product
}: {
    children: React.ReactNode,
    product: ProductWithPricing
}) {
    const searchParams = useSearchParams();

    const getInitialState = () => {
        const defaultVariant = product.variants
            .reduce((lowest, current) => {
                if (!lowest
                    || !current.calculated_price.calculated_amount
                    || !lowest.calculated_price.calculated_amount) return current
                return current.calculated_price.calculated_amount < lowest.calculated_price.calculated_amount
                    ? current
                    : lowest
            }, undefined as VariantsWithPrice | undefined);
    
        const defaultParams = defaultVariant?.options.reduce((acc, opt) => {
            if (!opt.option) return acc
            return {
                ...acc,
                [opt.option.title.toLowerCase()]: opt.value
            }
        }, {}) ?? {}

        const params: ProductState = {...defaultParams};
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        return params;
    };

    const [state, setOptimisticState] = useOptimistic(
        getInitialState(),
        (prevState: ProductState, update: ProductState) => ({
            ...prevState,
            ...update
        })
    );

    const updateOption = (name: string, value: string) => {
        const newState = { [name]: value };
        setOptimisticState(newState);
        return { ...state, ...newState };
    };

    const value = useMemo(
        () => ({
            state,
            updateOption,
        }),
        [state]
    );

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProduct() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
}

export function useUpdateURL() {
    const router = useRouter();

    return (state: ProductState) => {
        const newParams = new URLSearchParams(window.location.search);
        Object.entries(state).forEach(([key, value]) => {
            if (key !== "price") (
                newParams.set(key, value)
            )
        });
        router.replace(`?${newParams.toString()}`, { scroll: false });
    };
}