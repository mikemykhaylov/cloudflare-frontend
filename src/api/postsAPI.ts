import ky from 'ky';

const postsAPI = ky.create({ prefixUrl: 'https://cloudflare-backend.mmykhaylov.workers.dev/' });

export default postsAPI;
