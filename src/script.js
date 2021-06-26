// track element
const userList = document.getElementById("list-user");
const users = [];
const loading = document.querySelector('h3');
const input = document.getElementById('input');

// fetch data
fetchData();

// fetch data 
async function fetchData(){
    let url = 'https://randomuser.me/api?results=150';

    // get data from server
    let result = await fetch(url);
    let data = await result.json();

    addList(data.results);
}

// addList function
function addList(userDataList){
    // create user list and add userList div
    userDataList.forEach(userData=>{
        // create userLi and userName and location
        let [userLi,userNameAndLocation] = createLi(userData);

        // add li inside the userList and show it and hide loading
        userList.appendChild(userLi);
        userList.classList.remove('hide');
        loading.classList.add('hide');

        // add push inside the users array
        users.push({userLi,userNameAndLocation});
    })
}

// createLi function
function createLi(data){
    // extract data object
    let {
        name:{
            title,
            first,
            last
        },
        location:{
            city,
            country
        },
        picture:{
            medium:userURL
        }
    } = data;

    // create userData
    let userName = title + ' ' + first + ' ' + last;
    let userLocation = city + ', '+country
    
    // create li and set information
    let li = document.createElement('li');

    li.innerHTML = `
        <!-- img -->
        <img src="${userURL}" alt="${userName}">

        <!-- start info -->
        <div class="info">
            <h2>${userName}</h2>
            <p>${userLocation}</p>
        </div>
        <!-- end info -->
    `

    // add class in li
    li.className = 'user';

    // return li and userName and location string
    return [li,userName + ' '+ userLocation];
}

// add event listener on input
input.addEventListener('input',search);

// search function
function search(event){
    // extract search term
    let searchTerm = input.value.trim().toLowerCase();

    // search
    users.forEach(user=>{
        // extract user
        let {
            userLi,
            userNameAndLocation
        } = user;

        let itPartOfSearchTerm = userNameAndLocation.toLowerCase().includes(searchTerm);

        if(itPartOfSearchTerm){
            // if it part of search term
            userLi.classList.remove('hide')
        }else{
            // if it not part of search term
            userLi.classList.add('hide');
        }
    })
}