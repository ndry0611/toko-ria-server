import yup from 'yup';

export class UserSchema {
    static createUserSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required'),
        password: yup
            .string()
            .required('Password is required'),
        name: yup
            .string()
            .required('Name is required'),
        phone: yup
            .string()
            .required('Phone Number is required'),
        address: yup
            .string()
            .required('Address is required'),
        status: yup
            .bool(),
    });

    static userLoginSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required'),
        password: yup
            .string()
            .required('Password is required')
    });
}