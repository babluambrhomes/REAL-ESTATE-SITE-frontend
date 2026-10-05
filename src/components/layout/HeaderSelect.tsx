"use client";

import { useEffect } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
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
    <svg 
        className="h-[18px] w-[15px] text-[#1e6bf2] shrink-0" 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
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
        fetch("https://ipwho.is/")
            .then((res) => res.json())
            .then((data: { city?: string; region?: string; latitude?: number; longitude?: number }) => {

                const cityMatch = findMatch(data.city);

                console.log('ip data ', data)

                const selectedLocation =
                    cityMatch ??
                    (data.city
                        ? {
                            value: normalize(data.city),
                            label: data.city,
                        }
                        : LocationList[0]);

                dispatch(setCity(selectedLocation));

                if (typeof data.latitude === 'number' && typeof data.longitude === 'number') {
                    dispatch(setCoordinates({ latitude: data.latitude, longitude: data.longitude }));
                }
            })
            .catch(() => {
                dispatch(setCity(LocationList[0]));
            });
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
