$(document).ready(function() {

    setTimeout(checkAmt, 3000)

    
    console.log("hello there!")
    

    function checkAmt() {
        console.log($("#cdsetdonationamt1").append(" Half-sponsor, monthly"))
        console.log($("#cdsetdonationamt2").append(" Full-sponsor, monthly"))
        console.log($("#cdsetdonationamt3").append(" Half-sponsor, annually"))
        console.log($("#cdsetdonationamt4").append(" Full-sponsor, annually"))
        
    }
})