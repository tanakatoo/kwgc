<?php
/**
 *  Template Name: Camps
 */

get_header();
$data = array( 'OrgId' => 526868,'Sort'=>'session, category1, start_date, start_time'); //sort by session then by name(cat1) because we want to group the names together
$response = wp_remote_post( 'https://app.jackrabbitclass.com/jr3.0/Openings/OpeningsJson', array( 'body' => $data,'' ) );
$decoded_original=(json_decode( wp_remote_retrieve_body( $response ),true ));
$json_pretty = json_encode($decoded_original, JSON_PRETTY_PRINT);
//find out all the filtering categories and put them in an array
$sessionNames=array();
$locations=array();
$type=array();
$classNames=array();
$time=array();
$array_classes=array();
$decoded=array();

//need to check that there are rows before looping, if not then display error
if($decoded_original['rows'] != null){

    //keep all rows from the array where category1 is "PD Days" or "Camps"
    $j=0;
    for ($i = 0; $i < count($decoded_original['rows']); $i++) { 
        if($decoded_original['rows'][$i]['session'] == "PD Days" 
        || $decoded_original['rows'][$i]['session'] == "2025-26 Camp"
        || $decoded_original['rows'][$i]['session'] == "2024-25 Camp"
        || $decoded_original['rows'][$i]['session'] == "2024 Summer Camp"
        || $decoded_original['rows'][$i]['session'] == "2025 Adapted March Break Camp"
        || $decoded_original['rows'][$i]['session'] == "2025 March Break Camp"
        || $decoded_original['rows'][$i]['session'] == "Camps"){
           
            //put it in the decoded array
            // unset($decoded['rows'][$i]);
            $decoded['rows'][$j]=$decoded_original['rows'][$i];
            $j=$j+1;
        }
    }
    
    // var_dump($decoded['rows']);
    //print out all where session is empty
    // var_dump($decoded['rows'][148]);
    // print_r($decoded['rows'][145]);
  
    for ($i = 0; $i < count($decoded['rows']); $i++) { 
      
       
            // if($i !=0 && $decoded['rows'][$i]['session']!='' && 
            //     $decoded['rows'][$i]['session'] != $decoded['rows'][$i-1]['session'] &&
            //     in_array($decoded['rows'][$i]['session'],$sessionNames) == false){
                       
            //             $sessionNames[]=$decoded['rows'][$i]['session'];
                    
                
            // } else{
            //     //this is the first one so add it
            //     if($i==0 && $decoded['rows'][$i]['session']!='' ){
                    
            //         $sessionNames[]=$decoded['rows'][$i]['session'];
                   
            //     }

            // }
            // $decoded['rows'][$i]['session'];

            //this is for location
            if($i !=0 && $decoded['rows'][$i]['room']!='' && 
            $decoded['rows'][$i]['room'] != $decoded['rows'][$i-1]['room'] &&
            in_array($decoded['rows'][$i]['room'],$locations) == false){
            
                    $locations[]=$decoded['rows'][$i]['room'];
                
            
        }else{
            //this is the first one so add it
            if($i==0 && $decoded['rows'][$i]['room']!='' ){
                
                $locations[]=$decoded['rows'][$i]['room'];
                
            }

        }

            //this is for type
            if($i !=0 && $decoded['rows'][$i]['category2']!='' && 
                $decoded['rows'][$i]['category2'] != $decoded['rows'][$i-1]['category2'] &&
                in_array($decoded['rows'][$i]['category2'],$type) == false){
                
                        $type[]=$decoded['rows'][$i]['category2'];
                    
                
            }else{
                //this is the first one so add it
                if($i==0 && $decoded['rows'][$i]['category2']!='' ){
                    
                    $type[]=$decoded['rows'][$i]['category2'];
                   
                }

            }
            //this is for program name (replace the "session" in classes)
            if($i !=0 && $decoded['rows'][$i]['category1']!='' && 
                $decoded['rows'][$i]['category1'] != $decoded['rows'][$i-1]['category1'] &&
                in_array($decoded['rows'][$i]['category1'],$classNames) == false){
                $classNames[]=$decoded['rows'][$i]['category1'];
            }else{
                //this is the first one so add it
                if($i==0 && $decoded['rows'][$i]['category1']!='' ){
                    
                    $classNames[]=$decoded['rows'][$i]['category1'];
                   
                }

            }
            //this is for time - afternoon or morning
            if($i !=0 && $decoded['rows'][$i]['category3']!='' && 
                $decoded['rows'][$i]['category3'] != $decoded['rows'][$i-1]['category3'] &&
                in_array($decoded['rows'][$i]['category3'],$time) == false){
                $time[]=$decoded['rows'][$i]['category3'];
            }else{
                //this is the first one so add it
                if($i==0 && $decoded['rows'][$i]['category3']!='' ){
                    
                    $time[]=$decoded['rows'][$i]['category3'];
                   
                }

            }

        
        // change day of week
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

        // //change min age
        // //if min is 0 or 1, we have to take into consideration the number of months
        // $minAge=trim($decoded['rows'][$i]['min_age'],"P0");
        // $minAge=trim($minAge,"P");
        // // $minAge=trim($minAge,"00M");
        // $minAge=trim($minAge,"M");
        // //separate the year and month
        // //if after the Y position there is still a string, then get the string
        // $idx=strpos($minAge,"Y"); //find where the Y is
        // $minAge_yr=substr($minAge,0,$idx); //get only the year
        // $minAge_yr=ltrim($minAge_yr,"0"); //remove the 0 at the front
        
        // if(substr($minAge, $idx) != "Y00"){
        //     //take into consideration the months
        //     $minAge_mths=substr($minAge,$idx+1,2);
        //     $minAge_mths=ltrim($minAge_mths, "0");//remove 0 at the front   
        
        // } else{
        //     $minAge_mths=substr($minAge,$idx+1,-3);
        // }
        
        // //change max age
        
        // // $maxAge=trim($decoded['rows'][$i]['max_age'],"P0");
        // // $maxAge=trim($maxAge,"P");
        // // $maxAge=substr($maxAge,0,-4);
        // $maxAge=trim($decoded['rows'][$i]['max_age'],"P0");
        // $maxAge=trim($maxAge,"P");
        // // $minAge=trim($minAge,"00M");
        // $maxAge=trim($maxAge,"M");
        // //separate the year and month
        // //if after the Y position there is still a string, then get the string
        // $idx=strpos($maxAge,"Y"); //find where the Y is
        // $maxAge_yr=substr($maxAge,0,$idx); //get only the year
        // $maxAge_yr=ltrim($maxAge_yr,"0"); //remove the 0 at the front
        
        // if(substr($maxAge, $idx) != "Y00"){
        //     //take into consideration the months
        //     $maxAge_mths=substr($maxAge,$idx+1,2);
        //     $maxAge_mths=ltrim($maxAge_mths, "0");//remove 0 at the front   
        
        // } else{
        //     $maxAge_mths=substr($maxAge,$idx+1,-3);
        // }
        
        
        //determine if they can register yet
                //users can only register if it is after 12 pm on the registration date 
                date_default_timezone_set('America/New_York');
                $canRegister=false;
              
                if ($decoded['rows'][$i]['reg_start_date'] != ''){
                if(date('Y-m-d') > $decoded['rows'][$i]['reg_start_date'] ||
                                                (date('Y-m-d') == $decoded['rows'][$i]['reg_start_date'] && 
                                                time() >= strtotime("12:00:00"))) {
                                                $canRegister=true;
                                                }
                                            }

        //create an array with key value pairs for data to display
        $array_classes[$i]=array(
            // "session"=>$decoded['rows'][$i]['session'],
            "location"=>$decoded['rows'][$i]['room'],
            "type"=>$decoded['rows'][$i]['category2'],
            "className"=>$decoded['rows'][$i]['category1'],
            "time"=>$decoded['rows'][$i]['category3'],
            // "startTime"=>$decoded['rows'][$i]['start_time'],
            "startTime" => date("g:i", strtotime($decoded['rows'][$i]['start_time'])),
            // "endTime"=>$decoded['rows'][$i]['end_time'],
            "endTime"=> date("g:ia", strtotime($decoded['rows'][$i]['end_time'])),
            "startDate"=>$decoded['rows'][$i]['start_date'],
            "endDate"=>$decoded['rows'][$i]['end_date'],
            "dayOfWeek"=>$dayOfWeek,
            "opening"=>$decoded['rows'][$i]['openings']['calculated_openings'],
            "tuition"=>$decoded['rows'][$i]['tuition']['fee'],
            "link"=>$decoded['rows'][$i]['online_reg_link'],
          
            // "maxAge"=>$maxAge,
            // "maxAge_yrs"=>$maxAge_yr,
            // "maxAge_mths"=>$maxAge_mths,
            // "maxAge_original"=>$decoded['rows'][$i]['max_age'],
            // "minAge"=>$minAge,
            // "minAge_yrs"=>$minAge_yr,
            // "minAge_mths"=>$minAge_mths,
            // "minAge_original"=>$decoded['rows'][$i]['min_age'],
            // 'regStartDate'=>'2023-09-16',
            "regStartDate"=>$decoded['rows'][$i]['reg_start_date'],
            'canRegister'=>$canRegister,
            "regEndDate"=>$decoded['rows'][$i]['reg_end_date'],
            "desc"=>$decoded['rows'][$i]['description']
        );

    }
    

    //using this info, make the buttons for filtering 
    //add array_classes to JS so it can be used
    //sort the arrays first, case insensitive
    usort($classNames, 'strnatcasecmp');
    usort($type, 'strnatcasecmp');
    usort($time, 'strnatcasecmp'); //sort this morning first then afternoon later
    usort($locations, 'strnatcasecmp');


    ?>

    <script type="text/javascript">
            const originalClasses = <?php echo json_encode($array_classes); ?>;
            const sessionNames=<?php echo json_encode($sessionNames); ?>;
            const classNames=<?php echo json_encode($classNames); ?>;
            console.log('sessionnames are', sessionNames);
            console.log('classNames are', classNames);
            console.log(originalClasses);
    </script>

    <div class="container-margin">
        <h1 class="text-center">Camp Schedules</h1>
        <div class="registerInfo">
            <p>We strongly recommend <a href="https://app.jackrabbitclass.com/regv2.asp?id=526868" target="_blank">creating an account</a> in advance of registering for activities as spaces fill quickly.</p>
            <p>Full day campers may have the opportunity to purchase healthy lunches through 
                <a href="https://www.fftsl.ca" target="_blank">Food For Thought Student Lunches</a>. 
                Sign up with code 3D4U. Details about the lunches, if available, will be sent via email to those registered for the camp.
        </p>
        </div>
        <div class="filter-area">
            <div class="border-bottom">
                <h2 class="">Camp filter</h3>
            </div>
        <div class="filter-grid">
            <!-- <div class="session flex margin-top-xsmall">
            Session
            </div> -->
            <!-- <div class="sessionCheck">
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
            </div> -->
           
            <!-- <div class='advanced'> -->

                <!-- <button class="accordion">
                    <span id="searchSign"><i class="fa-solid fa-plus"></i> </span> Advanced Search <span class="searchIcon"><i class="fa-solid fa-chevron-down"></i></span>
                </button>
                <div class="panel">
                    <div class='advanced-filter-grid'> -->
                    <div class="class flex margin-top-xsmall">
                        Program
                    </div>  
                    <div class="classCheck">
                        <div class="checkbox-wrap">
                            <?php for ($i = 0; $i < count($classNames); $i++){ ?>
                                <ul class="checkbox-tag">
                                    <li class="check">
                                        <input class="checkbox-input" data-type="class" id="class<?php echo $i?>"  type="checkbox" value="<?php echo $classNames[$i]?>">
                                        <label class="checkbox-text" for="class<?php echo $i?>"><?php echo $classNames[$i]?></label>
                                    </li>
                                </ul>
                            <?php }?>
                        </div>
                    </div>
                    <div class="type flex margin-top-xsmall">
                Type
            </div>
            <div class="typeCheck">
                <div class="checkbox-wrap">
                    <?php for ($i = 0; $i < count($type); $i++){ ?>
                        <ul class="checkbox-tag">
                            <li class="check">
                                <input class="checkbox-input" data-type="type" id="type<?php echo $i?>" type="checkbox" disabled value="<?php echo $type[$i]?>">
                                <label class="checkbox-text checkbox-disabled" for="type<?php echo $i?>"><?php echo $type[$i]?></label>
                            </li>
                        </ul>
                    <?php }?>
                </div>
            </div>
                    <div class="time flex margin-top-xsmall">
                        Time
                    </div>
                    <div class="timeCheck ">
                        <div class="checkbox-wrap">
                            <?php for ($i = 0; $i < count($time); $i++){ 
                                if($time[$i] !='' || $time[$i] != null){?>
                                <ul class="checkbox-tag">
                                    <li class="check">
                                        <input class="checkbox-input" data-type="time" id="time<?php echo $i?>" name="time" disabled type="checkbox" value="<?php echo $time[$i]?>">
                                        <label class="checkbox-text checkbox-disabled" for="time<?php echo $i?>"><?php echo $time[$i]?></label>
                                    </li>
                                </ul>
                            <?php }}?>
                        </div>
                    </div>
                    <div class="location flex margin-top-xsmall">
               Location
            </div>
            <div class="locationCheck">
                <div class="checkbox-wrap">
                    <?php for ($i = 0; $i < count($locations); $i++){ ?>
                        <ul class="checkbox-tag">
                            <li class="check">
                                <input class="checkbox-input" data-type="location" id="location<?php echo $i?>" type="checkbox" value="<?php echo $locations[$i]?>">
                                <label class="checkbox-text" for="location<?php echo $i?>"><?php echo $locations[$i]?></label>
                            </li>
                        </ul>
                    <?php }?>
                </div>
            </div>
                    <!-- <div class="week flex margin-top-xsmall">
                        Day of the Week
                    </div>
                    <div class="weekCheck ">
                        <div class="checkbox-wrap">
                            <ul class="checkbox-tag">
                                <li class="check">
                                    <input class="checkbox-input" data-type="week" id="week1" type="checkbox" value="Monday">
                                    <label class="checkbox-text" for="week1">Monday</label>
                                </li>
                            </ul>
                            <ul class="checkbox-tag">
                                <li class="check">
                                    <input class="checkbox-input" data-type="week" id="week2" type="checkbox" value="Monday">
                                    <label class="checkbox-text" for="week2">Tuesday</label>
                                </li>
                            </ul>
                            <ul class="checkbox-tag">
                                <li class="check">
                                    <input class="checkbox-input" data-type="week" id="week3" type="checkbox" value="Wednesday">
                                    <label class="checkbox-text" for="week3">Wednesday</label>
                                </li>
                            </ul>
                            <ul class="checkbox-tag">
                                <li class="check">
                                    <input class="checkbox-input" data-type="week" id="week4" type="checkbox" value="Thursday">
                                    <label class="checkbox-text" for="week4">Thursday</label>
                                </li>
                            </ul>
                            <ul class="checkbox-tag">
                                <li class="check">
                                    <input class="checkbox-input" data-type="week" id="week5" type="checkbox" value="Friday">
                                    <label class="checkbox-text" for="week5">Friday</label>
                                </li>
                            </ul>
                            <ul class="checkbox-tag">
                                <li class="check">
                                    <input class="checkbox-input" data-type="week" id="week6" type="checkbox" value="Saturday">
                                    <label class="checkbox-text" for="week6">Saturday</label>
                                </li>
                            </ul>
                            <ul class="checkbox-tag">
                                <li class="check">
                                    <input class="checkbox-input" data-type="week" id="week7" type="checkbox" value="Sunday">
                                    <label class="checkbox-text" for="week7">Sunday</label>
                                </li>
                            </ul>
                            
                        </div>
                    </div> -->
                    <div class="avail flex margin-top-xsmall">
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
                    <!-- </div>
                </div>              
            </div> -->
            
        </div>
        <div class="elementor-button-wrapper" style="margin-top: 15px; ">
            <a class=' elementor-button elementor-button-link elementor-size-md elementor-animation-sink' id='search' style="cursor: pointer;">
                <span class="elementor-button-content-wrapper elementor-button-content-wrapper">
                    <span class="elementor-button-text" style="color: white; font-weight: bold; font-size: 18px">Filter Classes</span>
                </span>
            </a>
        </div>
        <!-- <button id="search" class="button">Filter Camps</button> -->
        <div class='reset-filter'>
            <a id="reset">Reset Filter</a>
        </div>
        </div>

    </div>
        <div id="results">

        
        </div>

                            
    
    <?php 
} else{
    ?>
    <div class="container-margin">
        <p>Error getting camps. Please try again later or contact info@kwgymnastics.ca for help.</p>
    </div>
    <?php
    
}


get_footer() ?>