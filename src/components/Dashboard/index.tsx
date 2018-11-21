/**
 * Dashboard component
 * @author adrian7
 * @version 1.0
 */

import * as React from 'react';
import Navbar from '../Navbar';
import User from '../../lib/user';
import Searchbar from '../Searchbar';

/**
 * Component properties
 */
interface Props {
    language?: string;
    user: User;
}

export default function Dashboard(props: Props) {

    if ( undefined === props.user ) {

        // Component won't render for anon. users
        return null;

    }

    let user = props.user;
    // let data = user.getData();

    // Render user dashboard
    return (
        <div>
            <Navbar user={user}/>
            <main>
                <div className="container"><Searchbar/></div>
            </main>
        </div>
    );

}