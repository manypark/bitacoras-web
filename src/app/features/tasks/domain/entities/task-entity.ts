import { DescriptionVO, TitleVO } from "@app/tasks/domain/value-objects";

export interface TaskEntity {
    title:        TitleVO;
    description:  DescriptionVO;
    userCreated:  number;
    userAssigned: number;
}