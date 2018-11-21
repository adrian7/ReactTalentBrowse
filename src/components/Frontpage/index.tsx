/**
 * Homepage component
 * @author adrian7
 * @version 1.0
 */

import './assets/style.css';
import * as React from 'react';
import Homepage from '../Homepage';
import User from '../../lib/user';
// import logo from './assets/logo.png';
// import Event from '../../lib/util';

interface Props {
    language: string;
    title?: string;
    subtitle?: string;
    cta?: string;
    onCtaClick?: ( ( ) => void );
}

export default function Frontpage(props: Props) {

    let user = User.loggedIn();

    if ( user ) {

        // User is logged in, show dashboard
        return ( <header><h1>Great! you're now logged in!</h1></header> );

    }
    else {

        // User is not logged in, show homepage
        return(

            <Homepage
                language="en"
                title="Talent Browse Demo"
                subtitle="Fast, easy talent search"
                cta="Let's find some talent"
            />

        );

    }

}
