import * as Yup from "yup";
const validateForm = Yup.object({
  username: Yup.string().max(25).min(2).required("please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "password must contains at least 8 charcaters,one uppercase,one lowercase,one number and one special character"
    )
    .required("please enter your password"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "password must match")
    .required("confirm password is required"),
});
export default validateForm;
