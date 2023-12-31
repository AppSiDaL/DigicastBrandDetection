import axios from "axios";

const testImage = async (image: any, url: string,confidence:number) => {
  try {
    const response = await axios({
      method: "POST",
      url,
      params: {
        api_key: "nF14XSoXj4sl5RKhIdMS",
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