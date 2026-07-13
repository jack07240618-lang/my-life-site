export interface TimelineEvent {
	date: string;
	title: string;
	description: string;
	category: 'Project' | 'Learning' | 'Life' | 'Travel';
}

export const timelineEvents: TimelineEvent[] = [
	{
		date: '2026.07',
		title: '完成第一个个人网站',
		description: '把散落在各处的生活、照片与想法，慢慢整理成一个属于自己的数字花园。',
		category: 'Project',
	},
	{
		date: '2026.06',
		title: '开始学习 AI',
		description: '从新的工具与工作方式出发，重新理解创造、学习和人与技术的关系。',
		category: 'Learning',
	},
	{
		date: '2026.04',
		title: '第一次独自远行',
		description: '只带一台相机和简单的行李，在陌生城市里重新感受时间的速度。',
		category: 'Travel',
	},
	{
		date: '2026.01',
		title: '开始每日记录',
		description: '不追求完整，只留下每天真正想记住的一句话、一个画面或一种感受。',
		category: 'Life',
	},
	{
		date: '2025.10',
		title: '重新拿起相机',
		description: '开始留意寻常生活里的光线、秩序与偶然，摄影也变成一种观察练习。',
		category: 'Life',
	},
	{
		date: '2025.06',
		title: '完成一段长期项目',
		description: '经历反复尝试与修正后完成阶段性作品，也更清楚自己想继续走的方向。',
		category: 'Project',
	},
];
