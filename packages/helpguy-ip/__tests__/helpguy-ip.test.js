import ip from '../src';

test('toInt', () => {
    expect(ip.toInt('0.0.0.0')).toBe(0);
    expect(ip.toInt('1.2.3.4')).toBe(16909060);
    expect(ip.toInt('255.255.255.255')).toBe(4294967295);
    expect(ip.toInt('')).toBe(0);
});

test('toString', () => {
    expect(ip.toString(0)).toBe('');
    expect(ip.toString(16909060)).toBe('1.2.3.4');
    expect(ip.toString(4294967295)).toBe('255.255.255.255');
});
