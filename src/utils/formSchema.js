export const formSchema = [
    {
        name: "username",
        type: "text",
        label: "Username",
        placeholder: "Enter username",
        value: "",
        validationRules: {
            required: true,
            minLength: 3,
            maxLength: 10
        }
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
