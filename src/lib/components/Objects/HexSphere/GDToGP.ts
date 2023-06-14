import setOrder from './setOrder'

export default function GDtoGP(GDdata: {
	name: string
	category: string[]
	vertex: number[][]
	face: number[][]
}) {
	const GPdata = {} as {
		name: string
		category: Array<string>
		vertex: number[][]
		face: number[][]
	}
	GPdata.name = 'GD dual'
	GPdata.category = ['Goldberg']
	GPdata.vertex = []
	GPdata.face = []
	const verticesNb = GDdata.vertex.length
	const map = new Array(verticesNb)
	for (let v = 0; v < verticesNb; v++) {
		map[v] = new Set()
	}
	for (let f = 0; f < GDdata.face.length; f++) {
		for (let i = 0; i < 3; i++) {
			map[GDdata.face[f][i]].add(f)
		}
	}
	let cx = 0
	let cy = 0
	let cz = 0
	let face = []
	let vertex = []
	for (let m = 0; m < map.length; m++) {
		GPdata.face[m] = setOrder(m, Array.from(map[m]), GDdata)
		map[m].forEach((el: string | number) => {
			cx = 0
			cy = 0
			cz = 0
			face = GDdata.face[el]
			for (let i = 0; i < 3; i++) {
				vertex = GDdata.vertex[face[i]]
				cx += vertex[0]
				cy += vertex[1]
				cz += vertex[2]
			}
			GPdata.vertex[el] = [cx / 3, cy / 3, cz / 3]
		})
	}
	return GPdata
}
