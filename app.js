const { createApp } = Vue;
import { RootApp } from './RootApp.js';

console.log('Vue app is about to mount');
createApp(RootApp).mount('#app');