const btn = document.createElement('button');
btn.textContent = 'get users';
btn.classList.add('btn-danger');
const container = document.querySelector('.container');
container.appendChild(btn);

function sendUsers(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users')
    xhr.addEventListener('load', (e)=>{
    const response = JSON.parse(xhr.responseText) ;
    cb(response);
        })
    xhr.send() 
}


btn.addEventListener('click',(e)=>{
    sendUsers(response => {
        response.forEach((user)=>{
            return container.appendChild(userTempl(user));
        })
        
    })  
});

function userTempl(user){
    const buttonUser = document.createElement('button');
    buttonUser.textContent = `${user.name}`;
    buttonUser.classList.add("list-group-item");
    buttonUser.type = 'button';
    buttonUser.setAttribute('data-task-id', user.id);

    return buttonUser;    
}

document.body.addEventListener('click', onCompleteHandler);

function onCompleteHandler({ target }) {
    if(target.classList.contains('list-group-item')) {
      const parent = target.closest('[data-task-id]');
      onTheButt(parent);
    }
}

function onTheButt(bt){
    sendUsers(response => {
        response.forEach((user)=>{

            if(bt.textContent == user.name){
                let template = userDetailedInfoTemplate(user);
                container.insertAdjacentHTML("afterbegin", template);
            }
        })
})
}

function userDetailedInfoTemplate(user) {
    return `
    <div class="card border-dark mb-3">
      <div class="card-header">${user.name}</div>
      <div class="card-body text-dark">
        <h5 class="card-title">${user.email}</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><b>Nickname:</b> ${user.username}</li>
          <li class="list-group-item"><b>Website:</b> ${user.website}</li>
          <li class="list-group-item"><b>Company:</b> ${user.company.name}</li>
          <li class="list-group-item"><b>City:</b> ${user.address.city}</li>
        </ul>
      </div>
      <div class="card-footer bg-transparent border-dark">Phone: ${user.phone}</div>
    </div>
    `;
  }