const addbtn =document.querySelector("#btn");
const main =document.querySelector("#main");

const saveNotes=()=>{
    const notes=document.querySelectorAll(".note textarea");
    const data=[];
    console.log(notes);
    notes.forEach(
        (note) =>{
            data.push(note.value);
        }
    )
    // console.log(data);
    if(data.lenght == 0){
        localStorage.removeItem("notes")
    }else{
        localStorage.setItem("notes",JSON.stringify(data));
    }
}

addbtn.addEventListener(
    "click",
    function(){
        addNote()
    }
)



function addNote(text ="") {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
            <div class="tools">
                <i class=" save fas fa-save"></i>
                <i class=" trast fas fa-trash"></i>
            </div>
            <textarea>${text}</textarea>
    `;

    note.querySelector(".trast").addEventListener(
        "click",
        function () {
            note.remove();
            saveNotes();
        }
    );

    note.querySelector(".save").addEventListener(
        "click",
        function () {
            saveNotes();
        }
    );

    note.querySelector("textarea").addEventListener(
        "focusout",
        function() {
            saveNotes();
        }
    )

    main.appendChild(note);
    saveNotes();
}

(
    function(){
        const lsnotes=JSON.parse(localStorage.getItem("notes"));
        if (lsnotes == null){
            addNote();
        }
        else{
            lsnotes.forEach(
                (lsnotes)=>{
                    addNote(lsnotes);
                }
            )
        }
        
    }
)()