function updateStep1() {
    var asset = $('#select-coin').val();
    var network = $('#select-net').data('network');
    
    if(!asset || !network) {
        $('#peg-conf-target').html('-');
        $('#peg-fee-val').html('-');
        $('#peg-fee-assetid').html('');
        $('#peg-target-addr').prop('readonly', true).val('');
        $('.peg-memo-wrapper').hide();
        
        return;
    }
    
    $.ajax({
        url: config.apiUrl + '/bridge/info',
        type: 'POST',
        data: JSON.stringify({
            side: window.pegSide,
            asset: asset,
            network: network
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
                $('.peg-memo-wrapper').show();
            }
            else {
                $('.peg-memo-wrapper').hide();
            }
            
            // Conf target
            $('#peg-conf-target').html(data.confirms_target);
            
            // Fee
            $('#peg-fee-val').html(data.fee);
            $('#peg-fee-assetid').html(asset);
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });
}

$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    $('#bridge-preloader').hide();
    $('.peg-memo-wrapper').hide();
    $('#bridge-step2').hide();
    $('.peg-out-text').hide();
    
    $(document).trigger('renderingStage');
    
    window.pegSide = 'PEG_IN';
    
    $('.peg-toggle').on('click', function() {
        var side = $(this).data('side');
                                  
        $('.peg-toggle').removeClass('btn-primary btn-secondary');
        $(this).addClass('btn-primary');
        
        if(side == 'peg-in') {
            $('.peg-toggle[data-side=peg-out]').addClass('btn-secondary');
            window.pegSide = 'PEG_IN';
            $('.peg-in-text').show();
            $('.peg-out-text').hide();
        }
        
        else {
            $('.peg-toggle[data-side=peg-in]').addClass('btn-secondary');
            window.pegSide = 'PEG_OUT';
            $('.peg-in-text').hide();
            $('.peg-out-text').show();
        }
        
        updateStep1();
    });
    
    $('#select-coin').on('change', function() {
        initSelectNet($('#select-coin').val(), '/bridge/networks');
    });
    
    $('#select-net').on('change', function() {        
        updateStep1();
    });
    
    // Validate address
    $('#peg-target-addr').on('input', function() {
        if(typeof(window.addrTypingTimeout) !== 'undefined')
            clearTimeout(window.addrTypingTimeout);
        window.addrTypingTimeout = setTimeout(function() {
            
            $.ajax({
                url: config.apiUrl + '/bridge/validate',
                type: 'POST',
                data: JSON.stringify({
                    side: window.pegSide,
                    asset: $('#select-coin').val(),
                    network: $('#select-net').data('network'),
                    address: $('#peg-target-addr').val()
                }),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(!data.success) {
                    msgBox(data.error);
                }
                else if(!data.valid_address) {
	                window.validAddress = false;
                    $('#help-target-addr').show();
                }
                else {
	                window.validAddress = true;
                    $('#help-target-addr').hide();
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                msgBoxNoConn(false);
            });
            
        }, 750);
    });
    
    // Validate memo
    $('#peg-target-memo').on('input', function() {
        if(typeof(window.memoTypingTimeout) !== 'undefined')
            clearTimeout(window.memoTypingTimeout);
        window.memoTypingTimeout = setTimeout(function() {
            if($('#peg-target-memo').val() == '') {
                window.validMemo = false;
                $('#help-target-memo').hide();
                return;
            }
            
            $.ajax({
                url: config.apiUrl + '/bridge/validate',
                type: 'POST',
                data: JSON.stringify({
                    side: window.pegSide,
                    asset: $('#select-coin').val(),
                    network: $('#select-net').data('network'),
                    memo: $('#peg-target-memo').val()
                }),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(!data.success) {
                    msgBox(data.error);
                }
                else if(!data.valid_memo) {
	                window.validMemo = false;
                    $('#help-target-memo').show();
                }
                else {
	                window.validMemo = true;
                    $('#help-target-memo').hide();
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                msgBoxNoConn(false);
            });
            
        }, 750);
    }); 
    
    // Submit step1
    $('#peg-step1-form').on('submit', function(event) {
        // Prevent standard submit
        event.preventDefault();
        
        // Validate data
        var address = $('#peg-target-addr').val();
        if(address == '') {
            msgBox('Missing address');
            return;
        }
        
        var data = new Object();
        data['side'] = window.pegSide,
        data['asset'] = $('#select-coin').val();
        data['network'] = $('#select-net').data('network');
        data['address'] = address;
        
        var memo = $('#peg-target-memo').val();
        if(memo != '')
            data['memo'] = memo;
        
        if(!window.validAddress ||
           (memo != '' && !window.validMemo))
        {
	        msgBox('Fill the form correctly');
	        return;
        }
        
        // Enable preloader
        $('#bridge-preloader').height($('#bridge-step1').height());
        $('#bridge-step1').hide();
        $('#bridge-preloader').show();
            
        // Post
        $.ajax({
            url: config.apiUrl + '/bridge',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                // Icons
                $('#peg-from-net-img').attr('src', data.source_net_icon);
                $('#peg-to-net-img').attr('src', data.target_net_icon);
                $('#peg-from-net').html(data.source_net_desc);
                $('#peg-to-net').html(data.target_net_desc);
                
                $('#bridge-preloader').hide();
                $('#bridge-step2').show();
            }
            else {
                msgBox(data.error);
                $('#bridge-preloader').hide();
                $('#bridge-step1').show();
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
            $('#bridge-preloader').hide();
            $('#bridge-step1').show();
        });
    });
    
    initSelectCoin('/bridge/assets');
});