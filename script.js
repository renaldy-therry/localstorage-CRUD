let foodList = [];
let getFoodList;
let foodListSection = document.querySelector("#foodlist");

function Create() {
    const storage = JSON.parse(localStorage.getItem("foodList"));
    let inputText = document.querySelector("#foodName").value;

    if (inputText == "") {
        alert("write a name");
    } else {
        if (storage === null) {
            foodList.push(inputText);
            localStorage.setItem("foodList", JSON.stringify(foodList));
        } else {
            foodList = JSON.parse(localStorage.getItem("foodList"));
            foodList.push(inputText);
            localStorage.setItem("foodList", JSON.stringify(foodList));
        }
    }
}

function Read() {
    foodListSection.innerHTML = "";
    getFoodList = JSON.parse(localStorage.getItem("foodList"));
    if(getFoodList != null) {
        if (getFoodList != null) {
            if (getFoodList.length === 0) {
                foodListSection.innerHTML = "There are no food";
            } else {
                for (let i = 0; i < getFoodList.length; i++) {
                    foodListSection.innerHTML += `
                    <div class="food-list">

                        <p>
                            <i class="food-name"></i>
                            <span>Food: </span>${getFoodList[i]}
                        </p>

                        <div class="button">
                            <button class="edit" onclick="Edit(${i})">
                            Edit
                            </button>

                            <button class="delete" onclick="Delete(${i})">
                            Delete
                            </button>
                        </div>
                    
                    </div>
                    `;
                }
            }
        }
    }
}

document.getElementById("foodform").addEventListener("submit", (e) => {
    e.preventDefault();
    Create();
    Read();
    document.getElementById("foodform").reset();
});

document.addEventListener("DOMContentLoaded", () => {
    Read();
});


function Delete(item) {
    console.log(item);
    let deleteFood = JSON.parse(localStorage.getItem("foodList"));
    deleteFood.splice(item,1);
    localStorage.setItem("foodList", JSON.stringify(deleteFood));
    Read();
}

function Edit(item) {
    let editFood = JSON.parse(localStorage.getItem("foodList"));
    foodListSection.innerHTML = "";
    for(let i = 0; i < editFood.length; i++) {
        if (i == item) {
            foodListSection.innerHTML += `
                <div class = "food-list">

                    <div>
                        <p>
                            <i class = "food-name"></i>
                            <span>Food: </span> ${editFood[i]}
                        </p>
                        <input type="text"  id="newFood"  placeholder="${editFood[i]}" />
                    </div>

                    <div class = "button">

                        <button class="update" onclick="Update(${i})">
                            Update
                        </button>

                        <button class="cancel" onclick="Read()">
                            Cancel
                        </button>

                    </div>
                    
                </div>
            `;
        } else {
            foodListSection.innerHTML += `
                    <div class="food-list">

                        <p>
                            <i class="food-name"></i>
                            <span>Food: </span>${getFoodList[i]}
                        </p>

                        <div class="button">
                            <button class="edit" onclick="Edit(${i})">
                            Edit
                            </button>

                            <button class="delete" onclick="Delete(${i})">
                            Delete
                            </button>
                        </div>
                    
                    </div>
                    `;
        }
    }
}


function Update(item) {
    const updateFood = JSON.parse(localStorage.getItem("foodList"));
    updateFood[item] = document.getElementById("newFood").value;
    if (updateFood[item] == "") {
        alert("write a food");
    } else {
        localStorage.setItem("foodList", JSON.stringify(updateFood));
        Read();
    }
}

