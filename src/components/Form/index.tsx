import clsx from 'clsx';
import * as React from 'react';
import { get as _get } from 'lodash-es';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFormState } from 'react-hook-form';
import { Button, InputField, TextArea } from '../../components';

interface Props {
  autoSave?: boolean;
  className?: {
    form?: string;
    field?: string;
    footer?: string;
  };
  fields: Array<IFormField>;
  defaultValues: any;
  validationSchema?: any;
  submitText?: string;
  onSubmit: (data: any) => void;
}

interface IFormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}

export const Form: React.FC<Props> = ({
  autoSave,
  className,
  fields,
  defaultValues,
  validationSchema,
  submitText,
  onSubmit,
}) => {
  const formOptions = {
    defaultValues: defaultValues ? defaultValues : {},
    resolver: yupResolver(validationSchema),
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(formOptions);

  //formState is required for useEffect dependency arrays, not fields
  const formState = useFormState({
    control,
  });
  const { isDirty, dirtyFields, isSubmitted, isSubmitting, isValid, isValidating } = formState;

  const onSubmitHandler = React.useCallback((data: any, e: any) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(data);
    }
    reset();
  }, []);

  const footer = React.useMemo(() => {
    if (autoSave) {
      return null;
    }

    const canSubmit = isDirty && isValid && !isSubmitting && !isValidating && !isSubmitted;

    return (
      <div className={clsx(className?.footer, 'flex justify-end mt-8')}>
        <Button
          className="px-4 py-2"
          colorScheme="blue"
          text={submitText}
          type="submit"
          disabled={!canSubmit}
        ></Button>
      </div>
    );
  }, [autoSave, formState, submitText]);

  return (
    <form className={clsx(className?.form, 'flex flex-col gap-4 mt-8')} onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="flex gap-4">
        {fields.map((field: any, index: number) => {
          const { name } = field;
          const error = errors[name]?.message;
          const { ref, ...rest } = register(name, {
            onChange: field.onChange,
            onBlur: field.onBlur,
          });
          const handleRef = React.useCallback(
            (e: any) => {
              ref(e);
            },
            [ref]
          );

          const renderElementType = (elementType: string) => {
            switch (elementType) {
              case 'input':
                return (
                  <InputField
                    key={index}
                    handleRef={handleRef}
                    {...rest}
                    {...field}
                    error={error}
                  />
                );
              case 'textarea':
                return (
                  <TextArea key={index} handleRef={handleRef} {...rest} {...field} error={error} />
                );
              default:
                return null;
            }
          };
          return (
            <div key={index} className={clsx(className?.field, 'flex grow')}>
              {renderElementType(field.elementType)}
            </div>
          );
        })}
      </div>
      {footer}
    </form>
  );
};
