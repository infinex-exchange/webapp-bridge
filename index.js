$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    $('#bridge-preloader').hide();
    $('#bridge-step2').hide();
    
    $(document).trigger('renderingStage');
    
    $('.toggle-peg').on('click', function() {
        var side = $(this).data('side');
                                  
        $('.toggle-peg').removeClass('btn-primary btn-secondary');
        $(this).addClass('btn-primary');
        
        if(side == 'peg-in') {
            $('.toggle-peg[data-side=peg-out]').addClass('btn-secondary');
        }
        
        else {
            $('.toggle-peg[data-side=peg-in]').addClass('btn-secondary');
        }
    });
});