import { createClient } from '../utils/supabase/server';

export default async function Page() {
    const supabase = await createClient();
    const { data: taxaLists } = await supabase.from('taxa_lists').select();

    return (
        <div>
            <h1 className="mb-8">Antenna Go Admin</h1>
            <pre>{JSON.stringify(taxaLists, null, 2)}</pre>
        </div>
    );
}
