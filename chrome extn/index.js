let myLeads= []
const inputEl= document.getElementById("input-el")
let inputBtn= document.getElementById("input-btn")
const deleteBtn= document.getElementById("delete-btn")
const tabBtn= document.getElementById("tab-btn")

const ulEl= document.getElementById("ul-el")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads= leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads){
    let listItems=""
    for(let i=0; i< leads.length;i++){     
        listItems += `
            <li>
                <a target='_blank' 
                href='${leads[i]}'>
                ${leads[i]}
                </a>
            </li>`
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads= []
    render(myLeads)
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value= ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})


//ulEl.textContent += "<li>" + myLeads[i] + "</li>"
/* const li= document.createElement("li")
li.textContent= myLeads[i]
ulEl.append(li) */
//ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"

//listItems += "<li><a target='_blank' href=' " + myLeads[i] + "'>" + myLeads[i] + "</a></li>"