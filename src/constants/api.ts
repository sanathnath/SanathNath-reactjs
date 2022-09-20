export const api_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmF0aG5hZGg1NEBnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vc2FuYXRobmF0aCIsImlhdCI6MTY2MzMxMzAzMiwiZXhwIjoxNjYzNzQ1MDMyfQ.vCRZmBsOQ2WPigCO-ijLXtAHYaBNHO4TkBp9L0bcxcg'

export const get_all_product_api:string = "https://upayments-studycase-api.herokuapp.com/api/products";

export const select_product_api = (id:string | undefined)=>{
    return `https://upayments-studycase-api.herokuapp.com/api/products/${id}`;
}

export const post_product_api:string = "https://upayments-studycase-api.herokuapp.com/api/products";

export const get_all_category_api:string = "https://upayments-studycase-api.herokuapp.com/api/categories/";

export const select_category_api = (id:string) => {
    return `https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/${id}`
}
