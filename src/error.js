
const FactoryError = (name) => {
    return class BusinessError extends Error {
        constructor(message) {
            super(message);
            this.name = name; 
        }
    }
}
//export const DBValidationError = FactoryError("DBValidationError");

//class HttpError extends Error {
//  constructor(message) {
//    super(message);
//    this.name = this.constructor.name;
//  }
//}
//
//EntityNotExist - DBError
class DBError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class EntityNotExist extends DBError {}
