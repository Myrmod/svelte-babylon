export default function setOrder(
	m: number,
	faces: any[],
	data: { vertex?: string | any[]; face: any },
) {
	const dualFaces = []
	let face = faces.pop()
	dualFaces.push(face)
	let index = data.face[face].indexOf(m)
	index = (index + 2) % 3 //index to vertex included in adjacent face
	let v = data.face[face][index]
	let f = 0

	while (faces.length > 0) {
		face = faces[f]
		if (data.face[face].indexOf(v) > -1) {
			// v is a vertex of face f
			index = (data.face[face].indexOf(v) + 1) % 3
			v = data.face[face][index]
			dualFaces.push(face)
			faces.splice(f, 1)
			f = 0
		} else {
			f++
		}
	}
	return dualFaces
}
