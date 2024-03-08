import axios from "axios";

const testImage = async (image: any, url: string,confidence:number,api_key:string) => {
  try {
    const response = await axios({
      method: "POST",
      url,
      params: {
        api_key,
        confidence,
      },
      data: image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const fileService = { testImage };

export default fileService;