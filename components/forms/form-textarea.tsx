import { Textarea } from '../ui/textarea';
import { FormField } from './form-field';

export const FormTextarea = ({
    label,
    onValueChange,
    value
}: {
    label: string;
    onValueChange: (value: string | null) => void;
    value: string | null;
}) => (
    <FormField label={label}>
        <Textarea
            value={value ?? ''}
            onChange={(e) => onValueChange(e.currentTarget.value.length ? e.currentTarget.value : null)}
        />
    </FormField>
);
