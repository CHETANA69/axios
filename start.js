//  AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0I'


// GET REQUEST
function getTodos() {
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params: {
    //         _limit : 5
    //     }
    // })
    // .then(res => showOutput(res) )
    // .catch(err => console.error(err));

    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=5',{
        timeout : 5000  // it is used if time exceed than this it will stop running
      })
      .then(res => showOutput(res) )
      .catch(err => console.error(err));

// note = 1) axios need a link which is given in an html file
/* <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js"></script> */
// 2) their are 2 ways we can write axios code as above 
// 3)when we write axios we dont need to write method name "get" bcoz by default axios take get method
// 4) url is a link of fake data given 
// 5) params is used to limit the data


  }
  
  // POST REQUEST
  function addTodo() {
    //  axios({
    //     method: 'post',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     data: {
    //         title : 'New todo',
    //         completed: false
    //     }
    // })
    axios.post('https://jsonplaceholder.typicode.com/todos',{
        title : 'New todo',
        completed: false 
    })
    .then(res => showOutput(res) )
    .catch(err => console.error(err));

    // note= in post we post a new data 
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    // axios.put('https://jsonplaceholder.typicode.com/todos/1',{
    //     title : 'update todo',
    //     completed: false 
    // })
    // .then(res => showOutput(res) )
    // .catch(err => console.error(err));

//    note = 1) use put me replace the old data with new entirely
// 2) in this we need to add the id in url for eg /1


axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
        title : 'update todo',
        completed: false 
    })
    .then(res => showOutput(res) )
    .catch(err => console.error(err));


    //  note= 1) in patch the data is not replaced completely
    //  2) and all is same as put
  }
  
  // DELETE REQUEST
  function removeTodo() {
    axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res) )
    .catch(err => console.error(err));


    // note = 1) delete is use to delete the data from the list
    // 2) it also needs id to be deleted in its url
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    axios
    .all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    // .then(res => {
    //     console.log(res[0]);
    //     console.log(res[1]);
    //     showOutput(res[1]) })

    .then(axios.spread((todos, posts) => showOutput(posts)))
        
    .catch(err => console.error(err));
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    const config ={
        headers: {
            'Content-Type' : 'application/json',
            Authorization: 'sometoken'
        }
    };

    axios
    .post('https://jsonplaceholder.typicode.com/todos',{
        title : 'New todo',
        completed: false 
    },config )
    .then(res => showOutput(res) )
    .catch(err => console.error(err));

  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    const option = {
     method: 'post',
     url : 'https://jsonplaceholder.typicode.com/todos',
     data: {
        title : 'Hello World'
     },
     transformResponse: axios.defaults.transformResponse.concat(data => {
        data.title = data.title.toUpperCase();
        return data;
     })
    };
    axios(option).then(res => showOutput(res));
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios
      .get('https://jsonplaceholder.typicode.com/todoss',{
        validateStatus: function(status){
            return status < 500;}   //Reject only if status is greater or equal to 500
      })
      .then(res => showOutput(res) )
      .catch(err => {
        if (err.response){
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);

            if (err.response.status === 404){
                alert('Error: Page Not Found');
            }
        }else if(err.request){
            console.error(err.request);
        }
        else{
            console.error(err.message);
        }
      });
  }
  
  // CANCEL TOKEN
  function cancelToken() {
    const source = axios.CancelToken.source();
    axios
    .get('https://jsonplaceholder.typicode.com/todos',
    {
       cancelToken: source.token 
    })
    .then(res => showOutput(res) )
    .catch(thrown =>{
        if (axios.isCancel(thrown)){
            console.log('Request canceled', thrown.message);
        }
    });
    if(true){
        source.cancel('request canceled!');
    }
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
   axios.interceptors.request.use(
    config =>{
        console.log(config.method.toUpperCase()+" request sent to" + config.url + " at " + new Date().getTime());
        return config;
    },
     error =>{
        return Promise.reject(error);
     }
   );
  // AXIOS INSTANCES
  const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
  });
  axiosInstance.get('/comments').then(res => showOutput(res));


  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);