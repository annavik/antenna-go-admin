import { CheckIcon, PenIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { ButtonTooltip } from '../ui/button-tooltip';
import { Input } from '../ui/input';
import { FormControl } from './form-control';

export const FormImage = ({
    label,
    onValueChange,
    value
}: {
    label: string;
    onValueChange: (value: string | null) => void;
    value: string | null;
}) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <FormControl
            label={label}
            accessory={
                isEditing ? (
                    <Button onClick={() => setIsEditing(false)} size="icon" variant="success">
                        <CheckIcon className="w-4 h-4" />
                    </Button>
                ) : (
                    <ButtonTooltip content="Edit image">
                        <Button onClick={() => setIsEditing(true)} size="icon" variant="ghost">
                            <PenIcon className="w-4 h-4" />
                        </Button>
                    </ButtonTooltip>
                )
            }
        >
            {isEditing ? (
                <Input
                    placeholder="Specify image URL"
                    value={value ?? ''}
                    onChange={(e) => onValueChange(e.currentTarget.value.length ? e.currentTarget.value : null)}
                />
            ) : (
                <div>
                    {value ? (
                        <a className="hover:opacity-70" href={value} rel="noopener noreferrer" target="_blank">
                            <img alt="" className="bg-muted rounded-md border" src={value} />
                        </a>
                    ) : (
                        <span className="body-base text-muted-foreground">No image set</span>
                    )}
                </div>
            )}
        </FormControl>
    );
};
