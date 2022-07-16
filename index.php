<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../../templates/head.php'); ?>
        <title>Bridge - Vayamos Exchange</title>
    </head>
    <body class="body-background">
    
        <!-- Preloader -->
        <?php include(__DIR__.'/../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include(__DIR__.'/../../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 h-rest pt-2 p-0">
        
            <div class="row h-100 m-0 px-4 py-5">
                <div class="jumbotron col-12 col-lg-7 h-100">
                    <h1>Vayamos Bridge</h1>
                    <p>
                    With Vayamos Bridge you can wrap any asset supported by Vayamos Exchange to BPX blockchain tokens.
                    You can hold your wrapped tokens in your BPX wallet, trade them using offers and transfer them without fee.
                    BPX tokens are pegged on a 1:1 basis to the underlying asset.
                    You can redeem your wrapped tokens back to the original asset at any time.
                    This cross-chain bridge improves interoperability between BPX and other blockchains
                    and gives you direct access to the world of DeFi on the BPX blockchain.
                    </p>
                </div>
            
                <div class="col-12 col-lg-5 h-100">
                    <div class="p-2 p-lg-4 ui-card-light rounded">
                        <div class="row py-2 text-center">
                            <h3>Market trend</h3>
                        </div>
                        <div class="row py-2 secondary">
                            <div class="col-3 my-auto"><h5>Name</h5></div>
                            <div class="col-4 my-auto text-end"><h5>Last price</h5></div>
                            <div class="col-2 my-auto text-end"><h5>24h change</h5></div>
                            <div class="col-3 my-auto text-end"><h5>24h volume</h5></div>
                        </div>            
                        <div id="market-trend-spot-data"></div>
                    </div>
                </div>

            </div>
        
        <!-- / Root container -->
        </div>
        
        <?php include(__DIR__.'/../../templates/modals.php'); ?>
        <script src="index.js?<?php echo filemtime(__DIR__.'/index.js'); ?>"></script>
        
        <!-- Footer -->
        <?php include(__DIR__.'/../../templates/footer.html'); ?>
        <?php include(__DIR__.'/../../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
