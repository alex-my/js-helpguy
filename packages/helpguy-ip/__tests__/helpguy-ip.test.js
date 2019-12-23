import ip from '../src';

test('ipToNumber', () => {
    expect(ip.ipToNumber('0.0.0.0')).toBe(0);
    expect(ip.ipToNumber('1.2.3.4')).toBe(16909060);
    expect(ip.ipToNumber('255.255.255.255')).toBe(4294967295);
    expect(ip.ipToNumber('')).toBe(0);
});

test('ipToString', () => {
    expect(ip.ipToString(0)).toBe('');
    expect(ip.ipToString(16909060)).toBe('1.2.3.4');
    expect(ip.ipToString(4294967295)).toBe('255.255.255.255');
});
