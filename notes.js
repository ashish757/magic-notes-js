console.log("connected");
index = 0;
let funcHeader = document.querySelector("#nh");
let funcHeaderChild = document.querySelector("#nh").children;

function createNote(val, index, atFirst) {
    // main note div
    let noteDiv = document.createElement('div');
    noteDiv.className = 'noteBox';
    noteDiv.setAttribute('index', index);
    // note child h3
    let noteH3 = document.createElement('h3');
    noteH3.innerText = val.title;
    // note child p
    let noteP = document.createElement('p');
    noteP.className = "content";
    noteP.innerHTML = val.text;
    // note child btn
    let noteButton = document.createElement('button');
    noteButton.className = "btn btn-primary doneButton";
    noteButton.setAttribute("onclick", "deleteBox(event)");
    noteButton.innerText = 'Done & Delete';
    // appending
    noteDiv.appendChild(noteH3);
    noteDiv.appendChild(noteP);
    noteDiv.appendChild(noteButton);

    if (atFirst) {
        let insertParent = document.querySelector('#noteContainer').firstElementChild;
        if (insertParent == null) {
            document.querySelector('#noteContainer').appendChild(noteDiv);
        } else {
            document.querySelector('#noteContainer').insertBefore(noteDiv, insertParent);
        }
    } else {
        document.querySelector('#noteContainer').appendChild(noteDiv);
    }
}

let notes = [];
ln = JSON.parse(localStorage.getItem('notes'));
if (ln == null || ln.length == 0) {
    funcHeader.style.display = 'none';
    document.querySelector("#noNotes").innerHTML = "Nothing to Show, Add note above";
} else {
    ln.forEach(element => {
        // do unshift if want oldest note first
        index += 1;
        notes.push(element);
        createNote(element, index, true);
    });
    document.querySelector("#noNotes").innerHTML = null;

}



document.getElementById('addNoteButton').addEventListener('click', (e) => {
    e.preventDefault();
    var noteVal = document.getElementById('note').value;
    var titleVal = document.getElementById('title').value;

    // do unshift if want oldest note first
    let noteObject = {
        title: titleVal,
        text: noteVal
    };
    notes.push(noteObject);
    localStorage.setItem("notes", JSON.stringify(notes));
    index += 1;
    createNote(noteObject, index, true);
    document.getElementById('note').value = null;
    document.getElementById('title').value = null;
    document.querySelector("#noNotes").innerHTML = null;
    funcHeader.setAttribute('style', 'display:relative;max-width:100%;');

});

function search() {
    let val = document.getElementById('searchInput').value;
    let bx = document.querySelectorAll('.noteBox');

    Array.from(bx).forEach(element => {
        let content = element.querySelector('.content');
        let title = element.querySelector('h3');

        if (val != "") {

            if (content.innerText.indexOf(val) > -1 || title.innerText.indexOf(val) > -1) {
                content.parentElement.style.display = "initial";
            } else {
                content.parentElement.style.display = "none";
            }
        } else {
            content.parentElement.style.display = "initial";
        }
    });
};



function deleteBox(e) {
    let box = e.target;
    document.getElementById('noteContainer').removeChild(box.parentElement);
    let trialIndex = box.parentElement.getAttribute('index');
    ln = JSON.parse(localStorage.getItem("notes"));
    ln.splice((trialIndex - 1), 1);
    localStorage.setItem("notes", JSON.stringify(ln));
    if (ln == null || ln.length == 0) {
        funcHeader.style.display = 'none';
        document.querySelector("#noNotes").innerHTML = "Nothing to Show, Add note above";
    }
};

let o = document.getElementById('o');
let n = document.getElementById('n');
o.addEventListener('click', () => {
    o.className += " active";
    n.className = "sort";
});
n.addEventListener('click', () => {
    n.className += " active";
    o.className = "sort";
});