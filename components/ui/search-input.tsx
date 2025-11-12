import { Loader2Icon, SearchIcon, XIcon } from 'lucide-react';
import { Input } from './input';
import { Button, buttonVariants } from './button';

export const SearchInput = ({
    isLoading,
    onValueChange,
    value
}: {
    isLoading?: boolean;
    onValueChange: (value: string) => void;
    value: string;
}) => (
    <div className="relative">
        <div className="w-10 h-full flex items-center justify-center absolute top-0 left-0">
            <SearchIcon className="w-4 h-4" />
        </div>
        <Input className="px-10" value={value} onChange={(e) => onValueChange(e.currentTarget.value)} />
        <div className="w-10 h-full flex items-center justify-center absolute top-0 right-0">
            {isLoading ? (
                <Loader2Icon className="w-4 h-4 text-secondary animate-spin" />
            ) : value.length ? (
                <Button onClick={() => onValueChange('')} size="icon" variant="ghost">
                    <XIcon />
                </Button>
            ) : null}
        </div>
    </div>
);
