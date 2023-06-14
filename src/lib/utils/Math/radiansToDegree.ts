/**
 * Calculates from a given angle in radians its degrees
 * @param radians {number}
 * @returns {number}
 */
export default function radiansToDegrees(radians: number): number {
	return radians * (180 / Math.PI)
}
