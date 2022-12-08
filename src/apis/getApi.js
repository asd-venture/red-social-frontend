
export default getApi = async () => {

    const url = `http://localhost:3000/users`;
  
    const response = await fetch(url)
    .then(response=> response.json())
    .catch(e => {
        console.log('e', e)
    })
    
    return response
}