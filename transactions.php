<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../inc/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../js/ajax_scroll.js'); ?>"></script>
        <link rel="stylesheet" href="/bridge/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>Transactions | Infinex Bridge</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../../inc/body.php'); ?>
        
        <!-- Navbar -->
        <?php include(__DIR__.'/templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 p-0 ui-card ui-column">
            <div class="row p-2">
                <h3>Bridge transactions</h3>
            </div>
            
            <div class="row p-2 secondary d-none d-lg-flex">
                <div class="col">
                    <h5>Date</h5>
                </div>
                <div class="col">
                    <h5>Amount</h5>
                </div>
                <div class="col">
                    <h5>Src net</h5>
                </div>
                <div class="col">
                    <h5>Src status</h5>
                </div>
                <div class="col">
                    <h5>Src txid</h5>
                </div>
                <div style="width: 20px;">
                </div>
                <div class="col">
                    <h5>Dst net</h5>
                </div>
                <div class="col">
                    <h5>Dst status</h5>
                </div>
                <div class="col">
                    <h5>Dst txid</h5>
                </div>
            </div>
            
            <div id="transactions-data">
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/bridge/js/transactions.js?<?php echo filemtime(__DIR__.'/js/transactions.js'); ?>"></script>
        
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
