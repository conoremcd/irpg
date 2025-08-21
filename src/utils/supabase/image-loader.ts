    // image-loader.js
    const projectId = 'yccrucsbdczxibclbqki'; // Get this from your Supabase URL

    export default function supabaseLoader({ src, width, quality }: { src: string, width: number, quality: string }) {
      return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?width=${width}&quality=${quality || 75}`;
    }