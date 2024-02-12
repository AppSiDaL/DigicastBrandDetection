const url:string = "http://localhost:8000/api/insert";

const insert = async (data: any) => {
  try {
    const response = await fetch(url, { 
      method: 'POST', 
      body: JSON.stringify(data), 
      headers: { 'Content-Type': 'application/json' } 
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const reader = response.body.getReader();
    let chunks = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('Stream complete');
        break;
      }
      chunks += new TextDecoder("utf-8").decode(value);
      console.log(`Received ${value.length} bytes: ${new TextDecoder("utf-8").decode(value)}`)
    }
    console.log(chunks);
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error);
  }
};

const exports= {insert}
export default exports