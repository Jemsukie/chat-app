import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        id: 'String',
        username: 'String1064841',
        password: 'String',
        name: 'String',
      },
    },
    two: {
      data: {
        id: 'String',
        username: 'String968523',
        password: 'String',
        name: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
