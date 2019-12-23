import ip from '../src';

test('ipToInt', () => {
    expect(ip.ipToInt('0.0.0.0')).toBe(0);
    expect(ip.ipToInt('1.2.3.4')).toBe(16909060);
    expect(ip.ipToInt('255.255.255.255')).toBe(4294967295);
    expect(ip.ipToInt('')).toBe(0);
});

test('ipToString', () => {
    expect(ip.ipToString(0)).toBe('');
    expect(ip.ipToString(16909060)).toBe('1.2.3.4');
    expect(ip.ipToString(4294967295)).toBe('255.255.255.255');
});
