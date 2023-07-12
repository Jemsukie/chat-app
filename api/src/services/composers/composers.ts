import * as dataServices from 'src/data-services/composers/composers'

export const composers = async () => {
  return await dataServices.composers()
}
