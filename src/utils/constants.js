export const availableInputs = {

    text: {
        "type": "text",
        "label": "Text Input",
        "placeholder": "",
        "name": "",
        "value": "",
        "availableRules": ["minLength", "maxLength", "pattern"],
        "validationRules": [
            { "type": "required", "value": false },
        ]
    },

    number: {
        "type": "number",
        "label": "Number Input",
        "placeholder": "",
        "name": "",
        "value": "",
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    password: "Password Input",
    textarea: "Multi-line Input",
    email: "Email Input",
    select: "Dropdown",
    radio: "Radio Group",
    checkbox: "Checkbox",
    switch: "Toggle Switch",
    date: "Date Picker",
    datetime: "DateTime Picker",
    file: "File Upload",
    multiselect: "Multi Select",
    range: "Slider",
    color: "Color Picker",
}

export const availableRules = ["min", "max", "minLength", "maxLength", "pattern"];
