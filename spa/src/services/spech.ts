const url = 'http://localhost:8000/api/spech'
const getSpech = async (videoURL: string): Promise<any> => {
  const payload = {
    url: videoURL
  }

  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async (response) => await response.json())
    .then((data) => {
      return data
    })
    .catch((error) => { console.log(error) })
}

const getSpechVideo = async (file: any): Promise<any> => {
  const url = 'http://localhost:8000/api/videoSpech'

  const formData = new FormData()
  formData.append('file', file as string)

  return await fetch(url, {
    method: 'POST',
    body: formData
  })
    .then(async (response) => await response.json())
    .then((data) => {
      return data
    })
    .catch((error) => { console.log(error) })
}

export default { getSpech, getSpechVideo }
