import { Textarea } from '../ui/textarea';
import { FormControl } from './form-control';

export const FormTextarea = ({
    label,
    onValueChange,
    value
}: {
    label: string;
    onValueChange: (value: string | null) => void;
    value: string | null;
}) => (
    <FormControl label={label}>
        <Textarea
            value={value ?? ''}
            onChange={(e) => onValueChange(e.currentTarget.value.length ? e.currentTarget.value : null)}
        />
    </FormControl>
);
