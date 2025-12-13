import { Tables } from '@/lib/supabase/database.types';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { ButtonTooltip } from '../ui/button-tooltip';

export const Tag = ({ isActive, onClick, tag }: { isActive?: boolean; onClick?: () => void; tag: Tables<'tags'> }) => {
    const className = cn('px-2 rounded-full border select-none', {
        'border-transparent bg-primary text-primary-foreground': isActive
    });
    const style = tag.color && isActive ? { backgroundColor: tag.color } : undefined;

    if (onClick) {
        return (
            <button className={className} onClick={onClick} style={style}>
                <TagLabel>{tag.name}</TagLabel>
            </button>
        );
    }

    return tag.description ? (
        <ButtonTooltip content={tag.description}>
            <button className={className} style={style}>
                <TagLabel>{tag.name}</TagLabel>
            </button>
        </ButtonTooltip>
    ) : (
        <div className={className} style={style}>
            <TagLabel>{tag.name}</TagLabel>
        </div>
    );
};

const TagLabel = ({ children }: { children: ReactNode }) => (
    <span className="body-small font-medium whitespace-nowrap">{children}</span>
);
