import { Switch } from '@headlessui/react';
import React from 'react';
import KoFi from './KoFi';
import './Popup.css';

const Popup = () => {
  const [settings, setSettings] = React.useState({
    token: '',
    darkMode: false,
  });

  //fetching token from chrome storage
  React.useEffect(() => {
    chrome.storage.sync.get(['settings'], (result) => {
      setSettings({
        ...result.settings,
      });
    });
  }, []);

  const saveToken = (e) => {
    const newSettings = {
      ...settings,
      token: e.target.value,
    };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const saveDarkMode = (darkMode) => {
    const newSettings = {
      token: settings.token,
      darkMode: darkMode,
    };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const saveSettings = (settings) => {
    chrome.storage.sync.set({ settings });
  };

  return (
    <>
      <div className="App">
        <header className="App-container">
          <h1 className="text-lg font-bold">Settings</h1>
          <label>
            Access Token (Get{' '}
            <a href="https://readwise.io/access_token" className="text-blue-400">
              here
            </a>
            )
          </label>
          <input
            className="text-black"
            type="text"
            initialValue={settings.token}
            onChange={saveToken}
          />
          <Switch.Group>
            <div className="flex gap-4">
              <Switch.Label className="">Dark Mode</Switch.Label>
              <Switch
                checked={settings.darkMode}
                onChange={saveDarkMode}
                className={`${
                  settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Dark Mode</span>
                <span
                  className={`${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white`}
                />
              </Switch>
            </div>
          </Switch.Group>
          <KoFi className="mt-4" color="#29abe0" id="johnmavrick" label="Support Me on Ko-fi" />
        </header>
      </div>
    </>
  );
};

export default Popup;
