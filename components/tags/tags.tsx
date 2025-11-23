import { Tables } from '@/lib/supabase/database.types';
import { AddTag } from './add-tag';
import { DeleteTag } from './delete-tag';
import { EditTag } from './edit-tag';
import { Tag } from './tag';

export const Tags = ({ tags, taxaListId }: { tags: Tables<'tags'>[]; taxaListId: string }) => (
    <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
            <span className="body-base font-medium">Tags</span>
            <AddTag taxaListId={taxaListId} />
        </div>
        {tags.map((tag) => (
            <div key={tag.id} className="flex items-center justify-between gap-2">
                <Tag isActive tag={tag} />
                <div className="flex items-center gap-2">
                    <DeleteTag tagId={tag.id} />
                    <EditTag tag={tag} />
                </div>
            </div>
        ))}
    </div>
);
