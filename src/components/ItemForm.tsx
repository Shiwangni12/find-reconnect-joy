import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useCategories } from '@/hooks/useCategories';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ItemFormData {
  title: string;
  description: string;
  category: string;
  location: string;
  date: Date | undefined;
  image: File | null;
}

interface ItemFormProps {
  onSubmit: (data: ItemFormData & { type: 'lost' | 'found' }) => Promise<void>;
  loading: boolean;
}

export const ItemForm = ({ onSubmit, loading }: ItemFormProps) => {
  const { categories } = useCategories();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<ItemFormData>({
    title: '',
    description: '',
    category: '',
    location: '',
    date: undefined,
    image: null,
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (field: keyof ItemFormData, value: string | Date | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!user) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('item-images')
      .upload(fileName, file);
    
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }
    
    const { data } = supabase.storage
      .from('item-images')
      .getPublicUrl(fileName);
    
    return data.publicUrl;
  };

  const handleSubmit = async (type: 'lost' | 'found') => {
    if (!formData.title || !formData.description || !formData.location || !formData.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    let imageUrl: string | null = null;
    if (formData.image) {
      imageUrl = await uploadImage(formData.image);
      if (!imageUrl) {
        toast.error('Failed to upload image');
        return;
      }
    }

    await onSubmit({
      ...formData,
      image: formData.image,
      type,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          placeholder="Brief title of the item"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Detailed description of the item..."
          className="min-h-[100px]"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => handleInputChange('category', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.date ? format(formData.date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={(date) => handleInputChange('date', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          placeholder="Where was it lost/found?"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6">
          {!imagePreview ? (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <span className="text-primary hover:text-primary/80">Click to upload</span>
                  <span className="text-muted-foreground"> or drag and drop</span>
                </Label>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
              </div>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="mx-auto max-h-48 rounded-lg object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => handleSubmit('lost')}
          className="flex-1"
          variant="destructive"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post as Lost Item'}
        </Button>
        <Button
          onClick={() => handleSubmit('found')}
          className="flex-1"
          variant="default"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post as Found Item'}
        </Button>
      </div>
    </div>
  );
};