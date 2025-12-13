'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/lib/supabase/database.types';
import { PenIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ButtonTooltip } from '../ui/button-tooltip';
import { LoadingIcon } from '../ui/loading/loading-icon';
import { Tag } from './tag';

export const ApplyTags = ({
    taxaListId,
    taxaListTags,
    taxonId,
    taxonTags
}: {
    taxaListId: string;
    taxaListTags: Tables<'tags'>[];
    taxonId: string;
    taxonTags: Tables<'tags'>[];
}) => {
    const supabase = createClient();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [checked, setChecked] = useState<{ [key: string]: boolean }>(
        Object.fromEntries(taxonTags.map(({ id }) => [id, true]))
    );
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            await supabase.from('taxa_tags').delete().eq('taxon_id', taxonId);
            await supabase
                .from('taxa_tags')
                .insert(
                    taxaListTags.filter((tag) => checked[tag.id]).map((tag) => ({ taxon_id: taxonId, tag_id: tag.id }))
                );
            setIsOpen(false);
            // TODO: Show message
        } catch (error) {
            // TODO: Show message
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    };

    useEffect(() => setChecked(Object.fromEntries(taxonTags.map(({ id }) => [id, true]))), [isOpen, taxonTags]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <ButtonTooltip content="Apply tags">
                <DialogTrigger asChild>
                    <Button size="icon" variant="ghost">
                        <PenIcon className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
            </ButtonTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apply tags</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <div className="grid gap-8">
                    <div className="flex flex-wrap gap-2">
                        {taxaListTags.map((tag) => (
                            <Tag
                                key={tag.id}
                                isActive={checked[tag.id]}
                                onClick={() => setChecked((prev) => ({ ...prev, [tag.id]: !checked[tag.id] }))}
                                tag={tag}
                            />
                        ))}
                        <Link
                            className="px-2 rounded-full border border-transparent"
                            href={`/taxa-list/${taxaListId}/tags`}
                        >
                            <span className="body-small text-primary font-medium whitespace-nowrap">Edit tags</span>
                        </Link>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Button onClick={() => setIsOpen(false)} variant="ghost">
                            <span className="pt-0.5">Cancel</span>
                        </Button>
                        <Button onClick={onSubmit} variant="success">
                            <span className="pt-0.5">Save</span>
                            {isLoading ? <LoadingIcon /> : null}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
