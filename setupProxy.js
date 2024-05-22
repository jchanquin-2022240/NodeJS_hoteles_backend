import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
    
    app.use('/uploads', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
};
