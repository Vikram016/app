import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL} from "../constants/Urls.js";

const baseQurey=fetchBaseQuery({
    baseUrl:BASE_URL,
});

export const apiSlice=createApi({ 
    baseQuery:baseQurey,
    tagTypes:['Products'],
    endpoints:(builder)=>({}),
});