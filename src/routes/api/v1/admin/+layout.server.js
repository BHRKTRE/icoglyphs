import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';

if (!dev) {
	throw error(403, 'Access denied in production');
}
