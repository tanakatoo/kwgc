<?php
/**
 *  Template Name: Classes
 */

get_header();
$data = array( 'OrgId' => 526868,'Sort'=>'session, category1, category2, category3'); //sort by session then by name(cat1) because we want to group the names together
$response = wp_remote_post( 'https://app.jackrabbitclass.com/jr3.0/Openings/OpeningsJson', array( 'body' => $data,'' ) );
$decoded=(json_decode( wp_remote_retrieve_body( $response ),true ));
$json_pretty = json_encode($decoded, JSON_PRETTY_PRINT);

//find out all the filtering categories and put them in an array
$sessionNames=array();
$ageGroups=array();
$classNames=array();
$levels=array();
$array_classes=array();

//need to check that there are rows before looping, if not then display error
if($decoded['rows'] != null){

    for ($i = 0; $i < count($decoded['rows']); $i++) { 

        //this is for session name
        if($i !=0 && $decoded['rows'][$i]['session']!='' && 
            $decoded['rows'][$i]['session'] != $decoded['rows'][$i-1]['session'] &&
            in_array($decoded['rows'][$i]['session'],$sessionNames) == false){
            $sessionNames[]=$decoded['rows'][$i]['session'];
        }
        //this is for age
        if($i !=0 && $decoded['rows'][$i]['category2']!='' && 
            $decoded['rows'][$i]['category2'] != $decoded['rows'][$i-1]['category2'] &&
            in_array($decoded['rows'][$i]['category2'],$ageGroups) == false){
            $ageGroups[]=$decoded['rows'][$i]['category2'];
        }
        //this is for class name
        if($i !=0 && $decoded['rows'][$i]['category1']!='' && 
            $decoded['rows'][$i]['category1'] != $decoded['rows'][$i-1]['category1'] &&
            in_array($decoded['rows'][$i]['category1'],$classNames) == false){
            $classNames[]=$decoded['rows'][$i]['category1'];
        }
        //this is for level
        if($i !=0 && $decoded['rows'][$i]['category3']!='' && 
            $decoded['rows'][$i]['category3'] != $decoded['rows'][$i-1]['category3'] &&
            in_array($decoded['rows'][$i]['category3'],$levels) == false){
            $levels[]=$decoded['rows'][$i]['category3'];
        }

    
    //change day of week
        if($decoded['rows'][$i]['meeting_days']['mon'] == 1){
            $dayOfWeek= 'Monday';
                } else if($decoded['rows'][$i]['meeting_days']['tue'] == 1){
                    $dayOfWeek=  'Tuesday';
                } else if($decoded['rows'][$i]['meeting_days']['wed'] == 1){
                    $dayOfWeek=  'Wednesday';
                } else if($decoded['rows'][$i]['meeting_days']['thu'] == 1){
                    $dayOfWeek=  'Thursday';
                } else if($decoded['rows'][$i]['meeting_days']['fri'] == 1){
                    $dayOfWeek=  'Friday';
                } else if($decoded['rows'][$i]['meeting_days']['sat'] == 1){
                    $dayOfWeek=  'Saturday';
                } else if($decoded['rows'][$i]['meeting_days']['sun'] == 1){
                    $dayOfWeek=  'Sunday';
                };

    //change min age
    //if min is 0 or 1, we have to take into consideration the number of months
    $minAge=trim($decoded['rows'][$i]['min_age'],"P0");
    $minAge=trim($minAge,"P");
    // $minAge=trim($minAge,"00M");
    $minAge=trim($minAge,"M");
    //separate the year and month
    //if after the Y position there is still a string, then get the string
    $idx=strpos($minAge,"Y"); //find where the Y is
    $minAge_yr=substr($minAge,0,$idx); //get only the year
    $minAge_yr=ltrim($minAge_yr,"0"); //remove the 0 at the front
    
    if(substr($minAge, $idx) != "Y00"){
        //take into consideration the months
        $minAge_mths=substr($minAge,$idx+1,2);
        $minAge_mths=ltrim($minAge_mths, "0");//remove 0 at the front   
      
    } else{
        $minAge_mths=substr($minAge,$idx+1,-3);
    }
    
    //change max age
    
    // $maxAge=trim($decoded['rows'][$i]['max_age'],"P0");
    // $maxAge=trim($maxAge,"P");
    // $maxAge=substr($maxAge,0,-4);
    $maxAge=trim($decoded['rows'][$i]['max_age'],"P0");
    $maxAge=trim($maxAge,"P");
    // $minAge=trim($minAge,"00M");
    $maxAge=trim($maxAge,"M");
    //separate the year and month
    //if after the Y position there is still a string, then get the string
    $idx=strpos($maxAge,"Y"); //find where the Y is
    $maxAge_yr=substr($maxAge,0,$idx); //get only the year
    $maxAge_yr=ltrim($maxAge_yr,"0"); //remove the 0 at the front
    
    if(substr($maxAge, $idx) != "Y00"){
        //take into consideration the months
        $maxAge_mths=substr($maxAge,$idx+1,2);
        $maxAge_mths=ltrim($maxAge_mths, "0");//remove 0 at the front   
      
    } else{
        $maxAge_mths=substr($maxAge,$idx+1,-3);
    }
    
    
    

    //create an array with key value pairs for data to display
    $array_classes[$i]=array(
        "session"=>$decoded['rows'][$i]['session'],
        "age"=>$decoded['rows'][$i]['category2'],
        "className"=>$decoded['rows'][$i]['category1'],
        "level"=>$decoded['rows'][$i]['category3'],
        "startTime"=>$decoded['rows'][$i]['start_time'],
        "endTime"=>$decoded['rows'][$i]['end_time'],
        "startDate"=>$decoded['rows'][$i]['start_date'],
        "endDate"=>$decoded['rows'][$i]['end_date'],
        "dayOfWeek"=>$dayOfWeek,
        "opening"=>$decoded['rows'][$i]['openings']['calculated_openings'],
        "tuition"=>$decoded['rows'][$i]['tuition']['fee'],
        "link"=>$decoded['rows'][$i]['online_reg_link'],
        "maxAge"=>$maxAge,
        "maxAge_yrs"=>$maxAge_yr,
        "maxAge_mths"=>$maxAge_mths,
        "maxAge_original"=>$decoded['rows'][$i]['max_age'],
        "minAge"=>$minAge,
        "minAge_yrs"=>$minAge_yr,
        "minAge_mths"=>$minAge_mths,
        "minAge_original"=>$decoded['rows'][$i]['min_age'],
        "regStartDate"=>$decoded['rows'][$i]['reg_start_date'],
        "regEndDate"=>$decoded['rows'][$i]['reg_end_date'],
        "desc"=>$decoded['rows'][$i]['description']
    );

    }

    //using this info, make the buttons for filtering 
    //add array_classes to JS so it can be used
    //sort the arrays first, case insensitive
    usort($levels, 'strnatcasecmp');
    usort($classNames, 'strnatcasecmp');
    usort($ageGroups, 'strnatcasecmp');
    usort($sessionNames, 'strnatcasecmp');
    ?>

    <script type="text/javascript">
            const originalClasses = <?php echo json_encode($array_classes); ?>;
    </script>

    <div class="container-margin">
        <h1 class="text-center">Class Schedules</h1>
        <div class="filter-area">
            <div class="border-bottom">
                <h3 class="">Class filter</h3>
            </div>
        <div class="filter-grid">
            <div class="session flex margin-top-xsmall">
            Session
            </div>
            <div class="sessionCheck">
                <div class="checkbox-wrap">
                    <?php for ($i = 0; $i < count($sessionNames); $i++){ ?>
                    <ul class="checkbox-tag">
                        <li class="check">
                            <input class="checkbox-input" data-type="session" id="sess<?php echo $i?>" type="checkbox" value="<?php echo $sessionNames[$i]?>">
                            <label class="checkbox-text" for="sess<?php echo $i?>"><?php echo $sessionNames[$i]?></label>
                        </li>
                    </ul>
                    <?php }?>
                </div>
            </div>
            <div class="age flex margin-top-xsmall">
                Age Group
            </div>
            <div class="ageCheck">
                <div class="checkbox-wrap">
                    <?php for ($i = 0; $i < count($ageGroups); $i++){ ?>
                        <ul class="checkbox-tag">
                            <li class="check">
                                <input class="checkbox-input" data-type="age" id="age<?php echo $i?>" type="checkbox" value="<?php echo $ageGroups[$i]?>">
                                <label class="checkbox-text" for="age<?php echo $i?>"><?php echo $ageGroups[$i]?></label>
                            </li>
                        </ul>
                    <?php }?>
                </div>
            </div>
            <div class="class flex margin-top-xsmall">
                Class
            </div>
            <div class="classCheck">
                <div class="checkbox-wrap">
                    <?php for ($i = 0; $i < count($classNames); $i++){ ?>
                        <ul class="checkbox-tag">
                            <li class="check">
                                <input class="checkbox-input" data-type="class" id="class<?php echo $i?>" type="checkbox" value="<?php echo $classNames[$i]?>">
                                <label class="checkbox-text" for="class<?php echo $i?>"><?php echo $classNames[$i]?></label>
                            </li>
                        </ul>
                    <?php }?>
                </div>
            </div>
            <div class="level flex margin-top-xsmall">
                Level
            </div>
            <div class="levelCheck ">
                <div class="checkbox-wrap">
                    <?php for ($i = 0; $i < count($levels); $i++){ ?>
                        <ul class="checkbox-tag">
                            <li class="check">
                                <input class="checkbox-input" data-type="level" id="level<?php echo $i?>" name="level" type="checkbox" value="<?php echo $levels[$i]?>">
                                <label class="checkbox-text" for="level<?php echo $i?>"><?php echo $levels[$i]?></label>
                            </li>
                        </ul>
                    <?php }?>
                </div>
            </div>
            <div class="available flex margin-top-xsmall">
                Availability
            </div>
            <div class="availableCheck ">
                <div class="checkbox-wrap">
                        <ul class="checkbox-tag">
                            <li class="check">
                                <input class="checkbox-input" data-type="available" id="available" name="available" type="checkbox" value="true">
                                <label class="checkbox-text" for="available">Have openings</label>
                            </li>
                        </ul>
                    
                </div>
            </div>
        </div>
        <button id="search" class="button">Filter Classes</button>
        </div>
    </div>
        <div id="results">

        <?php for($j = 0;$j< count($sessionNames);$j++){
            //print out session name
            ?>
            <h3><?php echo $sessionNames[$j]; ?></h3>
            <?php } ?>
        <table>
            <thead>
                <tr>
                    <td class="register"></td>
                    <td class="className">Class/Level</td>
                    <td class="age">Age</td>
                    <td class="dates">Dates</td>
                    <td class="time">Time</td>
                    <td class="tuition">Tuition</td>
                    <td class="notes">Notes</td>
                </tr>
            </thead>
            <tbody>
                <?php for($i = 0; $i < count($array_classes); $i++){ 
                    if($decoded['rows'][$i]['session'] == $sessionNames[$j]) 
                    ?>
                <tr>
                    <td  class="register">
                        <div class="flex flex-col">
                            <span>
                                <?php if(date('Y-m-d') > $array_classes[$i]['regStartDate'] ||
                                    (date('Y-m-d') == $array_classes[$i]['regStartDate'] && 
                                    time() >= strtotime("12:00:00"))) {?>
                                <a href="<?php echo $array_classes[$i]['link']; ?>"><?php if($array_classes[$i]['opening'] > 0){ ?>Register 
                                <?php } else{ ?>
                                    Waitlist
                                <?php } ?>
                                </a>
                               
                            </span>
                            <span class="tab"><?php if($array_classes[$i]['opening'] > 0){ echo $array_classes[$i]['opening']?> opening(s) 
                                <?php } else{
                                    echo abs($array_classes[$i]['opening'])  ?> waiting
                                <?php } ?>
                                <?php } else{ ?>
                                    Registration not yet open
                                <?php } ?>
                            </span>
                        </div>
                    </td>
                    <td class="className">
                        <div class="flex flex-col">
                            <span><?php echo $array_classes[$i]['className']; ?></span>
                            <span class="tab"><?php echo $array_classes[$i]['level']; ?></span>
                        </div>
                    </td>
                    <td class="age">
                      
                       
                    <?php if($array_classes[$i]['minAge_yrs'] !=""){
                            echo $array_classes[$i]['minAge_yrs']; 
                            
                            if($array_classes[$i]['minAge_mths'] != "") {?>yr 
                            <?php 
                            };
                         }; ?>
                        <?php if ($array_classes[$i]['minAge_mths'] !=""){
                            echo $array_classes[$i]['minAge_mths']; 
                            ?>mths <?php } ?>
                            <?php if($array_classes[$i]['maxAge_yrs'] == ""){
                                ?>+ <?php
                            } else{
                                ?> - <?php
                                if($array_classes[$i]['maxAge_yrs'] !=""){
                                    echo $array_classes[$i]['maxAge_yrs']; 
                                    if($array_classes[$i]['minAge_mths'] != "") {?>yr 
                                        <?php 
                                        };  
                                    }; ?> 
                                <?php if ($array_classes[$i]['maxAge_mths'] !="11"){
                                    echo $array_classes[$i]['maxAge_mths']; 
                                    ?>mths <?php } 
                            }?>
                        
                    </td>
                    <td class="dates">
                        <div  class="flex flex-col">
                            <span><?php echo $array_classes[$i]['dayOfWeek']; ?></span>
                            <span class="tab"><?php echo $array_classes[$i]['startDate']; ?> to</span>
                            <span class="tab"><?php echo $array_classes[$i]['endDate']; ?></span>
                        </div>
                    </td>
                    <td class="time"><?php echo date("g:i", strtotime($array_classes[$i]['startTime'])); ?> - <?php echo date("g:ia", strtotime($array_classes[$i]['endTime'])); ?></td>
                    <td class="tuition">$<?php echo $array_classes[$i]['tuition']; ?></td>
                    <td class="notes"><?php echo $array_classes[$i]['desc']; ?></td>
                </tr>
                <?php } ?>
                
            </tbody>
        </table>
        </div>


    
    <?php 
} else{
    ?>
    <div class="container-margin">
        <p>Error getting classes. Please try again later or contact info@kwgymnastics.ca for help.</p>
    </div>
    <?php
    
}


get_footer() ?>