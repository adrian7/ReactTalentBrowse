import App from './app/App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './app/registerServiceWorker';

/**
 * Setup App after boot
 * @param {HTMLElement} element
 * @param {number} interval
 */
function onAppBoot(element: HTMLElement, interval: number) {

    let animationTimeout = 1100;

    // Trigger animation
    setTimeout( ( ) => element.className = 'splash loaded', interval );

    // Hide splash screen
    setTimeout(
        ( ) =>
            element.className = 'splash hidden',
        interval + animationTimeout
    );

}

const container = document.getElementById('Container');
const splash    = document.getElementsByClassName('splash')[0];

// Render the App
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    container as HTMLElement
);

// Register our sw (link)
registerServiceWorker();

// Load the app
onAppBoot( splash as HTMLElement, 400 );
