const API = "http://localhost:3000/api";
const TOKEN = localStorage.getItem("token");

let pieChart;

/* LOAD DATA */
async function loadFarmerData(){

    try {

        let res = await fetch(`${API}/livestock`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });

        if(!res.ok){
            console.error("Unauthorized or error:", res.status);
            return;
        }

        let data = await res.json();

        console.log("Farmer Data:", data);

        /* ✅ THIS DATA IS ALREADY FILTERED FROM BACKEND */
        document.getElementById("totalAnimals").innerText = data.length;

        renderTable(data);
        renderChart(data);

    } catch(err){
        console.error("Error:", err);
    }
}
/* TABLE */
function renderTable(data){
    let rows="";

    data.forEach((d,index)=>{
        rows+=`<tr style="animation-delay:${index*0.1}s">
        <td>${d.id}</td>
        <td contenteditable="true">${d.animal_type}</td>
        <td contenteditable="true">${d.breed}</td>
        <td contenteditable="true">${d.age}</td>
        <td>
            <button onclick="update(${d.id},this)">Save</button>
            <button onclick="del(${d.id})">Delete</button>
        </td>
        </tr>`;
    });

    document.getElementById("data").innerHTML = rows;
}

/* ADD */
const form = document.getElementById("addForm");

if(form){
form.addEventListener("submit", async (e)=>{
    e.preventDefault();

    let animal = document.getElementById("animal").value;
    let breed = document.getElementById("breed").value;
    let age = document.getElementById("age").value;

    await fetch(`${API}/livestock`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": TOKEN
        },
        body:JSON.stringify({animal_type:animal, breed, age})
    });

    e.target.reset();
    loadFarmerData();
});
}

/* UPDATE */
async function update(id,btn){

    let row = btn.parentElement.parentElement.children;

    let data = {
        animal_type: row[1].innerText,
        breed: row[2].innerText,
        age: row[3].innerText
    };

    await fetch(`${API}/livestock/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization": TOKEN
        },
        body:JSON.stringify(data)
    });

    loadFarmerData();
}

/* DELETE */
async function del(id){

    await fetch(`${API}/livestock/${id}`,{
        method:"DELETE",
        headers:{
            "Authorization": TOKEN
        }
    });

    loadFarmerData();
}

/* CHART */
function renderChart(data){

    let count = {};

    data.forEach(d=>{
        let type = d.animal_type || "Unknown";
        count[type] = (count[type] || 0) + 1;
    });

    if(pieChart) pieChart.destroy();

    pieChart = new Chart(document.getElementById("farmerPie"),{
        type:"pie",
        data:{
            labels:Object.keys(count),
            datasets:[{data:Object.values(count)}]
        }
    });
}

/* INIT */
loadFarmerData();