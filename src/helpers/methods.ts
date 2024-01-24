export const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    let angleInRadians = ((angleInDegrees + 120) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
};

export const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    let start = polarToCartesian(x, y, radius, endAngle);
    let end = polarToCartesian(x, y, radius, startAngle);

    let largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    let d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');

    return d;
};

export const similarity = (s1: string, s2: string): boolean => {
    const ignore_symbols = /[,./?!&*]/g;
    const str1 = s1.toLowerCase().replaceAll(ignore_symbols, '');
    const str2 = s2.toLowerCase().replaceAll(ignore_symbols, '');

    return str1.search(str2) !== -1;
};
