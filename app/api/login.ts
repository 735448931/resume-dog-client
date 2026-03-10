import type { $Fetch } from 'ofetch'

// 账号登录
export const postEmailLoginApi = ($api: $Fetch, body: { email: string, password: string }) => {
    return $api<any>('/user/login', {
        method: 'POST',
        body
    })
}

// 账号注册
export const postRegisterApi = ($api: $Fetch, body: {
    username: string,
    email: string,
    password: string
}) => {
    return $api<any>('/user/register', {
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
export const generateWechatQRCodeAPI = ($api: $Fetch) => {
    return $api<WechatQRCodeResult>('/wechat/qrcode', {
        method: 'post'
    })
}

/**
 * 检查微信扫码状态
 * @param qrCodeId 二维码ID
 */
export const checkWechatQRCodeStatusAPI = ($api: $Fetch, qrCodeId: string) => {
    return $api<WechatQRCodeStatus>(`/wechat/check-qr-status?id=${qrCodeId}`, {
        method: 'GET'
    })
}

/**
 * 本地测试登录接口
 */
export const testLogin = ($api: $Fetch) => {
    return $api<LoginResult>('/wechat/test-login')
}
