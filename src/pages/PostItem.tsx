import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ItemForm } from '@/components/ItemForm';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const PostItem = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    if (!user) {
      toast.error('You must be logged in to post an item');
      return;
    }

    setLoading(true);
    
    try {
      let imageUrl: string | null = null;
      
      // Upload image if provided
      if (data.image) {
        const fileExt = data.image.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('item-images')
          .upload(fileName, data.image);
        
        if (uploadError) {
          throw uploadError;
        }
        
        const { data: urlData } = supabase.storage
          .from('item-images')
          .getPublicUrl(fileName);
        
        imageUrl = urlData.publicUrl;
      }

      // Insert item into database
      const { error } = await supabase
        .from('items')
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description,
          category_id: data.category || null,
          type: data.type,
          location: data.location,
          date_occurred: data.date.toISOString().split('T')[0],
          image_url: imageUrl,
          contact_info: {
            email: user.email,
            phone: null,
          },
        });

      if (error) {
        throw error;
      }

      toast.success(`${data.type === 'lost' ? 'Lost' : 'Found'} item posted successfully!`);
      navigate(data.type === 'lost' ? '/lost-items' : '/found-items');
      
    } catch (error: any) {
      console.error('Error posting item:', error);
      toast.error(error.message || 'Failed to post item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Report an Item</CardTitle>
              <CardDescription>
                Help someone find their lost item or report something you've found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ItemForm onSubmit={handleSubmit} loading={loading} />
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PostItem;