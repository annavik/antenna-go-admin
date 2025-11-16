import { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const ButtonTooltip = ({ children, content }: { children: ReactNode; content: string }) => (
    <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
            <span className="pt-0.5">{content}</span>
        </TooltipContent>
    </Tooltip>
);
