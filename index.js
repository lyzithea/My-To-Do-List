

// Erstellt neue Listeneinträge aus Eingaben oder gespeicherten Daten
function addTask(savedText, savedChecked = false) {




    // Verwendet den gespeicherten Aufgabentext oder die neue Eingabe
    const setTask = savedText || document.getElementById("task-Input").value;




     //Alert wenn ohne Eintrag auf den Button geklickt wird
    if (setTask === "") {
    alert("Please enter a task. ");
    return;
    }




     // Neuen Listeneintrag erstellen
    const newTask = document.createElement("li");



    


     // Span für den Aufgabentext erstellen
    const taskText = document.createElement("span");
    taskText.textContent = setTask;





     // Checkbox erstellen
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");




    // Setzt den Checkbox-Zustand auf den übergebenen Wert
    checkbox.checked = savedChecked;





    // Streicht den Text durch, wenn die Checkbox bereits angehakt ist
    if (checkbox.checked) {
    taskText.style.textDecoration = "line-through";
    }





    //Funktion für Text durchstreichen wenn auf Checkbox geklickt wird
    checkbox.addEventListener("change", function() {
    if (checkbox.checked) {
        taskText.style.textDecoration = "line-through";
    } else {
        taskText.style.textDecoration = "none";
    }
        saveTasks();
     });

    


     



    //deleteButton erstellen
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-Button");
    deleteButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg"
                height="25px"
                 viewBox="0 -960 960 960"
                width="25px"
                fill="currentColor">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
                `;

    



                


    // Funktion für den Delete-Button
    deleteButton.addEventListener("click", function() {
    newTask.classList.add("removing");

    newTask.addEventListener("animationend", function() {
        newTask.remove();
        saveTasks();
    }, 
    { once: true }
    );
    });
  




    // Checkbox und deleteButton hinter dem Text einfügen
    newTask.appendChild(checkbox);
    newTask.appendChild(taskText);
    newTask.appendChild(deleteButton);




    //Das li Element in die Liste einfügen
    document.getElementById("entry-List").appendChild(newTask);






    // Speichert neue Aufgaben und leert anschließend das Eingabefeld
        if (savedText === undefined) {
        saveTasks();
        document.getElementById("task-Input").value = "";
        }







 	// Liest alle Aufgaben aus und speichert sie im localStorage
    function saveTasks() {

    const tasks = document.querySelectorAll("#entry-List li");
    let taskArray = [];


    tasks.forEach(function(task) {
        const taskText = task.querySelector("span").textContent;
        const checkbox = task.querySelector(".checkbox");
        const isChecked = checkbox.checked;

        

        const taskData = {
            text: taskText,
            checked: isChecked
        };

        taskArray.push(taskData);
    });

        const jsonString = JSON.stringify(taskArray);
        localStorage.setItem("tasks", jsonString);
        }
     }






    //Gespeicherte Werte aus dem localStorage holen und laden
    function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        const taskArray = JSON.parse(savedTasks);

        taskArray.forEach(function(task) {
            addTask(task.text, task.checked);
        });
    }
}









    // Event-Listener für den Add-Button
    document.getElementById("add-Button").addEventListener("click", function() {
    addTask();
    });








    // Event-Listener für die Enter-Taste
    document.getElementById("task-Input").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });






    //Funktion für Farbe auswählen und speichern
    const themeButtons = document.querySelectorAll(".theme-button");

    themeButtons.forEach(function(button) {
       button.addEventListener("click", function() {
        if(button.id === "purple-theme") {
            document.documentElement.style.setProperty("--main-color", "#e9dcff" );
            document.documentElement.style.setProperty("--button-color", "#bfaeda" );
            document.documentElement.style.setProperty("--delete-color", "#bfaeda" );
        }

        else if(button.id === "blue-theme") {
            document.documentElement.style.setProperty("--main-color", "#abd1ee" );
            document.documentElement.style.setProperty("--button-color", "#73a2c7" );
            document.documentElement.style.setProperty("--delete-color", "#73a2c7" );
        }

         else if(button.id === "green-theme") {
             document.documentElement.style.setProperty("--main-color", "#bbfacb" );
             document.documentElement.style.setProperty("--button-color", "#5baa7c" );
             document.documentElement.style.setProperty("--delete-color", "#5baa7c");
        }

            localStorage.setItem("selectedTheme", button.id);
            

       });
    });
    




        //Ausgewählte Farbe wird beim Neustart der Seite geladen
        const savedTheme = localStorage.getItem("selectedTheme");

        if (savedTheme === "purple-theme") {
            document.documentElement.style.setProperty("--main-color", "#e9dcff" );
            document.documentElement.style.setProperty("--button-color", "#bfaeda" );
            document.documentElement.style.setProperty("--delete-color", "#bfaeda" );
        }

        else if (savedTheme === "blue-theme") {
            document.documentElement.style.setProperty("--main-color", "#abd1ee" );
            document.documentElement.style.setProperty("--button-color", "#73a2c7" );
            document.documentElement.style.setProperty("--delete-color", "#73a2c7" );
        }

        else if (savedTheme === "green-theme") {
            document.documentElement.style.setProperty("--main-color", "#bbfacb" );
            document.documentElement.style.setProperty("--button-color", "#5baa7c" );
            document.documentElement.style.setProperty("--delete-color", "#5baa7c");
        }


        



    // Lädt gespeicherte Aufgaben und stellt sie als Listeneinträge wieder her
    loadTasks();
    

   

  







