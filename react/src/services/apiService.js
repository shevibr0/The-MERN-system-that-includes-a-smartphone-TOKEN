// Service api
import axios from "axios";
export const API_URL="http://localhost:3005"
export const TOKEN_KEY="smart_token"

export const doApiGet = async (_url) => {
    try { 
      let resp = await axios({
        url:_url,
        method: "GET",
        headers: {
          "x-api-key": localStorage[TOKEN_KEY]
        }
      })
      return resp.data;
    }catch (err) {
      console.log(err);
      throw err
    }} 


    export const doApiMethod = async (_url,_method,_body={}) => {
    try { 
      let resp = await axios({
        url:_url,
        method: _method,
        data:_body,
        headers: {
          "x-api-key": localStorage[TOKEN_KEY]
        }
      })
      return resp.data;
    }catch (err) {
      console.log(err);
      throw err
    }}