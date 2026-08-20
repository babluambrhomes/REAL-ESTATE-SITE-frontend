
import React, { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import Select, {
    type StylesConfig,
    type GroupBase,
    type ValueContainerProps,
} from 'react-select';
import type { OptionType } from '@/types';

const selectStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
    control: (base, state) => ({
        ...base,
        minHeight: '2.2rem',
        color:'red',
        width: '100%',
        maxWidth: '200px',
        backgroundColor: 'transparent',
        borderRadius: '10px',
        boxShadow: 'transparent',
        cursor: 'pointer',
        borderColor:'transparent',
        '&:hover': { borderColor: 'transparent' },
    }),
    valueContainer: () => ({}),
    placeholder: (base) => ({
        ...base,
        color: '#9CA3AF',
        fontWeight: 500,
        fontSize: '0.875rem',
    }),
    singleValue: (base) => ({
        ...base,
        color: '#111827',
        fontWeight: 500,
        fontSize: '0.875rem',
    }),
    menu: (base) => ({
        ...base,
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        marginTop: '0.5rem',
    }),
    menuList: (base) => ({
        ...base,
        padding: '0.25rem',
    }),
    option: (base, state) => ({
        ...base,
        borderRadius: '0.5rem',
        padding: '0.3rem 0.75rem',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: 500,
        backgroundColor:'transparent',
        color: '111827',
        '&:hover':{backgroundColor: 'rgba(37, 99, 235, 0.2)'}
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base, state) => ({
        ...base,
        color: state.isFocused ? '#2563EB' : '#6B7280',
        cursor: 'pointer',
        '&:hover': { color: '#2563EB' },
    }),
};

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

const options: OptionType[] = [
        { value: 'mumbai', label: 'Mumbai' },
        { value: 'delhi', label: 'Delhi' },
        { value: 'bengaluru', label: 'Bengaluru' },
        { value: 'hyderabad', label: 'Hyderabad' },
        { value: 'pune', label: 'Pune' },
        { value: 'chennai', label: 'Chennai' },
        { value: 'kolkata', label: 'Kolkata' },
        { value: 'jaipur', label: 'Jaipur' },
        { value: 'ahmedabad', label: 'Ahmedabad' },
        { value: 'gurgaon', label: 'Gurgaon' },
        { value: 'noida', label: 'Noida' },
        { value: 'chandigarh', label: 'Chandigarh' },
        { value: 'kochi', label: 'Kochi' },
        { value: 'goa', label: 'Goa' },
    ];

export const HeaderSelect = () => {

    const [selectedOption, setSelectedOption] = useState<OptionType | null>(options[0]);

    

    
    return (
        <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        styles={selectStyles}
                        components={{ DropdownIndicator, ValueContainer }}
                        placeholder="Select city..."
                        isSearchable={false}
                    />
    )
}
