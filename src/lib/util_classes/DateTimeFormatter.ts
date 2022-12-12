export class DateTimeFormatter {

	private static readonly justNow: string = 'just now';

	private static readonly minutesLaterArr: Array<string> = [
		'five minutes ago',
		'a minute ago',
		'two minutes ago',
		'three minutes ago',
		'four minutes ago',
	];
	private static readonly minutesLaterStr: string = ' minutes ago';

	private static readonly hoursLaterArr: Array<string> = [
		'five hours ago',
		'an hour ago',
		'two hours ago',
		'three hours ago',
		'four hours ago',
	];
	private static readonly hoursLaterStr: string = ' hours ago';

	private static readonly oneDayLater: string = 'yesterday';
	private static readonly twoDayLater: string = 'day before yesterday';
	private static readonly daysLater: string = ' days ago';

	private static readonly weekLaterArr: Array<string> = [
		'four weeks ago',
		'a week ago',
		'two weeks ago',
		'three weeks ago',
	];

	public static Since(date: string): string {
		const curDate: number = Date.now();
		const sinceDate: number = Date.parse(date);

		if (sinceDate > curDate) {
			console.error("Invalid time: Future.");
			return null;
		}

		const diff: Date = new Date(curDate - sinceDate);
		const interval = {
			year: diff.getUTCFullYear() - 1970,
			month: diff.getUTCMonth(),
			days: diff.getUTCDate() - 1,
			hours: diff.getUTCHours(),
			min: diff.getUTCMinutes(),
			sec: diff.getUTCSeconds(),
		};

		if (interval.days > 28) {
			return new Date(date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' });
		} else if (interval.days >= 7) {
			return this.weekLaterArr[interval.days % 7];
		} else if (interval.days > 2) {
			return interval.days + this.daysLater;
		} else if (interval.days == 2) {
			return this.twoDayLater;
		} else if (interval.days == 1) {
			return this.oneDayLater;
		} else if (interval.hours > 5) {
			return interval.hours + this.hoursLaterStr;
		} else if (interval.hours >= 1) {
			return this.hoursLaterArr[interval.hours % 5];
		} else if (interval.min > 5) {
			return interval.min + this.minutesLaterStr;
		} else if (interval.min >= 1) {
			return this.minutesLaterArr[interval.min % 5];
		} else {
			return this.justNow;
		}
	}

	public static toDateString = (date: string): string => new Date(date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' });
}
