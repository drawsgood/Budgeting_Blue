var dailyBudget = 150;
var finalNum = dailyBudget;

$(document).ready(function() {

    var today = new Date().toISOString().split('T')[0];
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var yestStr = yesterday.toISOString().split('T')[0];

    console.log("Today:", today, "Yesterday:", yestStr);

    $.getJSON("current.json?" + Math.random(), function(obj) {

        $('#list').find("tr:gt(0)").remove(); // clear old rows except header

        var yesterdaySpent = 0;

        $.each(obj.entries, function(key, value) {

            if(value.date) {
                var amountNum = Number(value.amount);

                // Track yesterday's spending
                if(value.date === yestStr){
                    yesterdaySpent += amountNum;
                }

                // Subtract today's spending from budget
                if(value.date === today){
                    finalNum -= amountNum;

                    // Format date nicely
                    var dateObj = new Date(value.date);
                    var options = { year: 'numeric', month: 'short', day: 'numeric' };
                    var formattedDate = dateObj.toLocaleDateString(undefined, options);

                    $('#list').append(
                        "<tr class='myBorderColor'>" +
                        "<td style='border:none' class='myBGColor'>$" + amountNum.toFixed(2) + "</td>" +
                        "<td style='border:none;text-align:right' class='myBGColor'>" + value.category + "</td>" +
                        "<td style='border:none;text-align:right' class='myBGColor'>" + formattedDate + "</td>" +
                        "<td><button class='deleteBtn' data-id='" + key + "'>Delete</button></td>" +
                        "</tr>"
                    );
                }
            }
        });

        // Show yesterday's leftover at the top if any
        var yestLeftover = dailyBudget - yesterdaySpent;
        if(yestLeftover > 0){
            $('#list').prepend(
                "<tr class='myBorderColor' style='background-color: #d3e0f0; font-style: italic;'>" +
                "<td colspan='4' style='text-align:center;'>Yesterday's leftover: $" + yestLeftover.toFixed(2) + "</td>" +
                "</tr>"
            );
        }

        // Update today's remaining budget
        $('#total').html(
            "<h1 style='font-size:60pt;font-weight:200;' class='text-center'>$" +
            finalNum.toFixed(2) +
            "</h1>"
        );

        $('input[id=balance]').val(finalNum.toFixed(2));

    });

});

// Delete button
$(document).on("click", ".deleteBtn", function(){
    var index = $(this).data("id");
    $.post("delete.php", { delete: index }, function(){
        location.reload();
    });
});