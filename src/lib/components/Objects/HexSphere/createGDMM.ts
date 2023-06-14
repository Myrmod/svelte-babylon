export default function createGDMM(
	m: number,
	radius: number,
): {
	name: string
	category: string[]
	vertex: number[][]
	face: number[][]
} {
	const GD11 = {
		vertex: [
			[0, 0, 1.070466],
			[0.7136440355158202, 0, 0.797878216101113],
			[-0.3568220190017962, 0.6180338597069972, 0.7978782188825266],
			[-0.3568220190017962, -0.6180338597069972, 0.7978782188825266],
			[0.7978782188825266, 0.6180338597069972, 0.3568220190017962],
			[0.7978782188825266, -0.6180338597069972, 0.3568220190017962],
			[-0.9341721342466052, 0.38196589133829983, 0.3568219984912373],
			[0.13629386544358568, 0.9999997464566329, 0.3568220095301233],
			[0.13629386544358568, -0.9999997464566329, 0.3568220095301233],
			[-0.9341721342466052, -0.38196589133829983, 0.3568219984912373],
			[0.9341721342466052, 0.38196589133829983, -0.3568219984912373],
			[0.9341721342466052, -0.38196589133829983, -0.3568219984912373],
			[-0.7978782188825266, 0.6180338597069972, -0.3568220190017962],
			[-0.13629386544358568, 0.9999997464566329, -0.3568220095301233],
			[-0.13629386544358568, -0.9999997464566329, -0.3568220095301233],
			[-0.7978782188825266, -0.6180338597069972, -0.3568220190017962],
			[0.3568220190017962, 0.6180338597069972, -0.7978782188825266],
			[0.3568220190017962, -0.6180338597069972, -0.7978782188825266],
			[-0.7136440355158202, 0, -0.797878216101113],
			[0, 0, -1.070466],
			[0.3249196234557242, 0.5627773231095304, 0.8506505628300387],
			[-0.6498392872853667, 0, 0.8506505497890696],
			[0.3249196234557242, -0.5627773231095304, 0.8506505628300387],
			[1.0514619620014507, 0, 0.20081135331464592],
			[-0.5257309803018967, 0.9105927706686187, 0.20081135304771713],
			[-0.5257309803018967, -0.9105927706686187, 0.20081135304771713],
			[0.5257309803018967, 0.9105927706686187, -0.20081135304771713],
			[0.5257309803018967, -0.9105927706686187, -0.20081135304771716],
			[-1.0514619620014507, 0, -0.20081135331464592],
			[0.6498392872853667, 0, -0.8506505497890696],
			[-0.32491962345572417, 0.5627773231095304, -0.8506505628300387],
			[-0.32491962345572417, -0.5627773231095304, -0.8506505628300387],
		],
		face: [
			[20, 0, 1],
			[20, 1, 4],
			[20, 4, 7],
			[20, 7, 2],
			[20, 2, 0],
			[21, 0, 2],
			[21, 2, 6],
			[21, 6, 9],
			[21, 9, 3],
			[21, 3, 0],
			[22, 0, 3],
			[22, 3, 8],
			[22, 8, 5],
			[22, 5, 1],
			[22, 1, 0],
			[23, 1, 5],
			[23, 5, 11],
			[23, 11, 10],
			[23, 10, 4],
			[23, 4, 1],
			[24, 2, 7],
			[24, 7, 13],
			[24, 13, 12],
			[24, 12, 6],
			[24, 6, 2],
			[25, 3, 9],
			[25, 9, 15],
			[25, 15, 14],
			[25, 14, 8],
			[25, 8, 3],
			[26, 4, 10],
			[26, 10, 16],
			[26, 16, 13],
			[26, 13, 7],
			[26, 7, 4],
			[27, 5, 8],
			[27, 8, 14],
			[27, 14, 17],
			[27, 17, 11],
			[27, 11, 5],
			[28, 6, 12],
			[28, 12, 18],
			[28, 18, 15],
			[28, 15, 9],
			[28, 9, 6],
			[29, 10, 11],
			[29, 11, 17],
			[29, 17, 19],
			[29, 19, 16],
			[29, 16, 10],
			[30, 12, 13],
			[30, 13, 16],
			[30, 16, 19],
			[30, 19, 18],
			[30, 18, 12],
			[31, 14, 15],
			[31, 15, 18],
			[31, 18, 19],
			[31, 19, 17],
			[31, 17, 14],
		],
	}
	const nbPerSide = m - 1
	const edge = {}
	let vertexCount = GD11.vertex.length
	const faceNb = GD11.face.length
	const GDMM = {
		name: 'GD_' + m + m,
		category: ['Geodesic'],
		vertex: GD11.vertex.concat([]),
		face: [],
	}
	let face = []
	let a = 0 //face vertex index
	let b = 0 //face vertex index
	let c = 0 //face vertex index
	let vtx0 = []
	let vtx1 = []
	let v0x = 0
	let v0y = 0
	let v0z = 0
	let v1x = 0
	let v1y = 0
	let v1z = 0
	let dx = 0
	let dy = 0
	let dz = 0
	let ab = [] //edge vertex indices between a and b
	let ac = [] //edge vertex indices between a and c
	let bc = [] //edge vertex indices between b and c
	let nbInnerVerts = 0
	let tempIndex = []
	let rs = 0 //row start index
	let nrs = 0 //next row start index
	let prs = 0
	let r = 0
	const scale = 1 / m
	let rowScale = 1
	for (let f = 0; f < faceNb; f++) {
		face = GD11.face[f]
		for (let i = 0; i < 3; i++) {
			//add vertices along an edge if not already done
			a = face[i % 3]
			b = face[(i + 1) % 3]
			if (!edge[a + '|' + b]) {
				edge[a + '|' + b] = []
				vtx0 = GD11.vertex[a]
				vtx1 = GD11.vertex[b]
				v0x = vtx0[0]
				v0y = vtx0[1]
				v0z = vtx0[2]
				v1x = vtx1[0]
				v1y = vtx1[1]
				v1z = vtx1[2]
				dx = v1x - v0x
				dy = v1y - v0y
				dz = v1z - v0z
				for (let k = 0; k < nbPerSide; k++) {
					GDMM.vertex.push([
						v0x + (k + 1) * dx * scale,
						v0y + (k + 1) * dy * scale,
						v0z + (k + 1) * dz * scale,
					])
					edge[a + '|' + b].push(vertexCount++)
				}
				edge[b + '|' + a] = edge[a + '|' + b].concat([])
				edge[b + '|' + a].reverse()
			}
		}
		//form inner vertices for each face and store all face indices indices in order
		a = face[0]
		b = face[1]
		c = face[2]
		ab = edge[a + '|' + b]
		ac = edge[a + '|' + c]
		bc = edge[b + '|' + c]
		tempIndex = []
		tempIndex.push(a)
		nbInnerVerts = 0
		for (let i = 0; i < ab.length; i++) {
			tempIndex.push(ab[i])
			vtx0 = GDMM.vertex[ab[i]]
			vtx1 = GDMM.vertex[ac[i]]
			v0x = vtx0[0]
			v0y = vtx0[1]
			v0z = vtx0[2]
			v1x = vtx1[0]
			v1y = vtx1[1]
			v1z = vtx1[2]
			dx = v1x - v0x
			dy = v1y - v0y
			dz = v1z - v0z
			for (let k = 0; k < nbInnerVerts; k++) {
				rowScale = 1 / (nbInnerVerts + 1)
				GDMM.vertex.push([
					v0x + (k + 1) * dx * rowScale,
					v0y + (k + 1) * dy * rowScale,
					v0z + (k + 1) * dz * rowScale,
				])
				tempIndex.push(vertexCount++)
			}
			tempIndex.push(ac[i])
			nbInnerVerts++
		}
		tempIndex.push(b)
		tempIndex = tempIndex.concat(bc)
		tempIndex.push(c)

		//construct faces for GDM0
		//r is row of vertices in split triangle
		for (let r = 1; r < m; r++) {
			rs = (r * (r + 1)) / 2
			nrs = rs + r + 1
			prs = rs - r
			for (let i = 0; i < r; i++) {
				GDMM.face.push([tempIndex[rs + i], tempIndex[rs + i + 1], tempIndex[prs + i]])
				GDMM.face.push([tempIndex[rs + i], tempIndex[nrs + i + 1], tempIndex[rs + i + 1]])
			}
		}
		r = m
		rs = (r * (r + 1)) / 2
		nrs = rs + r + 1
		prs = rs - r
		for (let i = 0; i < r; i++) {
			GDMM.face.push([tempIndex[rs + i], tempIndex[rs + i + 1], tempIndex[prs + i]])
		}
	}
	//push vertices onto sphere of given radius and return
	GDMM.vertex = GDMM.vertex.map(v => {
		const x = v[0]
		const y = v[1]
		const z = v[2]
		const mag = Math.sqrt(x * x + y * y + z * z)
		return [(x * radius) / mag, (y * radius) / mag, (z * radius) / mag]
	})

	return GDMM
}
