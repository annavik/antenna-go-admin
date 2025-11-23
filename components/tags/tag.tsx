import { Tables } from '@/lib/supabase/database.types';
import { cn } from '@/lib/utils';

export const Tag = ({ isActive, onClick, tag }: { isActive?: boolean; onClick?: () => void; tag: Tables<'tags'> }) => (
    <div
        className={cn('px-1.5 rounded-sm border', {
            'border-transparent bg-primary text-primary-foreground': isActive,
            'select-none cursor-pointer hover:opacity-70': onClick
        })}
        onClick={onClick}
        style={tag.color && isActive ? { backgroundColor: tag.color } : undefined}
    >
        <span className="body-small font-medium">{tag.name}</span>
    </div>
);
