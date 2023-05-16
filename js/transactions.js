var txStatusIconDict = {
    PENDING: 'fa-solid fa-clock',
    PROCESSING: 'fa-solid fa-cog fa-spin',
    DONE: 'fa-solid fa-check',
    CANCEL_PENDING: 'fa-solid fa-xmark fa-spin',
    CANCELED: 'fa-solid fa-xmark'
};

var txStatusDict = {
    PENDING: 'Pending',
    PROCESSING: 'Executing',
    DONE: 'Done',
    CANCEL_PENDING: 'Canceling',
    CANCELED: 'Canceled'
};

function renderTxHistoryItem(data) { 
    var cTime = new Date(data.deposit.create_time * 1000).toLocaleString();
    
    var confHtml = '';
    if(data.status != 'DONE' &&
       typeof(data.deposit.confirms) !== 'undefined' &&
       typeof(data.deposit.confirms_target) !== 'undefined' &&
       data.deposit.confirms != data.deposit.confirms_target
    )
        confHtml = `<br><span class="secondary">${data.deposit.confirms}&nbsp;/&nbsp;${data.deposit.confirms_target}</span>`;
    
    var dTxid = '-';
    if(typeof(data.deposit.txid) !== 'undefined')
        dTxid = data.deposit.txid;
        
    var dNetworkDescription = '-';
    if(typeof(data.deposit.network_description) !== 'undefined')
        dNetworkDescription = data.deposit.network_description;
    
    return `
        <div class="row p-2 hoverable bridge-transaction-item" data-xid="${data.deposit.xid}">
            <div class="col-6 d-lg-none secondary">
                Time:
            </div>
            <div class="col-6 col-lg text-end">
                ${cTime}
            </div>
            <div class="col-6 d-lg-none secondary">
                Amount:
            </div>
            <div class="col-6 col-lg text-end">
                ${data.amount} ${data.asset}
            </div>
            <div class="col-6 d-lg-none secondary">
                Txid:
            </div>
            <div class="col-6 col-lg text-end">
                ${dTxid}
            </div>
            <div class="col-6 d-lg-none secondary">
                Status:
            </div>
            <div class="col-6 col-lg text-end">
                <i class="${txStatusIconDict[data.deposit.status]}"></i>
                ${txStatusDict[data.deposit.status]}
                ${confHtml}
            </div>
        </div>
    `;
}

function updateTxHistory(offset = 0) {  
    var data = window.TxHistoryAS.data;
    data.offset = offset;
    
    $.ajax({
        url: config.apiUrl + '/bridge/transactions',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
    })
    .done(function (data) {
        if(data.success) {
            var i = 0;
            var end = false;
                
            $.each(data.transactions, function() {
                i++;
                
                if(typeof(window.xidLatest) == 'undefined' || this.deposit.xid > window.xidLatest) {
                    window.TxHistoryAS.prepend(renderTxHistoryItem(this));
                    window.xidLatest = this.deposit.xid;
                }
                
                else if(typeof(window.xidOldest) == 'undefined' || this.deposit.xid < window.xidOldest) {
                    window.xidOldest = this.deposit.xid;
                    end = true;
                    return false;
                }
                
                var item = $('.bridge-transaction-item[data-xid="' + this.deposit.xid + '"]');
                if(item.length) {
                    item.replaceWith(renderTxHistoryItem(this));
                }
            });
            
            if(!end && i == 50)
                updateTxHistory(offset + i);
        }
    });
}

$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    window.TxHistoryAS = new AjaxScroll(
        $('#transactions-data'),
        $('#transactions-data-preloader'),
        {},
        function() {
            this.data.offset = this.offset;
            var thisAS = this;
                
            $.ajax({
                url: config.apiUrl + '/bridge/transactions',
                type: 'POST',
                data: JSON.stringify(thisAS.data),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    $.each(data.transactions, function() {
                        thisAS.append(renderTxHistoryItem(this));
                        
                        if(typeof(window.xidOldest) === 'undefined' || this.deposit.xid < window.xidOldest)
                            window.xidOldest = this.deposit.xid;
                            
                        if(typeof(window.xidLatest) === 'undefined' || this.deposit.xid > window.xidLatest)
                            window.xidLatest = this.deposit.xid;
                    });
                    
                    thisAS.done();
                
                    if(thisAS.offset == 0 && typeof(window.updateTxHistoryInterval) == 'undefined') {
                        $(document).trigger('renderingStage');
                        clearInterval(window.updateTxHistoryInterval);
                        window.updateTxHistoryInterval = setInterval(updateTxHistory, 10000);
                    }
                        
                    if(data.transactions.length != 50)
                        thisAS.noMoreData();
                }
                else {
                    msgBoxRedirect(data.error);
                    thisAS.done();
                    thisAS.noMoreData();
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                msgBoxNoConn(true);
                thisAS.done();
                thisAS.noMoreData();
            });
        },
        true,
        true
    );
});