import { db } from 'src/lib/db'

export const composers = async () => await db.composer.findMany()
