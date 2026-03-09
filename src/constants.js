export const availableInputs = {

    "textInput": {
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

    "textarea": {
        "type": "textarea",
        "label": "Multi-line Input",
        "placeholder": "",
        "name": "",
        "value": "",
        "availableRules": ["minLength", "maxLength"],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "select": {
        "type": "select",
        "label": "Dropdown",
        "placeholder": "",
        "name": "",
        "value": "",
        "options": [
            { "label": "Option1", "value": "Option1" },
            { "label": "Option2", "value": "Option2" }
        ],
        "availableRules": [],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "radio": {
        "type": "radio",
        "label": "Radio Group",
        "placeholder": "",
        "name": "",
        "value": "",
        "options": [
            { "label": "Option1", "value": "Option1" },
            { "label": "Option2", "value": "Option2" }
        ],
        "availableRules": [],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "checkbox": {
        "type": "checkbox",
        "label": "Checkbox Group",
        "placeholder": "",
        "name": "",
        "value": [],
        options: [
            { label: "Gujarat", value: "gujarat" },
            { label: "Delhi", value: "delhi" },
            { label: "Maharashtra", value: "maharashtra" },
            { label: "Rajasthan", value: "rajasthan" },
            { label: "Karnataka", value: "karnataka" },
            { label: "Tamil Nadu", value: "tamil_nadu" },
            { label: "Kerala", value: "kerala" },
            { label: "Punjab", value: "punjab" },
            { label: "Haryana", value: "haryana" },
            { label: "Uttar Pradesh", value: "uttar_pradesh" },
            { label: "Madhya Pradesh", value: "madhya_pradesh" },
            { label: "West Bengal", value: "west_bengal" },
            { label: "Bihar", value: "bihar" },
            { label: "Odisha", value: "odisha" },
            { label: "Telangana", value: "telangana" }
        ],
        "availableRules": ["minSelected", "maxSelected"],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "date": {
        "type": "date",
        "label": "Date Picker",
        "placeholder": "",
        "name": "",
        "value": "",
        "availableRules": ["minDate", "maxDate"],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "datetime-local": {
        "type": "datetime-local",
        "label": "DateTime Picker",
        "placeholder": "",
        "name": "",
        "value": "",
        "availableRules": ["minDateTime", "maxDateTime"],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "file": {
        "type": "file",
        "label": "File Upload",
        "placeholder": "",
        "name": "",
        "value": "",
        "availableRules": ["fileType", "maxSize"],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "range": {
        "type": "range",
        "label": "Slider",
        "placeholder": "",
        "name": "",
        "value": 20,
        "availableRules": ["min", "max", "step"],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "switch": {
        "type": "switch",
        "label": "Toggle Switch",
        "placeholder": "",
        "name": "",
        "value": false,
        "availableRules": [],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "multiselect": {
        "type": "multiselect",
        "label": "Multi Select",
        "placeholder": "",
        "name": "",
        "value": [],
        "options": [
            { "label": "Option1", "value": "Option1" },
            { "label": "Option2", "value": "Option2" }
        ],
        "availableRules": ["minSelected", "maxSelected"],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

}

export const textInputs = ["text", "number", "email", "password", "color"];
