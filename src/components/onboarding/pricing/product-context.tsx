'use client';

import { ProductWithPricing, VariantWithPrice } from '@/types/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useMemo, useOptimistic } from 'react';

type DeliverySchedule = {
    title: string;
    day1: number;
    day2: number;
    day3: number;
    day4: number;
    day5: number;
    day6: number;
    day7: number;
};

type DayDelivery = {
    date: Date;
    dayOfWeek: string;
    meals: number;
    formattedDate: string;
}

type ProductState = {
    [key: string]: string;
};

type ProductContextType = {
    state: ProductState;
    updateOption: (name: string, value: string) => ProductState;
    selectedPlan: VariantWithPrice | undefined
    deliveryDays: DayDelivery[] | undefined
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
            }, undefined as VariantWithPrice | undefined);

        const defaultParams = defaultVariant?.options.reduce((acc, opt) => {
            if (!opt.option) return acc
            return {
                ...acc,
                [opt.option.title.toLowerCase()]: opt.value
            }
        }, {}) ?? {}

        const params: ProductState = { ...defaultParams };
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

    const selectedPlan = useMemo(() => {
        return product.variants.find(variant =>
            variant.options.every(opt =>
                opt.option && state[opt.option.title.toLowerCase()] === opt.value
            )
        );
    }, [product.variants, state]);

    const deliveryDays = useMemo(() => {
        if (!selectedPlan?.metadata?.delivery_schedule) return undefined

        const deliverySchedule = selectedPlan.metadata.delivery_schedule as DeliverySchedule
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 1);

        const daysOfWeek = [
            'Sundays', 'Mondays', 'Tuesdays', 'Wednesdays',
            'Thursdays', 'Fridays', 'Saturdays'
        ];

        const formatter = new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric'
        });

        return Array.from({ length: 7 }, (_, i) => {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);

            const meals = (deliverySchedule[`day${i + 1}` as keyof DeliverySchedule] as number) * (selectedPlan.metadata?.meals_per_day as number)
            return {
                date: currentDate,
                dayOfWeek: daysOfWeek[currentDate.getDay()],
                meals,
                formattedDate: formatter.format(currentDate)
            };

        }).filter(day => day.meals)
    }, [selectedPlan])

    const updateOption = (name: string, value: string) => {
        const newState = { [name]: value };
        setOptimisticState(newState);
        return { ...state, ...newState };
    };

    const value = useMemo(
        () => ({
            state,
            updateOption,
            selectedPlan,
            deliveryDays
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