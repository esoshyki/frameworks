import App from './App.svelte';

const app = new App({
	target: document.getElementById('root'),
	props: {
		name: 'bitch'
	}
});

export default app;