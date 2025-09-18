// 
import { v4 as uuidv4 } from 'uuid';

// interfaces
import { Profile } from "@/interfaces/profile";
import { Story } from "@/interfaces/story";

// supabase
import { createClient } from "@/utils/supabase/client";
import { QueryResult, QueryData, QueryError, User } from "@supabase/supabase-js";

// client instance
const supabase = createClient();

// user profile functions
export const profiles = {
    getByUser: async (user: User | null) => {

        const { data, error, status } = await supabase
            .from('profiles')
            .select(`username, avatar_url`)
            .eq('id', user?.id as string)
            .single();

        if (error && status !== 406) {
            //console.error('error fetching profile:', error);
            throw error;
        }

        return { data, error };
    },
    updateProfile: async (user: User | null, formData: Profile) => {

        const { data, error } = await supabase
            .from('profiles')
            .upsert({
                id: user?.id as string,
                email: user?.email,
                username: formData.username,
                avatar_url: formData.avatar_url,
                updated_at: new Date().toISOString(),
            }).select(`username, avatar_url`);

        if (error) {
            //console.error('error updating profile:', error);
            throw error;
        }

        return { data, error };
    },
    uploadProfileImage: async (bucketID: string, filePath: string, file: File) => {
        const { data: upload, error: uploadError } = await supabase.storage
            .from(bucketID)
            .upload(filePath, file, {
                upsert: true,
            });
        const { data: url } = supabase.storage
            .from(bucketID)
            .getPublicUrl(filePath);

        if (uploadError) {
            throw uploadError;
        }

        return { data: url, error: uploadError }
    }
};

// user library functions
export const libraries = {
    getByUser: async (user: User | null) => {
        const { data, error } = await supabase
            .from('parties')
            .select(`
                library (
                    id,
                    title,
                    overview,
                    progress,
                    avatar_url,
                    npcs,
                    players,
                    schedule
                ),
                role
            `)
            .eq('user_id', user?.id as string);

        if (error) {
            throw error;
        }

        return { data, error };
    },
    insertStory: async (formData: Story) => {

        const { data, error } = await supabase
            .from('library')
            .insert([{
                id: uuidv4(),
                title: formData.title,
                avatar_url: formData.avatar_url,
                overview: formData.overview,
                progress: formData.progress,
                schedule: formData.schedule,
                npcs: formData.npcs ?? [],
                players: formData.players ?? []
            }])
            .select(`
                id,
                title,
                overview,
                progress,
                avatar_url,
                npcs,
                players,
                parties (
                    role
                )
            `)
        if (error) {
            throw error;
        }

        return { data, error };
    },
    updateStory: async (formData: Story) => {

        const { data, error } = await supabase
            .from('library')
            .update({
                title: formData.title,
                avatar_url: formData.avatar_url,
                overview: formData.overview,
                progress: formData.progress,
                schedule: formData.schedule,
                npcs: formData.npcs ?? [],
                players: formData.players ?? []
            })
            .eq('id', formData.id)
            .select(`
                id,
                title,
                overview,
                progress,
                avatar_url,
                npcs
            `);

        if (error) {
            throw error;
        }

        return { data, error };
    },
    deleteStory: async (formData: Story) => {
        const { error } = await supabase
            .from('library')
            .delete()
            .eq('id', formData.id);

        if (error) {
            throw error;
        }

        return { error };
    }
};

