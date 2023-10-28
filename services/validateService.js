export const validate = (data, value) => {
    const errors = [];
    data.types.forEach(element => {
        errors.push(validateData(element, value));
    });
    return errors;
}

const validateData = (type, value) => {
    const errorData = {};
    switch (type) {
        case 'email':
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
                errorData.error = true;
                errorData.message = validateEmailMessage;
            }
            break;

        case 'required':
            if (!value) {
                errorData.error = true;
                errorData.message = validateRequiredMessage;
            }
            break;
    }

    return errorData;

}

const validateEmailMessage = 'e-mail must be a valid email';
const validateRequiredMessage = 'the field must not be empty';