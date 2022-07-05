import axios from 'axios';
import * as React from 'react';
import { Button, Form } from '../../../components/';
import { X } from '../../icons';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { formSchema, validationSchema } from './schema';

const DetailsModal = ({ showModal, setShowModal, highlight, bookInfo, token }) => {
  const { title, author, highlightsURL } = bookInfo;
  const { text, note, id } = highlight;
  const [showError, setShowError] = React.useState(false);

  const updateHighlight = (highlight) => {
    axios
      .patch(
        `https://readwise.io/api/v2/highlights/${id}/`,
        {
          text: highlight.text,
          note: highlight.note,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
        setShowError(true);
      });
  };

  const handleSubmit = (values) => {
    console.log(values);
    updateHighlight(values);
    setShowError(false);
  };
  return (
    <Transition
      show={showModal}
      enter="transition ease-in-out duration-1000 transform"
      enterFrom="translate-y-full"
      enterTo="translate-x-0"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog
        open={showModal}
        onClose={setShowModal}
        as="div"
        className={clsx('fixed inset-0 z-10 flex items-center justify-center overflow-y-auto')}
      >
        <div className="flex flex-col bg-gray-500 rounded-3xl text-white p-8 text-center w-4/6">
          <Dialog.Overlay />

          <Dialog.Title className="text-3xl flex flex-col">
            <Button className="self-end" colorScheme="blue" onClick={() => setShowModal(false)}>
              <X />
            </Button>
            <p className="self-start font-Lato font-bold">
              <a href={highlightsURL}>
                <u >{title}</u>
              </a>{' '}
              by {author}
            </p>
          </Dialog.Title>
          <div>
            <Dialog.Description className="text-xl m-2"></Dialog.Description>
            <Form
              fields={formSchema}
              defaultValues={{
                highlight: text,
                notes: note,
              }}
              validationSchema={validationSchema}
              submitText="Save"
              onSubmit={(data) => handleSubmit(data)}
            />
            {showError && (
              <p className="text-red-500 text-center">
                There was an error saving. Please try again.
              </p>
            )}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DetailsModal;
