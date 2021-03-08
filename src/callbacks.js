import { evaluate } from 'mathjs';

const grid = require('./labels.json');

const normalLabels = [].concat.apply(
    [],
    grid["normalGrid"].map(
        ({rowKey, elements}) =>
            elements.filter(({key, label, type}) =>
                            (type == 'function') &&
                            (key != 'key-clr') &&
                            (key != 'key-bkspc'))));
const scientificLabels = [].concat.apply(
    [],
    grid["scientificGrid"].map(
        ({rowKey, elements}) =>
            elements.filter(({key, label, type}) =>
                            (type == 'function') &&
                            (key != 'key-clr') &&
                            (key != 'key-bkspc'))));

const labels = [].concat(normalLabels, scientificLabels);

function findFunctions(value) {
    let functions = [];
    labels.forEach(({key, label, type}) => {
        let regex = null;
        if (key == "key-sqrt") regex = new RegExp("sqrt", "g");
        else regex = new RegExp("\\" + label, "g");
        let match = value.match(regex);
        if (match != null) functions.push({
            key: key.slice(4),
            length: match.length
        });
    });
    return [].concat.apply(
        [],
        functions.map(({key, length}) => {
            let values = new Array(length);
            return values.fill(key);
        }));
}

var url = "http://192.168.1.100:8081/logging/log";

function logger(log, url) {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
        }
    };
    xhr.send(JSON.stringify(log));
}

function buttonCallback(button, value, log = true) {
    var curr = new Date();
    if (button["type"] == "result") {
        try {
            let result = {
                name: "Result",
                time: curr.toISOString().split('.')[0] + 'Z',
                input: value,
                functions: findFunctions(value),
                message: value == "" ? "" : parseResult(value)
            };
            if (log) logger(result, url);
            return result;
        }
        catch(e) {
            let result = {
                name: "EvalError",
                time: curr.toISOString().split('.')[0] + 'Z',
                input: value,
                functions: [],
                message: e.message
            };
            if (log) logger(result, url);
            return result;
        }
    }
    else {
        try {
            let result = {
                name: "Result",
                time: curr.toISOString().split('.')[0] + 'Z',
                input: value,
                functions: [],
                message: inputUpdate(button, value)
            };
            return result;
        }
        catch(e) {
            let result = {
                name: "InputError",
                time: curr.toISOString().split('.')[0] + 'Z',
                input: value,
                functions: [],
                message: e.message
            };
            if (log) logger(result, url);
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
    return evaluate(value).toString();
}

export default buttonCallback;
