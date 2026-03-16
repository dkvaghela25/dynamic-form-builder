const ComponentSwitch = ({field, error, schema}) => {
    const {type} = schema;

    switch(type) {
        case "text" : return <div>text input</div>;
        default : <></>
    }
};

export default ComponentSwitch;