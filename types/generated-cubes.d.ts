interface ICubesDimensions {}

interface ICubesMeasures {
  readonly 'Chat.count': number
}

interface ICubesFields extends ICubesDimensions, ICubesMeasures {}

type TCubesChat = {
  readonly 'Chat.count': number
}

interface ICubesDimensions {
  readonly 'User.name': string
}

interface ICubesMeasures {
  readonly 'User.count': number
}

interface ICubesFields extends ICubesDimensions, ICubesMeasures {}

type TCubesUser = {
  readonly 'User.name': string
  readonly 'User.count': number
}
