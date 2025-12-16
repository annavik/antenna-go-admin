import { Input } from '../ui/input';
import { FormField } from './form-field';

export const FormInput = ({
    label,
    onValueChange,
    required,
    value
}: {
    label: string;
    onValueChange: (value: string | null) => void;
    required?: boolean;
    value: string | null;
}) => (
    <FormField label={required ? `${label} *` : label}>
        <Input
            onChange={(e) => onValueChange(e.currentTarget.value.length ? e.currentTarget.value : null)}
            required={required}
            value={value ?? ''}
        />
    </FormField>
);
