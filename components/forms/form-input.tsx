import { Input } from '../ui/input';
import { FormControl } from './form-control';

export const FormInput = ({
    label,
    onValueChange,
    value
}: {
    label: string;
    onValueChange: (value: string | null) => void;
    value: string | null;
}) => (
    <FormControl label={label}>
        <Input
            value={value ?? ''}
            onChange={(e) => onValueChange(e.currentTarget.value.length ? e.currentTarget.value : null)}
        />
    </FormControl>
);
