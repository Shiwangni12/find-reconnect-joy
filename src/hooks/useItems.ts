import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  image: string | null;
  type: 'lost' | 'found';
  status: 'active' | 'resolved' | 'inactive';
  user_id: string;
  contact_info: any;
  created_at: string;
  profiles?: {
    full_name: string | null;
    email: string;
    phone: string | null;
  };
  categories?: {
    name: string;
  };
}

export const useItems = (type?: 'lost' | 'found') => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('items')
        .select(`
          *,
          profiles (full_name, email, phone),
          categories (name)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error } = await query;

      if (error) throw error;

      const formattedItems: Item[] = data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.categories?.name || 'Other',
        location: item.location,
        date: item.date_occurred,
        image: item.image_url,
        type: item.type,
        status: item.status,
        user_id: item.user_id,
        contact_info: item.contact_info,
        created_at: item.created_at,
        profiles: item.profiles,
        categories: item.categories,
      }));

      setItems(formattedItems);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [type]);

  const refetch = () => {
    fetchItems();
  };

  return { items, loading, error, refetch };
};

export const useItem = (id: string) => {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('items')
          .select(`
            *,
            profiles (full_name, email, phone),
            categories (name)
          `)
          .eq('id', id)
          .single();

        if (error) throw error;

        const formattedItem: Item = {
          id: data.id,
          title: data.title,
          description: data.description,
          category: data.categories?.name || 'Other',
          location: data.location,
          date: data.date_occurred,
          image: data.image_url,
          type: data.type,
          status: data.status,
          user_id: data.user_id,
          contact_info: data.contact_info,
          created_at: data.created_at,
          profiles: data.profiles,
          categories: data.categories,
        };

        setItem(formattedItem);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching item:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  return { item, loading, error };
};