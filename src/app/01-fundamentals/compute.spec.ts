import { compute } from './compute';

// Suite: Usually describes function or method name
describe('compute', () => {
    // Spec: test name, a function
    it('should return 0 if input is negative', () => {
        const result = compute(-1);
        expect(result).toBe(0);
    });

    it('should increment the input if it is positive', () => {
        const result = compute(1);
        expect(result).toBe(2);
    });
});
