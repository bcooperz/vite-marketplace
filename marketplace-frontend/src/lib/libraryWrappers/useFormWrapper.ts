import { FieldValues, useForm, UseFormProps, UseFormRegister } from "react-hook-form";

const useFormWrapper = <T extends FieldValues>(formParams: UseFormProps<T>) => {
  const { control, handleSubmit, formState, register } = useForm<T>({ ...formParams });

  const registerInput: UseFormRegister<T> = (name, rules) => {
    const required = !!rules?.required;
    // Returns required so input can add required attribute
    return {
      ...register(name, {
        ...rules,
        required: { value: required, message: `Field is required` },
      }),
      required: required,
      errorMessage: formState.errors[name]?.message,
    };
  };

  return { control, handleSubmit, formState, register, registerInput };
};

export default useFormWrapper;
