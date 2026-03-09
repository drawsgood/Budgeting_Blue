var dailyBudget = 150;

$(document).ready(function() {

    function loadTable() {
        var finalNum = dailyBudget;
        var today = new Date().toISOString().split('T')[0];
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        var yestStr = yesterday.toISOString().split('T')[0];

        $.getJSON("current.json?" + Math.random(), function(obj) {

            // Clear table except header
            $('#list').find("tr:gt(0)").remove();

            var yesterdaySpent = 0;

            // Loop through entries
            $.each(obj.entries, function(key, value) {
                if(value.date){
                    var amountNum = Number(value.amount);

                    // Track yesterday's spending
                    if(value.date === yestStr){
                        yesterdaySpent += amountNum;
                    }

                    // Subtract today's spending and append row
                    if(value.date === today){
                        finalNum -= amountNum;

                        // Format date nicely
                        var dateObj = new Date(value.date);
                        var formattedDate = dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

                        // Append real entry row with delete button
                        $('#list').append(
                            "<tr class='myBorderColor'>" +
                            "<td style='border:none' class='myBGColor'>$" + amountNum.toFixed(2) + "</td>" +
                            "<td style='border:none;text-align:right' class='myBGColor'>" + value.category + "</td>" +
                            "<td style='border:none;text-align:right' class='myBGColor'>" + formattedDate + "</td>" +
                            "<td style='text-align:center;'>" +
                                "<button class='deleteBtn btn btn-default btn-xs' style='color:#c0392b; border-color:#c0392b;' data-id='" + key + "' title='Delete entry'>" +
                                "<i class='fa fa-trash'></i>" +
                                "</button>" +
                            "</td>" +
                            "</tr>"
                        );
                    }
                }
            });

            // Calculate yesterday's leftover
            var yestLeftover = dailyBudget - yesterdaySpent;

            // Remove old leftover row if it exists
            $('#list').find(".yest-leftover").remove();

            // Prepend yesterday leftover if any
            if(yestLeftover > 0){
                $('#list').prepend(
                    "<tr class='myBorderColor yest-leftover' style='background-color: #d3e0f0; text-align:center;'>" +
                    "<td colspan='4' style='text-align:center; font-weight:bold; font-style:normal;'>" +
                    "Yesterday's leftover: $" + yestLeftover.toFixed(2) +
                    "</td>" +
                    "</tr>"
                );
            }

            // Update remaining budget display
            $('#total').html("<h1 style='font-size:60pt;font-weight:200;' class='text-center'>$" + finalNum.toFixed(2) + "</h1>");
            $('input[id=balance]').val(finalNum.toFixed(2));
        });
    }

    loadTable(); // initial load

    // Delete button click
    $(document).on("click", ".deleteBtn", function(e){
        e.preventDefault();
        var index = $(this).data("id");

        if(index === undefined){
            console.error("data-id undefined on delete button!");
            return;
        }

        $.post("delete.php", { delete: index }, function(response){
            console.log("Deleted entry index:", index, "Response:", response);
            loadTable(); // reload table only
        }).fail(function(xhr, status, error){
            console.error("AJAX delete failed:", status, error);
        });
    });
});