import 'reflect-metadata';
import { CronEventHandlerFactory } from './factory';
import Timezone from 'timezone-enum';
import { CronEventHandler } from './handler';

describe(CronEventHandlerFactory.name, () => {
	describe('suits()', () => {
		it('should return true if type is "cron', () => {
			const handler = new CronEventHandlerFactory();
			expect(handler.suits('cron')).toBeTruthy();
		});

		it('should return false if type is not "cron', () => {
			const handler = new CronEventHandlerFactory();
			expect(handler.suits('not cron')).toBeFalsy();
		});
	});

	describe('create()', () => {
		it('should return CronEventHandler', () => {
			const handler = new CronEventHandlerFactory();
			expect(
				handler.create(Timezone['Europe/Berlin'], {
					pattern: '* * * * *',
				})
			).toBeInstanceOf(CronEventHandler);
		});
	});
});
