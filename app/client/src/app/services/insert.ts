import axios from "axios";
const url:string = "http://localhost:8000/api/insert";

const insert = async (data: any) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const exports= {insert}
export default exports