import { cn } from '@/lib/utils';
import { FormControl } from './form-control';

const COLOR_OPTIONS = ['#3b4681', '#5193f0', '#00ae87', '#f2a31f', '#ef4444', '#f55691'];

export const FormColor = ({
    label,
    onValueChange,
    value
}: {
    label: string;
    onValueChange: (value: string | null) => void;
    value: string | null;
}) => {
    const activeColor = COLOR_OPTIONS.find((color) => color === value) ?? COLOR_OPTIONS[0];

    return (
        <FormControl label={label}>
            <div className="flex items-center gap-2">
                {COLOR_OPTIONS.map((color) => (
                    <div
                        key={color}
                        className={cn('w-10 h-10 rounded-full cursor-pointer hover:opacity-70', {
                            'ring-2 ring-offset-2': color === activeColor
                        })}
                        onClick={() => onValueChange(color)}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
        </FormControl>
    );
};
