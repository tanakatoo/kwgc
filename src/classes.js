
console.log('got classes!', originalClasses)
console.log('got sessionNames!', sessionNames)
let filteredClasses = []





document.querySelector("#search").addEventListener("click", (e) => {
    e.preventDefault()
    //clear filteredClases
    filteredClasses.length = 0
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


    makeTableDesktop(filteredClasses, criteriaSession);
})

//run at first load
makeTableDesktop(originalClasses, new Set());

function makeTableDesktop(classes, criteriaSession) {
    console.log(criteriaSession, criteriaSession.size);
    //remove original table first
    document.querySelector("#results").innerHTML = ""

    //use original or filtered classes to make classes table for desktop
    //for each section, make a table
    const container = document.querySelector("#results")

    for (let session of sessionNames) {
        //if the user filtered by session, only show those sessions
        if ((criteriaSession.size > 0 && criteriaSession.has(session)) ||
            criteriaSession.size == 0) {
            makeSessionSection(session, container);

            //check if there are any classes in this session
            let classesInSession = false;
            for (let row of classes) {
                if (row.session == session) {
                    classesInSession = true;

                }
            }
            if (!classesInSession) {
                const p = document.createElement("p");
                p.innerText = "No classes available in this session"
                container.appendChild(p)
            } else {
                const table = document.createElement("table");
                createTableHead(table, container);
                createTableBody(session, table, container, classes);


            }
        }

    }
}

function makeSessionSection(session, container) {

    const h3 = document.createElement("h3")
    h3.classList.add('margin-top-large')
    const h3text = document.createTextNode(session)
    h3.appendChild(h3text)
    container.appendChild(h3)
}

function createTableHead(table, container) {

    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.className = "register"
    const td2 = document.createElement("td");
    td2.className = "className"
    td2.appendChild(document.createTextNode("Class/Level"))
    const td3 = document.createElement("td");
    td3.className = "age"
    td3.appendChild(document.createTextNode("Age"))
    const td4 = document.createElement("td");
    td4.className = "dates"
    td4.appendChild(document.createTextNode("Dates"))
    const td5 = document.createElement("td");
    td5.className = "time"
    td5.appendChild(document.createTextNode("Time"))
    const td6 = document.createElement("td");
    td6.className = "tuition"
    td6.appendChild(document.createTextNode("Tuition"))
    const td7 = document.createElement("td");
    td7.className = "notes"
    td7.appendChild(document.createTextNode("Notes"))

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    thead.appendChild(tr)
    table.appendChild(thead);
    container.appendChild(table);
}

function createTableBody(session, table, container, classes) {
    const tbody = document.createElement("tbody");

    for (let row of classes) {

        //only include info from this session
        if (row.session == session) {
            //Register column
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            td1.classList.add('register');
            const div = document.createElement("div");
            div.classList.add("flex");
            div.classList.add("flex-col");
            const span = document.createElement("span");
            const span2 = document.createElement("span");
            if (row.canRegister) {
                const a = document.createElement("a");

                a.href = row.link

                if (row.opening > 0) {
                    a.innerText = "Register"
                } else {
                    span.innerText = "Waitlist"
                }
                span.appendChild(a)
                span2.classList.add('tab');
                span2.classList.add('nowrap');
                if (row.opening > 0) {
                    span2.innerText = `${row.opening} opening(s)`
                } else {
                    span2.innerText = `${Math.abs(row.opening)} waiting`
                }
            } else {
                span.innerText = "Registration not yet open"
            }
            div.appendChild(span)
            div.appendChild(span2)
            td1.appendChild(div)
            tr.appendChild(td1)

            //name column
            const td2 = document.createElement("td");
            td2.className = "className";

            const div2 = document.createElement("div");
            div2.classList.add("flex");
            div2.classList.add("flex-col");

            const span3 = document.createElement("span");
            span3.innerText = row.className;

            const span4 = document.createElement("span");
            span4.classList.add("tab");
            span4.innerText = row.level;

            div2.appendChild(span3);
            div2.appendChild(span4);

            td2.appendChild(div2);
            tr.appendChild(td2)

            //age column

            const td3 = document.createElement("td");
            td3.classList.add("age");

            if (row.minAge_yrs != "" && row.minAge_yrs != false) {
                td3.innerText = row.minAge_yrs;
                if (row.minAge_mths != "" || row.minAge_mths != false) {
                    td3.innerText += "yr ";
                }
            }

            if (row.minAge_mths !== "" && row.minAge_mths !== false) {
                td3.innerText += row.minAge_mths + "mths ";
            }

            if (row.maxAge_yrs == "") {
                td3.innerText += "+ ";
            } else {
                td3.innerText += " - ";
                if (row.maxAge_yrs != "" && row.maxAge_yrs != false) {
                    td3.innerText += row.maxAge_yrs;
                    if (row.minAge_mths != "" && row.minAge_mths != false) {
                        td3.innerText += "yr ";
                    }
                }
                if (row.maxAge_mths != "11" && row.maxAge_mths != false) {

                    td3.innerText += row.maxAge_mths + "mths ";
                }
            }

            tr.appendChild(td3)

            //make dates column

            const td4 = document.createElement("td");
            td4.classList.add("dates");

            const div3 = document.createElement("div");
            div3.classList.add("flex");
            div3.classList.add("flex-col");

            const span5 = document.createElement("span");
            span5.innerText = row.dayOfWeek;

            const span6 = document.createElement("span");
            span6.classList.add("tab");
            span6.innerText = `${row.startDate} to`;

            const span7 = document.createElement("span");
            span7.classList.add("tab");
            span7.innerText = row.endDate;

            div3.appendChild(span5);
            div3.appendChild(span6);
            div3.appendChild(span7);

            td4.appendChild(div3);
            tr.appendChild(td4);


            //make time column

            const td5 = document.createElement("td");
            td5.classList.add("time");
            td5.innerText = `${row.startTime} - ${row.endTime}`;
            tr.appendChild(td5);

            //make tuition column
            const td6 = document.createElement("td");
            td6.classList.add("tuition");
            td6.innerText = `$${row.tuition}`;
            tr.appendChild(td6);

            //make notes column
            const td7 = document.createElement("td");
            td7.classList.add("notes");
            td7.innerText = row.desc;
            tr.appendChild(td7);
            tbody.appendChild(tr)



        }

        table.appendChild(tbody)
        container.appendChild(table)
    }



}