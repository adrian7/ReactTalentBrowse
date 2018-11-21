/**
 * Searchbar component
 * @author adrian7
 * @version 1.0
 */

import './style.css';
import * as React from 'react';
import Login from '../Login';
import { SearchInput } from '../Input';
import { FormEvent } from 'react';

/**
 * Skills keywords database
 * @type {string[]}
 * // TODO add color and logo for skills
 */
const skillsDb = [
    'php',
    'php7',
    'react',
    'apache',
    'apache2',
    'seo',
    'aws',
    'git',
    'typescript',
    'typescript3'
];

interface Props {
    language?: string;
    keywords?: string;
    onSubmit?: ( () => void );
}

function SkillItem(props: {name: string, color?: string}) {

    let name = undefined === props.name ? '' : props.name;

    return (
        <li className="skill-item">
            <span className="skill-title">{name}</span>
            <a className="skill-btn-del" href="#">x</a>
        </li>
    );
}

function SkillsList(props: {list: Array<string>}) {

    let list = undefined === props.list ?
        [] :
        props.list;

    return (
        <ul>
            {
                list.map( (s) => {
                    return ( <SkillItem key={s} name={s}/> );
                })
            }
        </ul>
    );

}

class Searchbar extends React.Component<Props> {

    public static defaultProps = {
        language: 'en',
        onSubmit: Login.defaultLoginSuccessAction
    };

    // Component state
    public state = {
        value:    '',
        skills:   new Array<string>(),
        profiles: []
    };

    constructor(props: Props) {

        super(props);

        // Bindings
        this.onInputChange = this.onInputChange.bind(this);
        this.addSkill      = this.addSkill.bind(this);

    }

    retrieveKeywords(s: string) {

        s = s.trim().toLowerCase();

        // TODO add support for spaces e.g. san francisco
        // Extract unique skills
        let a = s
            .split(',')
            .map((v) => {
                return v
                    .replace(/[^a-z0-9]/gmi, '')
                    .replace(/\s+/g, '');
            });

        // Filter duplicates
        return a.filter((item, pos) => {
            return a.indexOf(item) === pos;
        });

    }

    /**
     * Push skill in list
     * @param {string} skill
     */
    addSkill(skill: string) {

        if ( -1 < skillsDb.indexOf( skill ) ) {

            // Skill found in db
            console.log('Found skill: ' + skill);
            let list = this.state.skills;

            if ( 0 > list.indexOf(skill) ) {

                // Add new skill to list
                list.push(skill);

                // Update skills list
                this.setState({skills: list});

            }

            // TODO trigger search here...
        }

    }

    /**
     * Called after input was changed
     * @param {React.FormEvent<HTMLInputElement>} e
     */
    onInputChange(e: FormEvent<HTMLInputElement>) {

        let keywords = this.retrieveKeywords( e.currentTarget.value.toString() );
        let value    = e.currentTarget.value.toString().toLowerCase();

        // Update state
        this.setState({value: value});

        // Add skill
        for ( let k of keywords) {
            this.addSkill( k );
        }

    }

    render() {

        return (
            <div>
                <SearchInput
                    onChange={this.onInputChange}
                    placeholder="enter skills here... "
                    value={this.state.value}
                />
                <SkillsList list={this.state.skills}/>
            </div>
        );

    }

}

export default Searchbar;