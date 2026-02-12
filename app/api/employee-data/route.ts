import { NextResponse } from "next/server";
import { env } from "@/config/config";
import {validateEmployeeDataResponse} from "./helpers"


const {employeeDataApiUrl} = env;

export async function GET(){
    try{
        const response = await fetch(employeeDataApiUrl || "");
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch employee data" }, { status: response.status });
        }
        const data = await response.json();
        const validatedData = validateEmployeeDataResponse(data);
        return NextResponse.json(validatedData);

    }catch(error){
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}