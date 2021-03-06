import buttonCallback from './callbacks';

const eqButton = {
    type: "result",
    key: "key-eq",
    label: "="
};

describe('Callbacks', () => {
    it('should return result when = is pressed on valid input', () => {
        const result = buttonCallback(eqButton, "1+2", false);
        expect(result.name).toBe("Result");
    });

    it('should return EvalError when = is pressed on invalid input', () => {
        const result = buttonCallback(eqButton, "1(", false);
        expect(result.name).toBe("EvalError");
    });
});
