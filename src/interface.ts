export interface IToDo {
    name: string;
    status: 'doing'|'completed'|'invalid';
}
export interface ITab {
    name:  '全部'|'已完成'|'未完成'
    value: 'all'|'completed'|'doing'|'invalid'
}