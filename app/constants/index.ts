// 最大支持上传的简历数
export const MAX_RESUME_COUNT = 5

// 服务类型
export enum SERVICE  {
    Resume = 1,   // 面试押题
    Special = 2,  // 专项面试
}

// 服务步骤 
export enum SERVICE_STEP {
    Select = 1,   // 选择岗位和简历
    Interview = 2,  // 面试中
    Report = 3,  // 查看报告
}




// 服务亮点列表 - 核心服务类型
export const serviceHighlights = [
	{
		id: SERVICE.Resume,
		title: '面试押题',
		badge: '精准预测',
		description:
			'基于岗位 JD 和简历，AI 智能预测高频面试题，让你提前做好准备。',
		points: [
			'结合岗位 JD 智能生成押题清单',
			'附带高分参考答案与回答技巧',
			'覆盖技术、项目、行为等多维度'
		],
		icon: 'i-heroicons-document-text',
		highlight: '3-5 分钟快速生成，命中率 80%+'
	},
	{
		id: SERVICE.Special,
		title: '专项面试',
		badge: '实战模拟',
		description: '针对技术面、业务面进行深度模拟，AI 面试官实时追问与反馈。',
		points: [
			'真实面试场景 1v1 模拟对话',
			'AI 即时追问与深度挖掘',
			'多轮问答评估技术深度'
		],
		icon: 'i-heroicons-bolt',
		highlight: '约 1 小时，支持语音/文字多模态'
	},
]
