import { DescriptionVO, TitleVO } from "@app/tasks/domain";

export interface UpdateTaskEntity {
    idTask:       number;
    title:        TitleVO;
    description:  DescriptionVO;
    active:       boolean;
    userAssigned: number;
}