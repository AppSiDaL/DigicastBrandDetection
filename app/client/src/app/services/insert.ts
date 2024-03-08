import axios from "axios";

const insert = async (data: any) => {
  const url: string = "http://localhost:8000/api/insert";
  try {
    const response = await axios.post(url, { data });
    return response;
  } catch (error) {
    console.error("There was a problem with the fetch operation: ", error);
  }
};

const fileService = { insert };

export default fileService;
