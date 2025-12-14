'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export const logout = async () => {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (data.user) {
        await supabase.auth.signOut();
    }

    revalidatePath('/', 'layout');
};
