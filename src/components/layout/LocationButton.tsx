"use client";

import { useState } from 'react';
import { LocateFixed } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCoordinates } from '@/store/slice/locationSlice';

export const LocationButton = () => {
    const dispatch = useAppDispatch();
    const [locating, setLocating] = useState(false);
  

    const handleClick = () => {
        if (!navigator.geolocation || locating) return;
        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(
                    setCoordinates({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }),
                );
                setLocating(false);
            },
            () => setLocating(false),
            { timeout: 10000 },
        );
    };

    return (
        <button
            onClick={handleClick}
            disabled={locating}
            title='Current Location'
            className='text px-2 text-primary hover:text-secondary transition-colors cursor-pointer opacity-80 hover:opacity-100 disabled:opacity-40 disabled:cursor-wait'
        >
            <LocateFixed className={`w-5 h-5 ${locating ? 'animate-spin' : ''}`} />
        </button>
    );
};
