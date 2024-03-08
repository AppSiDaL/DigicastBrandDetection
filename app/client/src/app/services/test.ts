const url:string = "http://localhost:8000/api/test";

const test = async function* (data: any) {
  try {
    const response = await fetch(url, { 
      method: 'POST', 
      body: JSON.stringify(data), 
      headers: { 'Content-Type': 'application/json' } 
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if(response.body === null) throw new Error('Response body is null');
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('Stream complete');
        break;
      }
      const chunk = new TextDecoder("utf-8").decode(value);
      console.log(`Received ${value.length} bytes: ${chunk}`)
      yield chunk;
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error);
  }
};

const exports= {test}
export default exports