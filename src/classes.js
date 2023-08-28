
console.log('got classes!', originalClasses)
let filteredClasses = []


function createTable() {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const tr = document.createElement()
    table.appendChild(thead);
    table.appendChild(tbody);

    document.querySelector("#results").appendChild(table);
}


document.querySelector("#search").addEventListener("click", (e) => {
    e.preventDefault()
    //clear filteredClases
    filteredClasses = []
    //find out what the criteria is
    let criteriaSession = new Set()
    let criteriaAge = new Set()
    let criteriaClass = new Set()
    let criteriaLevel = new Set()
    let availability = false
    const criteria = document.querySelectorAll(':checked')
    //find out what kind of criteria it is
    Array.from(criteria).forEach(c => {
        if (c.dataset.type == "session") {
            criteriaSession.add(c.value)
        } else if (c.dataset.type == "age") {
            criteriaAge.add(c.value)
        } else if (c.dataset.type == "class") {
            criteriaClass.add(c.value)
        } else if (c.dataset.type == "level") {
            criteriaLevel.add(c.value)
        } else if (c.dataset.type == "available") {
            availability = true
        }
    })
    console.log(criteriaSession)
    console.log(criteriaAge)
    console.log(criteriaClass)
    console.log(criteriaLevel)
    console.log(availability)

    for (let gymClass of originalClasses) {
        let add = true;
        if (availability) {

            if (gymClass.opening <= 0) {

                add = false;
            }
        }
        if (criteriaSession.size > 0 && !criteriaSession.has(gymClass.session)) {
            add = false;
        }
        if (criteriaAge.size > 0 && !criteriaAge.has(gymClass.age)) {
            add = false;
        }
        if (criteriaClass.size > 0 && !criteriaClass.has(gymClass.className)) {
            add = false;
        }
        if (criteriaLevel.size > 0 && !criteriaLevel.has(gymClass.level)) {
            add = false;
        }
        if (add) {
            filteredClasses.push(gymClass);
        }
    }
    console.log('filtered,', filteredClasses)

})
