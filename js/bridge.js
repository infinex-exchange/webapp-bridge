$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    $('#bridge-preloader').hide();
    $('.peg-memo-wrapper').hide();
    $('#bridge-step2').hide();
    
    $(document).trigger('renderingStage');
    
    window.pegSide = 'PEG_IN';
    
    $('.peg-toggle').on('click', function() {
        var side = $(this).data('side');
                                  
        $('.peg-toggle').removeClass('btn-primary btn-secondary');
        $(this).addClass('btn-primary');
        
        if(side == 'peg-in') {
            $('.peg-toggle[data-side=peg-out]').addClass('btn-secondary');
            window.pegSide = 'PEG_IN';
        }
        
        else {
            $('.peg-toggle[data-side=peg-in]').addClass('btn-secondary');
            window.pegSide = 'PEG_OUT';
        }
    });
    
    $('#select-coin').on('change', function() {
        initSelectNet( $('#select-coin').val() );
    });
    
    $('#select-net').on('change', function() {        
        $.ajax({
            url: config.apiUrl + '/bridge/info',
            type: 'POST',
            data: JSON.stringify({
                side: window.pegSide,
                asset: $('#select-coin').val(),
                network: $('#select-net').data('network')
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                // Reset validation variables
                window.validAddress = false;
                window.validMemo = false;
                
                $('#peg-target-addr').prop('readonly', false).val('');
                
                // Memo
                if(typeof(data.memo_name) !== 'undefined') {
                    $('#peg-memo-name').html(data.memo_name + ':');
                    $('#peg-memo-wrapper').show();
                }
                else {
                    $('#peg-memo-wrapper').hide();
                }
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    });
});