export interface UpdateTaskEntity {
    idTask:       number;
    title:        string;
    description:  string;
    active:       boolean;
    userAssigned: number;
}