/**
 * User library
 * @author adrian7
 * @version 1.0
 */

const usersDb = [
    {
        firstName   : 'Adrian',
        lastName    : 'Silimon-Morariu',
        avatar      : 'https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg',
        username    : 'adrian@example.com',
        password    : 'parola123'
    },
    
    {
        firstName   : 'Mike',
        lastName    : 'Lane',
        avatar      : 'https://s3.amazonaws.com/uifaces/faces/twitter/mlane/128.jpg',
        username    : 'mike.lane@example.com',
        password    : 'test123'
    }
    
];

interface PropsOfUser {
    firstName:  string;
    lastName:   string;
    avatar:     string;
    username:   string;
    password?:  string;
}

class User {

    protected data:     PropsOfUser;
    protected username: string;
    protected loggedIn: boolean;

    /**
     * Log in a user
     * @param {string} username
     * @param {string} password
     * @returns {boolean}
     */
    public static logIn(username: string, password: string) {

        for (let user of usersDb) {

            if ( username === user.username && password === user.password) {
                // Logged in
                return new User(user);
            }

        }

        // Log in failed
        return false;

    }

    /**
     * Retrieve logged in user
     * @returns {boolean}
     */
    public static loggedIn() {

        let current = null;

        try {

            current = window.localStorage.getItem('user');

            if ( current ) {

                // Current user is logged in
                return new User( JSON.parse(current) );

            }

            return false;

        }
        catch (e) {
           throw e;
        }

    }

    /**
     * Retrieve new user object
     * @param {PropsOfUser} u
     */
    protected constructor(u: PropsOfUser) {

        // Set status logged in
        this.username = u.username;
        this.data     = u;
        this.loggedIn = true;

        // Remove password
        this.data.password = 'hidden';

        // Persist

        try {

            window.localStorage.setItem(
                'user',
                JSON.stringify(this.data)
            );

        }
        catch (e) {

            // LocalStorage issue
            throw e;

        }

    }
    
    public logOff() {
        window.localStorage.removeItem('user');
    }

    public getUsername(): string {
        return this.username.toString();
    }

    /**
     * Retrieve user data
     * @returns {PropsOfUser}
     */
    public getData(): PropsOfUser {
        return this.data;
    }
}

export default User;