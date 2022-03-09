var saveData = true;
var settings = {
    textFaded: false,
    showTimeList: true,
}
var progression = {
    confirmValidCode: true,
    upgrades: {
        main: {
            speedUpTime1: {
            effect: "Doubles the amount of seconds you gain per second.", //Times 2
            cost: 10, //Seconds
            bought: false
            },
            speedUpTime2: {
                effect: "Increases "
            }
    },
    },
    time: {
    gainTime: 1,
    seconds: {
        amount: 0,
    },
    showTime: 0,
    breakDown: {
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
        weeks: 0,
        months: 0,
        years: 0
    }
}
}
$(function(){
    if(sessionStorage.getItem('loadData') == 'true'){
        if(localStorage != 'null'){
            load();
            preloads();

        }
    }
});
sessionStorage.setItem('loadData', 'true');
function calcTime(){
    if(progression.time.breakDown.seconds != progression.time.seconds.amount){
        progression.time.breakDown.seconds = progression.time.seconds.amount;
        if(progression.time.breakDown.seconds / 3.154e+7 > 1){
            while(progression.time.breakDown.seconds / 3.154e+7 > 1){
                progression.time.breakDown.years = Math.floor(progression.time.breakDown.seconds / 3.154e+7);
                progression.time.breakDown.seconds %= 3.154e+7;
                progression.time.breakDown.months = 0;
                progression.time.breakDown.weeks = 0;
            }
        }
        if(progression.time.breakDown.seconds / 2.628e+6	> 1){
            while(progression.time.breakDown.seconds / 2.628e+6	> 1){
                progression.time.breakDown.months = Math.floor(progression.time.breakDown.seconds / 2.628e+6);
                progression.time.breakDown.seconds %= 2.628e+6;
                progression.time.breakDown.weeks = 0
                progression.time.breakDown.days = 0;
            }
        }
        if(progression.time.breakDown.seconds / 604800 > 1){
            while(progression.time.breakDown.seconds / 604800 > 1){
                progression.time.breakDown.weeks = Math.floor(progression.time.breakDown.seconds / 604800);
                progression.time.breakDown.seconds %= 604800;
                progression.time.breakDown.days = 0;
            }
        }
        if(progression.time.breakDown.seconds / 86400 > 1){
            while(progression.time.breakDown.seconds / 86400 > 1){
                progression.time.breakDown.days = Math.floor(progression.time.breakDown.seconds / 86400);
                progression.time.breakDown .seconds%= 86400;
                progression.time.breakDown.hours = 0;
            }
        }
        if(progression.time.breakDown.seconds / 3600 > 1){
            while(progression.time.breakDown.seconds / 3600 > 1){
                progression.time.breakDown.hours = Math.floor(progression.time.breakDown.seconds / 3600);
                progression.time.breakDown.seconds %= 3600;
                progression.time.breakDown.minutes = 0;
            }
        }
        if(progression.time.breakDown.seconds / 60 > 1){
            while(progression.time.breakDown.seconds / 60 > 1){
                progression.time.breakDown.minutes = Math.floor(progression.time.breakDown.seconds / 60);
                progression.time.breakDown.seconds %= 60;
            }
        }
    }
}
function showTime(){
    calcTime();
    document.title = progression.time.seconds.amount.toFixed(0) + " Seconds";
    document.getElementById("tsSec").textContent = progression.time.breakDown.seconds.toFixed(2);
    document.getElementById("tsMin").textContent = progression.time.breakDown.minutes;
    document.getElementById("tsHour").textContent = progression.time.breakDown.hours;
    document.getElementById("tsDay").textContent = progression.time.breakDown.days;
    document.getElementById("tsWeek").textContent = progression.time.breakDown.weeks;
    document.getElementById("tsMonth").textContent = progression.time.breakDown.months;
    document.getElementById("tsYear").textContent = progression.time.breakDown.years;
    document.getElementById("tsTotalSec").textContent = Math.floor(progression.time.seconds.amount);
}
function passiveGain(){
    if(progression.time.gainTime < 1000){
    for(var addTime = 0; addTime < progression.time.gainTime; addTime++){
        progression.time.seconds.amount += 0.1;
    }
    }else if(progression.time.gainTime >= 1000){
        progression.time.seconds.amount += progression.time.gainTime;
    }
}
function preloads(){
    $("#up1").hide();0
    if(settings.showTimeList == false){
    $("#timeContainer").hide();
    $("#totalSec").hide();
    }
    if(settings.textFaded == true){
        $("#fadeAway1").hide()
    }
}
function showTooltips(){
    document.getElementById("up1").innerHTML = progression.upgrades.main.speedUpTime1.effect + "<br>" + "Cost: " + progression.upgrades.main.speedUpTime1.cost + " seconds";
        $("#upButton1").hover(function(){
            $("#up1").show(500);
        },
        function(){
            $("#up1").hide(500);
        });
        $("#hardReset").hover(function(){
            $("#resetWarning").css("visibility","visible")
        },
        function(){
            $("#resetWarning").css("visibility","hidden")
        })   
}
function showhideUpgrades(){
    if(progression.upgrades.main.speedUpTime1.bought == false){
        if(progression.time.seconds.amount >= 10){
            $("#upButton1").slideDown(500);
    }else{
        $("#upButton1").slideUp(0);
    }
        }else{
            $("#upButton1").slideUp(0);
        }
    };
function save(){
    if(saveData === true){
        const date = new Date();
        localStorage.setItem('time', JSON.stringify(progression.time));
        localStorage.setItem('settings',JSON.stringify(settings));
        localStorage.setItem('upgrades', JSON.stringify(progression.upgrades));
        localStorage.setItem("leaveDate", date.getTime());
    };
};
function exportSave() {
    return(btoa(JSON.stringify(progression)));
}
function importSave(save){
    if(JSON.parse(atob(save)).confirmValidCode){
        progression = JSON.parse(atob(save));
    }
}
function load(){
    if(localStorage.getItem("time")){
    progression.time = JSON.parse(localStorage.getItem('time'));
    }
    if(localStorage.getItem("settings")){
    settings = JSON.parse(localStorage.getItem('settings'));
    }
    if(localStorage.getItem("upgrades")){
    progression.upgrades = JSON.parse(localStorage.getItem('upgrades'));    
    };
}
function hardReset(){  
    saveData = false;
    localStorage.clear();
    sessionStorage.setItem('loadData','false');
    sessionStorage.setItem('emergencySave', exportSave());
    location.reload()
};
function buyUpgrades(){
    $("#upButton1").click(function(){
        if(progression.upgrades.main.speedUpTime1.bought == false){
            if(progression.time.seconds.amount >= 10){
                $("#upButton1").slideUp(500);
                progression.time.seconds.amount -= 10;
                progression.upgrades.main.speedUpTime1.bought = true;
                progression.time.gainTime *= 2;
                sendEvents("You feel everything around you become faster")
            }
        }
    })
};
function pressSettings(){
    //Main Buttons
    $("#settingsButton").click(function(){
        $("#settingsMenu").show(500);
    })
    $("#closeSettings").click(function(){
        $("#settingsMenu").hide(250);
        $("#creditsContainer").css("visibility","hidden")
    })
    //Credits
    $("#creditsButton").click(function(){
        $("#creditsContainer").css("visibility","visible");
    })
    $("#closeCredits").click(function(){
        $("#creditsContainer").css("visibility","hidden");
    })
    //Import Export
    $("#exportS").click(function(){
        document.getElementById("saveText").value = btoa(JSON.stringify(progression))
    })
    $("#importS").click(function(){
        let saveCode = document.getElementById("saveText").value
        importSave(saveCode)
    })
    //Hard Reset
    $("#hardReset").click(function(){
        hardReset();
    })
};
function alertReset(){
    if(sessionStorage.getItem('emergencySave') != null){
        sendEvents("You have reset your data! An export code has been generated in case you regret your decision \nThis can be accessed from the javascript console Ctrl + Shift + I and its been put in the import/export box")
        console.log(sessionStorage.getItem('emergencySave'))
        document.getElementById("saveText").value = sessionStorage.getItem('emergencySave')
        sessionStorage.removeItem('emergencySave');
    }
}
function sendEvents(message){
    let logger = document.getElementById("events")
    let container = document.getElementById("showEvents")
    logger.innerHTML += message + "<br>"
    $('#showEvents').animate({
         scrollTop: container.scrollHeight - container.clientHeight
    }, 10);
}
function fadeStartingText(){
    $("#fadeAway1").fadeOut(5000, function(){
        settings.textFaded = true;
    });
}
function timeListToggle(){
    $("#timeButton").click(function(){
        $("#timeContainer").slideToggle(500, function(){
            if(settings.showTimeList == false){
            settings.showTimeList = true;
                }
            else if(settings.showTimeList == true){
            settings.showTimeList = false;
        }
        });
        $("#totalSec").slideToggle(500);
        });
}
$(function(){
    $("#settingsMenu").hide()
    sendEvents("Reality resumes")
    setInterval(showTime,0);
    setInterval(passiveGain,100);
    setInterval(save,60000);
    setInterval(showhideUpgrades,0);
    showTooltips();
    buyUpgrades();
    pressSettings();
    alertReset();
    fadeStartingText();
    timeListToggle();
});