import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Components from "../../components";
// import * as Router from "react-router-dom";

export const FormField = (props: Mui.TextFieldProps) => (
  <Formik.Field
    component={props.type === "password" ? MuiPasswordField : MuiTextField}
    {...props}
  />
);

export const MuiTextField = ({
  label,
  form: { handleChange, handleBlur, touched, errors, values, isSubmitting },
  field,
  ...props
}: Formik.FieldProps & Mui.TextFieldProps) => {
//   const [theme]: any = Router.useOutletContext();
  const error = Boolean(errors[field.name] && touched[field.name]);
  return (
    <Components.FieldLabel error={error} label={label}>
      <Mui.TextField
        size="small"
        fullWidth
        error={error}
        // @ts-ignore
        helperText={error && errors[field.name]}
        disabled={isSubmitting}
        {...field}
        {...props}
        id={field.name}
        // onChange={handleChange}
        onChange={props.onChange || handleChange}
        onBlur={handleBlur}
        value={values[field.name]}
       
      />
    </Components.FieldLabel>
  );
};

export const MuiPasswordField = ({
  label,
  type,
  form: { handleChange, handleBlur, isSubmitting, touched, errors, values },
  field,
  ...props
}: Formik.FieldProps & Mui.TextFieldProps) => {
  const error = Boolean(errors[field.name] && touched[field.name]);
  const [visible, setVisible] = React.useState(false);
  const handleVisible = () => setVisible(!visible);
  return (
    <Components.FieldLabel error={error} label={label}>
      <Mui.TextField
        size="small"
        fullWidth
        type={visible ? "text" : type}
        error={error}
        // @ts-ignore
        helperText={error && errors[field.name]}
        disabled={isSubmitting}
        InputProps={{
          endAdornment: (
            <Mui.InputAdornment position="end" onClick={handleVisible}>
              <Mui.IconButton size="small">
                {visible ? <MuiIcons.VisibilityOff /> : <MuiIcons.Visibility />}
              </Mui.IconButton>
            </Mui.InputAdornment>
          ),
        }}
        {...field}
        {...props}
        id={field.name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[field.name]}
        
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        onCopy={(e) => {
          e.preventDefault();
          return false;
        }}
      />
    </Components.FieldLabel>
  );
};
