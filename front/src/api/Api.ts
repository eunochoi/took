import axios, { AxiosError } from 'axios';

const dev = process.env.NODE_ENV === 'development';
const protocol = dev ? 'http://' : 'https://';
const baseURL = `${protocol}${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_DOMAIN_SUB}`;


const api = axios.create({
  baseURL,
  responseType: "json",
  withCredentials: true,
  timeout: 15000
});

api.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const accessToken = cookieStore.get('accessToken')?.value;
      if (accessToken) {
        config.headers['Cookie'] = `accessToken=${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const status = err.response?.status;
    const config = err.config;
    if (status !== 401 || !config || (config as { _retriedAfterRefresh?: boolean })._retriedAfterRefresh) {
      return Promise.reject(err);
    }
    try {
      if (typeof window !== 'undefined') {
        const refreshRes = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include'
        });
        if (!refreshRes.ok) return Promise.reject(err);
      } else {
        // SSR에선 백엔드 아니라 자기 자신한테 요청 보냄
        const protocol = process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
        const refreshRes = await fetch(`${protocol}${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `refreshToken=${(await (await import('next/headers')).cookies()).get('refreshToken')?.value}`
          },
        });
        if (!refreshRes.ok) return Promise.reject(err);
        const { accessToken } = await refreshRes.json();
        config.headers['Cookie'] = `accessToken=${accessToken}`;
      }
      (config as { _retriedAfterRefresh?: boolean })._retriedAfterRefresh = true;
      return api(config);
    } catch {
      return Promise.reject(err);
    }
  }
);

export default api;