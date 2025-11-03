export interface IIndicator {
  indicatorId: number
  indicatorName: string
  content: string
  children?: IIndicatorChild[]
}
export interface IIndicatorChild {
  indicatorId: number
  indicatorName: string
  parentId: number
  score: number
}

export interface IActivityInfo {
  activity_id: number
  activity_name: string
  description: string
  url: string
  indicatorList: IIndicator[]
}