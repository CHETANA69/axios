var form = document.getElementById('my-form');
const ul = document.getElementById('lists');


form.addEventListener('submit', addToStorage);
function addToStorage(e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var emailId = document.getElementById('email').value;
    var info = {
        name,
        emailId
    }
    // var infoToString = JSON.stringify(info);
    // localStorage.setItem(info.emailId, infoToString);
    // showList(info);
    

    axios.post("https://crudcrud.com/api/a0b7fd5679af43a4bc4505b0c62c2944/appointmentData",info)
    .then((response)=>{
        showList(response.data);
        console.log(data);
    })
    .catch((err)=>{
        console.log(err);
    })
}


window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/a0b7fd5679af43a4bc4505b0c62c2944/appointmentData")
      .then((response) =>{
        console.log(response);
        for (var i =0;i < response.data.length;i++)
        {
            showList(response.data[i]);
        }
      })
      .catch((err)=>{
        console.log(err);
      })
})

function showList(info) {

    var li = document.createElement('li');
    var deleteBtn = document.createElement('button');
    li.textContent = info.name + " : " + info.emailId;
    ul.appendChild(li);
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.style.float = 'right';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => {
        if (confirm('Are You Sure?.....')) {
            // localStorage.removeItem(info.emailId);
            


            axios.delete("https://crudcrud.com/api/a0b7fd5679af43a4bc4505b0c62c2944/appointmentData/info.id")
            .then((response)=>{
                console.log(response);
                for (var i =0;i < response.data.length;i++)
                {
                    showList(response.data[i]);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
            ul.removeChild(li);
        }
    }
    li.appendChild(deleteBtn);

    var editBtn = document.createElement('button');
    editBtn.appendChild(document.createTextNode('Edit'));
    editBtn.style.float = 'right';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => {
        if (confirm('Are You Sure?.....')) {
            localStorage.removeItem(info.emailId);
            document.getElementById('name').value=info.name;
            document.getElementById('email').value=info.emailId;

            ul.removeChild(li);
        }
    }
    li.appendChild(editBtn);
}
