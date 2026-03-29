const API = "http://localhost:3000/api";
const TOKEN = localStorage.getItem("token");

let barChart, pieChart;

/* LOAD DATA */
async function loadData(){
    try {
        let res = await fetch(`${API}/livestock`, {
            headers: {
                "Authorization": TOKEN
            }
        });

        console.log("STATUS:", res.status);

        if(!res.ok){
            console.error("API ERROR:", res.status);
            return;
        }

        let data = await res.json();
        console.log("DATA:", data);

        if(!Array.isArray(data)){
            console.error("Invalid data format:", data);
            return;
        }

        document.getElementById("totalLivestock").innerText = data.length;

        renderCharts(data);
        loadMap();

    } catch(err){
        console.error("FETCH ERROR:", err);
    }
}

/* CHARTS */
function renderCharts(data){
    // LINE CHART (simple demo growth)
let lineLabels = data.map((d, i) => "Item " + (i+1));
let lineData = data.map(d => d.age || 0);

new Chart(
    document.getElementById("lineChart").getContext("2d"),
    {
        type: "line",
        data: {
            labels: lineLabels,
            datasets: [{
                label: "Growth (Age)",
                data: lineData,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    }
);
    if(data.length === 0){
        console.warn("No data available");
        return;
    }

    let count = {};

    data.forEach(d=>{
        let type = d.animal_type || "Unknown";
        count[type] = (count[type] || 0) + 1;
    });

    console.log("Chart Data:", count);

    if(barChart) barChart.destroy();
    if(pieChart) pieChart.destroy();

    // BAR CHART
    barChart = new Chart(
        document.getElementById("barChart").getContext("2d"),
        {
            type: "bar",
            data: {
                labels: Object.keys(count),
                datasets: [{
                    label: "Animals",
                    data: Object.values(count)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    );

    // PIE CHART
    pieChart = new Chart(
        document.getElementById("pieChart").getContext("2d"),
        {
            type: "pie",
            data: {
                labels: Object.keys(count),
                datasets: [{
                    data: Object.values(count)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    );
}

/* MAP */
function loadMap(){

    if(!document.getElementById("map")) return;

    const map = L.map('map').setView([22.97,78.65],5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(map);

    fetch("https://raw.githubusercontent.com/geohacker/india/master/state/india_states.geojson")
    .then(res=>res.json())
    .then(data=>{
        L.geoJSON(data,{
            onEachFeature:(feature,layer)=>{
                layer.on("click",()=>{
                    alert("State: " + feature.properties.NAME_1);
                });
            }
        }).addTo(map);
    });
}

/* INIT */
window.onload = loadData;