import { Input } from '../ui/input';
import { FormField } from './form-field';

export const FormInput = ({
    label,
    onValueChange,
    value
}: {
    label: string;
    onValueChange: (value: string | null) => void;
    value: string | null;
}) => (
    <FormField label={label}>
        <Input
            value={value ?? ''}
            onChange={(e) => onValueChange(e.currentTarget.value.length ? e.currentTarget.value : null)}
        />
    </FormField>
);
