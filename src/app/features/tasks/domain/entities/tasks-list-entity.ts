export interface TaskListEntity {
    idTasks:      number;
    title:        string;
    description:  string;
    active:       boolean;
    createdAt:    string;
    userAssigned: User;
    userCreated:  User;
    logsCount:    number;
}

export interface User {
    idUser:    number;
    firstName: string;
    lastName:  string;
    email:     string;
}