import { evaluate } from 'mathjs';

function buttonCallback(button, value) {
    if (button["type"] == "result") {
        try {
            return {
                name: "Result",
                input: value,
                message: value == "" ? "" : parseResult(value)
            };
        }
        catch(e) {
            return {
                name: "EvalError",
                input: value,
                message: e.message
            };
        }
    }
    else {
        try {
            return {
                name: "Result",
                input: value,
                message: inputUpdate(button, value)
            };
        }
        catch(e) {
            return {
                name: "InputError",
                input: value,
                message: e.message
            };
        }
    }
}

function inputUpdate(button, value) {
    if (button["key"] == "key-clr") return "";
    else if (button["key"] == "key-bkspc") {
        if (value == "") return value;
        else return value.slice(0, -1);
    }
    else if (button["key"] == "key-paren") {
        if (value == "") return value + "(";
        else if (value.slice(-1) != "(") {
            let openCount = value.match(/\(/g);
            let closeCount = value.match(/\)/g);
            if (openCount == null) return value + "(";
            else if (closeCount == null) return value + ")";
            else if (openCount.length == closeCount.length) return value + "(";
            else return value + ")";
        }
        else return value + "(";
    }
    else if (button["key"] == "key-ln") return value + button["label"] + "(";
    else if (button["key"] == "key-sqrt") return value + "sqrt(";
    else return value + button["label"];
}

function parseResult(value) {
    // Replace the division and multiplication symbols
    value = value.replace("\u00f7", "/");
    value = value.replace("\u2715", "*");
    return evaluate(value);
}

export default buttonCallback;
