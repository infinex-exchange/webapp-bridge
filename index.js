$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    $('#bridge-preloader').hide();
    $('#bridge-step2').hide();
    
    $(document).trigger('renderingStage');
    
    $('.peg-togle').on('click', function() {
        var side = $(this).data('side');
                                  
        $('.peg-toggle').removeClass('btn-primary btn-secondary');
        $(this).addClass('btn-primary');
        
        if(side == 'peg-in') {
            $('.peg-toggle[data-side=peg-out]').addClass('btn-secondary');
        }
        
        else {
            $('.peg-toggle[data-side=peg-in]').addClass('btn-secondary');
        }
    });
    
    $('#select-coin').on('change', function() {
        initSelectNet( $('#select-coin').val() );
    });
    
    $('#select-net').on('change', function() {        
        $('#peg-target-addr').prop('disabled', false).val('');
    });
});