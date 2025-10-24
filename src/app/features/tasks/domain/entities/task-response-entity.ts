export interface TaskResponseEntity {
    createdAt:    string;
    updatedAt:    string;
    idTasks:      number;
    title:        string;
    description:  string;
    active:       boolean;
    userCreated:  number;
    userAssigned: number;
}