import { CircleElement } from './CircleElement.js';
import { CircleBehavior } from './CircleBehavior.js';

/**
 * The Circle class is the exposed class of the library.
 * The circle.js produces a global variable window.circle which is the hook
 * to all functionalities of this library.
 * 
 * @class Circle
 */
export class Circle {
    constructor() {
        this.Element = CircleElement;
        this.Behavior = CircleBehavior;
        this.digestId = 0;
        this.dependancyInjectionRegistry = {};
        this.behaviorRegistry = {};
    }

    di(str, di) {
        if (arguments.length > 1) {
            this.dependancyInjectionRegistry[str] = di;
        }
        return this.dependancyInjectionRegistry[str];
    }
}