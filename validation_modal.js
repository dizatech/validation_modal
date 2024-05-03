import Swal from "sweetalert2"

export class ValidationModal{
    showLoading(){
        Swal.fire({
            title: 'در حال اجرای درخواست ...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })
    }

    hideLoading(){
        Swal.close()
    }

    showSingleError(error, args){
        let confirm_text = args && args.hasOwnProperty('confirm_text') ? args.confirm_text : 'متوجه شدم';
        const options = {
            icon: 'error',
            title: 'خطا در اجرای درخواست!',
            html: error,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            showConfirmButton: true,
            confirmButtonText: confirm_text
        };
        if( Swal.isVisible() ){
            Swal.hideLoading()
            return new Promise((resolve) => {
                Swal.fire(options).then(() => {
                    resolve()
                })
            })
        }
        else{
            return new Promise((resolve) => {
                Swal.fire(options).then(() => {
                    resolve()
                })
            })
        }
    }

    showLoginError(){
        const options = {
            icon: 'info',
            title: 'ورود به حساب کاربری',
            html: 'برای ادامه باید ثبت نام کرده و یا وارد حساب کاربری خود شوید.',
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            showConfirmButton: true,
            confirmButtonText: 'ثبت نام / ورود'
        };
        if( Swal.isVisible() ){
            Swal.hideLoading()
            return new Promise((resolve) => {
                Swal.fire(options).then((result) => {
                    resolve(result)
                })
            })
        }
        else{
            return new Promise((resolve) => {
                Swal.fire(options).then((result) => {
                    resolve(result)
                })
            })
        }
    }

    showErrorModal(response, title){
        let errors = response.responseJSON.errors
        let errors_html = ''
        for( let k in errors ){
            if( errors.hasOwnProperty(k) ){
                errors_html += '<p>' + errors[k] + '</p>'
            }
        }
        if( typeof title == 'undefined' ){
            title = 'خطا در اجرای درخواست!';
        }
        const options = {
            icon: 'error',
            title: title,
            html: errors_html,
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            showConfirmButton: true,
            confirmButtonText: 'تایید'
        };
        if( Swal.isVisible() ){
            Swal.hideLoading()
            Swal.update(options)
        }
        else{
            Swal.fire(options)
        }
    }

    showErrors(response){
        $('.is-invalid').removeClass('is-invalid')
        $('.invalid-feedback').text('').hide()
        $('.tox-tinymce').removeClass('is-invalid')
        let errors = response.responseJSON.errors
        for (let k in errors) {
            if (errors.hasOwnProperty(k)) {
                const target = $(`[name=${k}]`)
                target.addClass('is-invalid')
                target.closest('.form-group').find('.tox-tinymce').addClass('is-invalid')
                target.closest('.form-group').find('.invalid-feedback').text(errors[k]).show()
            }
        }

        const options = {
            icon: 'error',
            title: 'خطا در اجرای درخواست!',
            html: 'لطفا خطاهای نمایش داده شده در فرم را رفع کرده و مجددا تلاش کنید.',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            showConfirmButton: true,
            confirmButtonText: 'تایید'
        };
        if( Swal.isVisible() ){
            Swal.hideLoading()
            Swal.update(options)
        }
        else{
            Swal.fire(options)
        }
    }

    showSuccess(title, message){
        const options = {
            icon: 'success',
            title: title,
            html: message,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            showConfirmButton: 'تایید'
        };
        if( Swal.isVisible() ){
            Swal.hideLoading()
            Swal.update(options)
        }
        else{
            Swal.fire(options)
        }
    }

    showSuccessToast(message){
        Swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            position: 'top-start'
        })
    }

    confirm(title, confirm_text, deny_text, options){
        let swal_options = {
            icon: 'warning',
            title: title,
            showDenyButton: true,
            confirmButtonText: confirm_text,
            denyButtonText: deny_text
        }
        if( options ){
            if( options.text ){
                swal_options.text = options.text
            }
        }
        return new Promise((resolve) => {
            Swal.fire(swal_options).then((result) => {
                if( result.isConfirmed ){
                    resolve()
                }
            })
        })
    }
}
