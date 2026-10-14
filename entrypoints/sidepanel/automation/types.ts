export type Action =
  | { type: 'click'; text: string }
  | { type: 'type'; text: string; value: string }
  | { type: 'wait'; ms: number }
  | { type: 'waitFor'; text: string; timeout?: number };

export type Script = Action[];