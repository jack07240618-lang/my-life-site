import type { ImageMetadata } from 'astro';
import betweenWalls from '../assets/gallery/between-walls-hd.webp';
import curtainInJune from '../assets/gallery/curtain-in-june-hd.webp';
import morningStillness from '../assets/gallery/morning-stillness-hd.webp';
import roadToTheSea from '../assets/gallery/road-to-the-sea-hd.webp';

export interface GalleryPhoto {
	title: string;
	location: string;
	year: string;
	category: 'Travel' | 'Daily' | 'Architecture';
	image: ImageMetadata;
	alt: string;
	format: 'landscape' | 'portrait' | 'square';
}

export const galleryPhotos: GalleryPhoto[] = [
	{
		title: 'Morning Stillness',
		location: 'Somewhere North',
		year: '2026',
		category: 'Travel',
		image: morningStillness,
		alt: '晨雾笼罩的山脉与平静湖面',
		format: 'landscape',
	},
	{
		title: 'Between Walls',
		location: 'Concrete Study',
		year: '2026',
		category: 'Architecture',
		image: betweenWalls,
		alt: '一位行人走过高大的清水混凝土建筑',
		format: 'portrait',
	},
	{
		title: 'Curtain in June',
		location: 'At Home',
		year: '2026',
		category: 'Daily',
		image: curtainInJune,
		alt: '阳光穿过随风扬起的亚麻窗帘',
		format: 'portrait',
	},
	{
		title: 'Road to the Sea',
		location: 'East Coast',
		year: '2026',
		category: 'Travel',
		image: roadToTheSea,
		alt: '沿着深色海岸线延伸的公路',
		format: 'landscape',
	},
	{
		title: 'A Place to Pause',
		location: 'Quiet Interior',
		year: '2025',
		category: 'Daily',
		image: curtainInJune,
		alt: '午后光线照进安静的室内',
		format: 'landscape',
	},
];
