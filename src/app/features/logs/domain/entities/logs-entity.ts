export interface LogsEntity {
    createdAt:   string;
    idLogs:      number;
    image_url:   string;
    description: string;
    latitud:     number;
    longitud:    number;
    idUser:      UserEntity;
    idConcept:   ConceptEntity;
}

export interface ConceptEntity {
    idConcept:   number;
    description: string;
}

export interface UserEntity {
    idUser:    number;
    firstName: string;
    lastName:  string;
    email:     string;
}