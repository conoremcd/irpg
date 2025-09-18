"use client";
import { useState, useEffect, useCallback, ChangeEvent } from 'react';

// interfaces 
import { RoleTag, Story } from '@/interfaces/story';

//supabase
import { libraries } from "@/services/supabaseService";
import { createClient } from '@/utils/supabase/client';
import { PostgrestError, User } from '@supabase/supabase-js';

// client instance
const supabase = createClient();

export const useLibrary = (user: User | null, triggerReload: any[]) => {
    const [library, setLibrary] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<PostgrestError | null>(null);

    const getLibrary = useCallback(async (user: User | null) => {
        try {
            setLoading(true);
            const { data, error } = await libraries.getByUser(user);

            if (error) {
                setError(error);
            } else if (data.length > 0) {
                const stories: Story[] = data.map((item) => {
                    return {
                        id: item.library.id,
                        title: item.library.title,
                        userRole: item.role as RoleTag,
                        overview:  item.library.overview,
                        avatar_url:  item.library.avatar_url,
                        progress:  item.library.progress,
                        schedule:  item.library.schedule,
                        npcs:  item.library.npcs,
                        players: item.library.players
                    } as Story;
                });
                setLibrary(stories);
            }
        } catch (error) {
            console.error('error fetching library:', error);
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getLibrary(user);
    }, [getLibrary, user, ...triggerReload]);

    const insertStory = async (formData: Story) => {
        try {
            setLoading(true);
            const { data, error } = await libraries.insertStory(formData);

            if (error) {
                setError(error)
            } else if (data) {
                console.log(data)
                alert('New story added successfully!');
                getLibrary(user);
            }
        } catch (error) {
            console.error('error adding new story:', error);
            alert('Error adding new story');
        } finally {
            setLoading(false);
        }
    };

    const updateStory = async (formData: Story) => {
        try {
            setLoading(true);
            const { data, error } = await libraries.updateStory(formData);

            if (error) {
                setError(error)
            } else if (data) {
                console.log(data)
                alert('Story updated!');
                getLibrary(user);
            }
        } catch (error) {
            console.error('error updating profile:', error);
            alert('Error updating profile');
        } finally {
            setLoading(false);
        }
    };

    const deleteStory = async (formData: Story) => {
        try {
            setLoading(true);
            const { error } = await libraries.deleteStory(formData);

            if (error) {
                setError(error)
            } else {
                console.log('deleted story: ' + formData);
                alert('Story deleted!');
                getLibrary(user);
            }
        } catch (error) {
            console.error('error deleting story:', error);
            alert('Error deleting story');
        } finally {
            setLoading(false);
        }
    }


    return { library, loading, error, insertStory, updateStory, deleteStory, };
}