"use client";
import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { profiles } from "@/services/supabaseService";
import { PostgrestError, User } from '@supabase/supabase-js';
import { Profile } from '@/interfaces/profile';
import { createClient } from '@/utils/supabase/client';

// client instance
const supabase = createClient();

export const useProfile = (user: User | null, triggerReload: any[]) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<PostgrestError | null>(null);

    const getProfile = useCallback(async (user: User | null) => {
        try {
            setLoading(true);
            const { data, error } = await profiles.getByUser(user);

            if (error) {
                setError(error);
            } else if (data) {
                const temp: Profile = {
                    username: data?.username ?? undefined,
                    avatar_url: data?.avatar_url ?? undefined,
                }
                setProfile(temp);
            }
        } catch (error) {
            console.error('error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile(user);
    }, [getProfile, user, ...triggerReload]);

    const updateProfile = async (formData: Profile) => {
        try {
            setLoading(true);
            const { data, error } = await profiles.updateProfile(user, formData);

            if (error) {
                setError(error)
            } else if (data) {
                console.log(data)
                alert('Profile updated!');
            }
        } catch (error) {
            console.error('error updating profile:', error);
            alert('Error updating profile');
        } finally {
            setLoading(false);
        }
    }

    const updateAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            setLoading(true);

            if (event?.target?.files && event.target.files?.length > 0) {
                const file: File = event.target.files[0];
                const bucketID: string = 'profile-avatars';
                const filePath: string = `${user?.id}/${file.name}`;

                const { data, error } = await profiles.uploadProfileImage(bucketID, filePath, file)

                if (error) {
                    setError(error);
                } else {
                    console.log(data.publicUrl);
                    setProfile({ username: profile?.username, avatar_url: data.publicUrl });
                }
            }
        } catch {
            console.error('error uploading new avatar image:', error)
            alert('Error uploading avatar image!');
        } finally {
            setLoading(false);
        }
    }

    return { profile, loading, error, updateProfile, updateAvatar };
}