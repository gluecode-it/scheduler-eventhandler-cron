import { CronJob } from 'cron';
import { EventEmitter } from 'events';
import Timezone from 'timezone-enum';
import { CronEventOptions } from './options';
import { EventHandlerInterface } from '@gluecode-it/scheduler';

export enum EmitterEvent {
	TRIGGER = 'trigger',
	STARTED = 'started',
}

export class CronEventHandler implements EventHandlerInterface {
	private cronjob: CronJob;

	constructor(
		timezone: Timezone,
		private eventOptions: CronEventOptions,
		private emitter = new EventEmitter()
	) {
		/* istanbul ignore next */
		this.cronjob = new CronJob(
			this.eventOptions.pattern,
			() => {
				this.emitter.emit(EmitterEvent.TRIGGER, this.eventOptions);
			},
			null,
			false,
			timezone
		);
	}

	onTriggered(callback: (options: CronEventOptions) => void) {
		this.emitter.on(EmitterEvent.TRIGGER, callback);
	}

	nextDate() {
		return this.cronjob.nextDate().toDate();
	}

	start() {
		this.cronjob.start();
	}
}
