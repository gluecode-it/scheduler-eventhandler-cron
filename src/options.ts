import { EventOptions } from '@gluecode-it/scheduler';

export interface CronEventOptions extends EventOptions {
	pattern: string;
}
