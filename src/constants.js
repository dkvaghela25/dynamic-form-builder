export const availableInputs = {

    "textInput": {
        "id": "",
        "type": "text",
        "label": "Text Input",
        "name": "",
        "value": "",
        "placeholder": "",
        "availableRules": ["minLength", "maxLength", "pattern"],
        "validationRules": [
            { "type": "required", "value": false },
        ]
    },

    "textarea": {
        "id": "",
        "type": "textarea",
        "label": "Multi-line Input",
        "name": "",
        "value": "",
        "placeholder": "",
        "availableRules": ["minLength", "maxLength"],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "select": {
        "id": "",
        "type": "select",
        "label": "Dropdown",
        "name": "",
        "value": "",
        "placeholder": "",
        "options": [
            { "label": "Option1", "value": "Option1" },
            { "label": "Option2", "value": "Option2" }
        ],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "radio": {
        "id": "",
        "type": "radio",
        "label": "Radio Group",
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
        "id": "",
        "type": "checkbox",
        "label": "Checkbox Group",
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
        "id": "",
        "type": "date",
        "label": "Date Picker",
        "name": "",
        "value": "",
        "availableRules": ["minDate", "maxDate"],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "file": {
        "id": "",
        "type": "file",
        "label": "File Upload",
        "name": "",
        "value": "",
        "accept": [],
        "availableRules": ["maxSize", "minFiles", "maxFiles"],
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "range": {
        "id": "",
        "type": "range",
        "label": "Slider",
        "name": "",
        "value": 20,
        "step": 1,
        "min": 0,
        "max": 100,
        "validationRules": [
            { "type": "required", "value": false }
        ]
    },

    "switch": {
        "id": "",
        "type": "switch",
        "label": "Toggle Switch",
        "name": "",
        "value": false,
        "placeholder": "Placeholder",
    },

    "multiselect": {
        "id": "",
        "type": "multiselect",
        "label": "Multi Select",
        "name": "",
        "value": [],
        "placeholder": "",
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

export const datePickerTypes = ["date", "datetime-local", "date-range"];

export const hiddenAttributes = ["id", "type", "validationRules", "availableRules", "options", "accept", "value"];

export const fileTypes = [
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

export const defaultValuesMap = {
    "text": "",
    "email": "",
    "password": "",
    "date": "",
    "datetime-local": "",
    "textarea": "",
    "select": "",
    "radio": "",
    "number": "",
    "color": undefined,
    "date-range": { startDate: "", endDate: "" },
    "checkbox": [],
    "file": [],
    "multiselect": [],
    "range": 20,
    "switch": false,
}

export const defaultLabels = [
    "Text Input",
    "Multi-line Input",
    "Dropdown",
    "Radio Group",
    "Checkbox Group",
    "Toggle Switch",
    "Date Picker",
    "File Upload",
    "Multi Select",
    "Slider",
]