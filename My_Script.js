var dailyBudget = 150;

$(document).ready(function () {

    function getDateString(date) {
        return date.getFullYear() + "-" +
            String(date.getMonth() + 1).padStart(2, '0') + "-" +
            String(date.getDate()).padStart(2, '0');
    }

    function loadTable() {

        var finalNum = dailyBudget;

        var today = getDateString(new Date());

        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        var yestStr = getDateString(yesterday);

        $.getJSON("current.json?" + Math.random(), function (obj) {

            // Clear table body
            $('#tableBody').empty();

            // Remove leftover row if it exists
            $('#list').find(".yest-leftover").remove();

            var yesterdaySpent = 0;

            if (!obj.entries) return;

            $.each(obj.entries, function (key, value) {

                if (!value.date) return;

                var amountNum = Number(value.amount);

                // Track yesterday spending
                if (value.date === yestStr) {
                    yesterdaySpent += amountNum;
                }

                // Only display today's entries
                if (value.date === today) {

                    finalNum -= amountNum;

                    // Safe date parsing (prevents timezone shift)
                    var parts = value.date.split("-");
                    var dateObj = new Date(parts[0], parts[1] - 1, parts[2]);

                    var formattedDate = dateObj.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });

                    $('#tableBody').append(
                        "<tr class='myBorderColor'>" +
                        "<td class='myBGColor'>$" + amountNum.toFixed(2) + "</td>" +
                        "<td class='myBGColor' style='text-align:right'>" + value.category + "</td>" +
                        "<td class='myBGColor' style='text-align:right'>" + formattedDate + "</td>" +
                        "<td style='text-align:center'>" +
                        "<button class='deleteBtn btn btn-default btn-xs' style='color:#c0392b;border-color:#c0392b' data-id='" + key + "' title='Delete entry'>" +
                        "<i class='fa fa-trash'></i>" +
                        "</button>" +
                        "</td>" +
                        "</tr>"
                    );
                }
            });

            // Calculate yesterday leftover
            var yestLeftover = dailyBudget - yesterdaySpent;

            if (yestLeftover > 0) {
                $('#list thead').after(
                    "<tr class='myBorderColor yest-leftover' style='background-color:#d3e0f0;text-align:center;'>" +
                    "<td colspan='4' style='font-weight:bold'>" +
                    "Yesterday's leftover: $" + yestLeftover.toFixed(2) +
                    "</td>" +
                    "</tr>"
                );
            }

            // Update remaining budget display
            $('#total').html(
                "<h1 style='font-size:60pt;font-weight:200;' class='text-center'>$" +
                finalNum.toFixed(2) +
                "</h1>"
            );

            $('#balance').val(finalNum.toFixed(2));

        });
    }

    loadTable();

    // Delete entry
    $(document).on("click", ".deleteBtn", function (e) {

        e.preventDefault();

        var index = $(this).data("id");

        if (index === undefined) {
            console.error("Delete index missing");
            return;
        }

        $.post("delete.php", { delete: index }, function () {
            loadTable();
        }).fail(function (xhr, status, error) {
            console.error("AJAX delete failed:", status, error);
        });

    });

});