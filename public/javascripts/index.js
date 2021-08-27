const cols = document.querySelectorAll('.col-item');
cols.forEach(col => {
    col.addEventListener('click', function(e){
        this.classList.toggle('isDone');
    })
})

const inputSubTodos = document.querySelectorAll('.subTodoBody');

const editBtns = document.querySelectorAll('.edit_icon');
editBtns.forEach((editBtn, index) => {
    editBtn.addEventListener('click', e => {
        console.log('editBtn event Listener')
         const isDisabled = inputSubTodos[index].hasAttribute('disabled');
         console.log(isDisabled); 
         if(isDisabled){
            console.log('1');
             inputSubTodos[index].disabled = false;
            inputSubTodos[index].addEventListener('keydown', e => {
                if(e.keyCode === 13){
                    document.querySelector('.form').submit();
                }
            })
         }else{
             inputSubTodos[index].disabled = true;
         }
     })
})
