import { createClient } from '@supabase/supabase-js';

export interface Moment {
	id: string;
	content: string;
	images: string[];
	location: string | null;
	created_at: string;
	updated_at: string;
}

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const publishableKey = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(url && publishableKey);
export const supabase = isSupabaseConfigured ? createClient(url, publishableKey) : null;

export async function compressImage(file: File): Promise<File> {
	const image = await createImageBitmap(file);
	const maxSide = 2400;
	const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
	const canvas = document.createElement('canvas');
	canvas.width = Math.round(image.width * scale);
	canvas.height = Math.round(image.height * scale);

	const context = canvas.getContext('2d');
	if (!context) throw new Error('无法处理图片');
	context.drawImage(image, 0, 0, canvas.width, canvas.height);
	image.close();

	const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.88));
	if (!blob) throw new Error('图片压缩失败');
	return new File([blob], `${crypto.randomUUID()}.webp`, { type: 'image/webp' });
}

export function formatMomentDate(value: string) {
	return new Intl.DateTimeFormat('zh-CN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(value));
}
