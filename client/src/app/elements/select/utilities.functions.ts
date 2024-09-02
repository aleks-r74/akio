export function toRealValue(options: string[], value: string){
    return options.find(o=>o.toLowerCase()==value.toLowerCase());
}
    
export function toTitleCase(value: string){
    return value.charAt(0).toUpperCase()+value.toLocaleLowerCase().slice(1);
}
