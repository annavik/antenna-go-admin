export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: '13.0.4';
    };
    public: {
        Tables: {
            taxa: {
                Row: {
                    class: string | null;
                    comments: string | null;
                    common_name: string | null;
                    cover_image_credit: string | null;
                    cover_image_url: string | null;
                    created_at: string;
                    family: string | null;
                    gbif_taxon_key: string | null;
                    genus: string | null;
                    id: number;
                    inat_taxon_id: string | null;
                    order: string | null;
                    phylum: string | null;
                    species: string | null;
                    status: string | null;
                    subfamily: string | null;
                    superfamily: string | null;
                    taxa_list_id: number;
                    tribe: string | null;
                };
                Insert: {
                    class?: string | null;
                    comments?: string | null;
                    common_name?: string | null;
                    cover_image_credit?: string | null;
                    cover_image_url?: string | null;
                    created_at?: string;
                    family?: string | null;
                    gbif_taxon_key?: string | null;
                    genus?: string | null;
                    id?: number;
                    inat_taxon_id?: string | null;
                    order?: string | null;
                    phylum?: string | null;
                    species?: string | null;
                    status?: string | null;
                    subfamily?: string | null;
                    superfamily?: string | null;
                    taxa_list_id: number;
                    tribe?: string | null;
                };
                Update: {
                    class?: string | null;
                    comments?: string | null;
                    common_name?: string | null;
                    cover_image_credit?: string | null;
                    cover_image_url?: string | null;
                    created_at?: string;
                    family?: string | null;
                    gbif_taxon_key?: string | null;
                    genus?: string | null;
                    id?: number;
                    inat_taxon_id?: string | null;
                    order?: string | null;
                    phylum?: string | null;
                    species?: string | null;
                    status?: string | null;
                    subfamily?: string | null;
                    superfamily?: string | null;
                    taxa_list_id?: number;
                    tribe?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'taxa_taxa_list_id_fkey';
                        columns: ['taxa_list_id'];
                        isOneToOne: false;
                        referencedRelation: 'taxa_lists';
                        referencedColumns: ['id'];
                    }
                ];
            };
            taxa_list_members: {
                Row: {
                    taxa_list_id: number;
                    user_id: string;
                };
                Insert: {
                    taxa_list_id: number;
                    user_id: string;
                };
                Update: {
                    taxa_list_id?: number;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'taxa_list_members_taxa_list_id_fkey';
                        columns: ['taxa_list_id'];
                        isOneToOne: false;
                        referencedRelation: 'taxa_lists';
                        referencedColumns: ['id'];
                    }
                ];
            };
            taxa_lists: {
                Row: {
                    comments: string | null;
                    created_at: string;
                    id: number;
                    name: string;
                };
                Insert: {
                    comments?: string | null;
                    created_at?: string;
                    id?: number;
                    name: string;
                };
                Update: {
                    comments?: string | null;
                    created_at?: string;
                    id?: number;
                    name?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
              DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
        : never = never
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
          DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
        : never = never
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
        : never = never
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

export type Enums<
    DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
        : never = never
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof DefaultSchema['CompositeTypes']
        | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
        : never = never
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
    public: {
        Enums: {}
    }
} as const;
