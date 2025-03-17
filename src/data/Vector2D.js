
/**
 * Represents a 2D vector with x and y components.
 */
export class Vector2D {
    /**
     * Creates a new Vector2D object, optionally specifying the x and y components.
     * If not specified, x and y will default to 0.0.
     * @param {number} [x=0.0]
     * @param {number} [y=0.0]
     */
    constructor(x = 0.0, y = 0.0) {
        this.x = x
        this.y = y
    }
}

/**
 * Constants for Vector2D with x: 0.0 and y: 1.0
 */
export const Up = new Vector2D(0.0, 1.0)

/**
 * Constants for Vector2D with x: 0.0 and y: -1.0
 */
export const Down = new Vector2D(0.0, -1.0)

/**
 * Constants for Vector2D with x: -1.0 and y: 0.0
 */
export const Left = new Vector2D(-1.0, 0.0)

/**
 * Constants for Vector2D with x: 1.0 and y: 0.0
 */
export const Right = new Vector2D(1.0, 0.0)

/**
 * Constants for Vector2D with x: 0.0 and y: 0.0
 */
export const Zero = new Vector2D()