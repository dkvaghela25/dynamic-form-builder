export const formSchema = [
    {
        name: "username",
        type: "text",
        label: "Username",
        placeholder: "Enter username",
        value: "",
        validationRules: [
            { type: 'required' },
            { type: 'minLength', value: 3 },
            { type: 'maxLength', value: 12 },
        ]
    },
    {
        name: "gender",
        type: "radio",
        label: "Gender",
        options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" }
        ]
    }
]
