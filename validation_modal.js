import Swal from "sweetalert2"
import en from "./translations/en.json"
import fa_IR from "./translations/fa_IR.json"
const TRANSLATIONS = { en, fa_IR }

export class ValidationModal{
    constructor(language = 'fa_IR') {
        this.language = language
        this.translations = TRANSLATIONS[this.language]
    }

    showLoading(){
        Swal.fire({
            title: this.translations.loading,
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
        let confirm_text = args && args.hasOwnProperty('confirm_text') ? args.confirm_text : this.translations.ok;
        const options = {
            icon: 'error',
            title: this.translations.error,
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
            title: this.translations.login,
            html: this.translations.login_check_error,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            showConfirmButton: true,
            confirmButtonText: this.translations.login_register
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

    showErrorModal(errors, title){
        let errors_html = ''
        for( let k in errors ){
            if( errors.hasOwnProperty(k) ){
                errors_html += '<p>' + errors[k] + '</p>'
            }
        }
        if( typeof title == 'undefined' ){
            title = this.translations.error;
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
            confirmButtonText: this.translations.confirm
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
            title: this.translations.error,
            html: this.translations.form_validation_error,
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            showConfirmButton: true,
            confirmButtonText: this.translations.confirm
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
            showConfirmButton: true,
            confirmButtonText: this.translations.confirm
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

    showToast(message, options){
        const icon = options && options.hasOwnProperty('icon') ? options.icon : 'info'
        const timer = options && options.hasOwnProperty('timer') ? options.timer : 3000
        const toastPosition = options && options.hasOwnProperty('toastPosition') ? options.toastPosition : 'top-start'
        const showConfirmButton = options && options.hasOwnProperty('showConfirmButton') ? options.showConfirmButton : false
        const showCloseButton = options && options.hasOwnProperty('showCloseButton') ? options.showCloseButton : false
        let customClass = {}
        if (options && options.hasOwnProperty('containerClass')) {
            customClass['container'] = options.containerClass
        }

        Swal.fire({
            icon: icon,
            title: message,
            showConfirmButton: showConfirmButton,
            showCloseButton: showCloseButton
            toast: true,
            timer: timer,
            timerProgressBar: true,
            position: toastPosition,
            customClass: customClass
        })
    }

    showSuccessToast(message, options){
        if (typeof(options) == 'undefined') {
            options = {}
        }
        options['containerClass'] = 'success'
        options['icon'] = 'success'

        this.showToast(message, options)
    }

    showErrorToast(message, options){
        if (typeof(options) == 'undefined') {
            options = {}
        }
        options['containerClass'] = 'error'
        options['icon'] = 'error'

        this.showToast(message, options)
    }

    showInfoToast(message, options){
        if (typeof(options) == 'undefined') {
            options = {}
        }
        options['containerClass'] = 'info'
        options['icon'] = 'info'

        this.showToast(message, options)
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

    handleAxiosError (error) {
        if (error.response) {
            if (error.response.status == 422) {
                vm.showErrorModal(error.response.data.errors)
            } else if (error.response.data && error.response.data.error_message) {
                vm.showSingleError(error.response.data.error_message)
            } else if (error.response.status >= 500 & error.response.status < 600) {
                vm.showSingleError(this.translations.general_error_retry)
            } else {
                vm.showSingleError(this.translations.general_error)
            }
        }
    }
}
