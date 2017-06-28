$(document).ready(function() {

    // $("#comment").hide();
    var selId;

    $(".comment").on("click", function() {

        //$("#comment").css("visibility", "visible");
        $("#comment").empty();

        // pull button value (id) and store into variable
        var thisId = $(this).val();

        
        Refresh(thisId)
    });

    // $("#commentSubmit").on("click", function() {
    $(document).on("click", "#commentSubmit", function() {
        
        var thisId = $(this).attr("data-id");
        console.log("clicked on " + thisId);
        $.ajax({
            method: "POST",
            url: "/comments/" + thisId,
            data: {
                title: $("#commentTitle").val(),
                body: $("#commentBody").val()
            }
        }).done(function(data) {
            console.log(data);
            Refresh(thisId);
            $("#comments").empty();
        });
        $("#commentTitle").val("");
        $("#commentBody").val("");
    });

});


 function Refresh(article){
      //$("#comment").css("visibility", "visible");
        $("#comment").empty();

        // pull button value (id) and store into variable
        //var thisId = $(this).val();

        $.ajax({
            method: "GET",
            url: "/comments/" + article
        }).done(function(data) {
            console.log(data);
            
            $("#comment").append("<h4>" + data.title + "</h4>");
            $("#comment").append("<input id='commentTitle' name='title'>");
            $("#comment").append("<textarea id='commentBody' name='body'></textarea>");
            $("#comment").append("<button class='btn-submit btn-sm' data-id='" + data._id + "' id='commentSubmit'>Save comment</button>");
            
            if (data.comment) {
               // $("#commentTitle").attr("placeholder", data.commendat.title + " (current title)");
               // $("#commentBody").attr("placeholder", data.comment.body + " (current comment)");
               $("#recomment").append("<span>" + data.comment.title + "</span>");
               $("#recomment").append("<span>" + data.comment.body + "</span>");
               var deleteButton = $("<button data-id='" + data._id +"'>delete</button>");
               $("#recomment").append(deleteButton);
               deleteButton.on('click', function() {
                //  $.ajax({
                    // send a request to /comments/{data._id}/delete
                    // delete that comment from the database
                    // call your refresh function and pass in article
                //  });
               });
            }
        })
    

 }