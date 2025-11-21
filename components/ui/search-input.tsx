import { SearchIcon, XIcon } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { LoadingIcon } from './loading/loading-icon';

export const SearchInput = ({
    isLoading,
    onValueChange,
    placeholder,
    value
}: {
    isLoading?: boolean;
    onValueChange: (value: string) => void;
    placeholder?: string;
    value: string;
}) => (
    <div className="relative">
        <div className="w-10 h-full flex items-center justify-center absolute top-0 left-0">
            <SearchIcon className="w-4 h-4" />
        </div>
        <Input
            className="px-10"
            onChange={(e) => onValueChange(e.currentTarget.value)}
            placeholder={placeholder}
            value={value}
        />
        <div className="w-10 h-full flex items-center justify-center absolute top-0 right-0">
            {isLoading ? (
                <LoadingIcon />
            ) : value.length ? (
                <Button onClick={() => onValueChange('')} size="icon" variant="ghost">
                    <XIcon />
                </Button>
            ) : null}
        </div>
    </div>
);
