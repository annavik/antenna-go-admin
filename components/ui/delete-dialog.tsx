import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Loader2Icon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

export const DeleteDialog = ({
    description,
    isLoading,
    onDelete,
    title
}: {
    description: string;
    isLoading: boolean;
    onDelete: () => void;
    title: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <TrashIcon className="w-4 h-4" />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <span className="pt-0.5">{title}</span>
                </TooltipContent>
            </Tooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-end gap-4">
                    <Button onClick={() => setIsOpen(false)} variant="ghost">
                        <span className="pt-0.5">Cancel</span>
                    </Button>
                    <Button onClick={onDelete} variant="destructive">
                        {isLoading ? <Loader2Icon className="w-4 h-4 animate-spin" /> : null}
                        <span className="pt-0.5">Delete</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
