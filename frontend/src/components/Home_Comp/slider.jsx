import { useState } from "react";

export function Slider({ defaultValue = [100], max = 100, step = 1, onValueChange, className = "" }) {
    const [value, setValue] = useState(defaultValue[0]);

    const handleChange = (e) => {
        const val = parseInt(e.target.value);
        setValue(val);
        onValueChange([val]); // keep it as array to match usage
    };

    return (
        <input
            type="range"
            min="0"
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className={`w-full ${className}`}
        />
    );
}
