<?php
    $lang = [
        'it' => 'Italiano',
        'en' => 'English'
    ];
    if (isset($_GET['lcode'])) {
        $code = $_GET['lcode'];
    } else {
        $code = 'it';
    }
    $path = 'lang/'.$code.'.php';
    if (file_exists($path)) {
        require $path;
    }
    else {
      require 'lang/it.php';
    }
?>
<!DOCTYPE html>
<html lang="<?php echo $code?>">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="img/logo.ico">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.0.2/dist/echarts.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
    
    <title><?php echo $CORONA_STATUS;?></title>
</head>
<body>
    <div class="container-fluid intro">
        <div class="row">
            <div class="col">
                <div class="card text-center">
                    <div class="card-body">
                        <h3 class="card-title"><?php echo $LANG;?></h3>
                        <div class="col-md-4" style="margin:auto;">
                            <select name="" id="lang"  class="form-select form-select-sm">
                                <?php 
                                    foreach ($lang as $code_lang => $name) {
                                        $html = null;
                                        $html = '<option value="'.$code_lang.'"';
                                        if ($code_lang == $code) {
                                            $html .= 'selected';
                                        }
                                        $html .= ' >'.$name.'</option>';
                                        echo $html;
                                    }
                                ?>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card text-center">
                    <div class="card-body">
                        <h3 class="card-title"><?php echo $COUNTRY;?></h3>
                        <div class="col-md-4" style="margin:auto;">
                            <select name="" id="country-list"  class="form-select form-select-sm"></select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card text-center">
                    <div class="card-body">
                        <h3 class="card-title"><?php echo $TODAY_DEATHS;?></h3>
                        <h5 class="card-text" id="today-deaths"></h5>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card text-center">
                    <div class="card-body">
                        <h3 class="card-title"><?php echo $TODAY_CONFIRMED;?></h3>
                        <h5 class="card-text" id="today-confirmed"></h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 graph">
                <div id="main" style="width:600px;height:400px;">
                </div>
            </div>
            <div class="col-md-4 sidebar">
                <div class="card text-center">
                    <div class="card-body">
                        <h3 class="card-title"><?php echo $TOTAL_DEATHS;?></h3>
                        <h5 class="card-text" id="total-deaths"></h5>
                    </div>
                </div>
                <div class="card text-center">
                    <div class="card-body">
                        <h3 class="card-title"><?php echo $TOTAL_CONFIRMED;?></h3>
                        <h5 class="card-text" id="total-confirmed"></h5>
                    </div>
                </div>
                <div class="card text-center">
                    <div class="card-body">
                        <h3 class="card-title"><?php echo $TOTAL_RECOVERED;?></h3>
                        <h5 class="card-text" id="total-recovered"></h5>
                    </div>
                </div>
                <div class="card text-center">
                    <div class="card-body">
                        <h3 class="card-title"><?php echo $TOTAL_CRITICAL;?></h3>
                        <h5 class="card-text" id="total-critical"></h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 graph-new">
                <div id="new" style="width:600px;height:400px;">
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid" style="padding:10px;">
        <div class="row">
            <div class="col-md-6 mondial-graph">
                <div id="mondial-main" style="width:600px;height:400px;">
                </div>
            </div>
            <div class="col-md-6 mondial-graph-new">
                <div id="mondial-new" style="width:600px;height:400px;">
                </div>
            </div>
        </div>
    </div>

    <script>
        // LANG
        var labels = [];
        var label_deaths = '<?php echo $DEATHS; ?>';
        var label_confirmed = '<?php echo $CONFIRMED; ?>';
        var label_recovered = '<?php echo $RECOVERED; ?>';
        labels.push(label_deaths);
        labels.push(label_confirmed);
        labels.push(label_recovered);
        var new_labels = [];
        var label_new_deaths = '<?php echo $NEW_DEATHS; ?>';
        var label_new_confirmed = '<?php echo $NEW_CONFIRMED; ?>';
        var label_new_recovered = '<?php echo $NEW_RECOVERED; ?>';
        new_labels.push(label_new_deaths);
        new_labels.push(label_new_confirmed);
        new_labels.push(label_new_recovered);
        var mondial_labels = [];
        var label_mondial_deaths = '<?php echo $MONDIAL_DEATHS; ?>';
        var label_mondial_confirmed = '<?php echo $MONDIAL_CONFIRMED; ?>';
        var label_mondial_recovered = '<?php echo $MONDIAL_RECOVERED; ?>';
        mondial_labels.push(label_mondial_deaths);
        mondial_labels.push(label_mondial_confirmed);
        mondial_labels.push(label_mondial_recovered);
        var new_mondial_labels = [];
        var label_new_mondial_deaths = '<?php echo $NEW_MONDIAL_DEATHS; ?>';
        var label_new_mondial_confirmed = '<?php echo $NEW_MONDIAL_CONFIRMED; ?>';
        var label_new_mondial_recovered = '<?php echo $NEW_MONDIAL_RECOVERED; ?>';
        new_mondial_labels.push(label_new_mondial_deaths);
        new_mondial_labels.push(label_new_mondial_confirmed);
        new_mondial_labels.push(label_new_mondial_recovered);

        var w = $('.graph').width();
        var h = $('.graph').height();
        $('#main').css('width', w);
        $('#main').css('height', h);

        var w = $('.graph-new').width();
        var h = $('.graph-new').height();
        $('#new').css('width', w);
        $('#new').css('height', h);

        var w = $('.mondial-graph').width();
        var h = $('.mondial-graph').height();
        $('#mondial-main').css('width', w);
        $('#mondial-main').css('height', h);

        var w = $('.mondial-graph-new').width();
        var h = $('.mondial-graph-new').height();
        $('#mondial-new').css('width', w);
        $('#mondial-new').css('height', h);

        var myChart = echarts.init(document.getElementById('main'));
        var myChartNew = echarts.init(document.getElementById('new'));
        var mondial = echarts.init(document.getElementById('mondial-main'));
        var mondialNew = echarts.init(document.getElementById('mondial-new'));
    </script>
    <script src="js/js.js"></script>
</body>
</html>