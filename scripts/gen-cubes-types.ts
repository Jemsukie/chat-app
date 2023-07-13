import fs from 'fs'

import fetch from 'node-fetch'

const cubesToTsTypesMap = {
  time: 'string',
}

const convCubesToTsTypes = (typeName: string): string => {
  return cubesToTsTypesMap[typeName] || typeName
}

export default async ({ args }) => {
  // Your script here...
  const cubesUrl = args['cubes-url']
  if (!cubesUrl) {
    throw new Error('Please supply flag --cubes-url')
  }

  const result = await fetch(`${cubesUrl}/cubejs-api/v1/meta`)
  const schema = await result.json()

  const schemasInString = schema.cubes.map((c) => {
    const simpleDims = c.dimensions
      .filter((d) => d.isVisible)
      .map((d) => ({
        name: d.name,
        type: convCubesToTsTypes(d.type),
      }))
    const simpleMeas = c.measures
      .filter((m) => m.isVisible)
      .map((m) => ({
        name: m.name,
        type: convCubesToTsTypes(m.type),
      }))

    return `
interface ICubesDimensions {
  ${simpleDims.map((d) => `readonly '${d.name}': ${d.type}`).join('\n  ')}
}

interface ICubesMeasures {
  ${simpleMeas.map((d) => `readonly '${d.name}': ${d.type}`).join('\n  ')}
}

interface ICubesFields extends ICubesDimensions, ICubesMeasures {}

type TCubes${c.name} = {
  ${simpleDims.map((d) => `readonly '${d.name}': ${d.type}`).join('\n  ')}
  ${simpleMeas.map((d) => `readonly '${d.name}': ${d.type}`).join('\n  ')}
}
`
  })

  fs.writeFileSync(
    'types/generated-cubes.d.ts',
    Buffer.from(schemasInString.join('\n'))
  )
}
