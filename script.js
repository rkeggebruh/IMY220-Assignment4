// NOTES
// hi, I wasn't getting the iframe to display with a regular youtube video link
// however, it will display when I use the link from the "embed code" from youtube
// the regular youtube link gives an error in the console "Refused to display 'https://www.youtube.com/' in a frame because it set 'X-Frame-Options' to 'sameorigin'."


// these are two links to the same youtube video, one works just fine, the other gives the error
// https://www.youtube.com/watch?v=7ly7Mhle-4M&list=RDsADmwWhU5ZM&index=6
// https://www.youtube.com/embed/7ly7Mhle-4M?si=s4JNyFk0yu18eN7f

// (it might just be an issue on my PC but I thought i'd just explain in case you get the same :) 


$(document).ready(function() {


    $("#left").click(function() {
        var messageText = $("#message").val().trim();
        var left = "left";

        if(test(messageText) == true){
            youtubeLink(messageText, left);
        }
        else{
                
            if (messageText !== "") {
                // Create a new div for message
                var messageElement = $("<div>").addClass("message-box-left").text(messageText);
                            
                // put new message in the right place (on top)
                $(".messages").prepend(messageElement);
                            
                // reset textbox
                $("#message").val("");
            }
        }

        
    });


    $("#right").click(function() {
        var messageText = $("#message").val().trim();
        var right = "right";

        if(test(messageText) == true){
            youtubeLink(messageText, right);
        }
        else{
                
            if (messageText !== "") {
                // Create a new div for message
                var messageElement = $("<div>").addClass("message-box-right").text(messageText);
                            
                // put new message in the right place
                $(".messages").prepend(messageElement);
                            
                // reset textbox
                $("#message").val("");
            }
        }


    });


    function test(messageText, dir) {
        // regex test to see if there is a YT link in the text
        var youtubeRegex = /https:\/\/www\.youtube\.com/g;

        return youtubeRegex.test(messageText, dir);
    }


    // https://www.youtube.com/watch?v=7ly7Mhle-4M&list=RDsADmwWhU5ZM&index=6
    // https://www.youtube.com/embed/7ly7Mhle-4M?si=s4JNyFk0yu18eN7f


    function youtubeLink(messageText, dir) {
        // embeding the YT link and getting the other text

        if(dir == "left"){


            var link = messageText;


            // splitting into url and text
            var split = splitToText(link);
            // console.log("Text:", split.text);
            // console.log("URL:", split.url);

            var text = split.text;

            messageText = "<p>"+ text + " " + split.url +"</p>";

            messageText += "<iframe width='100%' height='315' src='" + split.url + "' frameborder='0' allowfullscreen></iframe>";

            var messageElement = $("<div>").addClass("message-box-left").html(messageText);
                            
            
            $(".messages").prepend(messageElement);
                            
            
            $("#message").val("");
        }
        else{

            var link = messageText;

            // splitting into url and text
            var split = splitToText(link);

            var text = split.text;

            messageText = "<p>"+ text + " " + split.url +"</p>";

            messageText += "<iframe width='100%' height='315' src='" + split.url + "' frameborder='0' allowfullscreen></iframe>";
            
            var messageElement = $("<div>").addClass("message-box-right").html(messageText);
            
            $(".messages").prepend(messageElement);
            
            $("#message").val("");
        }


    }



    // function that returns an array with the text part of the message and the url
    function splitToText(text) {
        var regex = /(https?:\/\/[^\s]+)/;
        var match = text.match(regex);
        if (match) {
            var url = match[0];
            var index = text.indexOf(url);
            var textPart = text.substring(0, index).trim();

            return { text: textPart, url: url };
        }
        return { text: text, url: "" };
    }




});