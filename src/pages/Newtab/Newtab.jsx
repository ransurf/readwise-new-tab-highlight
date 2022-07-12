import * as React from 'react';
import axios from 'axios';
import { Button } from '../../components';
import DetailsModal from './DetailsModal';
import { Next, Trash, Maximize, Edit } from '../icons';
import { Transition } from '@headlessui/react';

const Newtab = () => {
  const [token, setToken] = React.useState('');
  const [highlightsCount, setHighlightsCount] = React.useState(0);
  const [highlight, setHighlight] = React.useState({});
  const [displayError, setDisplayError] = React.useState('');
  const [highlightLoaded, setHighlightLoaded] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(undefined);
  const [bookInfo, setBookInfo] = React.useState({
    id: '',
    title: '',
    author: '',
    highlightsURL: '',
  });
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    chrome.storage.sync.get(['settings'], (result) => {
      if (result.settings) {
        setToken(result.settings.token);
      } else {
        setDisplayError("Missing or invalid token, please set in extension's popup settings ↗️");
      }
    });
  }, []);

  React.useEffect(() => {
    if (token) getHighlightCount();
  }, [token]);

  const getHighlightCount = () => {
    axios
      .get('https://readwise.io/api/v2/highlights/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        params: {
          page_size: 1,
        },
      })
      .then((response) => {
        setHighlightsCount(response.data.count);
        getHighlightDetails(response.data.count);
      })
      .catch((error) => {
        setDisplayError(error.message);
        setHighlight({
          text: 'Slow down. You are being rate limited.',
        });
      });
  };

  const getHighlightDetails = (count) => {
    const currentCount = count ? count : highlightsCount;
    let random;
    do {
      random = Math.floor(Math.random() * currentCount + 1);
    } while (currentPage && random === currentPage);
    setCurrentPage(random);
    axios
      .get('https://readwise.io/api/v2/highlights/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        params: {
          page_size: 1,
          page: random,
        },
      })
      .then((response) => {
        setHighlight(response.data.results[0]);
        setHighlightLoaded(true);
      })
      .catch((error) => {
        setDisplayError(error.message);
        console.log(error);
      });
  };

  const getBookDetails = () => {
    axios
      .get(`https://readwise.io/api/v2/books/${highlight.book_id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setBookInfo({
          title: response.data.title,
          author: response.data.author,
          highlightsURL: response.data.highlights_url,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteHighlight = () => {
    axios
      .delete(`https://readwise.io/api/v2/highlights/${highlight.id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        getHighlightCount();
      })
      .catch((error) => {
        console.log(error);
        setDisplayError(error.message);
      });
  };

  const handleDetails = () => {
    getBookDetails();
    setShowModal(true);
  };

  const handleNext = () => {
    getHighlightDetails();
  };

  React.useEffect(() => {
    console.log('displayError', displayError);
  }, [displayError]);

  const setHighlightWrapper = (highlight) => {
    setHighlight(highlight);
  }


  const quote = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum`;
  const author = 'John Doe';
  const source = 'Some book mlmao';

  const displayText = React.useMemo(() => {
    if (highlight.text && highlight.text.length > 600) {
      return `${highlight.text.substring(0, 600)}...`;
    } else {
      return highlight.text;
    }
  }, [highlight.text]);

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      {displayError && !highlight.text && <div className="text-center text-3xl text-red-500">{displayError}</div>}
      <Transition
        show={highlightLoaded}
        enter="transition ease-in-out duration-500 transform"
        enterFrom="translate-y-full"
        enterTo="translate-x-0"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {highlight?.text && (
          <div className="flex w-screen h-screen justify-center align-center">
            <div className="flex flex-col justify-center align-center m-auto">
              {highlight.text && (
                <blockquote className="flex flex-col max-w-prose text-3xl gap-8 border-gray-300 dark:border-gray-600 border-l-4 px-8 py-4">
                  <p className="text-black dark:text-white font-Fancy leading-relaxed">{displayText}</p>
                </blockquote>
              )}
              <Transition.Child
                enter="transition ease-in-out duration-500 transform"
                enterFrom="translate-y-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="flex justify-start gap-8 mt-8">
                  <Button className="icon-btn" onClick={deleteHighlight}>
                    <Trash />
                  </Button>

                  <Button className="icon-btn" onClick={handleDetails}>
                    <Maximize />
                  </Button>

                  {/* <Button className="icon-btn" onClick={openModal}>
                  <Edit />
                </Button> */}

                  <Button className="icon-btn" onClick={handleNext}>
                    <Next />
                  </Button>
                </div>
              </Transition.Child>
            </div>
            <DetailsModal
              showModal={showModal}
              setShowModal={setShowModal}
              setHighlight={setHighlightWrapper}
              highlight={highlight}
              bookInfo={bookInfo}
              token={token}
            />
          </div>
        )}
      </Transition>
    </div>
  );
};

export default Newtab;
