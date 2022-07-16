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
        
            <div class="row h-rest m-0">
                <div class="jumbotron col-12 col-lg-7 my-auto px-4 py-5">
                    <div class="row">
                    <div class="col-12">
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
                    <div class="col-10 d-none d-lg-block">
                        <img src="/bridge/img/bridge.png" class="img-fluid">
                    </div>
                    </div>
                </div>
            
                <div class="col-12 col-lg-5 my-auto">
                    <div class="p-2 p-lg-4 ui-card-light rounded">
                        <div id="bridge-step1">
                            <div class="row py-2">
                                <div class="col-6 ps-2 pe-1">
                                    <button type="button" class="btn btn-primary w-100 peg-toggle" data-side="peg-in">Peg-in</button>
                                </div>
                                <div class="col-6 ps-1 pe-2">
                                    <button type="button" class="btn btn-secondary w-100 peg-toggle" data-side="peg-out">Peg-out</button>
                                </div>
                            </div>
                            <div class="row py-2">
                                <h3>Select asset:</h3>
                            </div>
                            <div class="row py-2">
                                <?php include(__DIR__.'/../../templates/select_coin.php'); ?>
                            </div>
                            <div class="row py-2">
                                <h3>Select network:</h3>
                            </div>
                            <div class="row py-2">
                                <?php include(__DIR__.'/../../templates/select_net.php'); ?>
                            </div>
                            <div class="row py-2">
                                <h3>Address:</h3>
                            </div>
                            <div class="row py-2">
                                <input id="peg-target-addr" type="text" placeholder="Paste address" class="form-control" autocomplete="off" readonly>
                                <small id="help-target-addr" class="form-text" style="display: none">Address is invalid</small>
                            </div>
                            <div class="row py-2 peg-memo-wrapper">
                                <h3 id="peg-memo-name"></h3>
                            </div>
                            <div class="row py-2 peg-memo-wrapper">
                                <input type="text" class="form-control" id="peg-target-memo" placeholder="Optional">
                                <small id="help-target-memo" class="form-text" style="display: none">Invalid format</small>
                            </div>
                            <div class="row py-2 text-right">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                        
                        <div id="bridge-preloader">
                            <div class="row py-2 text-center">
                                <i class="fa-solid fa-spinner fa-spin-pulse fa-2x"></i>
                            </div>
                        </div>
                        
                        <div id="bridge-step2">
                            <div class="row py-2 flex-nowrap justify-content-evenly">
                                <div class="col-auto text-center">
                                    <div class="p-1 rounded" style="background-color: var(--color-input);">
                                        <img id="peg-from-net-img" width="40" height="40" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">
                                        <span id="peg-from-net" class="p-1 secondary"></span>
                                    </div>
                                </div>
                                <div class="col-auto my-auto">
                                    <i class="fa-solid fa-arrow-right fa-2x"></i>
                                </div>
                                <div class="col-auto text-center">
                                    <div class="p-1 rounded" style="background-color: var(--color-input);">
                                        <img id="peg-to-net-img" width="40" height="40" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">
                                        <span id="peg-to-net" class="p-1 secondary"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row py-2">
                                <h3>Address:</h3>
                            </div>
                            <div class="row py-2 flex-nowrap rounded" style="background-color: var(--color-input);">
                                <div class="col-auto my-auto wrap">
                                    <span class="wrap" id="peg-deposit-addr"></span>
                                </div>
                                <div class="col-auto my-auto">
                                    <a href="#_" class="secondary" data-copy="#peg-deposit-addr" onClick="copyButton(this); event.stopPropagation();"><i class="fa-solid fa-copy fa-xl"></i></a>
                                </div>
                            </div>
                        </div>                  
                    </div>
                </div>

            </div>
        
        <!-- / Root container -->
        </div>
        
        <?php include(__DIR__.'/../../templates/modals.php'); ?>
        <script src="/bridge/js/bridge.js?<?php echo filemtime(__DIR__.'/js/bridge.js'); ?>"></script>
        
        <!-- Footer -->
        <?php include(__DIR__.'/../../templates/footer.html'); ?>
        <?php include(__DIR__.'/../../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
