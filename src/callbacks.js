function buttonCallback (button, value) {
    if (button["type"] == "result") {
        return value == "" ? "" : parseResult(value);
    }
    else {
        return inputUpdate(button, value);
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
        else if ((value.slice(-1) != "(") && (value.slice(-1) != ")")) return value + ")";
        else return value + "(";
    }
    else return value + button["label"];
}

function parseResult(value) {
    // Replace the division and multiplication symbols
    value = value.replace("\u00f7", "/");
    value = value.replace("\u2715", "*");
    return eval(value);
}

export default buttonCallback;
