interface SingletonConstructor<T> {
    new(): T;
}

abstract class AbstractSingleton {
    private static _instance: unknown;

    protected constructor() {
        if (AbstractSingleton._instance) {
            throw new Error('Cannot instantiate a singleton class');
        }
        AbstractSingleton._instance = this;
    }

    static getInstance<T>(ctor: SingletonConstructor<T>): T {
        if (!this._instance) {
            this._instance = new ctor();
        }
        return this._instance as T;
    }
}

export default AbstractSingleton;
