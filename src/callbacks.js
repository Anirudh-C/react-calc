import { evaluate } from 'mathjs';

var xhr = new XMLHttpRequest();
var url = "http://192.168.1.100:8081/logging/log";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
    }
};

function buttonCallback(button, value, log = true) {
    var curr = new Date();
    if (button["type"] == "result") {
        try {
            let result = {
                name: "Result",
                time: curr.toISOString(),
                input: value,
                message: value == "" ? "" : parseResult(value)
            };
            if (log) xhr.send(JSON.stringify(result));
            return result;
        }
        catch(e) {
            let result = {
                name: "EvalError",
                time: curr.toISOString(),
                input: value,
                message: e.message
            };
            if (log) xhr.send(JSON.stringify(result));
            return result;
        }
    }
    else {
        try {
            let result = {
                name: "Result",
                input: value,
                message: inputUpdate(button, value)
            };
            return result;
        }
        catch(e) {
            let result = {
                name: "InputError",
                time: curr.toISOString(),
                input: value,
                message: e.message
            };
            if (log) xhr.send(JSON.stringify(result));
            return result;
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
