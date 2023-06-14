/**
 * Calculates from a given angle in degree its radians
 * @param degrees {number}
 * @returns {number}
 */
export default function degreeToRadians(degrees: number): number {
	return degrees * (Math.PI / 180)
}
