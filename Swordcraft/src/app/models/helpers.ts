export function intersect(a: Array<any>, b: Array<any>): Array<any> {
    const setA = new Set(a);
    const setB = new Set(b);
    const intersection = new Set(Array.from(setA).filter(x => setB.has(x)));
    return Array.from(intersection);
}
