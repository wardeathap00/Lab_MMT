$(document).ready(function(){
    $('#upload-input').on('click', function(){
        $('#upload-input').click();
    })
//kiểm tra thây đổi của trường , nếu không trống, thì thông qua ajax send data lên server qua /uploadFile
    $('#upload-input').on('change', function(){
        var uploadInput = $('#upload-input');

        if (uploadInput.val() != ''){
            var formData = new FormData();

            formData.append('upload', uploadInput[0].files[0]);

            $.ajax({
                url: '/uploadFile',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(){
                    uploadInput.val('');
                }
            })
        }
    })
})

