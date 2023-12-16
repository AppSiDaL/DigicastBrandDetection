import axios from "axios";

const testImage = async (image: any) => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/nestle-tp8gk/3",
      params: {
        api_key: "nF14XSoXj4sl5RKhIdMS",
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

export default { testImage };
