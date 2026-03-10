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
        "options": [
            { "label": "Option1", "value": "Option1" },
            { "label": "Option2", "value": "Option2" }
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
        "accept": [],
        "name": "",
        "value": "",
        "availableRules": ["maxSize", "minFiles", "maxFiles"],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "range": {
        "type": "range",
        "label": "Slider",
        "step": 1,
        "min": 0,
        "max": 100,
        "name": "",
        "value": 20,
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

export const hiddenAttributes = ["type", "validationRules", "availableRules", "options", "accept"];

export const fileTypes = [
    { label: "All", value: "" },
    { label: "All Images", value: ".png,.jpg,.jpeg,.gif,.bmp,.webp,.svg,.ico,.tif,.tiff,.heic,.heif,.avif" },
    { label: "All Videos", value: ".mp4,.webm,.ogg,.avi,.mov,.wmv,.flv,.mkv,.m4v,.3gp,.3g2,.mpeg,.mpg" },
    { label: "All Audio", value: ".mp3,.wav,.ogg,.aac,.m4a,.flac,.wma,.aiff,.alac,.amr,.opus" },
    { label: "All Documents", value: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt" },
    { label: "PDF Document (.pdf)", value: ".pdf" },
    { label: "Word Document (.doc, .docx)", value: ".doc,.docx" },
    { label: "Excel Spreadsheet (.xls, .xlsx)", value: ".xls,.xlsx" },
    { label: "CSV File (.csv)", value: ".csv" },
    { label: "PowerPoint (.ppt, .pptx)", value: ".ppt,.pptx" },
    { label: "Text File (.txt)", value: ".txt" },
    { label: "JSON File (.json)", value: ".json" },
    { label: "ZIP Archive (.zip)", value: ".zip" },
    { label: "RAR Archive (.rar)", value: ".rar" }
]
