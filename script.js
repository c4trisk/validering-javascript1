
const form = document.querySelector('#validationForm')
const errorMessage = document.querySelector('#errorMessage')


const validateText = (id) => {
    
    const input = document.querySelector(id)
    const regEx = /^[a-zA-ZäöåÄÖÅ]+$/;

    if( input.value.trim() === '') {
        console.log(id + ': Fältet får inte lämnas tomt')
        return false
    } 

    if(input.value.length < 2) {
        console.log(id + ': Fältet måste innehålla minst 2 tecken')
        return false
    }

    if(!regEx.test(input.value)){
        console.log(id + ': Fältet får bara innehålla bokstäver')
        return false
    }

    return true
}


const validateEmail = (id) => {

    const input = document.querySelector(id)
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/

    if(!regEx.test(input.value)) {
        console.log(id + ': Fältet måste innehålla en giltig mailadress')
        return false
    }
    return true
}


const validatePassword = (id) => {
    const input = document.querySelector(id)
    
    if(input.value.length < 6) {
        console.log(id + ': Lösenordet måste vara minst 6 tecken')
        return false
    }
    
    return true
}


const validateRepeatPassword = (id) => {
    const input = document.querySelector(id)
    
    if(input.value.length < 6) {
        console.log(id + ': Lösenordet måste vara minst 6 tecken')
        return false
    }

    return true
}


const validateCheckbox = (id) => {

    const check = document.querySelector(id)

    if(!check.checked) {
        console.log(id + ': Du måste acceptera villkoren')
        return false
    }

    return true
}


form.addEventListener('submit', e => {
    e.preventDefault()

    const user = {}
    const errors = []
    
    for(let i = 0; i < form.length; i++) {
        const inputId = '#' + form[i].id;
        
        if(form[i].type === 'text') {
            errors[i] = validateText(inputId)
            user[form[i].id] = form[i].value
        } 
        else if(form[i].type === 'email') {
            errors[i] = validateEmail(inputId)
            user[form[i].id] = form[i].value
        }
        else if(form[i].type === 'password'){

            if(form[i].id === 'password'){
                errors[i] = validatePassword(inputId)
                user[form[i].id] = form[i].value

            } else {
                errors[i] = validateRepeatPassword(inputId)
                if(form[i-1].value !== form[i].value) {
                    console.log(form[i].id + ': Lösenorden matchar inte varandra')
                    errorMessage.classList.remove('d-none')
                    return false
                }
            }
        }
        else if(form[i].type === 'checkbox') {
            errors[i] = validateCheckbox(inputId)
        }
    }


    if(errors.includes(false)) {
        errorMessage.classList.remove('d-none')
    } else {
        errorMessage.classList.add('d-none')
        console.log('SUCCESS') 
        console.log(user)
    }

})