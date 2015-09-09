export default class ShowboxError extends Error {

    constructor(message) {
        super(message);
        this.name = 'ShowboxError';
        this.message = message;
        if ( Error.captureStackTrace ) {
            Error.captureStackTrace(this, ShowboxError);
        }
    }

}
