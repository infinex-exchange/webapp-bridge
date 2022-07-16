<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../../templates/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../js/ajax_scroll.js'); ?>"></script>
        <title>Bridge - Vayamos Exchange</title>
    </head>
    <body class="body-background">
    
        <!-- Preloader -->
        <?php include(__DIR__.'/../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include(__DIR__.'/../../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 h-rest pt-2 p-0">
        
            <div class="row h-rest m-0 px-4 py-5">
                <div class="jumbotron col-12 col-lg-7 my-auto">
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
            
                <div class="col-12 col-lg-5 my-auto">
                    <div class="p-2 p-lg-4 ui-card-light rounded">
                        <div class="row py-2">
                            <div class="col-6 ps-2 pe-1">
                                <button type="button" class="btn btn-primary w-100 toggle-peg" data-side="peg-in">Peg-in</button>
                            </div>
                            <div class="col-6 ps-1 pe-2">
                                <button type="button" class="btn btn-secondary w-100 toggle-peg" data-side="peg-out">Peg-out</button>
                            </div>
                        </div>
                        <div class="row py-2 text-center">
                            <h3>Select asset:</h3>
                        </div>
                        <div class="row py-2">
                            <?php include(__DIR__.'/../../templates/select_coin.php'); ?>
                        </div>
                        <div class="row py-2 text-center">
                            <h3>Select network:</h3>
                        </div>
                        <div class="row py-2">
                            <?php include(__DIR__.'/../../templates/select_net.php'); ?>
                        </div>              
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
