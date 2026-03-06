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