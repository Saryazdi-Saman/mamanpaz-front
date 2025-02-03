'use client'

import { AddressAutocomplete } from "@/types/types";
import clsx from "clsx"
import { useRef, useState } from "react";


export default function AddressAutoFill({
    addressError,
    cityError,
    postCodeError,
    guestToken
}: {
    addressError?: string[],
    cityError?: string[],
    postCodeError?: string[],
    guestToken: string
}) {
    const [inputValue, setInputValue] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [country, setCountry] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [region, setRegion] = useState('');
    const [suggestions, setSuggestions] = useState<AddressAutocomplete[]>([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSelect = (suggestion: AddressAutocomplete) => {
        setInputValue(suggestion.context.address.name);
        setPostCode(suggestion.context.postcode.name);
        setCity(suggestion.context.place.name);
        setDistrict(suggestion.context.district?.name ?? '');
        setCountry(suggestion.context.country.name);
        setNeighborhood(suggestion.context.neighborhood?.name ?? '');
        setRegion(suggestion.context.region.name);
        setSuggestions([]);
        setActiveIndex(-1);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        console.log(e.key);
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex(prev => prev < suggestions.length - 1 ? prev + 1 : prev);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex(prev => prev > 0 ? prev - 1 : prev);
                break;
            case 'Enter':
                if (suggestions.length !== 0) {
                    e.preventDefault();
                }
                if (activeIndex >= 0) {
                    handleSelect(suggestions[activeIndex]);
                }
                break;
            case 'Escape':
                setSuggestions([]);
                setActiveIndex(-1);
                break;
        }
    };

    const getSuggestedAddress = async (input: string) => {
        if (input.length < 3) {
            setSuggestions([]);
            return
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_MAPBOX_AUTOCOMPLETE_URI}${input}`
            + "&proximity=-79.415612,43.779747"
            + "&types=address"
            + "&limit=3"
            + `&session_token=${guestToken}`
            + "&country=CA"
            + `&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`);
        const data: {
            suggestions: AddressAutocomplete[]
            attribution: string
        } = await response.json();
        if (data && data.suggestions) {
            setSuggestions(data.suggestions);
        }
        return
    }

    return (
        <>
            <div
                role="combobox"
                aria-expanded={suggestions.length > 0}
                aria-haspopup="listbox"
                aria-controls="address-listbox"
                aria-labelledby="address-label"
                className="w-full relative"
            >
                <label
                    id="address-label"
                    htmlFor="address_line1"
                    className="text-muted-foreground text-sm font-semibold"
                >STREET ADDRESS</label>

                <input
                    ref={inputRef}
                    value={inputValue}
                    name="address_line1"
                    id="address_line1"
                    type="text"
                    required
                    minLength={5}
                    autoComplete="new-password"
                    aria-label="Search for an address"
                    aria-autocomplete="list"
                    aria-controls="address-listbox"
                    aria-activedescendant={activeIndex >= 0 ? `address-option-${activeIndex}` : undefined}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        getSuggestedAddress(e.target.value)
                    }}
                    className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
                />

                {addressError && <p className="text-red-500 text-sm">{addressError[0]}</p>}

                {/* Aria live region for screen readers */}
                <div
                    className="sr-only"
                    role="status"
                    aria-live="polite"
                >
                    {suggestions.length > 0
                        ? `${suggestions.length} addresses found`
                        : 'No addresses found'}
                </div>

                {suggestions.length !== 0 && (
                    <ul
                        id="address-listbox"
                        role="listbox"
                        aria-label="Suggested addresses"
                        className="w-full space-y-px border-2 border-gray-300 rounded-md mt-2 absolute bg-white"
                    >
                        {suggestions.map((suggestion, index) => (
                            <li
                                id={`address-option-${index}`}
                                key={index}
                                role="option"
                                aria-selected={index === activeIndex}
                                onClick={() => handleSelect(suggestion)}
                                onMouseEnter={() => setActiveIndex(index)}
                                tabIndex={-1}
                                className={clsx(
                                    "w-full py-2 px-2 text-left cursor-pointer",
                                    index === activeIndex && "bg-blue-50"
                                )}
                            >
                                <span className="font-bold text-base">
                                    {suggestion.name}
                                    <br />
                                    <span className="text-sm font-normal">
                                        {suggestion.context.address.name}, {suggestion.context.place.name}, {suggestion.context.postcode.name}
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <input
                name="district"
                id="district"
                type="text"
                hidden
                value={district}
                readOnly
            />
            <input
                name="country"
                id="country"
                type="text"
                hidden
                value={country}
                readOnly
            />

            <input
                name="neighborhood"
                id="neighborhood"
                type="text"
                hidden
                value={neighborhood}
                readOnly
            />
            <input
                name="region"
                id="region"
                type="text"
                hidden
                value={region}
                readOnly
            />

            <div className="w-full flex gap-x-2 text-muted-foreground">
                <div className="w-full">
                    <label htmlFor="postal_code" className="text-sm font-semibold">POSTAL CODE</label>
                    <input
                        value={postCode}
                        readOnly
                        name="postal_code"
                        id="postal_code"
                        type="text"
                        required
                        tabIndex={-1}
                        className="w-full rounded-md border-2 border-gray-300 p-2"
                    />
                    {postCodeError && <p className="text-red-500 text-sm">{postCodeError[0]}</p>}
                </div>
                <div className="w-full">
                    <label htmlFor="city" className="text-sm font-semibold">CITY</label>
                    <input
                        value={city}
                        name="city"
                        id="city"
                        type="text"
                        required
                        readOnly
                        tabIndex={-1}
                        className="w-full rounded-md border-2 border-gray-300 p-2"
                    />
                    {cityError && <p className="text-red-500 text-sm">{cityError[0]}</p>}

                </div>
            </div>
        </>
    )

}
