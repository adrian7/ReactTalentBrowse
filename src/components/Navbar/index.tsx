/**
 * Navbar component
 * @author adrian7
 * @version 1.0
 */

import './style.css';
import * as React from 'react';
import User from '../../lib/user';
import { Link } from 'react-router-dom';

interface Props {
    user: User;
    title?: string;
}

function MainMenu(props: {wrapClass: string}) {

    // TODO select nav on change
    let clname = undefined === props.wrapClass ? 'mobile-menu menu' : props.wrapClass;

    return (
        <ul className={clname}>
            <li><Link className="active" to="/">Dashboard</Link></li>
            <li><Link to="/candidates">Candidates</Link></li>
            <li><Link to="/roles">Roles</Link></li>
            <li><Link to="/profile">Account</Link></li>
        </ul>
    );

}

export default function Navbar(props: Props) {

    // Init vars
    let title = undefined === props.title ? 'Untitled' : props.title;

    return (

        <nav>
            <div className="nav-container">
                <div className="nav-logo">
                    <Link to="/">{title}</Link>
                </div>
                <MainMenu wrapClass="nav-links"/>
                <a className="mobile-menu-toggle"/>
                <MainMenu wrapClass="mobile-menu menu"/>
            </div>
        </nav>

    );

}