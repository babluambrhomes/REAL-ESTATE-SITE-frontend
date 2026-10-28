"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import Select, {
    type GroupBase,
    type ValueContainerProps,
} from 'react-select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCity, setCoordinates } from '@/store/slice/locationSlice';
import type { OptionType } from '@/types';
import { LocationList } from '@/data/headerData';
import { headerSelectStyles } from '@/lib/selectStyles';

const MapPinIcon = () => (
    <Image
        src="/banner/icon.svg"
        alt="Location"
        width={24}
        height={30}
        className="h-[18px] w-auto object-contain shrink-0"
        priority
        unoptimized
    />
);

const DropdownIndicator = () => (
    <ChevronDown className="mr-2 h-3.5 w-3.5 text-slate-800 stroke-[2.5]" />
);

const ValueContainer = ({
    children,
}: ValueContainerProps<OptionType, false, GroupBase<OptionType>>) => (
    <div className="relative flex flex-1 flex-nowrap items-center gap-1.5 overflow-hidden pl-2.5 pr-1">
        <MapPinIcon />
        {children}
    </div>
);






const normalize = (name: string) =>
    name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z-]/g, '');

const findMatch = (name?: string): OptionType | undefined => {
    if (!name) return undefined;
    const normalized = normalize(name);
    return (
        LocationList.find((o) => o.value === normalized) ??
        LocationList.find((o) => o.label.toLowerCase() === name.toLowerCase().trim()) ??
        LocationList.find(
            (o) => normalized.includes(o.value) || o.value.includes(normalized),
        )
    );
};

export const HeaderSelect = () => {
    const dispatch = useAppDispatch();
    const selectedCity = useAppSelector((state) => state.location.selectedCity);

    useEffect(() => {
        // If already resolved or cached in this session, don't re-fetch
        try {
            const cached = sessionStorage.getItem("roofin_detected_city");
            if (cached) {
                const parsed = JSON.parse(cached);
                dispatch(setCity(parsed));
                return;
            }
        } catch {}

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);

        fetch("https://ipwho.is/", { signal: controller.signal })
            .then((res) => res.json())
            .then((data: { city?: string; region?: string; latitude?: number; longitude?: number }) => {
                clearTimeout(timeoutId);
                const cityMatch = findMatch(data.city);

                const selectedLocation =
                    cityMatch ??
                    (data.city
                        ? {
                            value: normalize(data.city),
                            label: data.city,
                        }
                        : LocationList[0]);

                dispatch(setCity(selectedLocation));
                try {
                    sessionStorage.setItem("roofin_detected_city", JSON.stringify(selectedLocation));
                } catch {}

                if (typeof data.latitude === 'number' && typeof data.longitude === 'number') {
                    dispatch(setCoordinates({ latitude: data.latitude, longitude: data.longitude }));
                }
            })
            .catch(() => {
                dispatch(setCity(LocationList[0]));
            });

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [dispatch]);


    return (
        <Select
            instanceId="header-location-select"
            value={selectedCity ?? LocationList[0]}
            onChange={(option) => {
                if (option) dispatch(setCity(option));
            }}
            options={LocationList}
            styles={headerSelectStyles}
            components={{ DropdownIndicator, ValueContainer }}
            placeholder="Select city..."
            isSearchable={false}
        />
    );
};
