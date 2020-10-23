import Timezone from 'timezone-enum';
import 'reflect-metadata';
import { CronEventOptions } from './options';
import {
	EventHandlerFactory,
	EventHandlerInterface,
} from '@gluecode-it/scheduler';
import { CronEventHandler } from './handler';

export class CronEventHandlerFactory extends EventHandlerFactory {
	create(timezone: Timezone, options: CronEventOptions): EventHandlerInterface {
		return new CronEventHandler(timezone, options);
	}
	suits(type: string) {
		return type.toLowerCase() === 'cron';
	}
}
