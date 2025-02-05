
console.log('got classes new!', originalClasses);
console.log('got sessionNames!', sessionNames);
console.log('display?');
let filteredClasses = [];



document.querySelector("#reset").addEventListener('click', e => {
    document.querySelectorAll('[data-type="class"]').forEach(l => {
        console.log('resetting time')
        l.disabled = true;
    })
    document.querySelectorAll('[data-type="class"]').forEach(l => {
        console.log('making checkbox enabled')
        let next = l.nextElementSibling;
        next.classList.add('checkbox-disabled');
    })
    document.querySelectorAll('[data-type="class"]').forEach(c => {
        c.checked = false;
    })

    document.querySelectorAll('[data-type="level"]').forEach(l => {
        console.log('resetting type')
        l.disabled = true;
    })
    document.querySelectorAll('[data-type="level"]').forEach(l => {
        console.log('making checkbox enabled')
        let next = l.nextElementSibling;
        next.classList.add('checkbox-disabled');
    })
    document.querySelectorAll('[data-type="level"]').forEach(c => {
        c.checked = false;
    })

    document.querySelectorAll('[data-type="week"]').forEach(c => {
        c.checked = false;
    })
    document.querySelectorAll('[data-type="available"]').forEach(c => {
        c.checked = false;
    })
    document.querySelectorAll('[data-type="age"]').forEach(c => {
        c.checked = false;
    })
    document.querySelectorAll('[data-type="session"]').forEach(c => {
        c.checked = false;
    })
})


document.querySelector(".accordion").addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
        panel.style.display = "none";
        document.querySelector(".searchIcon").innerHTML = '<i class="fa-solid fa-chevron-down"></i>'
        document.querySelector("#searchSign").innerHTML = '<i class="fa-solid fa-plus"></i> '
    } else {
        panel.style.display = "block";
        document.querySelector(".searchIcon").innerHTML = '<i class="fa-solid fa-chevron-up"></i>'
        document.querySelector("#searchSign").innerHTML = '<i class="fa-solid fa-minus"></i> '
    }
});


//put an event listener on all age checkboxes
document.querySelectorAll('[data-type="age"]').forEach(c => {
    c.addEventListener("click", (e) => {
        //if age is selected then only enable those that have classes
        //disable all first

        let criteriaAge = new Set()
        let criteriaCurrentClass = new Set()
        let criteriaClass = new Set()

        //find out what criteria from age is checked, and saved the ones that are checked before from class and level
        const criteria = document.querySelectorAll(':checked')
        console.log('criteria', criteria)
        Array.from(criteria).forEach(c => {
            if (c.dataset.type == "age") {
                criteriaAge.add(c.value)
            } else if (c.dataset.type == "class") {
                criteriaCurrentClass.add(c.value)
            }

        })

        //uncheck all class checkboxes
        document.querySelectorAll('[data-type="class"]').forEach(c => {
            c.disabled = true;
        })
        document.querySelectorAll('[data-type="class"]').forEach(c => {

            let next = c.nextElementSibling;
            next.classList.add('checkbox-disabled');
        })
        document.querySelectorAll('[data-type="class"]').forEach(c => {
            c.checked = false;
        })
        //uncheck all level checkboxes
        document.querySelectorAll('[data-type="level"]').forEach(c => {
            c.disabled = true;
        })
        document.querySelectorAll('[data-type="level"]').forEach(c => {

            let next = c.nextElementSibling;
            next.classList.add('checkbox-disabled');
        })
        document.querySelectorAll('[data-type="level"]').forEach(c => {
            c.checked = false;
        })
        //enable all classes that have the selected age, and keep the checked class and level if they are in the selected age
        //for each class in originalClasses, if it has the same age as the checkboxes, enable it
        originalClasses.forEach(c => {
            if (criteriaAge.has(c.age)) {
                if (criteriaCurrentClass.has(c.className)) {
                    document.querySelector(`[data-type="class"][value="${c.className}"]`).checked = true;
                }
                criteriaClass.add(c.className)
                document.querySelector(`[data-type="class"][value="${c.className}"]`).disabled = false;
                document.querySelector(`[data-type="class"][value="${c.className}"]`).nextElementSibling.classList.remove('checkbox-disabled');


            }
        })
    })
})


//put an event listener on all session checkboxes
// document.querySelectorAll('[data-type="session"]').forEach(s => {
//     s.addEventListener("change", (e) => {
//         if (e.target.value == "2023 Fall Session")
//             if (e.target.value == "2023 Leadership" ||
//                 e.target.value == "2024 Winter Adaptive" ||
//                 e.target.value == "Fall 2023 Private Lessons") {
//                 //disable all of the ages

//                 document.querySelectorAll('[data-type="age"]').forEach(a => {
//                     a.setAttribute("disabled", true)
//                     let next = a.nextElementSibling;
//                     next.classList.add('checkbox-disabled');
//                 })

//             }
//     })
// })


//put an event listener on all class checkboxes
document.querySelectorAll('[data-type="class"]').forEach(c => {
    c.addEventListener("click", (e) => {
        //if class is selected then only enable those that have the levels

        let criteriaClass = new Set()
        let criteriaCurrentLevel = new Set()
        let criteriaLevel = new Set()
        //find out what criteria from age is checked, and saved the ones that are checked before from class and level
        const criteria = document.querySelectorAll(':checked')

        Array.from(criteria).forEach(c => {

            if (c.dataset.type == "class") {
                criteriaClass.add(c.value)
            } else if (c.dataset.type == "level") {
                criteriaCurrentLevel.add(c.value)
            }

        })

        console.log('selected levels already', criteriaCurrentLevel)

        //reset all levels and redo
        document.querySelectorAll('[data-type="level"]').forEach(l => {
            l.disabled = true;
        })
        document.querySelectorAll('[data-type="level"]').forEach(l => {

            let next = l.nextElementSibling;
            next.classList.add('checkbox-disabled');
        })
        document.querySelectorAll('[data-type="level"]').forEach(c => {
            c.checked = false;
        })
        //enable all level that have the selected class, and keep the checked level and level if they are in the selected age
        //for each class in originalClasses, if it has the same age as the checkboxes, enable it
        originalClasses.forEach(c => {

            if (criteriaClass.has(c.className)) {
                console.log(c)
                if (criteriaCurrentLevel.has(c.level)) {
                    document.querySelector(`[data-type="level"][value="${c.level}"]`).checked = true;
                }
                //only add if there is a level not empty
                if (c.level != "") {
                    criteriaLevel.add(c.level)

                    document.querySelector(`[data-type="level"][value="${c.level}"]`).disabled = false;
                    document.querySelector(`[data-type="level"][value="${c.level}"]`).nextElementSibling.classList.remove('checkbox-disabled');
                } else {
                    console.log('no level', c)
                }

            }
        })

    })
})




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
    let criteriaWeek = new Set()
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
        else if (c.dataset.type == "week") {
            criteriaWeek.add(c.value)
        }
    })
    console.log(criteriaSession)
    console.log(criteriaAge)
    console.log(criteriaClass)
    console.log(criteriaLevel)
    console.log(availability)
    console.log(criteriaWeek)

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
        if (criteriaWeek.size > 0 && !criteriaWeek.has(gymClass.dayOfWeek)) {
            add = false;
        }
        if (add) {
            filteredClasses.push(gymClass);
        }
    }
    console.log('filtered,', filteredClasses)


    makeTableDesktop(filteredClasses, criteriaSession);

    //jump to the results
    window.location.href = "#search";
})

//run at first load
makeTableDesktop(originalClasses, new Set());

function makeTableDesktop(classes, criteriaSession) {
    console.log('criteriasession and criteriasession size', criteriaSession, criteriaSession.size);
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
                    break;
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

                a.href = row.link;
                a.target = "_blank";
                a.ariaLabel = "Register for class"
                a.classList.add('blackLink')

                if (row.opening > 0) {
                    a.innerText = "Register"
                    a.classList.add("blackLink");
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
                span.innerText = "Registration not open"
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