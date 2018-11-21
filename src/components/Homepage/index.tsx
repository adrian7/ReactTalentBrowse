/**
 * Homepage component
 * @author adrian7
 * @version 1.0
 */

import './assets/style.css';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    language: string;
    title?: string;
    subtitle?: string;
    cta?: string;
}

function Header(props: Props) {

    return (
        <header>
            <h1 className="title">{props.title}</h1>
            <h2 className="disclaimer">{props.subtitle}</h2>
            <Link className="get-started button button-primary button-large" to="/login">
                {props.cta}
            </Link>
        </header>
    );

}

export default function Homepage(props: Props) {

    // Render header
    return (
        <Header
            title={props.title}
            subtitle={props.subtitle}
            cta={props.cta}
            language={props.language}
        />
    );
}
