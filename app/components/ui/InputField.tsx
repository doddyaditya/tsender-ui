"use client"

import React from 'react';

interface InputFieldProps {
    label: string;
    placeholder?: string;
    value: string;
    type?: React.HTMLInputTypeAttribute;
    large?: boolean;
    onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    placeholder,
    value,
    type = 'text',
    large,
    onChange,
}) => {
    const id = React.useId();

    return (
        <div className="flex flex-col gap-1.5">
            <label
                htmlFor={id}
                className="text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            {large ? (
                <textarea
                    id={id}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className={`bg-white py-2 px-3 border border-zinc-300 placeholder:text-zinc-500 text-zinc-900 shadow-xs rounded-lg focus:ring-[4px] focus:ring-zinc-400/15 focus:outline-none h-24 align-text-top`}
                />
            ) : (
                < input
                    id={id}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className={`bg-white py-2 px-3 border border-zinc-300 placeholder:text-zinc-500 text-zinc-900 shadow-xs rounded-lg focus:ring-[4px] focus:ring-zinc-400/15 focus:outline-none`}
                />)}
        </div>
    );
};

export default InputField;