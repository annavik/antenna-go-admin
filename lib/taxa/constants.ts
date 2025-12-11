export const RANKS = ['phylum', 'class', 'order', 'superfamily', 'family', 'subfamily', 'tribe', 'genus', 'species'];

export const LABELS = {
    inat_taxon_id: 'iNat taxon ID',
    gbif_taxon_key: 'GBIF taxon key',
    phylum: 'Phylum',
    class: 'Class',
    order: 'Order',
    superfamily: 'Superfamily',
    family: 'Family',
    subfamily: 'Subfamily',
    tribe: 'Tribe',
    genus: 'Genus',
    species: 'Species',
    cover_image_url: 'Cover image',
    cover_image_thumbnail_url: 'Cover image thumbnail',
    cover_image_credit: 'Cover image credit',
    active_period_from: 'From',
    active_period_to: 'To',
    common_name: 'Common name',
    tags: 'Tags',
    notes: 'Notes'
};

export const MONTHS = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(i);

    return {
        value: i + 1,
        label: date.toLocaleString(undefined, { month: 'long' })
    };
});
