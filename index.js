$(document).ready(function() {
    window.renderingStagesTarget = 1;
    $(document).trigger('renderingStage');
    
    $('.toggle-peg').on('click', function() {
        var side = $(this).data('side');
                                  
        $('.toggle-peg').removeClass('btn-primary btn-secondary');
        
        if(side == 'peg-in') {
            $(this).addClass('btn-primary');
            $('.toggle-peg[data-side=peg-out]').addClass('btn-secondary');
        }
        
        else {
            $(this).addClass('btn-secondary');
            $('.toggle-peg[data-side=peg-in]').addClass('btn-primary');
        }
    });
});