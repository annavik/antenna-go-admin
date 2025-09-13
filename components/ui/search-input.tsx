import { Loader2Icon, SearchIcon } from 'lucide-react';
import { Input } from './input';

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
        <div className="h-full flex items-center px-3 absolute top-0 left-0">
            <SearchIcon className="w-4 h-4" />
        </div>
        <Input className="px-10" value={value} onChange={(e) => onValueChange(e.currentTarget.value)} />
        <div className="h-full flex items-center px-3 absolute top-0 right-0">
            {isLoading ? <Loader2Icon className="w-4 h-4 text-secondary animate-spin" /> : null}
        </div>
    </div>
);
