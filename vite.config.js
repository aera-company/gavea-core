import {defineConfig} from 'vite';
export default defineConfig({base:'./',server:{proxy:{'/api':'http://127.0.0.1:8086'}},build:{rollupOptions:{output:{manualChunks(id){if(id.includes('node_modules/three/'))return 'three';}}}}});
