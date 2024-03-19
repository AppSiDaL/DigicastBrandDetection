const url = "http://localhost:8000/api/spech";
const getSpech = (videoURL: string) => {
  const payload = {
    url: videoURL,
  };
  
  fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {return data})
    .catch((error) => console.log(error));
};

export default {getSpech}