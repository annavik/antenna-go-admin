import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MONTHS } from '@/lib/taxa/constants';
import { XIcon } from 'lucide-react';
import { Button } from './button';

export const MonthSelect = ({
    value,
    onValueChange
}: {
    value: number | null;
    onValueChange: (value: number | null) => void;
}) => (
    <div className="flex items-center gap-2">
        <Select
            value={value !== null ? `${value}` : ''}
            onValueChange={(value) => {
                if (value) {
                    onValueChange(Number(value));
                } else {
                    onValueChange(null);
                }
            }}
        >
            <SelectTrigger className="grow">
                <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
                {MONTHS.map((month) => (
                    <SelectItem key={month.value} value={`${month.value}`}>
                        <span className="pt-0.5">{month.label}</span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        {value !== null ? (
            <Button onClick={() => onValueChange(null)} size="icon" variant="ghost">
                <XIcon className="w-4 h-4" />
            </Button>
        ) : null}
    </div>
);
