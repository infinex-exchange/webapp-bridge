$(document).ready(function() {
    window.renderingStagesTarget = 1;
    $(document).trigger('renderingStage');
    
    $('.toggle-peg').on('click', function() {
        var side = $(this).data('side');
        
        if(side == 'peg-in') {
            //
        }
        
        $('.toggle-peg').toggleClass('btn-primary btn-secondary');
    });
});