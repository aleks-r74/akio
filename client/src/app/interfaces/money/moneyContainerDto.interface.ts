export interface MoneyContainerDto {
    containerName: string;
    balance: number;
    access_level: number;
    directions: Direction[];
  }

export interface Direction{source:string, dest:string}