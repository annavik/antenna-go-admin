'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Button } from './button';
import { ButtonTooltip } from './button-tooltip';

export const Panel = ({
    accessory,
    children,
    title,
    description
}: {
    accessory?: ReactNode;
    children: ReactNode;
    title: string;
    description?: string;
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className={cn('relative bg-muted border-r', { 'w-sm': !isCollapsed })}
            onClick={() => {
                if (isCollapsed) {
                    setIsCollapsed(false);
                }
            }}
        >
            {isCollapsed ? (
                <div className="p-8" style={{ writingMode: 'vertical-rl' }}>
                    <span className="body-xlarge font-medium text-primary">{title}</span>
                </div>
            ) : (
                <div className="w-full h-full absolute top-0 left-0 p-8 overflow-auto">
                    <div className="grid gap-2 mb-8">
                        <div className="flex items-center justify-between gap-2">
                            <span className="body-xlarge font-medium text-primary">{title}</span>
                            {accessory}
                        </div>
                        {description ? <span className="body-small text-muted-foreground">{description}</span> : null}
                    </div>
                    {children}
                </div>
            )}
            <ButtonTooltip content={isCollapsed ? 'Expand' : 'Collapse'}>
                <Button
                    className="absolute top-2 right-0 translate-x-[50%] rounded-full z-1"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    size="icon"
                    variant="outline"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </Button>
            </ButtonTooltip>
        </div>
    );
};
