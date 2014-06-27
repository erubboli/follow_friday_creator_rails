$(document).ready(function(){
/* function to disable or enable the tweet button */
 function buttonstatus(stats){
  if (stats == 'enabled'){
   $('#submit').removeAttr('disabled'); 
   $('#twittericon').attr('src','/assets/bird_blue_16.png');
  } else if (stats == 'disabled') {
   $('#submit').attr('disabled','disabled');
   $('#twittericon').attr('src','/assets/bird_gray_16.png');
  }
 }
/* function to populate the tweetarea, change the counter and enable/diasable the tweet button */
 function createtweet() {
  var arr = $.map($('input:checkbox:checked'), function(e, i) {
   return e.value;
  });
  var tweet = '#ff ' + arr.join(', ');
  if(arr.length==0){
   $('#tweetarea').text('');
   $('#count').text('140');
   buttonstatus('disabled');
  } else {
   $('#tweetarea').text(tweet);
   $('#count').text('140' - tweet.length);
   $('#tweetform').attr('action','https://www.twitter.com/intent/tweet?text=' + encodeURIComponent(tweet));
   if (tweet.length>'140'){
    buttonstatus('disabled')
    $('#count').css({'color':'red','font-weight':'bold'});
   } else {
    buttonstatus('enabled');
    $('#count').css({'color':'green','font-weight':'normal'});
   }
  }
 }
/* Associate the createtweet function to the checkbox */
 $('#friendlist').delegate('input:checkbox','click',createtweet);
});
