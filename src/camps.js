
console.log('got classes!', originalClasses)
console.log('got classes!', classNames)
// console.log('got sessionNames!', sessionNames)
let filteredClasses = []


// document.querySelector(".accordion").addEventListener("click", function () {
//     /* Toggle between adding and removing the "active" class,
//     to highlight the button that controls the panel */
//     this.classList.toggle("active");

//     /* Toggle between hiding and showing the active panel */
//     let panel = this.nextElementSibling;
//     if (panel.style.display === "block") {
//         panel.style.display = "none";
//         document.querySelector(".searchIcon").innerHTML = '<i class="fa-solid fa-chevron-down"></i>'
//         document.querySelector("#searchSign").innerHTML = '<i class="fa-solid fa-plus"></i> '
//     } else {
//         panel.style.display = "block";
//         document.querySelector(".searchIcon").innerHTML = '<i class="fa-solid fa-chevron-up"></i>'
//         document.querySelector("#searchSign").innerHTML = '<i class="fa-solid fa-minus"></i> '
//     }
// });


//put an event listener on all type checkboxes
document.querySelectorAll('[data-type="type"]').forEach(c => {
    c.addEventListener("click", (e) => {
        //if age is selected then only enable those that have classes
        //disable all first

        let criteriaType = new Set()
        let criteriaCurrentClass = new Set()
        let criteriaClass = new Set()
        let criteriaCurrentTime = new Set()

        //find out what criteria from age is checked, and saved the ones that are checked before from class and level
        const criteria = document.querySelectorAll(':checked')

        Array.from(criteria).forEach(c => {
            if (c.dataset.type == "type") {
                criteriaType.add(c.value)
            } else if (c.dataset.type == "class") {
                criteriaCurrentClass.add(c.value)

            } else if (c.dataset.type == "time") {

                criteriaCurrentTime.add(c.value)
            }
        })
        console.log('time criteria is', criteriaCurrentTime)

        //uncheck all time checkboxes
        document.querySelectorAll('[data-type="time"]').forEach(c => {
            c.disabled = true;
        })
        document.querySelectorAll('[data-type="time"]').forEach(c => {

            let next = c.nextElementSibling;
            next.classList.add('checkbox-disabled');
        })
        document.querySelectorAll('[data-type="time"]').forEach(c => {
            c.checked = false;
        })
        //enable all classes that have the selected type, and keep the checked class and time if they are in the selected type
        //for each class in originalClasses, if it has the same type as the checkboxes, enable it
        originalClasses.forEach(c => {
            if (criteriaType.has(c.type)) {

                if (criteriaCurrentClass.has(c.className)) {
                    document.querySelector(`[data-type="class"][value="${c.className}"]`).checked = true;
                }
                criteriaClass.add(c.className)
                document.querySelector(`[data-type="class"][value="${c.className}"]`).disabled = false;
                document.querySelector(`[data-type="class"][value="${c.className}"]`).nextElementSibling.classList.remove('checkbox-disabled');

                if (c.type == 'Extended Care') {
                    //reset all types and redo
                    document.querySelectorAll('[data-type="time"]').forEach(l => {

                        l.disabled = false;
                    })
                    document.querySelectorAll('[data-type="time"]').forEach(l => {

                        let next = l.nextElementSibling;
                        next.classList.remove('checkbox-disabled');
                    })

                    // document.querySelectorAll('[data-type="time"]').forEach(c => {
                    //     c.checked = false;
                    // })

                }
                //are any of them checked from before?

                if (criteriaType.has(c.type) && criteriaCurrentTime.has(c.time) && c.type == "Extended Care") {

                    console.log('this is the time', c.time)
                    document.querySelector(`[data-type="time"][value="${c.time}"]`).checked = true;
                    // document.querySelector(`[data-type="time"][value="Morning"]`).checked = true;
                    console.log('checking time', document.querySelector(`[data-type="time"][value="${c.time}"]`).checked)
                }
            }
        })
    })
})

//put an event listener on all time checkboxes
// document.querySelectorAll('[data-type="time"]').forEach(c => {
//     c.addEventListener("click", (e) => {
//         console.log('e is', e.target)
//         e.target.disabled = false;
//         e.target.classList.remove('checkbox-disabled');


//     })
//     // c.nextElementSibling.addEventListener("click", (e) => {
//     //     console.log('e onbutton is', e.target)
//     //     e.target.disabled = false;
//     //     e.target.classList.remove('checkbox-disabled');


//     // })
// })


//put an event listener on all class checkboxes
document.querySelectorAll('[data-type="class"]').forEach(c => {
    c.addEventListener("click", (e) => {
        //if class is selected then only enable those that have the types

        let criteriaClass = new Set()
        let criteriaCurrentType = new Set()
        let criteriaType = new Set()
        let criteriaCurrentTime = new Set()
        //find out what criteria from class is checked, and saved the ones that are checked before from class and type
        const criteria = document.querySelectorAll(':checked')

        //reset all classes and redo
        document.querySelectorAll('[data-type="time"]').forEach(l => {
            console.log('resetting time')
            l.disabled = true;
        })
        document.querySelectorAll('[data-type="time"]').forEach(l => {
            console.log('making checkbox enalbed')
            let next = l.nextElementSibling;
            next.classList.add('checkbox-disabled');
        })
        document.querySelectorAll('[data-type="time"]').forEach(c => {
            c.checked = false;
        })

        Array.from(criteria).forEach(c => {

            if (c.dataset.type == "class") {
                criteriaClass.add(c.value)
                //check this class
                // console.log(document.querySelector(`${c.id}`))
                // document.querySelector(`#${c.id}`).disabled = false;
                // document.querySelector(`#${c.id}`).nextElementSibling.classList.add('checkbox-disabled');
                // document.querySelector(`#${c.id}`).checked = false;
            } else if (c.dataset.type == "type") {
                criteriaCurrentType.add(c.value)
            }
            else if (c.dataset.type == "time") {
                criteriaCurrentTime.add(c.value)
            }

        })
        console.log('we have this in criteira clas', criteriaClass)
        //reset all types and redo
        document.querySelectorAll('[data-type="type"]').forEach(l => {

            l.disabled = true;
        })
        document.querySelectorAll('[data-type="type"]').forEach(l => {

            let next = l.nextElementSibling;
            next.classList.add('checkbox-disabled');
        })
        document.querySelectorAll('[data-type="type"]').forEach(c => {
            c.checked = false;
        })


        //enable all types that have the selected class, and keep the checked type if they are in the selected class
        //for each class in originalClasses, if it has the same  as the checkboxes, enable it
        originalClasses.forEach(c => {

            if (criteriaClass.has(c.className)) {

                if (criteriaCurrentType.has(c.type)) {

                    document.querySelector(`[data-type="type"][value="${c.type}"]`).checked = true;
                    //if it is "Extended Care", enable time

                    if (criteriaCurrentType.has("Extended Care")) {
                        //enable time
                        document.querySelectorAll('[data-type="time"]').forEach(l => {

                            l.disabled = false;
                        })
                        document.querySelectorAll('[data-type="time"]').forEach(l => {

                            let next = l.nextElementSibling;
                            next.classList.remove('checkbox-disabled');
                        })
                        if (criteriaCurrentTime.has(c.time)) {
                            document.querySelector(`[data-type="time"][value="${c.time}"]`).checked = true;
                        }
                    }
                }
                //only add if there is a type not empty
                if (c.type != "") {
                    // criteriaType.add(c.type)

                    document.querySelector(`[data-type="type"][value="${c.type.trim()}"]`).disabled = false;
                    document.querySelector(`[data-type="type"][value="${c.type}"]`).nextElementSibling.classList.remove('checkbox-disabled');

                } else {
                    console.log('no type')
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
    // let criteriaSession = new Set()
    let criteriaType = new Set()
    let criteriaClass = new Set()
    let criteriaTime = new Set()
    let availability = false
    // let criteriaWeek = new Set()
    const criteria = document.querySelectorAll(':checked')
    //find out what kind of criteria it is
    Array.from(criteria).forEach(c => {
        // if (c.dataset.type == "session") {
        //     criteriaSession.add(c.value)
        // } else
        if (c.dataset.type == "type") {
            criteriaType.add(c.value)
        } else if (c.dataset.type == "class") {
            criteriaClass.add(c.value)
        } else if (c.dataset.type == "time") {
            criteriaTime.add(c.value)
        } else if (c.dataset.type == "available") {
            availability = true
        }
        // else if (c.dataset.type == "week") {
        //     criteriaWeek.add(c.value)
        // }
    })
    // console.log(criteriaSession)
    console.log(criteriaType)
    console.log(criteriaClass)
    console.log(criteriaTime)
    console.log(availability)
    // console.log(criteriaWeek)

    for (let gymClass of originalClasses) {
        let add = true;
        if (availability) {

            if (gymClass.opening <= 0) {

                add = false;
            }
        }
        // if (criteriaSession.size > 0 && !criteriaSession.has(gymClass.session)) {
        //     add = false;
        // }
        if (criteriaType.size > 0 && !criteriaType.has(gymClass.type) && gymClass.className != 'Adaptive Gymnastics') {
            add = false;
        }
        if (criteriaClass.size > 0 && !criteriaClass.has(gymClass.className)) {
            add = false;
        }
        if (criteriaTime.size > 0 && !criteriaTime.has(gymClass.time) && gymClass.className != 'Adaptive Gymnastics') {
            add = false;
        }
        // if (criteriaWeek.size > 0 && !criteriaWeek.has(gymClass.dayOfWeek)) {
        //     add = false;
        // }
        if (add) {
            filteredClasses.push(gymClass);
        }
    }
    console.log('filtered,', filteredClasses)


    makeTableDesktop(filteredClasses, criteriaClass);

    //jump to the results
    window.location.href = "#search";
})

//run at first load
makeTableDesktop(originalClasses, new Set());

function makeTableDesktop(classes, criteriaClass) {
    console.log(criteriaClass, criteriaClass.size);
    //remove original table first
    document.querySelector("#results").innerHTML = ""

    //use original or filtered classes to make classes table for desktop
    //for each section, make a table
    const container = document.querySelector("#results")

    for (let c of classNames) {
        //if the user filtered by class, only show those classes
        if ((criteriaClass.size > 0 && criteriaClass.has(c)) ||
            criteriaClass.size == 0) {

            makeClassSection(c, container);

            //check if there are any types in this class
            let typesInClass = false;

            for (let row of classes) {
                if (row.className == c) {
                    typesInClass = true;
                    break;
                }
            }
            if (!typesInClass) {
                const p = document.createElement("p");
                p.innerText = "No programs available"
                container.appendChild(p)
            } else {
                const table = document.createElement("table");
                createTableHead(table, container);
                createTableBody(c, table, container, classes);


            }
        }

    }
}

function makeClassSection(c, container) {

    const h3 = document.createElement("h3")
    h3.classList.add('margin-top-large')
    const h3text = document.createTextNode(c)
    h3.appendChild(h3text)
    container.appendChild(h3)
}

function createTableHead(table, container) {

    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.className = "register"
    // const td2 = document.createElement("td");
    // td2.className = "className"
    // td2.appendChild(document.createTextNode("Program"))
    const td3 = document.createElement("td");
    td3.className = "class"
    td3.appendChild(document.createTextNode("Type"))
    const td4 = document.createElement("td");
    td4.className = "dates"
    td4.appendChild(document.createTextNode("Day"))
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
    // tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    thead.appendChild(tr)
    table.appendChild(thead);
    container.appendChild(table);
}

function createTableBody(c, table, container, classes) {

    const tbody = document.createElement("tbody");

    for (let row of classes) {

        //only include info from this session
        if (row.className == c) {
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
                a.target = "_blank"

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
                span.innerText = "Registration not open"
            }
            div.appendChild(span)
            div.appendChild(span2)
            td1.appendChild(div)
            tr.appendChild(td1)

            //name column
            // const td2 = document.createElement("td");
            // td2.className = "className";

            // const div2 = document.createElement("div");
            // div2.classList.add("flex");
            // div2.classList.add("flex-col");

            // const span3 = document.createElement("span");
            // span3.innerText = row.className;

            // // const span4 = document.createElement("span");
            // // span4.classList.add("tab");
            // // span4.innerText = row.time;

            // div2.appendChild(span3);
            // // div2.appendChild(span4);

            // td2.appendChild(div2);
            // tr.appendChild(td2)

            //type column

            const td3 = document.createElement("td");
            td3.classList.add("type");

            // if (row.minAge_yrs != "" && row.minAge_yrs != false) {
            //     td3.innerText = row.minAge_yrs;
            //     if (row.minAge_mths != "" || row.minAge_mths != false) {
            //         td3.innerText += "yr ";
            //     }
            // }

            // if (row.minAge_mths !== "" && row.minAge_mths !== false) {
            //     td3.innerText += row.minAge_mths + "mths ";
            // }

            // if (row.maxAge_yrs == "") {
            //     td3.innerText += "+ ";
            // } else {
            //     td3.innerText += " - ";
            //     if (row.maxAge_yrs != "" && row.maxAge_yrs != false) {
            //         td3.innerText += row.maxAge_yrs;
            //         if (row.minAge_mths != "" && row.minAge_mths != false) {
            //             td3.innerText += "yr ";
            //         }
            //     }
            //     if (row.maxAge_mths != "11" && row.maxAge_mths != false) {

            //         td3.innerText += row.maxAge_mths + "mths ";
            //     }
            // }

            td3.innerText = row.type
            tr.appendChild(td3)

            //make dates column

            const td4 = document.createElement("td");
            td4.classList.add("dates");

            const div3 = document.createElement("div");
            div3.classList.add("flex");
            div3.classList.add("flex-col");

            const span5 = document.createElement("span");
            span5.innerText = row.dayOfWeek;

            // const span6 = document.createElement("span");
            // span6.classList.add("tab");
            // span6.innerText = `${row.startDate} to`;

            const span7 = document.createElement("span");
            span7.classList.add("tab");
            span7.innerText = row.endDate;

            div3.appendChild(span5);
            // div3.appendChild(span6);
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
            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        container.appendChild(table);
    }



}
