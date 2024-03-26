const url = "http://localhost:8000/api/spech";
const getSpech = (videoURL: string) => {
  const payload = {
    url: videoURL,
  };

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};

const getSpechVideo = (file: any) => {
  const url = "http://localhost:8000/api/videoSpech";

  const formData = new FormData();
  formData.append("file", file);

  return fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export default { getSpech, getSpechVideo };
