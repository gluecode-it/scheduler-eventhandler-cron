import 'reflect-metadata';
import Timezone from 'timezone-enum';
import { CronEventHandler, EmitterEvent } from './handler';
import { EventEmitter } from 'events';

describe(CronEventHandler.name, () => {
	it('should be defined', () => {
		expect(
			new CronEventHandler(Timezone['Europe/Berlin'], {
				pattern: '* * * * *',
			})
		).toBeInstanceOf(CronEventHandler);
	});

	describe('onTriggered', () => {
		it('should call callback', (done) => {
			const emitter = new EventEmitter();
			const handler = new CronEventHandler(
				Timezone['Europe/Berlin'],
				{
					pattern: '* * * * *',
				},
				emitter
			);
			handler.onTriggered(() => done());
			emitter.emit(EmitterEvent.TRIGGER);
		});
	});

	describe('nextDate()', () => {
		it('should return a date', () => {
			const handler = new CronEventHandler(Timezone['Europe/Berlin'], {
				pattern: '1 1 1 1 1',
			});
			expect(handler.nextDate()).toBeInstanceOf(Date);
		});
	});

	describe('start()', () => {
		it('should return void', () => {
			const handler = new CronEventHandler(Timezone['Europe/Berlin'], {
				pattern: '1 1 1 1 1',
			});
			// @ts-ignore
			handler.cronjob.start = jest.fn();
			expect(handler.start()).toBeUndefined();
		});
	});
});
