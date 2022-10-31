const storageData = {
    addNote: async function (value) {
        let data = localStorage.getItem('Notes')?JSON.parse(localStorage.getItem('Notes')):[];
        data.unshift(value);
        await null;
        return localStorage.setItem('Notes', JSON.stringify(data));

    },
    getNotes: async function () {
        await null;
        return JSON.parse(localStorage.getItem('Notes'));
    },
    deleteNote: async function (note) {
        await null;
        let data = localStorage.getItem('Notes')?JSON.parse(localStorage.getItem('Notes')):[];

        var index = data.findIndex(function(n){
            return n.date === note.date;
       })
       if (index !== -1) data.splice(index, 1);
        return localStorage.setItem('Notes', JSON.stringify(data));
    },

    deleteAll:async function(){
        await null;
        return localStorage.setItem('Notes', JSON.stringify([]));
    },


    importNotes:async function(data){
        await null;
        return localStorage.setItem('Notes', JSON.stringify(data));
    }
}

selectedColor = 'white';



//Draw app header
function drawAppHeader(appName){
    let body= document.body;
    let appHeader = document.createElement('header');
    appHeader.classList.add('app-header');

    //App name
    appHeader.innerHTML = `<div class="app-logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16">
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
        </svg>
        <h2>${appName}</h2>
    </div>`;

    //Search bar
    let searchBar = document.createElement('div');
    searchBar.classList.add('search-bar');
    let searchField = document.createElement('input');
    searchField.setAttribute('placeholder', 'Search notes');
    let searchTriger= document.createElement('button');
    searchTriger.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
    </svg>`;
    searchTriger.addEventListener('click', ()=>{
         searchField.focus();
    });

    searchField.addEventListener('input', ()=>{
        searchNote(searchField)
    })

    searchBar.appendChild(searchTriger);
    searchBar.appendChild(searchField);

    //Notes options
    let options = document.createElement('div');
    options.classList.add('notes-options');
    let btnDelete = document.createElement('button');
    btnDelete.classList.add('btn-delete');
    btnDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>`;
    let btnExport = document.createElement('button');
    btnExport.classList.add('btn-download');
    btnExport.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
    </svg>`;

    options.appendChild(btnDelete);
    options.appendChild(btnExport);

    btnDelete.addEventListener('click', ()=>{
        if(confirm('Are you sure to delete all notes!')){
            storageData.deleteAll()
            .then(res=>{
                console.log('All notes was deleted');
                document.getElementsByClassName('notes')[0].remove();
                drawNotes();
            })
        }
    })

    btnExport.addEventListener('click', ()=>{
        this.exportJson();
    })

    appHeader.appendChild(searchBar);
    
    appHeader.appendChild(options);
    body.prepend(appHeader);
}

//Draw notes
function drawNotes(){
    let body  = document.body;
    let notes = document.createElement('div');
    notes.setAttribute('id', 'notesWrapper');
    notes.classList.add('notes');
    storageData.getNotes()
    .then(res=>{
        if(res==null){
            notes.innerHTML = '<h2>No have Notes';
            document.getElementsByClassName('notes-options')[0].style.display = 'none';
        }
        else if(!res.length){
            notes.innerHTML = '<h2>No have Notes';
            document.getElementsByClassName('notes-options')[0].style.display = 'none';
        }
        else{
            notes.innerHTML = '';
            document.getElementsByClassName('notes-options')[0].style.display = 'flex';
            res.forEach(el=>{
                let note  = document.createElement('article');
                note.classList.add('note');
                note.style.backgroundColor = el.color;
                
              
                let noteTitle = document.createElement('h1');
                noteTitle.innerHTML = el.title;
   
                let noteText = document.createElement('p');
                noteText.innerHTML = el.text;


                let noteFooter = document.createElement('footer');
                noteFooter.classList.add('note-footer');
                df = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}]
                noteFooter.innerHTML = '<time>'+dateFormat(new Date(el.date),df,'-')+'</time>';

                let deleteNote = document.createElement('button');
                deleteNote.innerHTML = '<i class="lni lni-trash-can"></i>';

                deleteNote.addEventListener('click', ()=>{
                    storageData.deleteNote(el)
                    .then(res=>{
                        console.log('The note has been deleted.');
                        notes.remove();
                        drawNotes();
                    })
                })

                let editNote = document.createElement('button');
                editNote.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>`;

                editNote.addEventListener('click', ()=>{
                    //storageData.deleteNote(el)
                    // .then(res=>{
                    //     console.log('The note has been deleted.');
                    //     notes.remove();
                    //     drawNotes();
                    // })
                    let noteTi = document.createElement('input');
                    noteTi.value = el.title;
                    noteTitle.innerHTML = '';
                    noteTitle.appendChild(noteTi);

                    let noteTe = document.createElement('textarea');
                    noteTe.value = el.text;
                    noteTe.setAttribute('placeholder', 'Type note and press enter');
                    noteText.innerHTML = '';
                    noteText.appendChild(noteTe);
                    noteTe.focus();
                    noteTe.addEventListener('keyup', ()=>{
                        if (event.keyCode === 13) {
                            if(noteTe.value.length>800)  {
                                alert('The note entered is too long.')
                            }
                            //storageData.updateNote(el);
                            else{
                                let data = localStorage.getItem('Notes')?JSON.parse(localStorage.getItem('Notes')):[]; 
                                var index = data.findIndex(function(n){
                                    return n.date === el.date;
                                })

                                let note = { title:noteTi.value, text:noteTe.value, date:new Date(), color:el.color }
                                data[index] = note;
                                localStorage.setItem('Notes', JSON.stringify(data));
                                document.getElementsByClassName('notes')[0].remove();
                                drawNotes();
                            }
                        }
                            
                    }, false);
                });

                note.appendChild(noteTitle);
                note.appendChild(noteText);

                noteFooter.appendChild(deleteNote);
                noteFooter.appendChild(editNote);
                note.appendChild(noteFooter);
                notes.appendChild(note);
            })
        }
    })
    body.prepend(notes);
}

//Draw app aside
function drawAppAside(notesColors){
    let body  = document.body;
    let appAside = document.createElement('aside');
    appAside.classList.add('app-aside');
    let colorsContainer = document.createElement('div');
    colorsContainer.classList.add('colors');
    notesColors.forEach(color => {
        let btn  = document.createElement('button');
        btn.style.backgroundColor = color;
        btn.addEventListener('click', ()=>{
            selectedColor = color;
            let selected = document.getElementsByClassName("selected-color");
            for (i = 0; i < selected.length; i++) {
                selected[i].classList.remove('selected-color');
            }
            btn.classList.add('selected-color');
            drawAddApp();
        })
        colorsContainer.appendChild(btn);
    });

    let fileInput  = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept',"application/JSON");

    let importBtn = document.createElement('buttton');
    importBtn.classList.add('btn-import');
    importBtn.innerHTML = '<i class="lni lni-download"></i>';
    importBtn.addEventListener('click', ()=>{
        importJson(fileInput);
    })

    appAside.appendChild(colorsContainer);
    appAside.appendChild(importBtn);
    body.prepend(appAside);
}

//Draw add app
function drawAddApp(){
    if(document.getElementsByClassName('add-note')[0]) document.getElementsByClassName('add-note')[0].remove();
    let notes = document.getElementsByClassName('notes');
    let addNote = document.createElement('article');
    addNote.classList.add('add-note');
    addNote.style.backgroundColor = selectedColor;

    let header  = document.createElement('header');
    let noteTitle = document.createElement('input');
    noteTitle.setAttribute('placeholder', 'Add note title');
    noteTitle.classList.add('note-title');
    header.appendChild(noteTitle);

    setTimeout(()=>{
        noteTitle.focus()
    }, 600);


    let cancelBtn = document.createElement('button');
    cancelBtn.innerHTML = '<i class="lni lni-close"></i>';
    cancelBtn.addEventListener('click', ()=>{
        addNote.remove();
    });

   
    

    let textarea = document.createElement('textarea');
    textarea.style.height = 'auto';
    textarea.setAttribute('placeholder', 'Add new note and press enter');

    noteTitle.addEventListener('keyup', ()=>{
        if (event.keyCode === 13) {
            if(noteTitle.value.length>20)  {
                alert('The note entered is too long.');
                return;
            }
            else textarea.focus();
        }
    })

    // setTimeout(()=>{
    //     textarea.focus()
    // }, 600);
    
    //Save note on press enter key
    textarea.addEventListener('keyup', ()=>{
        if (event.keyCode === 13) {
            if(textarea.value.length>800)  {
                alert('The note entered is too long.')
            }
            else{
                let data = localStorage.getItem('Notes')?JSON.parse(localStorage.getItem('Notes')):[];
                let note = { title:noteTitle.value, text:textarea.value, date:new Date(), color:selectedColor }
                data.unshift(note);
                localStorage.setItem('Notes', JSON.stringify(data));
                document.getElementsByClassName('notes')[0].remove();
                addNote.remove();
                drawNotes();
                
            }
        }
            
    }, false);

    //Autoresize  textarea
    textarea.addEventListener('input', ()=>{
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }, false)

    
    header.appendChild(cancelBtn);
    addNote.appendChild(header);
    addNote.appendChild(textarea);
    notes[0].prepend(addNote);
}



//Expprt Notes As JSON
function exportJson(){
    storageData.getNotes('Notes').then(res=>{
        if(res){
            let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(JSON.stringify(res));
            df  = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}]
            let exportFileDefaultName = 'notes-'+dateFormat(new Date(),df, '-' )+'.json';
            let linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        }
    })   
}

function importJson(fileInput){
    fileInput.click();
    fileInput.addEventListener('change', function(event){
        let f  = new FileReader();
        f.onload = (ev)=>{
            let data = JSON.parse(ev.target.result);
            if(data.length && data[0].color && data[0].date) {
                storageData.importNotes(data)
                .then(res=>{
                    document.getElementsByClassName('notes')[0].remove();
                       drawNotes()
                })
            }
            else{
                    alert('Your file is corupt or is not valid notes file.')
            }
        }
        f.readAsText(event.target.files[0])
    });   
}



function NotesApp(appName, notesColors){
    drawAppHeader(appName);
    drawAppAside(notesColors);
    drawNotes();

}




 //Date Format
 function dateFormat(t, a, s){
    function format(m) {
        let f = new Intl.DateTimeFormat('en', m);
        return f.format(t);
    }
    return a.map(format).join(s);
}


/** Search Filter */
function searchNote(search){
    var note = document.getElementsByClassName('note');
    filter = search.value.toUpperCase();
    console.log(note)

    for (i = 0; i < note.length; i++) {
        a = note[i].getElementsByTagName("p")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            note[i].style.display = "";
        } else {
            note[i].style.display = "none";
        }
    }
}






    
