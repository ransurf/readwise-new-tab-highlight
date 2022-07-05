import * as Yup from 'yup';
export const formSchema = [
  {
    name: 'highlight',
    label: 'Highlight',
    elementType: 'textarea',
    placeholder: 'Highlight',
    required: true,
  },
  {
    name: 'notes',
    label: 'Notes',
    elementType: 'textarea',
    placeholder: 'Notes',
  },
];

export const validationSchema = Yup.object().shape({});
