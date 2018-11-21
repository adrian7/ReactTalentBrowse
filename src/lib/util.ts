/**
 * Utility types and interfaces
 * @author adrian7
 * @version 1.0
 */

export interface Event {
    target: {value: string};
}

export enum Alignment {
    left    = 'left',
    right   = 'right',
    center  = 'center'
}