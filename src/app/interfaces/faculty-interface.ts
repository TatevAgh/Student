export interface Faculty{
    id: number;
    name: string;
}
export interface Groups{
    faculty_id: number;
    name: string;
    id: number;
}
export interface Students{
  student: any;
  id: number;
    name: string;
    last_name: string;
    email: string;
    phone: number;
    faculty_id: number;
    group_id: number;
    get_faculty?: any;
    get_group?: any;
}
export interface FilterStudent{
    name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    get_faculty?: any;
    get_group?: any;
}


