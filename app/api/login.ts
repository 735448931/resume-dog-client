// 账号登录响应类型
export interface EmailLoginResult {
    token: string
    userInfo: Record<string, unknown>
}

// 账号登录
export const postEmailLoginApi = (body: { email: string; password: string }) => {
    const { $api } = useNuxtApp()
    return $api<EmailLoginResult>('/user/login', {
        method: 'POST',
        body
    })
}

// 账号注册
export const postRegisterApi = (body: {
    username: string
    email: string
    password: string
}) => {
    const { $api } = useNuxtApp()
    return $api<void>('/user/register', {
        method: 'POST',
        body
    })
}





// ===================== 以下部分是微信登录 待验证 =====================


// ---------- 响应类型 ----------

export interface WechatQRCodeResult {
    qrCodeId: string
    qrCodeUrl: string
}

export interface WechatQRCodeStatus {
    status: 'pending' | 'scanned' | 'confirmed' | 'expired'
    token?: string
}

export interface LoginResult {
    token: string
    userInfo: Record<string, unknown>
}

// ---------- 接口方法 ----------

/**
 * 生成微信扫码登录二维码
 */
export const generateWechatQRCodeAPI = () => {
    const { $api } = useNuxtApp()
    return $api<WechatQRCodeResult>('/wechat/qrcode', {
        method: 'post'
    })
}

/**
 * 检查微信扫码状态
 * @param qrCodeId 二维码ID
 */
export const checkWechatQRCodeStatusAPI = (qrCodeId: string) => {
    const { $api } = useNuxtApp()
    return $api<WechatQRCodeStatus>(`/wechat/check-qr-status?id=${qrCodeId}`, {
        method: 'GET'
    })
}

/**
 * 本地测试登录接口
 */
export const testLogin = () => {
    const { $api } = useNuxtApp()
    return $api<LoginResult>('/wechat/test-login')
}
