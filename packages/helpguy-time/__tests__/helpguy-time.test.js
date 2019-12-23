import time from '../src';

test('now', () => {
    expect(time.now()).toBe(parseInt(new Date().getTime() / 1000, 10));
});

test('ms', () => {
    expect(time.ms()).toBe(parseInt(new Date() / 1000, 10));
});

test('time', () => {
    expect(time.time(0, 0, 0, 1)).toBe(time.now() + 1);
    expect(time.time(0, 0, 1, 1)).toBe(time.now() + 60 + 1);
    expect(time.time(1, 1, 1, 1)).toBe(time.now() + 24 * 3600 + 3600 + 60 + 1);
});

test('toLocalTime', () => {
    expect(time.toLocalTime(1536911609)).toBe('2018-9-14 15:53:29');
    expect(time.toLocalTime()).toBe(time.toLocalTime(time.now()));
});

test('todayZero', () => {
    expect(time.todayZero()).toBeLessThanOrEqual(time.now());
});

test('tomorrowZero', () => {
    expect(time.tomorrowZero()).toBeGreaterThanOrEqual(time.now());
});

test('day', () => {
    expect(time.day()).toHaveLength(8);
});
