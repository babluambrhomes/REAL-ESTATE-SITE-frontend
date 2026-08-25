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

const DropdownIndicator = () => (
    <ChevronDown className="mr-3 h-4 w-4 text-gray-500" />
);

const ValueContainer = ({
    children,
}: ValueContainerProps<OptionType, false, GroupBase<OptionType>>) => (
    <div className="relative flex flex-1 flex-wrap items-center gap-1.5 overflow-hidden px-3">
        <MapPin className="h-4 w-4 shrink-0 text-primary" />
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
