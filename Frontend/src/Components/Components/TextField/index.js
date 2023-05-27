import { TextField } from '@mui/material';
import { useField } from 'formik';
import { at } from 'lodash';

export const InputField = (props) => {
  // const { errorText, ...restProps } = props;
  // const [field, meta] = useField(props.defaultProps.name);

  // const renderHelperText = () => {
  //   const [touched, error] = at(meta, 'touched', 'error');
  //   if (touched && error) {
  //     return error;
  //   }
  // };
  return (
    <TextField
      type="text"
      required={props.required}
      label={props.label}
      name={props.name}
      error={props.error}
      variant="standard"
      onChange={props.handleChange}
      // error={meta.touched && meta.error && true}
      // helperText={renderHelperText()}
      // {...field}
      // {...restProps.defaultProps}
    />
  );
};
